"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { findQuestion, getLesson, getSubject, topicTitle } from "@/lib/content";
import {
  answeredCount,
  consumeStart,
  correctCount,
  elapsedMs,
  EXAM_PACE_MIN,
  formatDuration,
  loadStore,
  makeRetryRun,
  makeRun,
  missedIds,
  resumeRun,
  runMatchesLesson,
  saveStore,
  shuffle,
  unseenIds,
  type Run,
  type Store,
} from "@/lib/progress";
import type { Lesson, Question, Subject } from "@/lib/types";

type Finished = {
  label: string;
  correct: number;
  answered: number;
  ms: number;
  topics: { title: string; correct: number; total: number }[];
  missed: { prompt: string; pick: string | null; answer: string; learningPoint: string; reference: string }[];
  missedIds: string[];
};

function letter(index: number) {
  return index < 26 ? String.fromCharCode(65 + index) : String(index + 1);
}

function isAnswered(run: Run, index = run.index) {
  return run.results[index] === 0 || run.results[index] === 1;
}

export function PracticeView({ subjectId, lessonId }: { subjectId: string; lessonId: string }) {
  const subject = getSubject(subjectId);
  const lesson = subject ? getLesson(subject, lessonId) : undefined;
  const [store, setStore] = useState<Store | null>(null);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState<Finished | null>(null);
  const shownAt = useRef(Date.now());

  useEffect(() => {
    if (!subject || !lesson) return;
    const loaded = loadStore();
    const queued = consumeStart(subjectId, lessonId);
    let nextRun = loaded.run;
    let startPlaying = false;

    if (nextRun && nextRun.subjectId === subjectId && nextRun.lessonId === lessonId && !runMatchesLesson(nextRun, subjectId, lesson)) {
      nextRun = null;
    }

    if (queued && queued.mode !== "resume") {
      const created = makeRun(subject, lesson, queued.mode, loaded.attempts, queued.topicId);
      if (created) {
        nextRun = { ...created, autoStart: true };
        startPlaying = true;
      }
    } else if (queued?.mode === "resume" && runMatchesLesson(loaded.run, subjectId, lesson)) {
      nextRun = { ...resumeRun(loaded.run), autoStart: true };
      startPlaying = !nextRun.results.every((result) => result === 0 || result === 1);
    } else if (runMatchesLesson(nextRun, subjectId, lesson) && nextRun.autoStart) {
      nextRun = { ...resumeRun(nextRun), autoStart: false };
      startPlaying = true;
    } else if (runMatchesLesson(nextRun, subjectId, lesson)) {
      nextRun = {
        ...nextRun,
        elapsedMs: nextRun.elapsedMs + Math.max(0, Date.now() - nextRun.startedAt),
        startedAt: Date.now(),
      };
    }

    const next = { ...loaded, run: nextRun };
    saveStore(next);
    setStore(next);
    setPlaying(startPlaying);
    if (queued?.mode === "resume" && nextRun && nextRun.results.every((result) => result === 0 || result === 1)) {
      setFinished(summarize(nextRun, lesson));
      setStore({ ...next, run: null, sessions: recordSession(next, nextRun, lesson) });
      saveStore({ ...next, run: null, sessions: recordSession(next, nextRun, lesson) });
    }
  }, [lesson, lessonId, subject, subjectId]);

  useEffect(() => {
    shownAt.current = Date.now();
  }, [store?.run?.index, playing]);

  useEffect(() => {
    if (!playing || !store?.run || store.run.order) return;
    const currentLesson = lesson;
    const question = currentLesson && findQuestion(currentLesson, store.run.questionIds[store.run.index]);
    if (!question) return;
    const order = question.choices.map((_, index) => index);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setStore((prev) => {
      if (!prev?.run || prev.run.order) return prev;
      const next = { ...prev, run: { ...prev.run, order } };
      saveStore(next);
      return next;
    });
  }, [lesson, playing, store?.run, store?.run?.index, store?.run?.order]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!playing || event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();
      let index = "abcd".indexOf(key);
      if (index < 0) index = "1234".indexOf(key);
      if (index > -1) {
        event.preventDefault();
        answer(index);
      } else if ((key === "enter" || key === "arrowright") && !(event.target instanceof HTMLButtonElement && key === "enter")) {
        event.preventDefault();
        goNext();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  function update(recipe: (current: Store) => Store) {
    setStore((prev) => {
      if (!prev) return prev;
      const next = recipe(prev);
      saveStore(next);
      return next;
    });
  }

  function start(mode: "quick" | "miss" | "full" | "topic", topicId?: string) {
    if (!subject || !lesson || !store) return;
    const run = makeRun(subject, lesson, mode, store.attempts, topicId);
    if (!run) return;
    setFinished(null);
    setPlaying(true);
    update((current) => ({ ...current, run }));
  }

  function continueRun() {
    if (!store?.run || !lesson || !runMatchesLesson(store.run, subjectId, lesson)) return;
    if (store.run.results.every((result) => result === 0 || result === 1)) {
      finish(store, store.run);
      return;
    }
    const run = { ...resumeRun(store.run), autoStart: false };
    setPlaying(true);
    update((current) => ({ ...current, run }));
  }

  function answer(choiceIndex: number) {
    if (!lesson || !subject) return;
    update((current) => {
      const run = current.run;
      if (!run || !playing || !run.order || isAnswered(run)) return current;
      const question = findQuestion(lesson, run.questionIds[run.index]);
      if (!question || choiceIndex < 0 || choiceIndex >= run.order.length) return current;
      const chosen = run.order[choiceIndex];
      const correct = chosen === question.answer;
      const results = run.results.slice();
      const picks = run.picks.slice();
      results[run.index] = correct ? 1 : 0;
      picks[run.index] = question.choices[chosen];
      return {
        ...current,
        run: { ...run, results, picks },
        attempts: [
          ...current.attempts,
          {
            questionId: question.id,
            subjectId: subject.id,
            lessonId: lesson.id,
            topicId: question.topic,
            correct,
            choice: question.choices[chosen],
            ms: Math.max(0, Date.now() - shownAt.current),
            at: new Date().toISOString(),
          },
        ],
      };
    });
  }

  function goNext() {
    if (!store?.run || !lesson || !isAnswered(store.run)) return;
    if (store.run.index >= store.run.questionIds.length - 1) {
      finish(store, store.run);
      return;
    }
    const nextQuestion = findQuestion(lesson, store.run.questionIds[store.run.index + 1]);
    const next = {
      ...store,
      run: {
        ...store.run,
        index: store.run.index + 1,
        order: nextQuestion ? shuffle(nextQuestion.choices.map((_, index) => index)) : null,
      },
    };
    saveStore(next);
    setStore(next);
  }

  function finish(current: Store, run: Run) {
    if (!lesson) return;
    const summary = summarize(run, lesson);
    const sessions = recordSession(current, run, lesson);
    const next = { ...current, run: null, sessions };
    saveStore(next);
    setStore(next);
    setPlaying(false);
    setFinished(summary);
    window.scrollTo(0, 0);
  }

  function exit() {
    if (!store?.run) {
      setPlaying(false);
      return;
    }
    if (answeredCount(store.run) > 0) finish(store, store.run);
    else {
      update((current) => ({ ...current, run: null }));
      setPlaying(false);
    }
  }

  function retry(ids: string[]) {
    const run = makeRetryRun(subjectId, lessonId, ids);
    if (!run || !store || !lesson) return;
    const first = findQuestion(lesson, run.questionIds[0]);
    if (first) run.order = shuffle(first.choices.map((_, index) => index));
    setFinished(null);
    setPlaying(true);
    update(() => ({ ...store, run }));
  }

  if (!subject || !lesson) return null;

  if (!store) {
    return (
      <>
        <h1>{lesson.title}</h1>
        <p className="sub">{subject.title}</p>
      </>
    );
  }

  if (finished) {
    return <Results subject={subject} finished={finished} onRetry={retry} />;
  }

  const active = playing && store.run && runMatchesLesson(store.run, subjectId, lesson) ? store.run : null;
  if (active) {
    const question = findQuestion(lesson, active.questionIds[active.index]);
    if (!question) return null;
    return (
      <Question
        run={active}
        question={question}
        lesson={lesson}
        onAnswer={answer}
        onNext={goNext}
        onExit={exit}
      />
    );
  }

  return <Setup subject={subject} lesson={lesson} store={store} onStart={start} onResume={continueRun} />;
}

function recordSession(store: Store, run: Run, lesson: Lesson) {
  const answered = answeredCount(run);
  if (!answered) return store.sessions;
  return [
    ...store.sessions,
    {
      at: new Date().toISOString(),
      subjectId: run.subjectId,
      lessonId: lesson.id,
      label: run.label,
      correct: correctCount(run),
      answered,
      ms: elapsedMs(run),
    },
  ].slice(-30);
}

function summarize(run: Run, lesson: Lesson): Finished {
  const topics = new Map<string, { title: string; correct: number; total: number }>();
  const missed: Finished["missed"] = [];
  const missedQuestionIds: string[] = [];
  run.questionIds.forEach((id, index) => {
    const result = run.results[index];
    if (result !== 0 && result !== 1) return;
    const question = findQuestion(lesson, id);
    if (!question) return;
    const topic = topics.get(question.topic) ?? { title: topicTitle(lesson, question.topic), correct: 0, total: 0 };
    topic.total += 1;
    if (result === 1) topic.correct += 1;
    topics.set(question.topic, topic);
    if (result === 0) {
      missedQuestionIds.push(id);
      missed.push({
        prompt: question.prompt,
        pick: run.picks[index],
        answer: question.choices[question.answer] ?? "",
        learningPoint: question.learningPoint,
        reference: question.reference,
      });
    }
  });
  return {
    label: run.label,
    correct: correctCount(run),
    answered: answeredCount(run),
    ms: elapsedMs(run),
    topics: [...topics.values()],
    missed,
    missedIds: missedQuestionIds,
  };
}

function Setup({
  subject,
  lesson,
  store,
  onStart,
  onResume,
}: {
  subject: Subject;
  lesson: Lesson;
  store: Store;
  onStart: (mode: "quick" | "miss" | "full" | "topic", topicId?: string) => void;
  onResume: () => void;
}) {
  const ids = lesson.questions.map((question) => question.id);
  const missed = missedIds(ids, store.attempts);
  const unseen = unseenIds(ids, store.attempts);
  const saved = runMatchesLesson(store.run, subject.id, lesson) ? store.run : null;
  const counts = new Map<string, number>();
  for (const question of lesson.questions) counts.set(question.topic, (counts.get(question.topic) ?? 0) + 1);

  if (!ids.length) {
    return (
      <>
        <h1>{lesson.title}</h1>
        <p className="sub">{subject.title}</p>
        <p>This lesson has no questions yet. Add them to <code>content/subjects/{subject.id}.json</code> using the same fields as Chapter 1.</p>
        <p className="note"><Link href={`/subjects/${subject.id}`}>Back to {subject.title}</Link></p>
      </>
    );
  }

  const minutes = Math.max(5, Math.round((ids.length * 1.5) / 5) * 5);

  return (
    <>
      <h1>{lesson.title}</h1>
      <p className="sub">{subject.title} · {ids.length} questions{unseen.length ? ` · ${unseen.length} unseen` : ""}.</p>
      <div className="stack">
        {saved ? (
          <button className="mode pri" type="button" onClick={onResume}>
            <span>
              <b>Resume {saved.label}</b>
              <small>Question {Math.min(answeredCount(saved) + 1, saved.questionIds.length)} of {saved.questionIds.length}</small>
            </span>
            <span className="arrow">→</span>
          </button>
        ) : null}
        <button className={saved ? "mode" : "mode pri"} type="button" onClick={() => onStart("quick")}>
          <span>
            <b>{ids.length < 10 ? `Quick ${ids.length}` : "Quick 10"}</b>
            <small>Unseen and missed first · about 15 min</small>
          </span>
          <span className="arrow">→</span>
        </button>
        <button className="mode" type="button" disabled={!missed.length} onClick={() => onStart("miss")}>
          <span>
            <b>Review missed</b>
            <small>{missed.length ? `${missed.length} you got wrong last time` : "Nothing to review yet"}</small>
          </span>
          <span className="arrow">→</span>
        </button>
        <button className="mode" type="button" onClick={() => onStart("full")}>
          <span>
            <b>Full set</b>
            <small>All {ids.length} questions · about {minutes} min</small>
          </span>
          <span className="arrow">→</span>
        </button>
      </div>
      {lesson.topics.length ? (
        <>
          <h2>Practice one topic</h2>
          <div className="chips">
            {lesson.topics.filter((topic) => counts.get(topic.id)).map((topic) => (
              <button key={topic.id} className="chip" type="button" onClick={() => onStart("topic", topic.id)}>
                {topic.title}<em>{counts.get(topic.id)}</em>
              </button>
            ))}
          </div>
        </>
      ) : null}
      {lesson.revision.map((section) => (
        <details key={section.title}>
          <summary>{section.title}</summary>
          <div className="in"><ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </details>
      ))}
      <details>
        <summary>All {ids.length} learning points</summary>
        <div className="in sheet">
          {lesson.topics.map((topic) => (
            <div key={topic.id}>
              <h3>{topic.title}</h3>
              <ul>
                {lesson.questions.filter((question) => question.topic === topic.id).map((question) => (
                  <li key={question.id}>{question.learningPoint}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
      <p className="note">Practice items written in the FRM style. Progress is saved in this browser only.</p>
    </>
  );
}

function Question({
  run,
  question,
  lesson,
  onAnswer,
  onNext,
  onExit,
}: {
  run: Run;
  question: Question;
  lesson: Lesson;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onExit: () => void;
}) {
  const answered = isAnswered(run);
  const order = run.order;
  const correctDisplay = order ? order.findIndex((choice) => choice === question.answer) : -1;
  const pickedDisplay = !order || run.picks[run.index] == null ? -1 : order.findIndex((choice) => question.choices[choice] === run.picks[run.index]);
  const last = run.index === run.questionIds.length - 1;

  return (
    <>
      <div className="top">
        <div className="topr">
          <span>{run.label} · {run.index + 1} of {run.questionIds.length} · {correctCount(run)} correct</span>
          <button className="quit" type="button" onClick={onExit}>Exit</button>
        </div>
        <div className="scale" style={{ height: 30, marginTop: 6 }} aria-hidden="true">
          <div className="ticks" style={{ bottom: 10 }}>
            {run.questionIds.map((id, index) => {
              const result = run.results[index];
              const kind = result === 1 ? "ok" : result === 0 ? "bad" : index === run.index ? "cur" : "";
              return <i key={id} className={kind} />;
            })}
          </div>
          <div className="ptr" style={{ left: `${((run.index + 0.5) / run.questionIds.length) * 100}%` }} />
        </div>
      </div>
      <span className="tag">{topicTitle(lesson, question.topic)}</span>
      <p className="q">{question.prompt}</p>
      {order ? (
      <div className="opts">
        {order.map((choiceIndex, displayIndex) => {
          const classes = ["opt"];
          if (answered && displayIndex === correctDisplay) classes.push("ok");
          else if (answered && displayIndex === pickedDisplay) classes.push("bad");
          else if (answered) classes.push("dim");
          return (
            <button
              key={choiceIndex}
              className={classes.join(" ")}
              type="button"
              disabled={answered}
              onClick={() => onAnswer(displayIndex)}
            >
              <span className="l">{letter(displayIndex)}</span>
              <span>{question.choices[choiceIndex]}</span>
            </button>
          );
        })}
      </div>
      ) : (
        <p className="sub">Shuffling choices…</p>
      )}
      <p className="kbd">Keys: A–D or 1–4 to answer · Enter for next</p>
      {answered ? (
        <div id="feedback">
          <p className={run.results[run.index] === 1 ? "verdict ok" : "verdict bad"}>
            {run.results[run.index] === 1 ? "Correct" : `Not quite — the answer is ${letter(correctDisplay)}`}
          </p>
          <div className="why"><p>{question.explanation}</p></div>
          <div className="lp"><h3>Learning point</h3><p>{question.learningPoint}</p></div>
          <p className="ref">Book reference: {question.reference}</p>
          <button className="next" type="button" onClick={onNext}>{last ? "See results" : "Next question"}</button>
        </div>
      ) : null}
    </>
  );
}

function Results({
  subject,
  finished,
  onRetry,
}: {
  subject: Subject;
  finished: Finished;
  onRetry: (ids: string[]) => void;
}) {
  const pct = finished.answered ? Math.round((finished.correct / finished.answered) * 100) : 0;
  const per = finished.answered ? finished.ms / finished.answered / 60000 : 0;
  const verdict = pct >= 70
    ? "Strong on this set. Keep it fresh with a short set every few days."
    : pct >= 50
      ? "Close. Read the learning points below, then retry the misses."
      : "Re-read the sections flagged below before the next attempt.";
  return (
    <>
      <h1>{finished.correct} of {finished.answered} correct</h1>
      <p className="sub">{finished.label} · {verdict}</p>
      <div className="gauge">
        <div className="read">
          <div className="big">{pct}%</div>
          <span>this session · aim for 70% or better in practice</span>
        </div>
        <div className="pace">
          <div><b>{formatDuration(finished.ms)}</b><span>total time</span></div>
          <div><b>{per.toFixed(1)} min</b><span>per question</span></div>
          <div><b>{EXAM_PACE_MIN} min</b><span>{per <= EXAM_PACE_MIN ? "within exam pace" : "slower than exam pace"}</span></div>
        </div>
      </div>
      <h2>By topic</h2>
      <div className="rows">
        {finished.topics.map((topic) => (
          <div className="row" key={topic.title}>
            <div>
              {topic.title}
              <div className="bar"><i style={{ width: `${(topic.correct / topic.total) * 100}%` }} /></div>
            </div>
            <span className="n">{topic.correct}/{topic.total}</span>
          </div>
        ))}
      </div>
      {finished.missed.length ? (
        <>
          <h2>Learning points to revisit</h2>
          {finished.missed.map((item) => (
            <div className="miss" key={item.prompt}>
              <p>{item.prompt}</p>
              {item.pick ? <p className="you">You chose: {item.pick}</p> : null}
              <p className="a">Answer: {item.answer}</p>
              <p>{item.learningPoint}</p>
              <p className="ref">{item.reference}</p>
            </div>
          ))}
        </>
      ) : null}
      <div className="stack" style={{ marginTop: 18 }}>
        {finished.missedIds.length ? (
          <button className="mode pri" type="button" onClick={() => onRetry(finished.missedIds)}>
            <span><b>Retry these {finished.missedIds.length}</b><small>Locks in the learning while it is fresh</small></span>
            <span className="arrow">→</span>
          </button>
        ) : null}
        <Link className={finished.missedIds.length ? "mode" : "mode pri"} href={`/subjects/${subject.id}`}>
          <span><b>Back to lessons</b><small>{subject.title}</small></span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </>
  );
}
