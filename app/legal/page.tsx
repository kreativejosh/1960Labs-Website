import { JsonLd } from "@/components/JsonLd";
import { breadcrumb, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Legal",
  description: "How 1960 Labs protects your ideas, data and AI work, and the personal data this website collects.",
  path: "/legal",
});

const EFFECTIVE = "1 August 2026";

export default function Legal() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumb([["Legal", "/legal"]]) }} />
      <section className="page-hero gut" aria-labelledby="ph">
        <div className="inner">
          <span className="eyebrow">Legal</span>
          <h1 className="d-1" id="ph">Your work, protected.</h1>
          <p className="lead">How we protect what you share with us, and what this website collects.</p>
        </div>
      </section>
      <div className="gut">
        <div className="inner legal">
          <nav aria-label="Legal sections"><a href="#protect">How we protect your work</a><a href="#privacy">Privacy Policy</a></nav>
          <div>
            <article id="protect">
              <h2 className="d-3">How we protect your work</h2>
              <p className="eff">Effective date: {EFFECTIVE}</p>
              <p>To solve a hard problem, we need to see how your business really works: your processes, your data and sometimes ideas you haven&rsquo;t shared with anyone else. This page explains how we protect all of it. These commitments apply from our first conversation, before any contract is signed, and they stay in force after our work together ends.</p>

              <h3 className="kicker">Your ideas and know-how stay yours</h3>
              <ul>
                <li>Everything you share with us is confidential. That includes business plans, product ideas, processes, pricing, customer lists, source code and data.</li>
                <li>We use it only for the work you hired us to do. We never use it for another client, for a product of our own or for anyone else.</li>
                <li>Everyone at 1960 Labs who works on your project, and any contractor we bring in, has signed a written confidentiality agreement.</li>
                <li>We&rsquo;ll sign your NDA, or offer ours, before the first diagnostic call.</li>
                <li>Your contract sets out plainly who owns what we build for you.</li>
              </ul>

              <h3 className="kicker">Your data while we work</h3>
              <ul>
                <li>We treat all client data as proprietary. It belongs to you.</li>
                <li>We keep each client&rsquo;s data separate. We never combine it with another client&rsquo;s data or use it on another client&rsquo;s project.</li>
                <li>Only the people working on your project can access your data, and only for as long as they need it.</li>
                <li>If your rules or regulators require it, your data stays in your own environment and we work inside it.</li>
                <li>We use only the data the work needs. Wherever we can, we use anonymised or test data.</li>
                <li>When the engagement ends, we return or delete your data, whichever you choose, and confirm it in writing within 30 days.</li>
              </ul>

              <h3 className="kicker">Your data and AI</h3>
              <p>When AI is involved, the fair question is where your data goes. Here is our answer.</p>
              <ul>
                <li><b>We never train on your data.</b> We don&rsquo;t use your data, prompts or outputs to train or improve any AI model for anyone else, whether it&rsquo;s ours or a provider&rsquo;s. A model we train or fine-tune for you is used only for you.</li>
                <li><b>Our AI providers have to agree to the same.</b> We use AI providers only under business terms that forbid them from training on your data. Where a provider offers it, we switch on zero data retention.</li>
                <li><b>Sensitive work stays private.</b> For sensitive work, we can run models inside your own environment or private cloud, so your data never leaves it.</li>
                <li><b>Competitors never see your data.</b> Every AI system we build keeps each client&rsquo;s data, prompts and outputs separate. Nothing from your project can surface in anyone else&rsquo;s.</li>
                <li><b>People stay in charge.</b> The AI systems we build keep a record of what they did, and a person signs off on high-stakes decisions.</li>
              </ul>

              <h3 className="kicker">The law that applies</h3>
              <p>Protecting your data is your legal duty, and we share it. We follow the data protection and confidentiality laws of every jurisdiction you operate in, for example the Nigeria Data Protection Act 2023 and the EU GDPR. We also follow the rules of your sector, such as those set by your central bank or telecoms regulator. Where your contract sets stricter terms, the stricter terms apply.</p>

              <h3 className="kicker">If something goes wrong</h3>
              <p>If we find out that your data has been exposed, we&rsquo;ll tell you without delay, and within 72 hours at the latest. We&rsquo;ll explain what happened, help contain it and support you in meeting any duty you have to report it.</p>

              <h3 className="kicker">Questions</h3>
              <p>Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
            </article>

            <article id="privacy">
              <h2 className="d-3">Privacy Policy</h2>
              <p className="eff">Effective date: {EFFECTIVE}</p>
              <p>This policy explains what personal data 1960 Labs collects through this website and what we do with it. The data you share with us during a client engagement is covered by <a href="#protect">How we protect your work</a> and by your contract.</p>

              <h3 className="kicker">What we collect</h3>
              <ul>
                <li><b>What you give us.</b> When you book a diagnostic or email us, we collect your name, work email, company, role, sector and anything you tell us about the problem you want solved.</li>
                <li><b>What your browser sends.</b> We don&rsquo;t use analytics or advertising cookies. Like any website, our hosting provider records basic technical data, such as your IP address and browser type, to keep the site secure and running.</li>
              </ul>

              <h3 className="kicker">Why we use it</h3>
              <ul>
                <li>To reply to you, schedule your diagnostic and prepare for it.</li>
                <li>To keep the site secure and working.</li>
                <li>To meet our legal obligations.</li>
              </ul>
              <p>We don&rsquo;t sell your data, and we don&rsquo;t use it for advertising.</p>

              <h3 className="kicker">Our legal basis</h3>
              <p>We use your data to take the steps you asked for before a possible contract, such as booking a call. We also rely on our legitimate interest in running and securing the site, and on your consent where the law requires it. You can withdraw your consent at any time.</p>

              <h3 className="kicker">Who we share it with</h3>
              <ul>
                <li>Service providers who help us run the site and deliver booking requests to us: our website host, and Resend, which sends the booking form to our inbox. They may use your data only to provide that service to us.</li>
                <li>Authorities, when the law requires us to.</li>
              </ul>
              <p>If your data is transferred outside the country you live in, we use safeguards that the applicable law accepts.</p>

              <h3 className="kicker">How long we keep it</h3>
              <p>If you don&rsquo;t become a client, we keep your contact details for 24 months after we last spoke, then delete them. If you do become a client, your contract sets the terms.</p>

              <h3 className="kicker">Your rights</h3>
              <p>You can ask us to give you a copy of your data, correct it, delete it, or stop using it. Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we&rsquo;ll respond within 30 days. You also have the right to complain to your data protection authority, for example the Nigeria Data Protection Commission.</p>

              <h3 className="kicker">Security</h3>
              <p>We protect your data with access controls, encryption in transit and at rest, and the same standards we apply to client work.</p>

              <h3 className="kicker">Changes to this policy</h3>
              <p>If we change this policy, we&rsquo;ll update the effective date at the top. If a change is significant, we&rsquo;ll tell people we&rsquo;re in contact with.</p>

              <h3 className="kicker">Contact</h3>
              <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
