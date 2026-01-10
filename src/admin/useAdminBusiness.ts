// src/admin/useAdminBusiness.ts
import { supabase } from "@/lib/supabaseClient";
import { ADMIN_CONFIG } from "./adminConfig";
import { resolveDomain } from "@/utils/resolveDomain";

export async function resolveAdminBusiness() {
  const isLocalhost = window.location.hostname === "localhost";

  if (isLocalhost && ADMIN_CONFIG.debugBusinessId) {
    return {
      id: ADMIN_CONFIG.debugBusinessId,
      name: "DEBUG BUSINESS",
      logo_url: null,
    };
  }

  const domain = resolveDomain();

  const { data, error } = await supabase
    .from("businesses")
    .select("id, name, logo_url")
    .eq("domain", domain)
    .maybeSingle();

  if (error) {
    console.error("Error consultando business:", error);
    throw new Error("Error consultando negocio");
  }

  if (!data) {
    throw new Error(`Business no encontrado para dominio: ${domain}`);
  }

  return data;
}
