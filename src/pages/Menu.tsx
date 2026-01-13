"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabaseClient";
import { COPY } from "@/lib/copy";
import { THEMES } from "@/lib/themes";
import { getBusinessSlug } from "@/lib/domain";

/* =====================
   TYPES
===================== */

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string | null;
  available: boolean;
}

interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

/* =====================
   SKELETON
===================== */

const SkeletonMenuGrid = () => (
  <div className="container-platix py-12 md:py-16">
    <div className="mb-8">
      <div className="h-7 w-40 bg-muted rounded mb-2 animate-pulse" />
      <div className="h-px w-24 bg-muted/60 animate-pulse" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-5 w-3/4 bg-muted rounded" />
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 bg-muted rounded-md mb-4" />
            <div className="h-3 w-full bg-muted rounded mb-2" />
            <div className="h-3 w-2/3 bg-muted rounded mb-4" />
            <div className="h-4 w-20 bg-muted rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

/* =====================
   PAGE
===================== */

export default function MenuPage() {
  const [business, setBusiness] = useState<{
    id: string;
    name: string;
    logo_url: string | null;
    theme: "dark" | "warm" | "light" | null;
  } | null>(null);

  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const setSectionRef =
    (id: string) => (el: HTMLDivElement | null) => {
      sectionRefs.current[id] = el;
    };

  const setTabRef =
    (id: string) => (el: HTMLButtonElement | null) => {
      tabRefs.current[id] = el;
    };

  /* =====================
     FETCH MENU (REUTILIZABLE)
  ===================== */

  const fetchMenu = async () => {
    setLoading(true);

    const slug = getBusinessSlug();
    if (!slug) {
      setLoading(false);
      return;
    }

    // 1️⃣ Business
    const { data: business } = await supabase
      .from("businesses")
      .select("id, name, logo_url, theme")
      .eq("slug", slug)
      .single();

    if (!business) {
      setLoading(false);
      return;
    }

    setBusiness(business);

    // 2️⃣ Categories
    const { data: catData } = await supabase
      .from("menu_categories")
      .select("id, title, position")
      .eq("business_id", business.id)
      .order("position");

    if (!catData?.length) {
      setCategories([]);
      setLoading(false);
      setPageReady(true);
      return;
    }

    // 3️⃣ Items
    const categoryIds = catData.map((c) => c.id);

    const { data: itemData } = await supabase
      .from("menu_items")
      .select(
        "id, name, description, price, image_url, available, category_id, position"
      )
      .in("category_id", categoryIds)
      .order("position");

    const formatter = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });

    const grouped: MenuCategory[] = catData.map((cat) => ({
      id: cat.id,
      title: cat.title,
      items:
        itemData
          ?.filter((i) => i.category_id === cat.id)
          .map((i) => ({
            id: i.id,
            name: i.name,
            description: i.description ?? "",
            price: formatter.format(i.price ?? 0),
            image: i.image_url,
            available: i.available ?? true,
          })) ?? [],
    }));

    setCategories(grouped);
    setActiveCategory(grouped[0]?.id ?? "");
    setLoading(false);
    setTimeout(() => setPageReady(true), 50);
  };

  /* =====================
     INITIAL LOAD
  ===================== */

  useEffect(() => {
    fetchMenu();
  }, []);

  /* =====================
     FIX OPCIÓN A — REFRESH ON FOCUS
  ===================== */

  useEffect(() => {
    const onFocus = () => {
      fetchMenu();
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  /* =====================
     APPLY THEME
  ===================== */

  useEffect(() => {
    if (!business) return;

    const themeKey = business.theme ?? "dark";
    const theme = THEMES[themeKey];

    const root = document.documentElement;

    root.style.setProperty("--background", theme.bg);
    root.style.setProperty("--foreground", theme.text);

    root.style.setProperty("--card", theme.card ?? theme.bg);
    root.style.setProperty("--card-foreground", theme.text);

    root.style.setProperty("--muted-foreground", theme.mutedText ?? "#9CA3AF");

    root.style.setProperty("--border", theme.border ?? "rgba(255,255,255,0.1)");
    root.style.setProperty("--primary", theme.primary);

  }, [business]);

  /* =====================
     SCROLL
  ===================== */

  const handleCategoryClick = (id: string) => {
    const section = sectionRefs.current[id];
    if (!section) return;

    window.scrollTo({
      top: section.offsetTop - 120,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!categories.length) return;

    const onScroll = () => {
      const scrollPos = window.scrollY + 150;
      let current = categories[0].id;

      for (const cat of categories) {
        const ref = sectionRefs.current[cat.id];
        if (ref && scrollPos >= ref.offsetTop) {
          current = cat.id;
        }
      }

      setActiveCategory(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories]);

  /* =====================
     RENDER
  ===================== */

  return (
    <div
      className={`min-h-screen transition-opacity duration-500 ${
        pageReady ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* HEADER */}
      <div className="container-platix pt-10 pb-6 flex flex-col items-center">
        {business?.logo_url && (
          <img
            src={business.logo_url}
            alt={business.name}
            className="h-20 md:h-24 object-contain mb-4"
          />
        )}

        <p className="text-center opacity-70">
          {COPY.en.product.tagline}
        </p>
      </div>

      {/* TABS */}
      <div className="sticky top-0 z-20 backdrop-blur"
           style={{ backgroundColor: "var(--bg-color)" }}>
        <div className="container-platix flex gap-6 overflow-x-auto py-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              ref={setTabRef(cat.id)}
              onClick={() => handleCategoryClick(cat.id)}
              className="pb-2 border-b-2 transition-opacity"
              style={
                activeCategory === cat.id
                  ? {
                      color: "var(--primary-color)",
                      borderColor: "var(--primary-color)",
                    }
                  : {
                      color: "var(--text-color)",
                      opacity: 0.6,
                      borderColor: "transparent",
                    }
              }
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <SkeletonMenuGrid />
      ) : (
        <div className="container-platix py-12 md:py-16">
          {categories.map((category) => (
            <section
              key={category.id}
              ref={setSectionRef(category.id)}
              className="mb-24"
            >
              <h2
                className="text-3xl font-serif mb-4"
                style={{ color: "var(--primary-color)" }}
              >
                {category.title}
              </h2>

              <Separator className="mb-6 opacity-30" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items
                  .filter((i) => i.available)
                  .map((item) => (
                    <Card
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="cursor-pointer transition hover:shadow-xl"
                      style={{
                        backgroundColor:
                          business?.theme === "light"
                            ? "rgba(0,0,0,0.02)"
                            : "rgba(255,255,255,0.03)",
                        border:
                          business?.theme === "light"
                            ? "1px solid rgba(0,0,0,0.06)"
                            : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <CardHeader>
                        <CardTitle
                          className="text-xl font-semibold"
                          style={{ color: "var(--text-color)" }}
                        >
                          {item.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <div className="w-full h-48 rounded-md mb-4 bg-muted flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : business?.logo_url ? (
                            <img
                              src={business.logo_url}
                              alt={business.name}
                              className="h-16 opacity-70"
                            />
                          ) : null}
                        </div>

                        <p className="text-sm opacity-75 mb-2">
                          {item.description}
                        </p>

                        <p
                          className="text-lg font-semibold"
                          style={{ color: "var(--primary-color)" }}
                        >
                          {item.price}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedItem(null)
          }
        >
          <div
            className="rounded-2xl max-w-md w-full overflow-hidden"
            style={{ backgroundColor: "var(--bg-color)" }}
          >
            {selectedItem.image && (
              <img
                src={selectedItem.image}
                className="w-full max-h-72 object-cover"
              />
            )}

            <div className="p-6">
              <h3
                className="text-2xl font-serif mb-2"
                style={{ color: "var(--primary-color)" }}
              >
                {selectedItem.name}
              </h3>

              <p className="opacity-70 mb-4">
                {selectedItem.description}
              </p>

              <p
                className="text-xl font-semibold"
                style={{ color: "var(--primary-color)" }}
              >
                {selectedItem.price}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
