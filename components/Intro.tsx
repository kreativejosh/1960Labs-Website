"use client";
import { useEffect } from "react";
import { MarkBuild } from "./Logo";

/** Runs before first paint (see layout): shows the intro once per session on the home page. */
export const INTRO_SCRIPT = `try{var d=document.documentElement;if(location.pathname==="/"&&!sessionStorage.getItem("1960-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-on");sessionStorage.setItem("1960-intro","1")}}catch(e){}`;

/**
 * Home-page intro: the mark builds, then the cover wipes away.
 * Hidden by CSS unless the pre-paint script set html.intro-on, so crawlers and no-JS visitors never see it.
 */
export function Intro() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro-on")) return;
    const t = setTimeout(() => html.classList.remove("intro-on"), 2600);
    return () => clearTimeout(t);
  }, []);
  const end = () => document.documentElement.classList.remove("intro-on");
  return (
    <div className="intro" aria-hidden="true" onClick={end}
      onAnimationEnd={(e) => { if (e.animationName === "intro-wipe") end(); }}>
      <MarkBuild />
      <span className="scan" />
    </div>
  );
}
