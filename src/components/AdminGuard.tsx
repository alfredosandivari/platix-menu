import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { getBusinessSlug } from "@/lib/domain";

export default function AdminGuard() {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      // 1️⃣ Session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setRedirect("/login");
        setLoading(false);
        return;
      }

      const user = session.user;

      // 2️⃣ Business admin
      const { data: admin, error } = await supabase
        .from("business_admins")
        .select("business_id")
        .eq("user_id", user.id)
        .single();

      if (error || !admin) {
        setRedirect("/onboarding");
        setLoading(false);
        return;
      }

      // 3️⃣ Slug check (CRÍTICO)
      const slug = getBusinessSlug();

      if (!slug) {
        // Estás en platix.app/admin → NO permitido
        setRedirect("/onboarding");
        setLoading(false);
        return;
      }

      // ✅ Todo ok
      setLoading(false);
    };

    run();
  }, []);

  if (loading) return null;
  if (redirect) return <Navigate to={redirect} replace />;

  return <Outlet />;
}
