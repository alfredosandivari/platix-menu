// src/components/BusinessGate.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getBusinessSlug } from "@/lib/domain";

import Landing from "@/pages/Landing";
import Menu from "@/pages/Menu";
import MenuLayout from "@/layouts/MenuLayout";

type Status = "loading" | "valid" | "invalid";

export default function BusinessGate() {
  const [status, setStatus] = useState<Status>("loading");

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

      setStatus(data ? "valid" : "invalid");
    };

    resolve();
  }, []);

  if (status === "loading") return null;

  if (status === "invalid") {
    // Landing YA está envuelta por LandingLayout
    return <Landing />;
  }

  return (
    <MenuLayout>
      <Menu />
    </MenuLayout>
  );
}
