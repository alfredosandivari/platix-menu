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
    <aside className="h-screen w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col">
      
      {/* 🔶 LOGO / BRAND */}
      <div className="h-16 px-6 flex items-center border-b border-slate-200">
        <div className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/daw2izgzu/image/upload/v1767928581/logosf_igltzt.png"
            alt="Platix"
            className="h-8 w-auto"
          />
          <span className="font-semibold text-slate-900 tracking-tight">
            Platix Admin
          </span>
        </div>
      </div>

      {/* 🔶 NAV */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-orange-50 text-orange-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
