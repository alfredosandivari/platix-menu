"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* =====================
     SIGN UP
  ===================== */

  const handleSignup = async () => {
    setError(null);

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/onboarding`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // 👉 luego aquí entraremos al onboarding
    navigate("/admin");
  };

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border p-8 space-y-6">

        {/* LOGO / TITLE */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Start managing your digital menu with Platix
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Confirm password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button
            onClick={handleSignup}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </div>

        {/* FOOTER */}
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-slate-900">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
