export function resolveDomain(): string {
    const host = window.location.hostname;
  
    // local
    if (host === "localhost") {
      return import.meta.env.VITE_DEBUG_DOMAIN;
    }
  
    // quitar www
    if (host.startsWith("www.")) {
      return host.replace("www.", "");
    }
  
    // vercel preview
    if (host.endsWith(".vercel.app")) {
      return import.meta.env.VITE_DEBUG_DOMAIN;
    }
  
    return host;
  }
  