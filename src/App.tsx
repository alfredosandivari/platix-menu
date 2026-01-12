import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./pages/Menu";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

// ADMIN
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminItemsPage from "./pages/admin/AdminItemsPage";

import { getBusinessSlug } from "@/lib/domain";

const queryClient = new QueryClient();

export default function App() {
  const slug = getBusinessSlug();
  const isBusiness = Boolean(slug);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          {/* =====================
              BUSINESS (subdominio)
          ===================== */}
          {isBusiness ? (
            <Routes>
              {/* MENU */}
              <Route path="/" element={
                <div className="menu-root">
                  <Menu />  
                </div>
              } />

              {/* ADMIN */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="items" element={<AdminItemsPage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            /* =====================
                LANDING (root domain)
            ===================== */
            <Routes>
              <Route path="/" element={
                <div className="landing-root">
                  <Landing />
                </div>
                } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
