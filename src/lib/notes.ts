import fs from "fs";
import path from "path";
import { notesForLesson, type NoteSection } from "./note-catalog";

export type LoadedNote = NoteSection & { markdown: string };

export function readNoteSection(subjectId: string, lessonId: string, sectionId: string): LoadedNote | null {
  const chapter = notesForLesson(subjectId, lessonId);
  const section = chapter?.sections.find((item) => item.id === sectionId);
  if (!chapter || !section) return null;
  return {
    ...section,
    markdown: fs.readFileSync(path.join(process.cwd(), chapter.dir, section.file), "utf8"),
  };
}
