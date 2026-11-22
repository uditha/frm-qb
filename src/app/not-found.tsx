import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p className="sub">That subject or lesson is not in the practice set.</p>
      <Link className="card" href="/"><span><b>Back to subjects</b></span><span className="arrow">→</span></Link>
    </>
  );
}
