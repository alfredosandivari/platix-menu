"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getBusinessSlug } from "@/lib/domain";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { optimizeImage } from "@/utils/optimizeImage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* =====================
   TYPES
===================== */

interface Category {
  id: string;
  title: string;
}

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image_url?: string | null;
  category_id: string;
}

/* =====================
   PAGE
===================== */

export default function AdminItemsPage() {
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    available: true,
  });

  const [businessLogo, setBusinessLogo] = useState<string | null>(null);


  /* =====================
     FETCH DATA
  ===================== */

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const slug = getBusinessSlug();
    if (!slug) {
      console.error("No se pudo resolver el slug");
      return;
    }

    // 1️⃣ Business
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id, logo_url")
      .eq("slug", slug)
      .single();

    if (businessError || !business) {
      console.error("Business no encontrado");
      return;
    }

    setBusinessId(business.id);
    setBusinessLogo(business.logo_url ?? null);

    // 2️⃣ Categories
    const { data: cats } = await supabase
      .from("menu_categories")
      .select("id, title")
      .eq("business_id", business.id)
      .order("position");

    const categoryIds = (cats ?? []).map((c) => c.id);

    // 3️⃣ Items
    const { data: itemsData } = await supabase
      .from("menu_items")
      .select("*")
      .in("category_id", categoryIds)
      .order("created_at", { ascending: false });

    setCategories(cats ?? []);
    setItems(itemsData ?? []);
  };

  /* =====================
     CREATE
  ===================== */

  const handleCreate = async () => {
    if (!form.name || !form.price || !form.categoryId) {
      alert("Completa nombre, precio y categoría");
      return;
    }

    let imageUrl: string | null = null;

    if (imageFile) {
      const optimized = await optimizeImage(imageFile);
      imageUrl = await uploadImageToCloudinary(optimized, "menu-items");
    }

    await supabase.from("menu_items").insert({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category_id: form.categoryId,
      available: form.available,
      image_url: imageUrl,
    });

    setForm({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      available: true,
    });
    setImageFile(null);

    fetchData();
  };

  /* =====================
     EDIT
  ===================== */

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setImageFile(null);
    setForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
      categoryId: item.category_id,
      available: item.available,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setImageFile(null);
  };

  const saveEdit = async (item: Item) => {
    let imageUrl = item.image_url ?? null;

    if (imageFile) {
      const optimized = await optimizeImage(imageFile);
      imageUrl = await uploadImageToCloudinary(optimized, "menu-items");
    }

    await supabase
      .from("menu_items")
      .update({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category_id: form.categoryId,
        available: form.available,
        image_url: imageUrl,
      })
      .eq("id", item.id);

    cancelEdit();
    fetchData();
  };

  /* =====================
     DELETE
  ===================== */

  const handleDelete = async (item: Item) => {
    const ok = confirm(
      `¿Eliminar "${item.name}"?\n\nEsta acción no se puede deshacer.`
    );
    if (!ok) return;

    await supabase.from("menu_items").delete().eq("id", item.id);

    if (editingId === item.id) cancelEdit();
    fetchData();
  };

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-serif text-gradient-gold">
        Administrar Productos
      </h1>

      {/* NUEVO PRODUCTO */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold">Nuevo producto</h2>

        <div>
          <Label>Nombre</Label>
          <Input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Descripción</Label>
          <Textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Precio</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Categoría</Label>
            <Select
              value={form.categoryId}
              onValueChange={(v) =>
                setForm({ ...form, categoryId: v })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={form.available}
            onCheckedChange={(v) =>
              setForm({ ...form, available: v })
            }
          />
          <Label>Disponible</Label>
        </div>

        <div>
          <Label>Imagen</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files?.[0] || null)
            }
          />
        </div>

        <Button onClick={handleCreate}>Crear producto</Button>
      </div>

      {/* LISTADO */}
      {categories.map((category) => {
        const categoryItems = items.filter(
          (item) => item.category_id === category.id
        );

        if (categoryItems.length === 0) return null;

        return (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-serif text-gradient-gold">
                {category.title}
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            {categoryItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-card p-4 space-y-4"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                  {item.image_url ? (
                  <img
                    src={item.image_url}
                    className="w-full h-full object-cover"
                  />
                ) : businessLogo ? (
                  <img
                    src={businessLogo}
                    alt="Business logo"
                    className="h-10 opacity-60"
                  />
                ) : null}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-1 font-medium">
                      ${item.price}
                    </p>
                  </div>

                  <Switch
                    checked={item.available}
                    onCheckedChange={async (v) => {
                      await supabase
                        .from("menu_items")
                        .update({ available: v })
                        .eq("id", item.id);
                      fetchData();
                    }}
                  />

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(item)}
                  >
                    Editar
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item)}
                  >
                    Eliminar
                  </Button>
                </div>

                {editingId === item.id && (
                  <div className="pt-4 border-t border-border space-y-4">
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                    <Textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          description: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          price: e.target.value,
                        })
                      }
                    />

                    <Select
                      value={form.categoryId}
                      onValueChange={(v) =>
                        setForm({
                          ...form,
                          categoryId: v,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(
                          e.target.files?.[0] || null
                        )
                      }
                    />

                    <div className="flex gap-3">
                      <Button onClick={() => saveEdit(item)}>
                        Guardar
                      </Button>
                      <Button variant="ghost" onClick={cancelEdit}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
