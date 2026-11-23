import { notesForLesson, type NoteChapter, type NoteSection } from "./note-catalog";

const KEY = "frm-notes-v1";

export type NoteCursor = {
  subjectId: string;
  lessonId: string;
  sectionId: string;
};

export type NoteStore = {
  current: NoteCursor | null;
  done: Record<string, string>;
};

function emptyStore(): NoteStore {
  return { current: null, done: {} };
}

export function noteKey(subjectId: string, lessonId: string, sectionId: string) {
  return `${subjectId}/${lessonId}/${sectionId}`;
}

export function loadNoteStore(): NoteStore {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<NoteStore>;
    return {
      current: parsed.current ?? null,
      done: parsed.done && typeof parsed.done === "object" ? parsed.done : {},
    };
  } catch {
    return emptyStore();
  }
}

function save(store: NoteStore) {
  localStorage.setItem(KEY, JSON.stringify(store));
  return store;
}

export function isSectionDone(store: NoteStore, subjectId: string, lessonId: string, sectionId: string) {
  return Boolean(store.done[noteKey(subjectId, lessonId, sectionId)]);
}

export function touchSection(subjectId: string, lessonId: string, sectionId: string) {
  const store = loadNoteStore();
  store.current = { subjectId, lessonId, sectionId };
  return save(store);
}

export function markSectionDone(subjectId: string, lessonId: string, sectionId: string) {
  const store = loadNoteStore();
  store.done[noteKey(subjectId, lessonId, sectionId)] = new Date().toISOString();
  const chapter = notesForLesson(subjectId, lessonId);
  const index = chapter?.sections.findIndex((section) => section.id === sectionId) ?? -1;
  const next = chapter && index >= 0 ? chapter.sections[index + 1] : undefined;
  store.current = next ? { subjectId, lessonId, sectionId: next.id } : { subjectId, lessonId, sectionId };
  save(store);
  return next ?? null;
}

export function doneCount(store: NoteStore, chapter: NoteChapter) {
  return chapter.sections.filter((section) => isSectionDone(store, chapter.subjectId, chapter.lessonId, section.id)).length;
}

export function studyPlace(chapter: NoteChapter, store: NoteStore): NoteSection {
  const current = chapter.sections.find((section) =>
    store.current?.subjectId === chapter.subjectId
    && store.current.lessonId === chapter.lessonId
    && store.current.sectionId === section.id
    && !isSectionDone(store, chapter.subjectId, chapter.lessonId, section.id),
  );
  if (current) return current;
  return chapter.sections.find((section) => !isSectionDone(store, chapter.subjectId, chapter.lessonId, section.id)) ?? chapter.sections[0];
}
