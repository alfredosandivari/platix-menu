"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getBusinessSlug } from "@/lib/domain";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* =====================
   TYPES
===================== */

interface Stats {
  categories: number;
  items: number;
  itemsWithoutImage: number;
  itemsUnavailable: number;
}

interface RecentItem {
  id: string;
  name: string;
  updated_at: string;
}

/* =====================
   PAGE
===================== */

export default function AdminDashboard() {
  const [businessName, setBusinessName] = useState("");
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    categories: 0,
    items: 0,
    itemsWithoutImage: 0,
    itemsUnavailable: 0,
  });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* =====================
     LOAD DASHBOARD
  ===================== */

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const slug = getBusinessSlug();
        if (!slug) {
          console.error("No se pudo resolver slug");
          return;
        }

        // 1️⃣ Business
        const { data: business, error: businessError } = await supabase
          .from("businesses")
          .select("id, name")
          .eq("slug", slug)
          .single();

        if (businessError || !business) {
          console.error("Business no encontrado");
          return;
        }

        setBusinessId(business.id);
        setBusinessName(business.name);

        /* =====================
           STATS
        ===================== */

        // Categorías
        const { data: categoryIds, count: categoriesCount } =
          await supabase
            .from("menu_categories")
            .select("id", { count: "exact" })
            .eq("business_id", business.id);

        const ids = categoryIds?.map((c) => c.id) ?? [];

        if (ids.length === 0) {
          setStats({
            categories: categoriesCount ?? 0,
            items: 0,
            itemsWithoutImage: 0,
            itemsUnavailable: 0,
          });
          setRecentItems([]);
          return;
        }

        // Total productos
        const { count: itemsCount } = await supabase
          .from("menu_items")
          .select("id", { count: "exact", head: true })
          .in("category_id", ids);

        // Productos sin imagen
        const { count: noImageCount } = await supabase
          .from("menu_items")
          .select("id", { count: "exact", head: true })
          .in("category_id", ids)
          .is("image_url", null);

        // Productos no disponibles
        const { count: unavailableCount } = await supabase
          .from("menu_items")
          .select("id", { count: "exact", head: true })
          .in("category_id", ids)
          .eq("available", false);

        // Últimos productos editados
        const { data: recent } = await supabase
          .from("menu_items")
          .select("id, name, updated_at")
          .in("category_id", ids)
          .order("updated_at", { ascending: false })
          .limit(5);

        setStats({
          categories: categoriesCount ?? 0,
          items: itemsCount ?? 0,
          itemsWithoutImage: noImageCount ?? 0,
          itemsUnavailable: unavailableCount ?? 0,
        });

        setRecentItems(recent ?? []);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
        alert("No se pudo cargar el dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Administración de{" "}
          <span className="font-medium">{businessName}</span>
        </p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Cargando información...</p>
      ) : (
        <>
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Categorías</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{stats.categories}</p>
                <p className="text-sm text-muted-foreground">
                  Categorías activas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{stats.items}</p>
                <p className="text-sm text-muted-foreground">
                  Total productos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sin imagen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-amber-500">
                  {stats.itemsWithoutImage}
                </p>
                <p className="text-sm text-muted-foreground">
                  Requieren imagen
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>No disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-red-500">
                  {stats.itemsUnavailable}
                </p>
                <p className="text-sm text-muted-foreground">
                  Fuera de carta
                </p>
              </CardContent>
            </Card>
          </div>

          {/* RECENT ITEMS */}
          <Card>
            <CardHeader>
              <CardTitle>Últimos productos modificados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentItems.length === 0 ? (
                <p className="text-muted-foreground">
                  No hay productos recientes.
                </p>
              ) : (
                recentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">
                      {new Date(item.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
