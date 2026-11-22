"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSubject } from "@/lib/content";
import { loadStore, mastery, missedIds, type Store } from "@/lib/progress";

export function SubjectView({ subjectId }: { subjectId: string }) {
  const subject = getSubject(subjectId);
  const [store, setStore] = useState<Store | null>(null);
  useEffect(() => setStore(loadStore()), []);
  if (!subject) return null;

  const ready = subject.lessons.filter((lesson) => lesson.questions.length > 0);
  const waiting = subject.lessons.filter((lesson) => lesson.questions.length === 0);

  return (
    <>
      <h1>{subject.title}</h1>
      <p className="sub">{subject.blurb} Exam weight {subject.examWeight}.</p>
      {ready.length ? (
        <div className="stack">
          {ready.map((lesson) => {
            const ids = lesson.questions.map((question) => question.id);
            const score = store ? mastery(ids, store.attempts) : null;
            const missed = store ? missedIds(ids, store.attempts).length : 0;
            return (
              <Link key={lesson.id} className="card" href={`/practice/${subject.id}/${lesson.id}`}>
                <span>
                  <b>{lesson.title}</b>
                  <small>
                    {ids.length} questions
                    {score ? ` · ${score.mastered} mastered` : ""}
                    {missed ? ` · ${missed} to review` : ""}
                  </small>
                </span>
                <span className="arrow">→</span>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="sub">No questions in this subject yet. Add a lesson to content/subjects/{subject.id}.json.</p>
      )}
      {waiting.length ? (
        <details>
          <summary>Lessons waiting for questions ({waiting.length})</summary>
          <div className="in">
            <ul>
              {waiting.map((lesson) => <li key={lesson.id}>{lesson.title}</li>)}
            </ul>
          </div>
        </details>
      ) : null}
    </>
  );
}
