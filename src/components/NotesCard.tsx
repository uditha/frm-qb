"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { notesForLesson, sectionHref } from "@/lib/note-catalog";
import { doneCount, loadNoteStore, studyPlace } from "@/lib/note-progress";

export function NotesCard({ subjectId, lessonId }: { subjectId: string; lessonId: string }) {
  const chapter = notesForLesson(subjectId, lessonId);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(0);
  const [title, setTitle] = useState(chapter?.sections[0]?.title ?? "");
  const [href, setHref] = useState(chapter ? sectionHref(subjectId, lessonId, chapter.sections[0].id) : "");

  useEffect(() => {
    if (!chapter) return;
    const store = loadNoteStore();
    const place = studyPlace(chapter, store);
    setDone(doneCount(store, chapter));
    setTitle(place.title);
    setHref(sectionHref(subjectId, lessonId, place.id));
    setReady(true);
  }, [chapter, lessonId, subjectId]);

  if (!chapter) return null;
  const finished = ready && done === chapter.sections.length;

  return (
    <Link className="card" href={ready ? href : `/learn/${subjectId}/${lessonId}/notes`} style={{ marginBottom: 14 }}>
      <span>
        <b>{finished ? "Review notes" : ready && done > 0 ? "Continue notes" : "Read the notes"}</b>
        <small>{ready ? `${title} · ${done} of ${chapter.sections.length} done` : `${chapter.sections.length} short lessons`}</small>
      </span>
      <span className="arrow">→</span>
    </Link>
  );
}
