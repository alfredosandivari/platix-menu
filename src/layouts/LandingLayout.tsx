// src/layouts/LandingLayout.tsx
import "@/styles/landing.css";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <div className="landing-root">{children}</div>;
}
