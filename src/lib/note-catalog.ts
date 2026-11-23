export type NoteSection = {
  id: string;
  file: string;
  title: string;
  topics: string[];
};

export type NoteChapter = {
  subjectId: string;
  lessonId: string;
  dir: string;
  sections: NoteSection[];
};

export const noteChapters: NoteChapter[] = [
  {
    subjectId: "markets",
    lessonId: "intro-derivatives",
    dir: "data/financialMarketandProducts/chapter4/4",
    sections: [
      { id: "overview", file: "00-Index.md", title: "Overview", topics: [] },
      { id: "what", file: "01-What-Are-Derivatives.md", title: "What a derivative is", topics: ["deriv", "lin"] },
      { id: "markets", file: "02-The-Markets.md", title: "Markets", topics: ["mkt", "size"] },
      { id: "forwards", file: "03-Forwards-and-Futures.md", title: "Forwards and futures", topics: ["fwd", "fut"] },
      { id: "options", file: "04-Options.md", title: "Options", topics: ["opt", "pay"] },
      { id: "participants", file: "05-Market-Participants.md", title: "Hedgers, speculators, arbitrage", topics: ["hedge", "spec", "arb"] },
      { id: "risks", file: "06-Derivatives-Risks.md", title: "Risks", topics: ["risk"] },
      { id: "formulas", file: "07-Formula-Cheat-Sheet.md", title: "Formulas", topics: [] },
      { id: "worked", file: "08-Practice-Questions.md", title: "Worked examples", topics: [] },
    ],
  },
];

export function notesForLesson(subjectId: string, lessonId: string) {
  return noteChapters.find((chapter) => chapter.subjectId === subjectId && chapter.lessonId === lessonId);
}

export function notesHref(subjectId: string, lessonId: string, topicId?: string) {
  const chapter = notesForLesson(subjectId, lessonId);
  if (!chapter) return null;
  const section = topicId ? chapter.sections.find((item) => item.topics.includes(topicId)) : undefined;
  const path = `/learn/${subjectId}/${lessonId}/notes`;
  return section ? `${path}#${section.id}` : path;
}
