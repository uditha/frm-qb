import type { Lesson, Subject } from "./types";
import { locateQuestions, topicTitle } from "./content";

export const STORAGE_KEY = "frm-practice-v1";
const START_KEY = "frm-practice-start";
export const EXAM_PACE_MIN = 2.4;

export type Attempt = {
  questionId: string;
  subjectId: string;
  lessonId: string;
  topicId: string;
  correct: boolean;
  choice: string;
  ms: number;
  at: string;
};

export type SessionRecord = {
  at: string;
  subjectId: string;
  lessonId: string;
  label: string;
  correct: number;
  answered: number;
  ms: number;
};

export type Run = {
  subjectId: string;
  lessonId: string;
  label: string;
  questionIds: string[];
  index: number;
  results: Array<0 | 1 | null>;
  picks: Array<string | null>;
  order: number[] | null;
  startedAt: number;
  elapsedMs: number;
  autoStart?: boolean;
};

export type Store = {
  attempts: Attempt[];
  sessions: SessionRecord[];
  run: Run | null;
};

export type PracticeMode = "quick" | "miss" | "full" | "topic";

export type StartRequest = {
  subjectId: string;
  lessonId: string;
  mode: PracticeMode | "resume";
  topicId?: string;
};

export function emptyStore(): Store {
  return { attempts: [], sessions: [], run: null };
}

export function loadStore(): Store {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      run: parsed.run ?? null,
    };
  } catch {
    return emptyStore();
  }
}

export function saveStore(store: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function clearStore(): Store {
  const store = emptyStore();
  saveStore(store);
  return store;
}

export function queueStart(request: StartRequest) {
  sessionStorage.setItem(START_KEY, JSON.stringify(request));
}

export function consumeStart(subjectId: string, lessonId: string): StartRequest | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(START_KEY);
  if (!raw) return null;
  sessionStorage.removeItem(START_KEY);
  try {
    const request = JSON.parse(raw) as StartRequest;
    if (request.subjectId !== subjectId || request.lessonId !== lessonId) return null;
    return request;
  } catch {
    return null;
  }
}

