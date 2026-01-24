import { FolderPlus, Utensils, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  theme: {
    bg: string;
    card: string;
    text: string;
    mutedText: string;
    primary: string;
    border: string;
  };
}

export default function EmptyMenuState({ theme }: Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div
        className="max-w-xl w-full rounded-2xl border p-10 text-center space-y-8"
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
        }}
      >
        {/* TITLE */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">
            Welcome to your digital menu
          </h1>
          <p style={{ color: theme.mutedText }}>
            Your menu is ready. Now let’s add your first content.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <Step
            icon={<FolderPlus />}
            title="Create categories"
            description="Starters, main dishes, drinks…"
            theme={theme}
          />
          <Step
            icon={<Utensils />}
            title="Add products"
            description="Photos, descriptions and prices."
            theme={theme}
          />
          <Step
            icon={<QrCode />}
            title="Share your menu"
            description="Via QR code or direct link."
            theme={theme}
          />
        </div>

        {/* CTA */}
        <Button
          className="w-full md:w-auto px-8 py-6 text-lg"
          style={{ backgroundColor: theme.primary }}
          onClick={() => navigate("/admin")}
        >
          Go to Admin Panel
        </Button>
      </div>
    </div>
  );
}

/* =====================
   STEP ITEM
===================== */

function Step({
  icon,
  title,
  description,
  theme,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  theme: any;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="p-2 rounded-lg"
        style={{
          backgroundColor: theme.bg,
          color: theme.primary,
        }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm" style={{ color: theme.mutedText }}>
          {description}
        </p>
      </div>
    </div>
  );
}
