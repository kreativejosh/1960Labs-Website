import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="cta gut" aria-labelledby="nf-h">
      <div className="inner">
        <span className="eyebrow">404</span>
        <h1 className="d-1" id="nf-h">This page isn&apos;t here.</h1>
        <p>The link may be old, or the page may have moved.</p>
        <Link className="btn btn-primary" href="/"><span>Back to home</span><Icon name="arrow-right" /></Link>
      </div>
    </section>
  );
}
