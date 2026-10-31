/* Process drawings in the brand's schematic style: 20-unit grid, square nodes, 45° turns.
   n: [x, y, label, manual, done, labelBelow] · box: [x, y, w, h, label, highlight] · t: [x, y, text, anchor] */
type Item =
  | { d: string; main?: boolean; manual?: boolean }
  | { n: [number, number, string, (0 | 1)?, (0 | 1)?, (0 | 1)?] }
  | { box: [number, number, number, number, string, (0 | 1)?] }
  | { t: [number, number, string, string?] };
export type Scheme = { vb: [number, number]; items: Item[] };

export const SCHEMES: Record<string, Scheme> = {
  /* hero tiles, 320 x 220 */
  't-finance': { vb: [320, 220], items: [
    { d: 'M40 120H280', main: true },
    { d: 'M120 120V70H200V120', manual: true },
    { n: [40, 120, 'APPLY', 0, 0, 1] }, { n: [120, 120, 'RULES', 0, 0, 1] }, { n: [160, 70, 'EMAIL', 1] }, { n: [200, 120, 'DECIDE', 0, 0, 1] }, { n: [280, 120, 'AUDIT', 0, 1, 1] }
  ] },
  't-telecoms': { vb: [320, 220], items: [
    { box: [20, 96, 70, 32, 'PROBE'] },
    { d: 'M90 112H120V72H170', main: true }, { d: 'M90 112H170', main: true }, { d: 'M90 112H120V152H170', main: true },
    { d: 'M170 72H220V112H270', main: true }, { d: 'M170 112H270', main: true }, { d: 'M170 152H220V112H270', main: true },
    { n: [170, 72, 'OP A'] }, { n: [170, 112, 'OP B'] }, { n: [170, 152, 'OP C', 0, 0, 1] }, { n: [270, 112, 'COMPARE', 0, 1] }
  ] },
  't-logistics': { vb: [320, 220], items: [
    { d: 'M40 90H280V150', main: true },
    { d: 'M120 90V150H200V90', manual: true },
    { n: [40, 90, 'DISPATCH'] }, { n: [120, 90, 'PICKUP'] }, { n: [200, 90, 'TRANSIT'] }, { n: [280, 90, 'POD'] },
    { n: [160, 150, 'CALLS', 1, 0, 1] }, { n: [280, 150, 'INVOICE', 0, 1, 1] }
  ] },
  't-marketing': { vb: [320, 220], items: [
    { d: 'M40 62H90V112H150', main: true }, { d: 'M40 112H150', main: true }, { d: 'M40 162H90V112H150', main: true },
    { d: 'M150 112H280', main: true },
    { d: 'M150 112V172H230V112', manual: true },
    { n: [40, 62, 'FORM'] }, { n: [40, 112, 'ADS'] }, { n: [40, 162, 'EVENT', 0, 0, 1] },
    { n: [150, 112, 'ROUTE'] }, { n: [230, 112, 'CRM'] }, { n: [280, 112, 'REPORT', 0, 1] }, { n: [190, 172, 'SHEETS', 1, 0, 1] }
  ] },
  't-energy': { vb: [320, 220], items: [
    { d: 'M40 62H90V112H150', main: true }, { d: 'M40 112H150', main: true }, { d: 'M40 162H90V112H150', main: true },
    { d: 'M150 112H280', main: true }, { d: 'M220 112V172H280', main: true },
    { d: 'M150 112V52H280', manual: true },
    { n: [40, 62, 'PLANT'] }, { n: [40, 112, 'PIPELINE'] }, { n: [40, 162, 'SUBSTATION', 0, 0, 1] },
    { n: [150, 112, 'MONITOR', 0, 0, 1] }, { n: [220, 52, 'SITE VISITS', 1] },
    { n: [280, 112, 'LIVE VIEW', 0, 1] }, { n: [280, 172, 'ALERT', 0, 0, 1] }
  ] },
  /* large drawings, 640 x 300 */
  diagnose: { vb: [640, 300], items: [
    { t: [60, 36, 'ORDER INTAKE · AS IT REALLY RUNS', 'start'] },
    { d: 'M60 170H560', main: true },
    { d: 'M200 170V100H280V170', manual: true }, { d: 'M440 170V100H520V170', manual: true },
    { n: [60, 170, '01 REQUEST', 0, 0, 1] }, { n: [180, 170, '02 CHECK', 0, 0, 1] }, { n: [300, 170, '03 APPROVE', 0, 0, 1] }, { n: [420, 170, '04 SYNC', 0, 0, 1] }, { n: [560, 170, '05 DONE', 0, 1, 1] },
    { n: [240, 100, 'SPREADSHEET', 1] }, { n: [480, 100, 'RE-KEYED BY HAND', 1] },
    { t: [60, 262, '── MAIN PATH', 'start'] }, { t: [200, 262, '- - WORKAROUND WE REMOVE', 'start'] }
  ] },
  redesign: { vb: [640, 300], items: [
    { t: [60, 58, 'BEFORE · 7 STEPS', 'start'] },
    { d: 'M60 100H580', manual: true },
    { n: [60, 100, ''] }, { n: [147, 100, '', 1] }, { n: [233, 100, '', 1] }, { n: [320, 100, '', 1] }, { n: [407, 100, '', 1] }, { n: [493, 100, '', 1] }, { n: [580, 100, ''] },
    { t: [60, 186, 'AFTER · 3 STEPS', 'start'] },
    { d: 'M60 226H300L320 246H580', main: true },
    { n: [60, 226, 'IN'] }, { n: [300, 226, 'CHECK'] }, { n: [580, 246, 'DONE', 0, 1, 1] }
  ] },
  build: { vb: [640, 300], items: [
    { box: [40, 60, 150, 44, 'YOUR SYSTEMS'] }, { box: [40, 128, 150, 44, 'YOUR DATA'] }, { box: [40, 196, 150, 44, 'YOUR RULES'] },
    { d: 'M190 82H240L260 102V150H320', main: true }, { d: 'M190 150H320', main: true }, { d: 'M190 218H240L260 198V150H320', main: true },
    { box: [320, 124, 160, 52, 'CUSTOM BUILD', 1] },
    { d: 'M480 150H580', main: true }, { n: [580, 150, 'LIVE', 0, 1] }
  ] },
  credithub: { vb: [640, 300], items: [
    { box: [20, 125, 120, 50, 'MERCHANTS'] }, { box: [180, 125, 120, 50, 'PLATFORM'] }, { box: [340, 125, 130, 50, 'CREDITHUB', 1] },
    { d: 'M140 150H180', main: true }, { d: 'M300 150H340', main: true },
    { d: 'M470 150H510V80H580', main: true }, { d: 'M470 150H580', main: true }, { d: 'M470 150H510V220H580', main: true },
    { n: [580, 80, 'LENDER'] }, { n: [580, 150, 'LENDER'] }, { n: [580, 220, 'LENDER', 0, 0, 1] },
    { t: [80, 210, 'APPLY IN-APP', 'middle'] }, { t: [405, 210, 'SDK · APIs', 'middle'] }
  ] },
  'credithub-paths': { vb: [640, 300], items: [
    { box: [20, 125, 120, 50, 'OPERATOR'] },
    { d: 'M140 150H200V90H280', main: true }, { d: 'M140 150H200V210H280', main: true },
    { box: [280, 65, 130, 50, 'SDK'] }, { box: [280, 185, 130, 50, 'APIs'] },
    { d: 'M410 90H480V150H580', main: true }, { d: 'M410 210H480V150H580', main: true },
    { n: [580, 150, 'CREDIT LIVE', 0, 1] },
    { t: [345, 52, 'LAUNCH QUICKLY', 'middle'] }, { t: [345, 260, 'BUILD YOUR OWN PRODUCT', 'middle'] }
  ] },
  network: { vb: [640, 300], items: [
    { box: [30, 125, 120, 50, 'PROBE'] },
    { d: 'M150 150H200V70H260', main: true }, { d: 'M150 150H260', main: true }, { d: 'M150 150H200V230H260', main: true },
    { d: 'M260 70H340V150H420', main: true }, { d: 'M260 150H420', main: true }, { d: 'M260 230H340V150H420', main: true },
    { n: [260, 70, 'OPERATOR A'] }, { n: [260, 150, 'OPERATOR B'] }, { n: [260, 230, 'OPERATOR C', 0, 0, 1] },
    { box: [420, 125, 170, 50, '1960 NETWORK', 1] }
  ] }
};

export type SchemeKind = string;
