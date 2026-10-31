import { ImageResponse } from "next/og";
import { MARK_0, MARK_6 } from "@/lib/logo";
import { HERO } from "@/lib/content";
import { interTight } from "@/lib/ogFont";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: ${HERO.title}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const Stop = ({ s, b }: { s: number; b: number }) => (
  <span style={{ width: s, height: s, background: "#221FC3", marginLeft: s * 0.25, marginBottom: b, alignSelf: "flex-end" }} />
);

export default async function OgImage() {
  const fonts = [...(await interTight(500)), ...(await interTight(600))];
  const words = HERO.title.split(" ");
  const line1 = words.slice(0, 2).join(" "), line2 = words.slice(2).join(" ");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "Inter Tight" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="60" height="60" viewBox="8 8 48 48">
            <path d={MARK_6} fill="#0B0B0C" fillRule="evenodd" />
            <path d={MARK_0} fill="#0B0B0C" fillRule="evenodd" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1.4, color: "#0B0B0C", display: "flex" }}>
            1960 Labs<Stop s={8} b={9} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 600, lineHeight: 0.92, letterSpacing: -4.6, color: "#0B0B0C" }}>
            <span>{line1}</span>
            <div style={{ display: "flex" }}>{line2}<Stop s={15} b={12} /></div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: -0.5, color: "#63625C", maxWidth: 940, lineHeight: 1.25 }}>
            Custom software, automation and AI for finance, telecoms, logistics, marketing and energy teams.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
