import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotesOutline } from "@/components/NotesOutline";
import { getLesson, getSubject } from "@/lib/content";
import { notesForLesson } from "@/lib/note-catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; lesson: string }>;
}): Promise<Metadata> {
  const { subject: subjectId, lesson: lessonId } = await params;
  const subject = getSubject(subjectId);
  const lesson = subject && getLesson(subject, lessonId);
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
  const chapter = notesForLesson(subjectId, lessonId);
  if (!subject || !lesson || !chapter) notFound();
  return <NotesOutline chapter={chapter} lessonTitle={lesson.title} />;
}
