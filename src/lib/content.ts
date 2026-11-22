import foundations from "../../content/subjects/foundations.json";
import markets from "../../content/subjects/markets.json";
import quantitative from "../../content/subjects/quantitative.json";
import valuation from "../../content/subjects/valuation.json";
import type { Lesson, Question, Subject, Topic } from "./types";

export const subjects = [foundations, quantitative, markets, valuation] as Subject[];

export function getSubject(id: string): Subject | undefined {
  return subjects.find((subject) => subject.id === id);
}

export function getLesson(subject: Subject, lessonId: string): Lesson | undefined {
  return subject.lessons.find((lesson) => lesson.id === lessonId);
}

export function topicTitle(lesson: Lesson, topicId: string): string {
  return lesson.topics.find((topic) => topic.id === topicId)?.title ?? topicId;
}

export function questionCount(subject: Subject): number {
  return subject.lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0);
}

export function lessonsWithQuestions(subject: Subject): Lesson[] {
  return subject.lessons.filter((lesson) => lesson.questions.length > 0);
}

export type LocatedQuestion = {
  subject: Subject;
  lesson: Lesson;
  question: Question;
  topic: Topic | undefined;
};

export function locateQuestions(): LocatedQuestion[] {
  return subjects.flatMap((subject) =>
    subject.lessons.flatMap((lesson) =>
      lesson.questions.map((question) => ({
        subject,
        lesson,
        question,
        topic: lesson.topics.find((topic) => topic.id === question.topic),
      })),
    ),
  );
}

export function findQuestion(lesson: Lesson, questionId: string): Question | undefined {
  return lesson.questions.find((question) => question.id === questionId);
}
