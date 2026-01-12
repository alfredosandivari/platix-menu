export function getBusinessSlug(): string | null {
  if (typeof window === "undefined") return null;

  const host = window.location.hostname;

  // Root domains → LANDING
  if (
    host === "platix.app" ||
    host === "www.platix.app" ||
    host === "localhost"
  ) {
    return null;
  }

  // Subdomain → BUSINESS
  const subdomain = host.split(".")[0];

  // Seguridad extra
  if (!subdomain || subdomain === "www") {
    return null;
  }

  return subdomain;
}
