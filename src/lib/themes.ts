// src/lib/themes.ts

export type ThemeKey = "dark" | "warm" | "light";

export type Theme = {
  // Shadcn tokens (HSL triples)
  background: string;
  foreground: string;

  card: string;
  cardForeground: string;

  popover: string;
  popoverForeground: string;

  primary: string;
  primaryForeground: string;

  secondary: string;
  secondaryForeground: string;

  muted: string;
  mutedForeground: string;

  accent: string;
  accentForeground: string;

  border: string;
  input: string;
  ring: string;

  radius?: string;
};

/**
 * IMPORTANT:
 * These values must be HSL TRIPLES (e.g. "217 22% 6%"), not HEX.
 * Because Tailwind/shadcn uses: hsl(var(--background))
 */
export const THEMES: Record<ThemeKey, Theme> = {
  dark: {
    background: "217 22% 6%",          // ~ #0F1217
    foreground: "0 0% 100%",

    card: "217 20% 9%",                // ~ #151A21
    cardForeground: "0 0% 100%",

    popover: "217 22% 6%",
    popoverForeground: "0 0% 100%",

    primary: "25 95% 53%",             // ~ #F97316
    primaryForeground: "0 0% 100%",

    secondary: "217 16% 12%",
    secondaryForeground: "210 40% 98%",

    muted: "217 16% 12%",
    mutedForeground: "215 16% 65%",    // ~ gray-400/300

    accent: "25 95% 15%",
    accentForeground: "25 95% 75%",

    border: "217 16% 16%",
    input: "217 16% 16%",
    ring: "25 95% 53%",

    radius: "1rem",
  },

  warm: {
    background: "33 100% 96%",         // ~ #FFF7ED
    foreground: "0 0% 17%",            // ~ #2B2B2B

    card: "0 0% 100%",
    cardForeground: "0 0% 17%",

    popover: "0 0% 100%",
    popoverForeground: "0 0% 17%",

    primary: "21 90% 48%",             // ~ #EA580C
    primaryForeground: "0 0% 100%",

    secondary: "30 25% 92%",
    secondaryForeground: "0 0% 17%",

    muted: "30 25% 92%",
    mutedForeground: "0 0% 35%",

    accent: "24 100% 92%",
    accentForeground: "21 90% 40%",

    border: "30 15% 86%",
    input: "30 15% 86%",
    ring: "21 90% 48%",

    radius: "1rem",
  },

  light: {
    background: "0 0% 100%",
    foreground: "222 47% 11%",         // similar to slate-900

    card: "0 0% 100%",
    cardForeground: "222 47% 11%",

    popover: "0 0% 100%",
    popoverForeground: "222 47% 11%",

    primary: "25 100% 50%",            // ~ #ff6a00
    primaryForeground: "0 0% 100%",

    secondary: "210 40% 96%",
    secondaryForeground: "222 47% 11%",

    muted: "210 40% 96%",
    mutedForeground: "215 16% 40%",

    accent: "25 100% 95%",
    accentForeground: "25 100% 35%",

    border: "214 32% 91%",
    input: "214 32% 91%",
    ring: "25 100% 50%",

    radius: "1rem",
  },
};
