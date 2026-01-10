import React from "react";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  /** wrapper que centra y da ancho máximo */
  containerClassName?: string;
  /** si una página quiere full-bleed, puede desactivar container */
  noContainer?: boolean;
};

export default function PageShell({
  children,
  className,
  containerClassName = "container-platix",
  noContainer = false,
}: PageShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-black text-foreground",
        // overlay premium suave (similar a Ambbar)
        "bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]",
        className
      )}
    >
      {noContainer ? (
        children
      ) : (
        <div className={cn(containerClassName)}>{children}</div>
      )}
    </div>
  );
}
