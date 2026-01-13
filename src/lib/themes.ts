
export type Theme = {
  bg: string;
  text: string;
  primary: string;
  mutedText?: string;
  border?: string;
  card?: string;
};

export const THEMES: Record<"dark" | "light" | "warm", Theme> = {
    dark: {
      bg: "#0F1217",
      text: "#FFFFFF",
      primary: "#F97316",
      mutedText: "#9CA3AF",
      border: "rgba(255,255,255,0.08)",
      card: "#151A21",
    },
  
    warm: {
      bg: "#FFF7ED",
      text: "#2B2B2B",
      primary: "#EA580C",
    },
    light: {
      bg: "#FFFFFF",
      text: "#1f2937",
      primary: "#ff6a00",
    },
  } as const;
  
  export type ThemeKey = keyof typeof THEMES;
  