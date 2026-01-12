export const getBusinessSlug = (): string | null => {
    const hostname = window.location.hostname;
  
    // LOCALHOST
    if (hostname === "localhost") {
      return import.meta.env.VITE_DEBUG_SLUG ?? null;
    }
  
    // demo.platix.app → ["demo", "platix", "app"]
    const parts = hostname.split(".");
  
    // subdominio válido
    if (parts.length >= 3) {
      return parts[0];
    }
  
    return null;
};
  