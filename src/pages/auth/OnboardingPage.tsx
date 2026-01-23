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
     LOAD USER
  ===================== */

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/login");
        return;
      }
      setUserId(data.user.id);
    };

    loadUser();
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
    setError(null);

    if (!form.name) {
      setError("Business name is required");
      return;
    }

    const slug = form.slug || generateSlug(form.name);

    setLoading(true);

    const { error } = await supabase.from("businesses").insert({
      name: form.name,
      slug,
      owner_id: userId,
      theme: "dark",
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/admin");
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
              placeholder="Tío Jacinto"
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
              placeholder="tio-jacinto"
              value={form.slug}
              onChange={(e) => update("slug", generateSlug(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Your menu will be available at <br />
              <span className="font-mono">
                https://yourdomain.com/{form.slug || "your-business"}
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
