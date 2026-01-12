export const THEMES = {
    dark: {
      bg: "#0F0F0F",
      text: "#FFFFFF",
      primary: "#F97316", // naranja Platix
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
  