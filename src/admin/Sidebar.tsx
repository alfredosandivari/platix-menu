"use client";

import { NavLink } from "react-router-dom";
import { COPY } from "@/lib/copy";

import {
  LayoutDashboard,
  List,
  UtensilsCrossed,
} from "lucide-react";

interface SidebarProps {
  onNavigate?: () => void;
}

const lang = "en";

const navItems = [
  {
    label: COPY[lang].admin.dashboard,
    to: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: COPY[lang].admin.categories,
    to: "/admin/categories",
    icon: List,
  },
  {
    label: COPY[lang].admin.products,
    to: "/admin/items",
    icon: UtensilsCrossed,
  },
];

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="h-full w-64 shrink-0 border-r border-border bg-background">
      <nav className="p-4 space-y-2">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
