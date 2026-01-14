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
     FETCH MENU
  ===================== */

  const fetchMenu = async () => {
    setLoading(true);

    const slug = getBusinessSlug();
    if (!slug) {
      setLoading(false);
      return;
    }

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

    const categoryIds = catData.map((c) => c.id);

    const { data: itemData } = await supabase
      .from("menu_items")
      .select(
        "id, name, description, price, image_url, available, category_id, position"
      )
      .in("category_id", categoryIds)
      .order("position");

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
     INITIAL LOAD + FOCUS
  ===================== */

  useEffect(() => {
    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("focus", fetchMenu);
    return () => window.removeEventListener("focus", fetchMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =====================
     APPLY THEME (✅ HSL)
  ===================== */

  useEffect(() => {
    if (!business) return;
  
    const theme = THEMES[business.theme ?? "dark"];
    const root = document.documentElement;
  
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--foreground", theme.foreground);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--muted-foreground", theme.mutedForeground ?? theme.foreground);
    root.style.setProperty("--border", theme.border ?? "0 0% 0%");
    root.style.setProperty("--card", theme.card ?? theme.background);
  }, [business?.theme]);
  

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
        if (ref && scrollPos >= ref.offsetTop) current = cat.id;
      }

      setActiveCategory(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories]);

  /* =====================
     CLOSE MODAL (ESC)
  ===================== */

  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedItem]);

  /* =====================
     RENDER
  ===================== */

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-opacity duration-500 ${
        pageReady ? "opacity-100" : "opacity-0"
      }`}
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
        <p className="text-muted-foreground text-center">
          {COPY.en.product.tagline}
        </p>
      </div>

      {/* TABS */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border">
        <div className="container-platix flex gap-6 overflow-x-auto py-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              ref={setTabRef(cat.id)}
              onClick={() => handleCategoryClick(cat.id)}
              className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeCategory === cat.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-primary"
              }`}
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
              <h2 className="text-3xl font-serif mb-4 text-primary">
                {category.title}
              </h2>

              <Separator className="mb-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items
                  .filter((i) => i.available)
                  .map((item) => (
                    <Card
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="cursor-pointer transition hover:shadow-xl"
                    >
                      <CardHeader>
                        <CardTitle className="text-xl">
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

                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>

                        <p className="text-lg font-semibold text-primary">
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

      {/* MODAL (✅ usa theme, no hardcode) */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70"
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedItem(null)
          }
        >
          <div className="rounded-2xl max-w-md w-full overflow-hidden border border-border bg-card text-card-foreground">
            {selectedItem.image ? (
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full max-h-72 object-cover"
              />
            ) : (
              <div className="w-full h-56 bg-muted flex items-center justify-center">
                {business?.logo_url ? (
                  <img
                    src={business.logo_url}
                    alt={business.name}
                    className="h-16 opacity-70"
                  />
                ) : null}
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-serif mb-2 text-primary">
                {selectedItem.name}
              </h3>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {selectedItem.description}
              </p>

              <p className="text-xl font-semibold text-primary">
                {selectedItem.price}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                  onClick={() => setSelectedItem(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
