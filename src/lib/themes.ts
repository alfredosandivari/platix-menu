export type Theme = {
  background: string;        // HSL
  foreground: string;
  primary: string;
  mutedForeground?: string;
  border?: string;
  card?: string;
};

export const THEMES = {
  dark: {
    background: "217 22% 6%",
    foreground: "210 40% 98%",
    primary: "24 96% 53%",
    mutedForeground: "215 16% 58%",
    border: "215 16% 14%",
    card: "217 20% 8%",
  },

  light: {
    background: "0 0% 100%",
    foreground: "222 47% 11%",
    primary: "24 96% 53%",
    mutedForeground: "215 16% 40%",
    border: "214 32% 91%",
    card: "0 0% 100%",
  },

  warm: {
    background: "30 100% 97%",
    foreground: "24 10% 15%",
    primary: "20 90% 48%",
    mutedForeground: "24 10% 40%",
    border: "24 20% 85%",
    card: "0 0% 100%",
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