export function shuffle<T>(items: readonly T[]): T[] {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function lastAttemptByQuestion(attempts: Attempt[]): Map<string, Attempt> {
  const last = new Map<string, Attempt>();
  for (const attempt of attempts) last.set(attempt.questionId, attempt);
  return last;
}

export function mastery(questionIds: string[], attempts: Attempt[]) {
  const last = lastAttemptByQuestion(attempts);
  let mastered = 0;
  for (const id of questionIds) {
    if (last.get(id)?.correct) mastered += 1;
  }
  const total = questionIds.length;
  return {
    mastered,
    total,
    pct: total ? Math.round((mastered / total) * 100) : 0,
  };
}

export function missedIds(questionIds: string[], attempts: Attempt[]): string[] {
  const last = lastAttemptByQuestion(attempts);
  return questionIds.filter((id) => last.get(id)?.correct === false);
}

export function unseenIds(questionIds: string[], attempts: Attempt[]): string[] {
  const last = lastAttemptByQuestion(attempts);
  return questionIds.filter((id) => !last.has(id));
}

export function formatDuration(ms: number): string {
  const seconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export type TopicStat = {
  subjectId: string;
  lessonId: string;
  subjectTitle: string;
  lessonTitle: string;
  topicId: string;
  title: string;
  correct: number;
  attempts: number;
  accuracy: number;
};

export function topicStats(attempts: Attempt[]): TopicStat[] {
  const located = locateQuestions();
  const byQuestion = new Map(located.map((item) => [item.question.id, item]));
  const buckets = new Map<string, TopicStat>();

  for (const attempt of attempts) {
    const item = byQuestion.get(attempt.questionId);
    if (!item) continue;
    const key = `${item.subject.id}/${item.lesson.id}/${item.question.topic}`;
    const current = buckets.get(key) ?? {
      subjectId: item.subject.id,
      lessonId: item.lesson.id,
      subjectTitle: item.subject.title,
      lessonTitle: item.lesson.title,
      topicId: item.question.topic,
      title: item.topic?.title ?? topicTitle(item.lesson, item.question.topic),
      correct: 0,
      attempts: 0,
      accuracy: 0,
    };
    current.attempts += 1;
    if (attempt.correct) current.correct += 1;
    current.accuracy = current.correct / current.attempts;
    buckets.set(key, current);
  }

  return [...buckets.values()].sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts);
}

export function weakTopics(attempts: Attempt[]): TopicStat[] {
  return topicStats(attempts).filter((topic) => topic.attempts >= 2 && topic.accuracy < 0.7);
}

export type LessonStat = {
  subjectId: string;
  lessonId: string;
  subjectTitle: string;
  lessonTitle: string;
  mastered: number;
  total: number;
  pct: number;
  missed: number;
};

export function lessonStats(attempts: Attempt[]): LessonStat[] {
  return locateQuestions()
    .reduce<LessonStat[]>((rows, item) => {
      const existing = rows.find((row) => row.subjectId === item.subject.id && row.lessonId === item.lesson.id);
      if (existing) return rows;
      const ids = item.lesson.questions.map((question) => question.id);
      const score = mastery(ids, attempts);
      const missed = missedIds(ids, attempts).length;
      if (score.mastered === 0 && missed === 0 && !attempts.some((attempt) => ids.includes(attempt.questionId))) {
        return rows;
      }
      rows.push({
        subjectId: item.subject.id,
        lessonId: item.lesson.id,
        subjectTitle: item.subject.title,
        lessonTitle: item.lesson.title,
        mastered: score.mastered,
        total: score.total,
        pct: score.pct,
        missed,
      });
      return rows;
    }, [])
    .sort((a, b) => a.pct - b.pct);
}

export function runMatchesLesson(run: Run | null, subjectId: string, lesson: Lesson): run is Run {
  if (!run || run.subjectId !== subjectId || run.lessonId !== lesson.id) return false;
  const ids = new Set(lesson.questions.map((question) => question.id));
  return run.questionIds.length > 0 && run.questionIds.every((id) => ids.has(id));
}

export function makeRun(
  subject: Subject,
  lesson: Lesson,
  mode: PracticeMode,
  attempts: Attempt[],
  topicId?: string,
): Run | null {
  const ids = lesson.questions.map((question) => question.id);
  let questionIds: string[] = [];
  let label = "Full mock";

  if (mode === "quick") {
    const priority = shuffle([...missedIds(ids, attempts), ...unseenIds(ids, attempts)]);
    const rest = shuffle(ids.filter((id) => !priority.includes(id)));
    questionIds = shuffle([...priority, ...rest].slice(0, Math.min(10, ids.length)));
    label = ids.length < 10 ? `Quick ${ids.length}` : "Quick 10";
  } else if (mode === "miss") {
    questionIds = shuffle(missedIds(ids, attempts));
    label = "Review missed";
  } else if (mode === "topic") {
    questionIds = shuffle(lesson.questions.filter((question) => question.topic === topicId).map((question) => question.id));
    label = topicTitle(lesson, topicId ?? "");
  } else {
    questionIds = shuffle(ids);
    label = "Full mock";
  }

  if (!questionIds.length) return null;
  const first = lesson.questions.find((question) => question.id === questionIds[0]);
  return {
    subjectId: subject.id,
    lessonId: lesson.id,
    label,
    questionIds,
    index: 0,
    results: questionIds.map(() => null),
    picks: questionIds.map(() => null),
    order: first ? shuffle(first.choices.map((_, index) => index)) : null,
    startedAt: Date.now(),
    elapsedMs: 0,
  };
}

export function makeRetryRun(subjectId: string, lessonId: string, questionIds: string[]): Run | null {
  const ids = shuffle(questionIds);
  if (!ids.length) return null;
  return {
    subjectId,
    lessonId,
    label: "Retry missed",
    questionIds: ids,
    index: 0,
    results: ids.map(() => null),
    picks: ids.map(() => null),
    order: null,
    startedAt: Date.now(),
    elapsedMs: 0,
  };
}

export function resumeRun(run: Run): Run {
  let index = run.index;
  while (index < run.questionIds.length - 1 && (run.results[index] === 0 || run.results[index] === 1)) {
    index += 1;
  }
  const advanced = index !== run.index;
  return {
    ...run,
    index,
    order: advanced ? null : run.order,
    elapsedMs: run.elapsedMs + Math.max(0, Date.now() - run.startedAt),
    startedAt: Date.now(),
  };
}

export function elapsedMs(run: Run): number {
  return run.elapsedMs + Math.max(0, Date.now() - run.startedAt);
}

export function answeredCount(run: Run): number {
  return run.results.filter((result) => result === 0 || result === 1).length;
}

export function correctCount(run: Run): number {
  return run.results.filter((result) => result === 1).length;
}
