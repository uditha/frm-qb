export type Question = {
  id: string;
  topic: string;
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
  learningPoint: string;
  reference: string;
};

export type Topic = {
  id: string;
  title: string;
};

export type Revision = {
  title: string;
  items: string[];
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  topics: Topic[];
  revision: Revision[];
  questions: Question[];
};

export type Subject = {
  id: string;
  title: string;
  examWeight: string;
  blurb: string;
  lessons: Lesson[];
};
