"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLesson, getSubject, questionCount, subjects } from "@/lib/content";
import {
  loadStore,
  mastery,
  queueStart,
  runMatchesLesson,
  saveStore,
  weakTopics,
  type Store,
} from "@/lib/progress";

export function HomeView() {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const loaded = loadStore();
    if (loaded.run) {
      const subject = getSubject(loaded.run.subjectId);
      const lesson = subject && getLesson(subject, loaded.run.lessonId);
      if (!subject || !lesson || !runMatchesLesson(loaded.run, subject.id, lesson)) {
        loaded.run = null;
        saveStore(loaded);
      }
    }
    setStore(loaded);
  }, []);

  const allIds = subjects.flatMap((subject) => subject.lessons.flatMap((lesson) => lesson.questions.map((question) => question.id)));
  const score = store ? mastery(allIds, store.attempts) : null;
  const weak = store ? weakTopics(store.attempts).slice(0, 3) : [];
  const run = store?.run ?? null;
  const runSubject = run ? getSubject(run.subjectId) : undefined;
  const runLesson = runSubject && run ? getLesson(runSubject, run.lessonId) : undefined;
  const ticks = allIds.map((id) => {
    const last = store?.attempts.findLast((attempt) => attempt.questionId === id);
    return last ? (last.correct ? "ok" : "bad") : "";
  });

  return (
    <>
      <h1>FRM Part I</h1>
      <p className="sub">Pick a subject and a lesson. Scores stay on this phone, including weak topics.</p>
      {score ? (
        <div className="gauge">
          <div className="read">
            <div className="big">{score.pct}%</div>
            <span>mastered · {score.mastered} of {score.total} questions right on your last try</span>
          </div>
          <div className="scale" aria-hidden="true">
            <div className="ticks">{ticks.map((kind, index) => <i key={index} className={kind} />)}</div>
            <div className="ptr" style={{ left: `${score.pct}%` }} />
          </div>
        </div>
      ) : null}
      {run && runLesson ? (
        <div className="stack" style={{ marginTop: 18 }}>
          <Link
            className="card pri"
            href={`/practice/${run.subjectId}/${run.lessonId}`}
            onClick={() => queueStart({ subjectId: run.subjectId, lessonId: run.lessonId, mode: "resume" })}
          >
            <span>
              <b>Continue {run.label}</b>
              <small>{runLesson.title}</small>
            </span>
            <span className="arrow">→</span>
          </Link>
        </div>
      ) : null}
      {weak.length ? (
        <>
          <h2>Weak areas</h2>
          <div className="stack">
            {weak.map((topic) => (
              <Link
                key={`${topic.subjectId}-${topic.lessonId}-${topic.topicId}`}
                className="card"
                href={`/practice/${topic.subjectId}/${topic.lessonId}`}
                onClick={() => queueStart({ subjectId: topic.subjectId, lessonId: topic.lessonId, mode: "topic", topicId: topic.topicId })}
              >
                <span>
                  <b>{topic.title}</b>
                  <small>{topic.correct}/{topic.attempts} correct · {topic.lessonTitle}</small>
                </span>
                <span className="arrow">→</span>
              </Link>
            ))}
          </div>
        </>
      ) : null}
      <h2>Subjects</h2>
      <div className="stack">
        {subjects.map((subject) => {
          const ids = subject.lessons.flatMap((lesson) => lesson.questions.map((question) => question.id));
          const subjectScore = store ? mastery(ids, store.attempts) : null;
          const count = questionCount(subject);
          return (
            <Link key={subject.id} className="card" href={`/subjects/${subject.id}`}>
              <span>
                <b>{subject.title}</b>
                <small>
                  {count ? `${count} questions` : "No questions yet"}
                  {subjectScore && count ? ` · ${subjectScore.pct}% mastered` : ""}
                </small>
              </span>
              <span className="weight">{subject.examWeight}</span>
            </Link>
          );
        })}
      </div>
      <p className="note">Add this page to your home screen for practice on the commute. After the first visit it keeps working with no signal. Questions are practice items, not GARP exam questions. Progress is saved in this browser only.</p>
    </>
  );
}
