import Link from "next/link";
import { CopyEmail } from "./CopyEmail";
import { FooterMark } from "./FooterMark";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="ftr gut">
      <div className="wrap">
        <div className="f-cols">
          <div>
            <h2>Company</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/#sectors">Sectors</Link></li>
              <li><Link href="/#how">How we work</Link></li>
              <li><a href="/brand">Brand system</a></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <CopyEmail email={SITE.email} />
            <Link className="btn btn-light btn-sm" href="/diagnostic"><span>Book a diagnostic</span></Link>
          </div>
          <div>
            <h2>Social</h2>
            <ul>
              <li><a href={SITE.social.linkedin} rel="me noopener" target="_blank">LinkedIn</a></li>
              <li><a href={SITE.social.x} rel="me noopener" target="_blank">X</a></li>
            </ul>
          </div>
          <div>
            <h2>Legal</h2>
            <ul>
              <li><Link href="/legal#privacy">Privacy Policy</Link></li>
              <li><Link href="/legal#terms">Terms of Use</Link></li>
              <li><Link href="/legal#data">How we handle your data</Link></li>
            </ul>
          </div>
        </div>
        <FooterMark />
        <div className="f-base">
          <span>&copy; {new Date().getFullYear()} {SITE.name}</span>
          <span>{SITE.shortPositioning}</span>
        </div>
      </div>
    </footer>
  );
}
