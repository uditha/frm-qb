import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectView } from "@/components/SubjectView";
import { getSubject, subjects } from "@/lib/content";

export function generateStaticParams() {
  return subjects.map((subject) => ({ subject: subject.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }): Promise<Metadata> {
  const { subject } = await params;
  return { title: getSubject(subject)?.title ?? "Subject" };
}

export default async function Page({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  if (!getSubject(subject)) notFound();
  return <SubjectView subjectId={subject} />;
}
