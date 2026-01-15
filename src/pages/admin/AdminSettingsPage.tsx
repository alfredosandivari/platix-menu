"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getBusinessSlug } from "@/lib/domain";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { QRCodeCanvas } from "qrcode.react";



import { Phone, MessageCircle, Instagram, Globe } from "lucide-react";

/* =====================
   TYPES
===================== */

type BusinessSettingsForm = {
  name: string;
  logo_url: string;
  theme: "dark" | "light" | "warm";
  phone: string;
  whatsapp: string;
  address: string;
  instagram_url: string;
  website_url: string;
  opening_hours: string;
};

type FormKey = keyof BusinessSettingsForm;

/* =====================
   PAGE
===================== */

export default function AdminSettingsPage() {
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState<BusinessSettingsForm>({
    name: "",
    logo_url: "",
    theme: "dark",
    phone: "",
    whatsapp: "",
    address: "",
    instagram_url: "",
    website_url: "",
    opening_hours: "",
  });

  /* =====================
     LOAD BUSINESS
  ===================== */

  useEffect(() => {
    const load = async () => {
      const slug = getBusinessSlug();
      if (!slug) return;

      const { data } = await supabase
        .from("businesses")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!data) return;

      setBusinessId(data.id);
      setForm({
        name: data.name ?? "",
        logo_url: data.logo_url ?? "",
        theme: data.theme ?? "dark",
        phone: data.phone ?? "",
        whatsapp: data.whatsapp ?? "",
        address: data.address ?? "",
        instagram_url: data.instagram_url ?? "",
        website_url: data.website_url ?? "",
        opening_hours: data.opening_hours ?? "",
      });

      setLoading(false);
    };

    load();
    
  }, []);

  /* =====================
     HANDLERS
  ===================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name as FormKey]: value,
    }));
  };

  const updateField = (key: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!businessId) return;

    setSaving(true);

    await supabase
      .from("businesses")
      .update(form)
      .eq("id", businessId);

    setSaving(false);
    toast({
        title: "Updated ✅",
        description: "Your changes have been saved successfully.",
      });      
      
  };

  const handleLogoUpload = async (file: File) => {
    if (!businessId) return;

    const slug = getBusinessSlug();
    if (!slug) return;

    const url = await uploadImageToCloudinary(
      file,
      `platix-saas/${slug}/menu`
    );

    if (url) {
      updateField("logo_url", url);
    }
  };

  if (loading) return <p>Loading settings...</p>;

    const slug = getBusinessSlug();

    const menuUrl = slug
    ? `https://${slug}.platix.app`
    : "";


  /* =====================
     RENDER
  ===================== */

  return (
    <div className="space-y-8 max-w-3xl">

      <h1 className="text-3xl font-semibold">Settings</h1>

      {/* IDENTIDAD */}
      <Card>
        <CardHeader>
          <CardTitle>Business Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Business Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Logo</Label>
            {form.logo_url && (
              <img src={form.logo_url} className="h-16 mb-2" />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleLogoUpload(e.target.files[0])
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
  <CardHeader>
    <CardTitle>Menu QR Code</CardTitle>
    <p className="text-sm text-muted-foreground">
      Customers can scan this QR to view your digital menu
    </p>
  </CardHeader>

  <CardContent className="flex flex-col items-center gap-4">
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <QRCodeCanvas
        id="menu-qr"
        value={menuUrl}
        size={220}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
    </div>
    <p className="text-xs text-muted-foreground break-all">
        {menuUrl}
    </p>

    <Button
      variant="outline"
      onClick={() => {
        const canvas = document.getElementById("menu-qr") as HTMLCanvasElement;
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");

        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "menu-qr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }}
    >
      Download QR
    </Button>
  </CardContent>
</Card>


      {/* DISEÑO */}
      <Card>
        <CardHeader>
          <CardTitle>Design</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Theme</Label>
          <select
            value={form.theme}
            onChange={(e) => updateField("theme", e.target.value)}
            className="mt-2 w-full border rounded-md p-2"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="warm">Warm</option>
          </select>
        </CardContent>
      </Card>

      {/* CONTACTO */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <p className="text-sm text-muted-foreground">
          This information will be displayed at the top of the menu.
          </p>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <Label className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone
            </Label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </Label>
            <Input
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label className="flex items-center gap-2">
              <Instagram className="w-4 h-4" /> Instagram
            </Label>
            <Input
              name="instagram_url"
              value={form.instagram_url}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label className="flex items-center gap-2">
              <Globe className="w-4 h-4" /> Website
            </Label>
            <Input
              name="website_url"
              value={form.website_url}
              onChange={handleChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* HORARIOS */}
      <Card>
        <CardHeader>
          <CardTitle>Open Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            name="opening_hours"
            value={form.opening_hours}
            onChange={handleChange}
          />
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Guardando..." : "Guardar cambios"}
      </Button>
    </div>
  );
}
