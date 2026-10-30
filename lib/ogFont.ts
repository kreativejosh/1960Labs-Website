/** Inter Tight for generated images. Fetched at build time; falls back to the default font if offline. */
export async function interTight(weight: 500 | 600 | 700) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Inter+Tight:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?\.ttf)\)/)?.[1];
    if (!url) return [];
    const data = await (await fetch(url)).arrayBuffer();
    return [{ name: "Inter Tight", data, weight, style: "normal" as const }];
  } catch {
    return [];
  }
}
