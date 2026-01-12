// src/components/BusinessGate.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getBusinessSlug } from "@/lib/domain";
import Landing from "@/pages/Landing";
import LandingLayout from "@/layouts/LandingLayout";
import Menu from "@/pages/Menu";

export default function BusinessGate() {
  const [status, setStatus] = useState<
    "loading" | "valid" | "invalid"
  >("loading");

  const [businessId, setBusinessId] = useState<string | null>(null);

  useEffect(() => {
    const resolve = async () => {
      const slug = getBusinessSlug();

      if (!slug) {
        setStatus("invalid");
        return;
      }

      const { data } = await supabase
        .from("businesses")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (!data) {
        setStatus("invalid");
        return;
      }

      setBusinessId(data.id);
      setStatus("valid");
    };

    resolve();
  }, []);

  if (status === "loading") return null;

  if (status === "invalid") {
    return 
        <Landing />
    ;
  }

  return <Menu />;
}
