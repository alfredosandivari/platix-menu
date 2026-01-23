"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
  });

  /* =====================
     LOAD USER + GUARD
  ===================== */

  useEffect(() => {
    const init = async () => {
      const { data: auth } = await supabase.auth.getUser();

      if (!auth.user) {
        navigate("/login");
        return;
      }

      setUserId(auth.user.id);

      // 👉 Guard: si ya tiene negocio, fuera de onboarding
      const { data: admin } = await supabase
        .from("business_admins")
        .select("id")
        .eq("user_id", auth.user.id)
        .maybeSingle();

    };

    init();
  }, [navigate]);

  /* =====================
     HELPERS
  ===================== */

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  /* =====================
     CREATE BUSINESS
  ===================== */

  const handleCreate = async () => {
    if (!userId) return;

    setError(null);

    if (!form.name) {
      setError("Business name is required");
      return;
    }

    const slug = form.slug || generateSlug(form.name);

    setLoading(true);

    // 1️⃣ Crear business
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .insert({
        name: form.name,
        slug,
        theme: "light",
      })
      .select()
      .single();

    if (businessError) {
      setLoading(false);
      setError(businessError.message);
      return;
    }

    // 2️⃣ Vincular usuario como owner
    const { error: adminError } = await supabase
      .from("business_admins")
      .insert({
        user_id: userId,
        business_id: business.id,
        role: "owner",
      });

    setLoading(false);

    if (adminError) {
      setError(adminError.message);
      return;
    }

  };

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border p-8 space-y-6">

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Set up your business
          </h1>
          <p className="text-sm text-muted-foreground">
            This will be your digital menu space
          </p>
        </div>

        <div className="space-y-4">

          <div className="space-y-1">
            <Label>Business name</Label>
            <Input
              placeholder="Pizza World"
              value={form.name}
              onChange={(e) => {
                update("name", e.target.value);
                update("slug", generateSlug(e.target.value));
              }}
            />
          </div>

          <div className="space-y-1">
            <Label>Menu URL</Label>
            <Input
              placeholder="pizzaworld"
              value={form.slug}
              onChange={(e) =>
                update("slug", generateSlug(e.target.value))
              }
            />
            <p className="text-xs text-muted-foreground">
              Your menu will be available at
              <br />
              <span className="font-mono">
                https://{form.slug || "your-business"}.platix.app
              </span>
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button
            onClick={handleCreate}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Creating..." : "Create business"}
          </Button>
        </div>
      </div>
    </div>
  );
}
