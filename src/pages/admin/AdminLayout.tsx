import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black flex">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      {mobileOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 md:hidden">
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <main className="p-6 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
