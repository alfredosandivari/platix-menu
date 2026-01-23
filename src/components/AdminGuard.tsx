import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function AdminGuard({ children }: { children: JSX.Element }) {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState<
        null | "/login" | "/onboarding"
    >(null);

    useEffect(() => {
        const check = async () => {
            // 1. Usuario
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setRedirect("/login");
                setLoading(false);
                return;
            }

            // 2. Business_admins
            const { data: admin, error } = await supabase
                .from("business_admins")
                .select("business_id")
                .eq("user_id", user.id)
                .limit(1)
                .single();

            if (error || !admin) {
                setRedirect("/onboarding");
                setLoading(false);
                return;
            }

            // 3. Business existe
            const { data: business } = await supabase
                .from("businesses")
                .select("id")
                .eq("id", admin.business_id)
                .single();

            if (!business) {
                setRedirect("/onboarding");
                setLoading(false);
                return;
            }

            // OK
            setRedirect(null);
            setLoading(false);
        };

        check();
    }, []);

    if (loading) return null;

    if (redirect) {
        return <Navigate to={redirect} replace />;
    }

    return children;
}
