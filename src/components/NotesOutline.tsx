"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sectionHref, type NoteChapter, type NoteSection } from "@/lib/note-catalog";
import { doneCount, isSectionDone, loadNoteStore, studyPlace, type NoteStore } from "@/lib/note-progress";

export function NotesOutline({
  chapter,
  lessonTitle,
}: {
  chapter: NoteChapter;
  lessonTitle: string;
}) {
  const [store, setStore] = useState<NoteStore | null>(null);
  useEffect(() => setStore(loadNoteStore()), []);

  const place = store ? studyPlace(chapter, store) : chapter.sections[0];
  const done = store ? doneCount(store, chapter) : 0;
  const finished = done === chapter.sections.length;

  return (
    <>
      <p className="sub">
        <Link href={`/practice/${chapter.subjectId}/${chapter.lessonId}`}>{lessonTitle}</Link>
      </p>
      <h1>Short lessons</h1>
      <p className="sub">{done} of {chapter.sections.length} finished. Each part is one sitting.</p>
      <Link className="card pri" href={sectionHref(chapter.subjectId, chapter.lessonId, place.id)}>
        <span>
          <b>{finished ? "Review from the start" : done ? "Continue" : "Start"}</b>
          <small>{place.title}</small>
        </span>
        <span className="arrow">→</span>
      </Link>
      <div className="stack" style={{ marginTop: 14 }}>
        {chapter.sections.map((section, index) => (
          <SectionRow key={section.id} chapter={chapter} section={section} index={index} store={store} />
        ))}
      </div>
    </>
  );
}

function SectionRow({
  chapter,
  section,
  index,
  store,
}: {
  chapter: NoteChapter;
  section: NoteSection;
  index: number;
  store: NoteStore | null;
}) {
  const done = store ? isSectionDone(store, chapter.subjectId, chapter.lessonId, section.id) : false;
  const here = store?.current?.subjectId === chapter.subjectId
    && store.current.lessonId === chapter.lessonId
    && store.current.sectionId === section.id
    && !done;
  return (
    <Link className="card" href={sectionHref(chapter.subjectId, chapter.lessonId, section.id)}>
      <span>
        <b>{index + 1}. {section.title}</b>
        <small>{done ? "Done" : here ? "Up to here" : "Not started"}</small>
      </span>
      <span className="arrow">→</span>
    </Link>
  );
}
