export type Theme = {
  bg: string;
  text: string;
  primary: string;
  mutedText?: string;
  border?: string;
  card?: string;
};

export const THEMES = {
  dark: {
    bg: "hsl(217 22% 6%)",
    text: "hsl(210 40% 98%)",
    primary: "hsl(24 96% 53%)",
    mutedText: "hsl(215 16% 58%)",
    border: "hsl(215 16% 14%)",
    card: "hsl(217 20% 8%)",
  },

  light: {
    bg: "hsl(0 0% 100%)",
    text: "hsl(222 47% 11%)",
    primary: "hsl(24 96% 53%)",
    mutedText: "hsl(215 16% 40%)",
    border: "hsl(214 32% 91%)",
    card: "hsl(0 0% 100%)",
  },

  warm: {
    bg: "hsl(30 100% 97%)",
    text: "hsl(24 10% 15%)",
    primary: "hsl(20 90% 48%)",
    mutedText: "hsl(24 10% 40%)",
    border: "hsl(24 20% 85%)",
    card: "hsl(0 0% 100%)",
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
