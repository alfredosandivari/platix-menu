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

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});


  /* =====================
     FETCH MENU
  ===================== */

  const fetchMenu = async () => {
    setLoading(true);

    const slug = getBusinessSlug();
    if (!slug) return;

    const { data: business } = await supabase
      .from("businesses")
      .select("id, name, logo_url, theme")
      .eq("slug", slug)
      .single();

    if (!business) return;
    setBusiness(business);

    const { data: catData } = await supabase
      .from("menu_categories")
      .select("id, title, position")
      .eq("business_id", business.id)
      .order("position");

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

  useEffect(() => {
    fetchMenu();
    window.addEventListener("focus", fetchMenu);
    return () => window.removeEventListener("focus", fetchMenu);
  }, []);

  /* =====================
     THEME (SINGLE SOURCE)
  ===================== */
  const themeKey = business?.theme && THEMES[business.theme]
  ? business.theme
  : "dark";

  const theme = THEMES[themeKey];


  /* =====================
     SCROLL
  ===================== */

  const handleCategoryClick = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 120, behavior: "smooth" });
  };

  useEffect(() => {
    if (!categories.length) return;
  
    const onScroll = () => {
      const scrollPos = window.scrollY + 160;
      let current = categories[0].id;
  
      for (const cat of categories) {
        const el = sectionRefs.current[cat.id];
        if (el && scrollPos >= el.offsetTop) {
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
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {/* HEADER */}
      <div className="container-platix pt-10 pb-6 flex flex-col items-center">
        {business?.logo_url && (
          <img src={business.logo_url} className="h-20 mb-4" />
        )}
        <p style={{ color: theme.mutedText }}>
          {COPY.en.product.tagline}
        </p>
      </div>

      {/* TABS */}
      <div
        className="sticky top-0 z-20 backdrop-blur"
        style={{
          backgroundColor: theme.bg,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div className="container-platix flex gap-6 py-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              style={{
                color:
                  activeCategory === cat.id
                    ? theme.primary
                    : theme.mutedText,
                borderBottom:
                  activeCategory === cat.id
                    ? `2px solid ${theme.primary}`
                    : "2px solid transparent",
              }}
              className="pb-2 whitespace-nowrap"
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="container-platix py-12">
        {categories.map((category) => (
          <section
            key={category.id}
            ref={(el) => (sectionRefs.current[category.id] = el)}
            className="mb-24"
          >
            <h2
              className="text-3xl mb-4"
              style={{ color: theme.primary }}
            >
              {category.title}
            </h2>

            <Separator style={{ opacity: 0.2 }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {category.items.map((item) => (
                <Card
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  style={{
                    backgroundColor: theme.card,
                    color: theme.text,
                    border: `1px solid ${theme.border}`,
                  }}
                  className="cursor-pointer"
                >
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={item.image ?? business?.logo_url ?? ""}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                    <p style={{ color: theme.mutedText }}>
                      {item.description}
                    </p>
                    <p
                      className="mt-2 font-semibold"
                      style={{ color: theme.primary }}
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

      {/* MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedItem(null)
          }
        >
          <div
            className="rounded-2xl max-w-md w-full overflow-hidden"
            style={{
              backgroundColor: theme.card,
              color: theme.text,
            }}
          >
            {selectedItem.image && (
              <img
                src={selectedItem.image}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-6">
              <h3 style={{ color: theme.primary }}>
                {selectedItem.name}
              </h3>
              <p style={{ color: theme.mutedText }}>
                {selectedItem.description}
              </p>
              <p
                className="mt-2 font-semibold"
                style={{ color: theme.primary }}
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
