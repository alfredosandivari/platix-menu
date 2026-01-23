import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function AdminGuard() {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      // 1️⃣ Auth
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
      const { data: admin } = await supabase
        .from("business_admins")
        .select("business_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!admin) {
        setRedirect("/onboarding");
        setLoading(false);
        return;
      }

      // ✅ OK
      setRedirect(null);
      setLoading(false);
    };

    run();
  }, []);

  if (loading) return null;
  if (redirect) return <Navigate to={redirect} replace />;

  return <Outlet />;
}
