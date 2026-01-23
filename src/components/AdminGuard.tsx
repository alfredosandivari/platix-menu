import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 1. No sesión → login
      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      // 2. Ver si tiene business asociado
      const { data: admin } = await supabase
        .from("business_admins")
        .select("business_id")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (!admin) {
        setNeedsOnboarding(true);
        setLoading(false);
        return;
      }

      // OK
      setAuthorized(true);
      setLoading(false);
    };

    checkAccess();
  }, []);

  if (loading) return null;

  if (!authorized && needsOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
