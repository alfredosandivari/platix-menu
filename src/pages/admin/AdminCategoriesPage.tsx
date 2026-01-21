"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getBusinessSlug } from "@/lib/domain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, ArrowDown } from "lucide-react";

/* =====================
   TYPES
===================== */

interface Category {
  id: string;
  title: string;
  position: number;
}

/* =====================
   PAGE
===================== */

export default function AdminCategoriesPage() {
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  /* =====================
     LOAD BUSINESS
  ===================== */

  useEffect(() => {
    const resolveBusiness = async () => {
      const slug = getBusinessSlug();
  
      if (!slug) {
        alert("No se pudo determinar el negocio");
        return;
      }
  
      const { data: business, error } = await supabase
        .from("businesses")
        .select("id")
        .eq("slug", slug)
        .single();
  
      if (error || !business) {
        alert("Negocio no encontrado");
        return;
      }
  
      setBusinessId(business.id);
    };
  
    resolveBusiness();
  }, []);
  

  /* =====================
     FETCH
  ===================== */

  useEffect(() => {
    if (!businessId) return;
    reloadCategories();
  }, [businessId]);

  const reloadCategories = async () => {
    if (!businessId) return;

    const { data } = await supabase
      .from("menu_categories")
      .select("id, title, position")
      .eq("business_id", businessId)
      .order("position");

    setCategories(data ?? []);
  };

  /* =====================
     CREATE
  ===================== */

  const handleAddCategory = async () => {
    if (!newCategory.trim() || !businessId) return;

    const nextPosition =
      categories.length > 0
        ? Math.max(...categories.map((c) => c.position)) + 1
        : 1;

    await supabase.from("menu_categories").insert({
      title: newCategory,
      business_id: businessId,
      position: nextPosition,
    });

    setNewCategory("");
    reloadCategories();
  };

  /* =====================
     DELETE
  ===================== */

  const handleDelete = async (id: string) => {
    const ok = confirm(
      "¿Eliminar esta categoría? También se eliminarán sus productos."
    );
    if (!ok) return;

    await supabase.from("menu_categories").delete().eq("id", id);
    reloadCategories();
  };

  /* =====================
     UPDATE TITLE
  ===================== */

  const saveEdit = async (id: string) => {
    await supabase
      .from("menu_categories")
      .update({ title: editingTitle })
      .eq("id", id);

    setEditingId(null);
    setEditingTitle("");
    reloadCategories();
  };

  /* =====================
     MOVE POSITION
  ===================== */

  const moveCategory = async (
    category: Category,
    direction: "up" | "down"
  ) => {
    const index = categories.findIndex((c) => c.id === category.id);
    const swapWith =
      direction === "up" ? categories[index - 1] : categories[index + 1];

    if (!swapWith) return;

    await supabase
      .from("menu_categories")
      .update({ position: swapWith.position })
      .eq("id", category.id);

    await supabase
      .from("menu_categories")
      .update({ position: category.position })
      .eq("id", swapWith.id);

    reloadCategories();
  };

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="space-y-8 max-w-4xl">
      <h1 className="text-4xl font-serif text-gradient-gold">
        Categories
      </h1>

      {/* ADD */}
      <div className="flex gap-4 max-w-md">
        <Input
          placeholder="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button onClick={handleAddCategory}>Add +</Button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="rounded-xl border border-border bg-card px-6 py-4 flex items-center gap-4"
          >
            {/* POSITION */}
            <span className="w-6 text-muted-foreground text-sm">
              {category.position}
            </span>

            {/* TITLE / EDIT */}
            <div className="flex-1">
              {editingId === category.id ? (
                <Input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
              ) : (
                <span className="text-lg font-medium">
                  {category.title}
                </span>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                disabled={index === 0}
                onClick={() => moveCategory(category, "up")}
              >
                <ArrowUp size={16} />
              </Button>

              <Button
                size="icon"
                variant="outline"
                disabled={index === categories.length - 1}
                onClick={() => moveCategory(category, "down")}
              >
                <ArrowDown size={16} />
              </Button>

              {editingId === category.id ? (
                <Button onClick={() => saveEdit(category.id)}>
                  Guardar
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingId(category.id);
                    setEditingTitle(category.title);
                  }}
                >
                  Editar
                </Button>
              )}

              <Button
                variant="destructive"
                onClick={() => handleDelete(category.id)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <p className="text-muted-foreground">
            No hay categorías creadas.
          </p>
        )}
      </div>
    </div>
  );
}
