"use client";

import Link from "next/link";
import { useEffect } from "react";
import { getLesson, getSubject, topicTitle } from "@/lib/content";
import { notesHref } from "@/lib/note-catalog";
import { queueStart } from "@/lib/progress";

export function learnHref(subjectId: string, lessonId: string, topicId: string, questionId?: string) {
  const path = `/learn/${subjectId}/${lessonId}/${topicId}`;
  return questionId ? `${path}#${questionId}` : path;
}

export function LearnView({
  subjectId,
  lessonId,
  topicId,
}: {
  subjectId: string;
  lessonId: string;
  topicId: string;
}) {
  const subject = getSubject(subjectId);
  const lesson = subject ? getLesson(subject, lessonId) : undefined;
  const notes = lesson?.questions.filter((question) => question.topic === topicId) ?? [];

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    const note = document.getElementById(id);
    if (note instanceof HTMLDetailsElement) note.open = true;
    note?.scrollIntoView({ block: "start" });
  }, []);

  if (!subject || !lesson || !notes.length) return null;

  return (
    <>
      <p className="sub">
        <Link href={`/practice/${subject.id}/${lesson.id}`}>{lesson.title}</Link>
      </p>
      <h1>{topicTitle(lesson, topicId)}</h1>
      <p className="sub">
        {notes.length} points in {subject.title}. Open one when you want the full explanation. Each note includes the correct answer, so use this to study, then go back and test yourself.
      </p>
      {notesHref(subject.id, lesson.id, topicId) ? (
        <p><Link className="more" href={notesHref(subject.id, lesson.id, topicId)!}>Read the full chapter notes</Link></p>
      ) : null}
      {notes.map((question, index) => (
        <details key={question.id} id={question.id} className="study">
          <summary>
            <span className="study-n">{index + 1}</span>
            {question.learningPoint}
          </summary>
          <div className="in">
            <p className="q">{question.prompt}</p>
            <p className="a">Answer: {question.choices[question.answer]}</p>
            <div className="why"><p>{question.explanation}</p></div>
            <p className="ref">Book reference: {question.reference}</p>
          </div>
        </details>
      ))}
      <div className="stack" style={{ marginTop: 18 }}>
        <Link
          className="mode pri"
          href={`/practice/${subject.id}/${lesson.id}`}
          onClick={() => queueStart({ subjectId: subject.id, lessonId: lesson.id, mode: "topic", topicId })}
        >
          <span>
            <b>Practice this topic</b>
            <small>{notes.length} questions</small>
          </span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </>
  );
}
