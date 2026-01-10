"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabaseClient";
import PageShell from "@/components/layout/PageShell";

/* =====================
   TYPES
===================== */

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
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
        <Card key={i} className="bg-card border border-border animate-pulse">
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
     FETCH MENU (DOMAIN BASED)
  ===================== */

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);

      const isLocalhost = window.location.hostname === "localhost";

      const domain =
        isLocalhost && import.meta.env.VITE_DEBUG_DOMAIN
          ? import.meta.env.VITE_DEBUG_DOMAIN
          : window.location.hostname.replace("www.", "");

      /* 1️⃣ Business */
      const { data: business, error: businessError } = await supabase
        .from("businesses")
        .select("id, name")
        .eq("domain", domain)
        .single();

      if (businessError || !business) {
        console.error("Business no encontrado para dominio:", domain);
        setLoading(false);
        setPageReady(true);
        return;
      }

      /* 2️⃣ Categorías */
      const { data: catData, error: catError } = await supabase
        .from("menu_categories")
        .select("id, title, position")
        .eq("business_id", business.id)
        .order("position", { ascending: true });

      if (catError || !catData?.length) {
        setCategories([]);
        setLoading(false);
        setPageReady(true);
        return;
      }

      /* 3️⃣ Items */
      const categoryIds = catData.map((c) => c.id);

      const { data: itemData } = await supabase
        .from("menu_items")
        .select(
          "id, name, description, price, image_url, available, category_id, position"
        )
        .in("category_id", categoryIds)
        .order("position", { ascending: true });

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
            ?.filter((item) => item.category_id === cat.id)
            .map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description ?? "",
              price: formatter.format(item.price ?? 0),
              image: item.image_url || "/placeholderimage.png",
              available: item.available ?? true,
            })) ?? [],
      }));

      setCategories(grouped);
      setActiveCategory(grouped[0]?.id ?? "");
      setLoading(false);
      setTimeout(() => setPageReady(true), 50);
    };

    fetchMenu();
  }, []);

  /* =====================
     SCROLL LOGIC
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

      for (const category of categories) {
        const ref = sectionRefs.current[category.id];
        if (ref && scrollPos >= ref.offsetTop) {
          current = category.id;
        }
      }

      if (current !== activeCategory) {
        setActiveCategory(current);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories, activeCategory]);

  useEffect(() => {
    tabRefs.current[activeCategory]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  }, [activeCategory]);

  /* =====================
     RENDER
  ===================== */

  return (
    <PageShell containerClassName="container-platix">
      <div
        className={`min-h-screen bg-[#000] text-foreground transition-opacity duration-500 ${
          pageReady ? "opacity-100" : "opacity-0"
        }`}
      >

        {/* Volver */}
        <div className="container-platix pt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            ← Volver
          </button>
        </div>

        {/* Header */}
        <div className="container-platix pt-6 pb-6">
          <h1 className="text-4xl md:text-6xl font-serif text-center mb-4 text-gradient-gold">
            Menú
          </h1>
          <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra carta y descubre la experiencia del lugar.
          </p>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border">
          <div className="container-platix flex gap-6 overflow-x-auto py-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-7 w-24 bg-muted rounded-full animate-pulse"
                  />
                ))
              : categories.map((cat) => (
                  <button
                    key={cat.id}
                    ref={setTabRef(cat.id)}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`text-sm font-medium pb-2 border-b-2 ${
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

        {/* Content */}
        {loading ? (
          <SkeletonMenuGrid />
        ) : (
          <div className="container-platix mx-auto py-12">
            {categories.map((cat) => (
              <section
                key={cat.id}
                ref={setSectionRef(cat.id)}
                className="mb-24 scroll-mt-32"
              >
                <h2 className="text-3xl font-serif mb-4 text-gradient-gold">
                  {cat.title}
                </h2>
                <Separator className="mb-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.items
                    .filter((i) => i.available)
                    .map((item) => (
                      <Card
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="cursor-pointer hover:shadow-xl min-h-[420px] flex flex-col"
                      >
                        <CardHeader>
                          <CardTitle>{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent
                          className="flex flex-col flex-1"  
                        >
                        <div className="relative w-full h-48 rounded-md mb-4 overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
                          <img
                            src={item.image || "/menu-placeholder.jpg"}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                          />
                        </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {item.description}
                          </p>
                          <p className="text-lg font-semibold text-gradient-gold">
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

        {/* Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50"
            onClick={(e) => e.target === e.currentTarget && setSelectedItem(null)}
          >
            <div className="bg-background rounded-2xl max-w-md w-full overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full max-h-72 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-2 text-gradient-gold">
                  {selectedItem.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {selectedItem.description}
                </p>
                <p className="text-xl font-semibold text-gradient-gold">
                  {selectedItem.price}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
