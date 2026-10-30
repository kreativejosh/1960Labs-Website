// Icon paths from the 1960 Labs brand system: 24px grid, 1.5px stroke, round caps.
export const ICON_PATHS = {
  "arrow-right": "M4 12H19 M13 6L19 12L13 18",
  "arrow-left": "M20 12H5 M11 6L5 12L11 18",
  "plus": "M12 5V19 M5 12H19",
  "search": "M4 4H15V15H4Z M15 15L20 20",
  "code": "M8 7L3 12L8 17 M16 7L21 12L16 17",
  "automate": "M4 10V5H18 M15 2L18 5L15 8 M20 14V19H6 M9 16L6 19L9 22",
  "model": "M4 4H8V8H4Z M16 4H20V8H16Z M4 16H8V20H4Z M16 16H20V20H16Z M10 10H14V14H10Z M8 6H16 M8 18H16 M6 8V16 M18 8V16",
} as const;

export type IconName = keyof typeof ICON_PATHS;
