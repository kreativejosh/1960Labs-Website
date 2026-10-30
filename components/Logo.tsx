import { MARK_0, MARK_6, STOP, WORDMARK } from "@/lib/logo";

type Props = { fill?: string; stop?: string; stopOpacity?: number; viewBox?: string; className?: string };

/** Full lockup: the "60" mark plus the outlined wordmark and its square full stop. */
export function Logo({ fill = "#0B0B0C", stop = "#221FC3", stopOpacity = 1, viewBox = "0 0 320 72", className }: Props) {
  return (
    <svg className={className} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <g transform="translate(4,4)">
        <path className="b6" d={MARK_6} fill={fill} fillRule="evenodd" />
        <path className="b0" d={MARK_0} fill={fill} fillRule="evenodd" />
      </g>
      <path d={WORDMARK} fill={fill} />
      <path className="dot" d={STOP} fill={stop} opacity={stopOpacity} />
    </svg>
  );
}

/** The mark alone with the blue square, used by the intro. */
export function MarkBuild() {
  return (
    <svg viewBox="0 0 76 64" aria-hidden="true">
      <path className="b6" d={MARK_6} fill="#F7F7F5" fillRule="evenodd" />
      <path className="b0" d={MARK_0} fill="#F7F7F5" fillRule="evenodd" />
      <rect className="dot" x="61" y="48" width="8" height="8" fill="#221FC3" />
    </svg>
  );
}
