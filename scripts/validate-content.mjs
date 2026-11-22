import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content", "subjects");
const files = fs.readdirSync(dir).filter((name) => name.endsWith(".json"));
const errors = [];
const questionIds = new Set();

for (const file of files) {
  const subject = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  const where = file;
  if (!subject.id || !subject.title || !Array.isArray(subject.lessons)) {
    errors.push(`${where}: subject needs id, title, and lessons`);
    continue;
  }
  const lessonIds = new Set();
  for (const lesson of subject.lessons) {
    if (!lesson.id || !lesson.title || !Array.isArray(lesson.questions)) {
      errors.push(`${where}: lesson ${lesson.id ?? "?"} needs id, title, and questions`);
      continue;
    }
    if (lessonIds.has(lesson.id)) errors.push(`${where}: duplicate lesson id ${lesson.id}`);
    lessonIds.add(lesson.id);
    const topicIds = new Set((lesson.topics ?? []).map((topic) => topic.id));
    for (const question of lesson.questions) {
      const label = `${where} ${lesson.id} ${question.id ?? "?"}`;
      if (!question.id || !question.prompt || !question.explanation || !question.learningPoint) {
        errors.push(`${label}: missing id, prompt, explanation, or learningPoint`);
      }
      if (!Array.isArray(question.choices) || question.choices.length < 2) {
        errors.push(`${label}: choices must be an array of at least 2 strings`);
      }
      if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= (question.choices?.length ?? 0)) {
        errors.push(`${label}: answer must be the index of the correct choice`);
      }
      if (topicIds.size && !topicIds.has(question.topic)) {
        errors.push(`${label}: topic "${question.topic}" is not listed on the lesson`);
      }
      if (question.id) {
        if (questionIds.has(question.id)) errors.push(`${label}: duplicate question id`);
        questionIds.add(question.id);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${files.length} subjects, ${questionIds.size} questions.`);
