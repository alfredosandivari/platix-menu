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

interface Business {
  id: string;
  name: string;
  logo_url: string | null;
}

interface Stats {
  categories: number;
  items: number;
  itemsWithoutImage: number;
  itemsUnavailable: number;
}

interface RecentItem {
  id: string;
  name: string;
  created_at: string;
}

/* =====================
   PAGE
===================== */

export default function AdminDashboard() {
  const [business, setBusiness] = useState<Business | null>(null);
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

        /* =====================
           BUSINESS
        ===================== */

        const { data: businessData, error: businessError } = await supabase
          .from("businesses")
          .select("id, name, logo_url")
          .eq("slug", slug)
          .single();

        if (businessError || !businessData) {
          console.error("Business no encontrado");
          return;
        }

        setBusiness(businessData);
        const businessId = businessData.id;

        /* =====================
           CATEGORIES
        ===================== */

        const {
          data: categories,
          count: categoriesCount,
        } = await supabase
          .from("menu_categories")
          .select("id", { count: "exact" })
          .eq("business_id", businessId);

        const categoryIds = categories?.map((c) => c.id) ?? [];

        if (categoryIds.length === 0) {
          setStats({
            categories: categoriesCount ?? 0,
            items: 0,
            itemsWithoutImage: 0,
            itemsUnavailable: 0,
          });
          setRecentItems([]);
          return;
        }

        /* =====================
           ITEMS STATS
        ===================== */

        const { count: itemsCount } = await supabase
          .from("menu_items")
          .select("id", { count: "exact", head: true })
          .in("category_id", categoryIds);

        const { count: noImageCount } = await supabase
          .from("menu_items")
          .select("id", { count: "exact", head: true })
          .in("category_id", categoryIds)
          .is("image_url", null);

        const { count: unavailableCount } = await supabase
          .from("menu_items")
          .select("id", { count: "exact", head: true })
          .in("category_id", categoryIds)
          .eq("available", false);

        /* =====================
           RECENT ITEMS
        ===================== */

        const { data: recent, error: recentError } = await supabase
          .from("menu_items")
          .select("id, name, created_at")
          .in("category_id", categoryIds)
          .order("created_at", { ascending: false })
          .limit(5);

        if (recentError) {
          console.error("Error recent items:", recentError);
        }

        setStats({
          categories: categoriesCount ?? 0,
          items: itemsCount ?? 0,
          itemsWithoutImage: noImageCount ?? 0,
          itemsUnavailable: unavailableCount ?? 0,
        });

        setRecentItems(recent ?? []);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
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
      <div className="flex items-start justify-between gap-6">
        {/* LEFT: Title */}
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">
            Administración de{" "}
            <span className="font-medium">{business?.name}</span>
          </p>
        </div>

        {/* RIGHT: Business logo */}
        {business?.logo_url && (
          <div className="flex items-center">
            <img
              src={business.logo_url}
              alt={business.name}
              className="h-10 md:h-12 w-auto object-contain opacity-80"
            />
          </div>
        )}
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
              <CardTitle>Últimos productos agregados</CardTitle>
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
                      {new Date(item.created_at).toLocaleDateString()}
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
