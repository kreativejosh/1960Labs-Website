import { JsonLd } from "@/components/JsonLd";
import { breadcrumb, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = {
  ...pageMeta({ title: "Legal", description: "Privacy Policy, Terms of Use and how 1960 Labs handles your data.", path: "/legal" }),
  // Placeholder text until the policies are supplied; keep it out of search results until then.
  robots: { index: false, follow: true },
};

export default function Legal() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumb([["Legal", "/legal"]]) }} />
      <section className="page-hero gut" aria-labelledby="ph">
        <div className="inner">
          <span className="eyebrow">Legal</span>
          <h1 className="d-1" id="ph">Privacy, terms and your data.</h1>
        </div>
      </section>
      <div className="gut">
        <div className="inner legal">
          <nav aria-label="Legal sections"><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Use</a><a href="#data">How we handle your data</a></nav>
          <div>
            <article id="privacy"><h2 className="d-3">Privacy Policy</h2><p className="todo">[Policy text to be supplied by 1960 Labs before launch.]</p><p className="muted">Questions about privacy: {SITE.email}</p></article>
            <article id="terms"><h2 className="d-3">Terms of Use</h2><p className="todo">[Terms to be supplied by 1960 Labs before launch.]</p></article>
            <article id="data"><h2 className="d-3">How we handle your data</h2><p className="todo">[Data handling statement to be supplied by 1960 Labs before launch: where client data is stored, who can access it and how long it is kept.]</p></article>
          </div>
        </div>
      </div>
    </>
  );
}
