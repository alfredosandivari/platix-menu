"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { resolveAdminBusiness } from "./useAdminBusiness";

interface Props {
  onMenuClick?: () => void;
}

export default function LogoHeader({ onMenuClick }: Props) {
  const [businessName, setBusinessName] = useState<string>("");

  useEffect(() => {
    resolveAdminBusiness()
      .then((b) => setBusinessName(b.name))
      .catch(() => {});
  }, []);

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-6">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-md hover:bg-muted"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="text-lg font-semibold truncate">
        {businessName || "Administrador"}
      </h1>

      <div className="w-10 md:hidden" />
    </header>
  );
}
