import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { LoadedNote } from "@/lib/notes";

export function NotesArticle({
  subjectId,
  lessonId,
  subjectTitle,
  lessonTitle,
  sections,
}: {
  subjectId: string;
  lessonId: string;
  subjectTitle: string;
  lessonTitle: string;
  sections: LoadedNote[];
}) {
  return (
    <>
      <p className="sub">
        <Link href={`/practice/${subjectId}/${lessonId}`}>{lessonTitle}</Link>
      </p>
      <h1>Chapter notes</h1>
      <p className="sub">{subjectTitle}. Read a section, then test yourself on that topic. Worked examples are at the end.</p>
      <nav className="chips toc" aria-label="Note sections">
        {sections.map((section) => (
          <a key={section.id} className="chip" href={`#${section.id}`}>{section.title}</a>
        ))}
      </nav>
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="notes">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => (
                <div className="table-scroll">
                  <table>{children}</table>
                </div>
              ),
            }}
          >
            {section.markdown}
          </ReactMarkdown>
        </section>
      ))}
      <div className="stack" style={{ marginTop: 18 }}>
        <Link className="mode pri" href={`/practice/${subjectId}/${lessonId}`}>
          <span>
            <b>Practice this lesson</b>
            <small>{lessonTitle}</small>
          </span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </>
  );
}
