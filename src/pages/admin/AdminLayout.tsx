import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      {mobileOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white md:hidden shadow-xl">
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* MOBILE TOP BAR */}
        <header className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3 px-4 h-14">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md hover:bg-slate-100 active:bg-slate-200 transition"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>

            <span className="font-semibold text-sm tracking-tight">
              Admin
            </span>
          </div>
        </header>

        <main className="p-6 md:p-8 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
