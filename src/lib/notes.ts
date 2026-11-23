import fs from "fs";
import path from "path";
import { notesForLesson, type NoteSection } from "./note-catalog";

export type LoadedNote = NoteSection & { markdown: string };

export function readLessonNotes(subjectId: string, lessonId: string): LoadedNote[] | null {
  const chapter = notesForLesson(subjectId, lessonId);
  if (!chapter) return null;
  const dir = path.join(process.cwd(), chapter.dir);
  return chapter.sections.map((section) => ({
    ...section,
    markdown: fs.readFileSync(path.join(dir, section.file), "utf8"),
  }));
}
