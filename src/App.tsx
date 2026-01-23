import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingLayout from "@/layouts/LandingLayout";
import BusinessGate from "@/components/BusinessGate";
import NotFound from "./pages/NotFound";

// ADMIN
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminItemsPage from "./pages/admin/AdminItemsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import OnboardingPage from "./pages/auth/OnboardingPage";
import AdminGuard from "@/components/AdminGuard";

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <Routes>
            {/* PUBLIC */}
            <Route
              path="/"
              element={
                <LandingLayout>
                  <BusinessGate />
                </LandingLayout>
              }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />


            {/* ADMIN (GUARDED) */}
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <AdminLayout />
                </AdminGuard>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="items" element={<AdminItemsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
