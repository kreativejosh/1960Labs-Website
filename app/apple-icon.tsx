import { ImageResponse } from "next/og";
import { MARK_0, MARK_6 } from "@/lib/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0B0B0C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="120" height="120" viewBox="0 0 64 64">
          <path d={MARK_6} fill="#F7F7F5" fillRule="evenodd" />
          <path d={MARK_0} fill="#F7F7F5" fillRule="evenodd" />
        </svg>
      </div>
    ),
    size,
  );
}
