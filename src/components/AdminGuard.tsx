"use client";

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { getBusinessSlug } from "@/lib/domain";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<
    "loading" | "unauthenticated" | "no-business" | "ready"
  >("loading");

  useEffect(() => {
    const check = async () => {
      // 1️⃣ Auth
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setStatus("unauthenticated");
        return;
      }

      // 2️⃣ Business
      const slug = getBusinessSlug();

      if (!slug) {
        setStatus("no-business");
        return;
      }

      const { data: business } = await supabase
        .from("businesses")
        .select("id")
        .eq("slug", slug)
        .single();

      if (!business) {
        setStatus("no-business");
        return;
      }

      setStatus("ready");
    };

    check();
  }, []);

  /* =====================
     RENDER
  ===================== */

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (status === "no-business") {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}
