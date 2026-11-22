import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeView } from "@/components/PracticeView";
import { getLesson, getSubject, subjects } from "@/lib/content";

export function generateStaticParams() {
  return subjects.flatMap((subject) => subject.lessons.map((lesson) => ({ subject: subject.id, lesson: lesson.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ subject: string; lesson: string }> }): Promise<Metadata> {
  const { subject: subjectId, lesson: lessonId } = await params;
  const subject = getSubject(subjectId);
  const lesson = subject && getLesson(subject, lessonId);
  return { title: lesson?.title ?? "Practice" };
}

export default async function Page({ params }: { params: Promise<{ subject: string; lesson: string }> }) {
  const { subject: subjectId, lesson: lessonId } = await params;
  const subject = getSubject(subjectId);
  const lesson = subject && getLesson(subject, lessonId);
  if (!subject || !lesson) notFound();
  return <PracticeView subjectId={subject.id} lessonId={lesson.id} />;
}
