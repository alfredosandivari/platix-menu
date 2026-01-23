"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // 👉 aquí conectaremos Supabase Auth
        setTimeout(() => {
            setLoading(false);
            alert("Login placeholder");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm">

                {/* LOGO */}
                <div className="mb-8 flex flex-col items-center gap-2">
                    <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight">
                        <img
                            src="https://res.cloudinary.com/daw2izgzu/image/upload/f_auto,q_auto,w_240/v1767928581/logosf_igltzt.png"
                            alt="Platix"
                            className="h-16 w-auto mx-auto mb-2"
                        />
                    </h1>
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
                            onClick={() => alert("Google OAuth placeholder")}
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
