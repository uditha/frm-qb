"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getLesson, getSubject, topicTitle } from "@/lib/content";
import { notesForLesson, notesOutlineHref, sectionHref } from "@/lib/note-catalog";
import { markSectionDone, touchSection } from "@/lib/note-progress";
import { queueStart } from "@/lib/progress";

export function NoteLessonNav({
  subjectId,
  lessonId,
  sectionId,
  topicIds,
}: {
  subjectId: string;
  lessonId: string;
  sectionId: string;
  topicIds: string[];
}) {
  const router = useRouter();
  const chapter = notesForLesson(subjectId, lessonId);
  const subject = getSubject(subjectId);
  const lesson = subject ? getLesson(subject, lessonId) : undefined;
  const index = chapter?.sections.findIndex((section) => section.id === sectionId) ?? -1;
  const next = chapter && index >= 0 ? chapter.sections[index + 1] : undefined;
  const previous = chapter && index > 0 ? chapter.sections[index - 1] : undefined;

  useEffect(() => {
    touchSection(subjectId, lessonId, sectionId);
  }, [subjectId, lessonId, sectionId]);

  if (!chapter || index < 0) return null;

  return (
    <div className="stack" style={{ marginTop: 18 }}>
      <button
        className="mode pri"
        type="button"
        onClick={() => {
          const following = markSectionDone(subjectId, lessonId, sectionId);
          router.push(following ? sectionHref(subjectId, lessonId, following.id) : notesOutlineHref(subjectId, lessonId));
        }}
      >
        <span>
          <b>{next ? "Done, next lesson" : "Done, back to the list"}</b>
          <small>{next ? next.title : `${chapter.sections.length} of ${chapter.sections.length}`}</small>
        </span>
        <span className="arrow">→</span>
      </button>
      {topicIds.map((topicId) => (
        <Link
          key={topicId}
          className="mode"
          href={`/practice/${subjectId}/${lessonId}`}
          onClick={() => queueStart({ subjectId, lessonId, mode: "topic", topicId })}
        >
          <span>
            <b>Practice {lesson ? topicTitle(lesson, topicId) : topicId}</b>
            <small>Questions for this part</small>
          </span>
          <span className="arrow">→</span>
        </Link>
      ))}
      {previous ? (
        <Link className="mode" href={sectionHref(subjectId, lessonId, previous.id)}>
          <span><b>Previous</b><small>{previous.title}</small></span>
          <span className="arrow">→</span>
        </Link>
      ) : null}
      <Link className="mode" href={notesOutlineHref(subjectId, lessonId)}>
        <span><b>All short lessons</b><small>See where you are</small></span>
        <span className="arrow">→</span>
      </Link>
    </div>
  );
}
