import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NoteLessonNav } from "@/components/NoteLessonNav";
import { getLesson, getSubject } from "@/lib/content";
import { noteChapters, notesForLesson, notesOutlineHref } from "@/lib/note-catalog";
import { readNoteSection } from "@/lib/notes";

export function generateStaticParams() {
  return noteChapters.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      subject: chapter.subjectId,
      lesson: chapter.lessonId,
      section: section.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; lesson: string; section: string }>;
}): Promise<Metadata> {
  const { subject: subjectId, lesson: lessonId, section: sectionId } = await params;
  const section = notesForLesson(subjectId, lessonId)?.sections.find((item) => item.id === sectionId);
  return { title: section?.title ?? "Notes" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ subject: string; lesson: string; section: string }>;
}) {
  const { subject: subjectId, lesson: lessonId, section: sectionId } = await params;
  const subject = getSubject(subjectId);
  const lesson = subject && getLesson(subject, lessonId);
  const chapter = notesForLesson(subjectId, lessonId);
  const note = readNoteSection(subjectId, lessonId, sectionId);
  if (!subject || !lesson || !chapter || !note) notFound();
  const index = chapter.sections.findIndex((section) => section.id === note.id);

  return (
    <>
      <p className="sub">
        <Link href={notesOutlineHref(subject.id, lesson.id)}>Short lessons</Link>
        {" · "}
        {index + 1} of {chapter.sections.length}
      </p>
      <h1>{note.title}</h1>
      <article className="notes">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({ children }) => (
              <div className="table-scroll">
                <table>{children}</table>
              </div>
            ),
          }}
        >
          {note.markdown}
        </ReactMarkdown>
      </article>
      <NoteLessonNav
        subjectId={subject.id}
        lessonId={lesson.id}
        sectionId={note.id}
        topicIds={note.topics}
      />
    </>
  );
}
