"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLesson, getSubject, subjects } from "@/lib/content";
import {
  clearStore,
  formatDuration,
  formatWhen,
  lessonStats,
  loadStore,
  mastery,
  queueStart,
  topicStats,
  weakTopics,
  type Store,
} from "@/lib/progress";

export function ProgressView() {
  const [store, setStore] = useState<Store | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => setStore(loadStore()), []);

  if (!store) {
    return (
      <>
        <h1>Progress</h1>
        <p className="sub">Loading scores saved on this device.</p>
      </>
    );
  }

  const allIds = subjects.flatMap((subject) => subject.lessons.flatMap((lesson) => lesson.questions.map((question) => question.id)));
  const score = mastery(allIds, store.attempts);
  const weak = weakTopics(store.attempts);
  const topics = topicStats(store.attempts);
  const lessons = lessonStats(store.attempts);
  const sessions = [...store.sessions].reverse();

  return (
    <>
      <h1>Progress</h1>
      <p className="sub">Weak areas are topics under 70% after at least two tries. Everything here is stored in this browser.</p>
      <div className="gauge">
        <div className="read">
          <div className="big">{score.pct}%</div>
          <span>mastered · {score.mastered} of {score.total} right on the last try</span>
        </div>
      </div>

      <h2>Weak topics</h2>
      {weak.length ? (
        <div className="stack">
          {weak.map((topic) => (
            <Link
              key={`${topic.lessonId}-${topic.topicId}`}
              className="card"
              href={`/practice/${topic.subjectId}/${topic.lessonId}`}
              onClick={() => queueStart({ subjectId: topic.subjectId, lessonId: topic.lessonId, mode: "topic", topicId: topic.topicId })}
            >
              <span>
                <b>{topic.title}</b>
                <small>{Math.round(topic.accuracy * 100)}% · {topic.correct}/{topic.attempts} · {topic.lessonTitle}</small>
              </span>
              <span className="arrow">→</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="sub">Answer a few questions and topics under 70% will show up here.</p>
      )}

      {lessons.length ? (
        <>
          <h2>By lesson</h2>
          <div className="rows">
            {lessons.map((lesson) => (
              <div className="row" key={`${lesson.subjectId}-${lesson.lessonId}`}>
                <div>
                  {lesson.lessonTitle}
                  <div className="bar"><i style={{ width: `${lesson.pct}%` }} /></div>
                </div>
                <span className="n">{lesson.mastered}/{lesson.total}</span>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {topics.length ? (
        <>
          <h2>Every topic you have tried</h2>
          <div className="rows">
            {topics.map((topic) => (
              <div className="row" key={`${topic.lessonId}-${topic.topicId}`}>
                <div>
                  {topic.title}
                  <div className="bar"><i style={{ width: `${Math.round(topic.accuracy * 100)}%` }} /></div>
                </div>
                <span className="n">{topic.correct}/{topic.attempts}</span>
              </div>
            ))}
          </div>
        </>
      ) : null}

      <h2>Recent sessions</h2>
      {sessions.length ? (
        <div className="rows">
          {sessions.map((session, index) => {
            const subject = getSubject(session.subjectId);
            const lesson = subject && getLesson(subject, session.lessonId);
            return (
              <div className="row" key={`${session.at}-${index}`}>
                <div>{formatWhen(session.at)} · {session.label}{lesson ? ` · ${lesson.title}` : ""}</div>
                <span className="n">{session.correct}/{session.answered} · {formatDuration(session.ms)}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="sub">No finished sessions yet.</p>
      )}

      <button
        className="reset"
        type="button"
        onClick={() => {
          if (!confirmReset) {
            setConfirmReset(true);
            return;
          }
          setStore(clearStore());
          setConfirmReset(false);
        }}
      >
        {confirmReset ? "Tap again to confirm reset" : "Reset my progress"}
      </button>
    </>
  );
}
