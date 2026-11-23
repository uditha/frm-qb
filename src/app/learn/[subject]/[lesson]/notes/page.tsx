import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotesArticle } from "@/components/NotesArticle";
import { getLesson, getSubject } from "@/lib/content";
import { readLessonNotes } from "@/lib/notes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; lesson: string }>;
}): Promise<Metadata> {
  const { subject: subjectId, lesson: lessonId } = await params;
  const lesson = getSubject(subjectId) && getLesson(getSubject(subjectId)!, lessonId);
  return { title: lesson ? `${lesson.title} notes` : "Notes" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ subject: string; lesson: string }>;
}) {
  const { subject: subjectId, lesson: lessonId } = await params;
  const subject = getSubject(subjectId);
  const lesson = subject && getLesson(subject, lessonId);
  const sections = readLessonNotes(subjectId, lessonId);
  if (!subject || !lesson || !sections) notFound();
  return (
    <NotesArticle
      subjectId={subject.id}
      lessonId={lesson.id}
      subjectTitle={subject.title}
      lessonTitle={lesson.title}
      sections={sections}
    />
  );
}
