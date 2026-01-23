// AdminGuard.tsx
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const [status, setStatus] = useState<"loading" | "ok" | "redirect">("loading");

  useEffect(() => {
    const check = async () => {
      const { data: auth } = await supabase.auth.getUser();

      if (!auth.user) {
        setStatus("redirect");
        return;
      }

      const { data: showAdmin } = await supabase
        .from("business_admins")
        .select("id")
        .eq("user_id", auth.user.id)
        .maybeSingle();

      if (!showAdmin) {
        setStatus("redirect");
        return;
      }

      setStatus("ok");
    };

    check();
  }, []);

  if (status === "loading") return null;
  if (status === "redirect") return <Navigate to="/onboarding" replace />;

  return children;
}
