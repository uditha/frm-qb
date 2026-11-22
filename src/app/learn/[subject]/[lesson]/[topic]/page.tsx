import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnView } from "@/components/LearnView";
import { getLesson, getSubject, subjects, topicTitle } from "@/lib/content";

export function generateStaticParams() {
  return subjects.flatMap((subject) =>
    subject.lessons.flatMap((lesson) => {
      const topicIds = [...new Set(lesson.questions.map((question) => question.topic))];
      return topicIds.map((topic) => ({ subject: subject.id, lesson: lesson.id, topic }));
    }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; lesson: string; topic: string }>;
}): Promise<Metadata> {
  const { subject: subjectId, lesson: lessonId, topic: topicId } = await params;
  const subject = getSubject(subjectId);
  const lesson = subject && getLesson(subject, lessonId);
  return { title: lesson ? topicTitle(lesson, topicId) : "Learn" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ subject: string; lesson: string; topic: string }>;
}) {
  const { subject: subjectId, lesson: lessonId, topic: topicId } = await params;
  const subject = getSubject(subjectId);
  const lesson = subject && getLesson(subject, lessonId);
  const hasNotes = lesson?.questions.some((question) => question.topic === topicId);
  if (!subject || !lesson || !hasNotes) notFound();
  return <LearnView subjectId={subject.id} lessonId={lesson.id} topicId={topicId} />;
}
