// src/layouts/MenuLayout.tsx
import "@/styles/menu.css";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="menu-root">{children}</div>;
}
