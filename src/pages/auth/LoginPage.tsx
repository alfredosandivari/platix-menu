"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =====================
     EMAIL + PASSWORD LOGIN
  ===================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (!data.user) {
      setError("Unexpected error. Please try again.");
      return;
    }

    // 🔐 Let the guard decide where to go
    navigate("/admin");
  };

  /* =====================
     GOOGLE LOGIN
  ===================== */

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    });
  };

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">

        {/* LOGO */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <img
            src="https://res.cloudinary.com/daw2izgzu/image/upload/f_auto,q_auto,w_240/v1767928581/logosf_igltzt.png"
            alt="Platix"
            className="h-16 w-auto"
          />
          <p className="text-xs text-muted-foreground">
            Digital Menu Platform
          </p>
        </div>

        {/* CARD */}
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Sign in to your account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              {/* SUBMIT */}
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* GOOGLE */}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>

            {/* FOOTER */}
            <p className="mt-6 text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <a href="/signup" className="text-primary hover:underline">
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>

        {/* FOOTER BRAND */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © Platix · Digital Menus
        </p>
      </div>
    </div>
  );
}
