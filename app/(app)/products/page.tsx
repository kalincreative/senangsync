"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { copy, formatRM } from "@/lib/copy";
import {
  MOCK_PRODUCTS,
  PRODUCT_CATEGORY_LABELS_BM,
  PRODUCT_CATEGORY_LABELS_EN,
  type ProductCategory,
  type ProductStatus,
} from "@/lib/mock-data";
import {
  Plus,
  Package,
  ExternalLink,
  Tag,
  MoreVertical,
  ShoppingBag,
  Zap,
  Wrench,
} from "lucide-react";

const CATEGORY_ICONS: Record<ProductCategory, React.ReactNode> = {
  physical: <ShoppingBag size={16} />,
  digital: <Zap size={16} />,
  service: <Wrench size={16} />,
};

const CATEGORY_COLORS: Record<ProductCategory, { bg: string; color: string }> = {
  physical: { bg: "rgba(34,197,94,0.12)", color: "#22c55e" },
  digital: { bg: "rgba(168,85,247,0.12)", color: "#a855f7" },
  service: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
};

const STATUS_COLORS: Record<ProductStatus, { bg: string; color: string }> = {
  active: { bg: "rgba(34,197,94,0.1)", color: "#22c55e" },
  draft: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  archived: { bg: "rgba(107,114,128,0.1)", color: "#6b7280" },
};

export default function ProductsPage() {
  const { lang } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");

  const categoryLabels = lang === "bm" ? PRODUCT_CATEGORY_LABELS_BM : PRODUCT_CATEGORY_LABELS_EN;

  const filtered = MOCK_PRODUCTS.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  const activeCounts = {
    all: MOCK_PRODUCTS.length,
    physical: MOCK_PRODUCTS.filter((p) => p.category === "physical").length,
    digital: MOCK_PRODUCTS.filter((p) => p.category === "digital").length,
    service: MOCK_PRODUCTS.filter((p) => p.category === "service").length,
  };

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>
            {copy.products.title[lang]}
          </h1>
          <p style={{ fontSize: "0.875rem", margin: "0.25rem 0 0", color: "var(--color-text-muted)" }}>
            {copy.products.subtitle[lang]}
          </p>
        </div>
        <button className="btn btn-primary btn-sm" style={{ gap: "0.375rem" }}>
          <Plus size={15} />
          {copy.products.add_product[lang]}
        </button>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.625rem",
          marginBottom: "1.25rem",
        }}
      >
        {(["physical", "digital", "service"] as ProductCategory[]).map((cat) => {
          const count = activeCounts[cat];
          const { bg, color } = CATEGORY_COLORS[cat];
          return (
            <div
              key={cat}
              style={{
                padding: "0.875rem",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-md)",
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.5rem",
                  color,
                }}
              >
                {CATEGORY_ICONS[cat]}
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text-primary)", lineHeight: 1 }}>
                {count}
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", marginTop: "0.2rem" }}>
                {categoryLabels[cat]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Category filter */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.25rem",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {(["all", "physical", "digital", "service"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn btn-sm ${activeCategory === cat ? "btn-primary" : "btn-secondary"}`}
            style={{ flexShrink: 0, gap: "0.375rem" }}
          >
            {cat !== "all" && (
              <span style={{ color: activeCategory === cat ? "#fff" : CATEGORY_COLORS[cat].color }}>
                {CATEGORY_ICONS[cat]}
              </span>
            )}
            {cat === "all"
              ? lang === "bm" ? "Semua" : "All"
              : categoryLabels[cat]}
            <span
              style={{
                fontSize: "0.6875rem",
                padding: "0.1rem 0.375rem",
                background: activeCategory === cat ? "rgba(255,255,255,0.2)" : "var(--color-surface-overlay)",
                borderRadius: "var(--radius-full)",
              }}
            >
              {activeCounts[cat]}
            </span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Package size={28} />
          </div>
          <h3 style={{ fontSize: "1.125rem", margin: 0 }}>
            {copy.products.empty_title[lang]}
          </h3>
          <p style={{ margin: 0, maxWidth: 300 }}>
            {copy.products.empty_desc[lang]}
          </p>
          <button className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
            <Plus size={16} />
            {copy.products.add_product[lang]}
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.875rem",
          }}
        >
          {filtered.map((product) => {
            const catStyle = CATEGORY_COLORS[product.category];
            const statusStyle = STATUS_COLORS[product.status];

            return (
              <div
                key={product.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    height: 120,
                    background: `linear-gradient(135deg, ${catStyle.bg.replace("0.12", "0.3")}, ${catStyle.bg})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid var(--color-border)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "var(--radius-xl)",
                      background: catStyle.bg,
                      border: `2px solid ${catStyle.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: catStyle.color,
                    }}
                  >
                    {CATEGORY_ICONS[product.category]}
                  </div>

                  {/* Status badge */}
                  <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
                    <span
                      className="badge"
                      style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                      }}
                    >
                      {product.status === "active"
                        ? copy.products.active[lang]
                        : product.status === "draft"
                        ? copy.products.draft[lang]
                        : copy.products.archived[lang]}
                    </span>
                  </div>

                  {/* Category badge */}
                  <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
                    <span
                      className="badge"
                      style={{
                        background: catStyle.bg,
                        color: catStyle.color,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      {CATEGORY_ICONS[product.category]}
                      {categoryLabels[product.category]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--color-text-primary)",
                        margin: "0 0 0.25rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-muted)",
                        margin: "0 0 0.875rem",
                        lineHeight: 1.5,
                      }}
                      className="truncate-2"
                    >
                      {product.tagline}
                    </p>
                  </div>

                  {/* Price + actions */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 800,
                          color: "var(--color-primary)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {formatRM(product.price)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.375rem" }}>
                      {product.salesUrl && (
                        <a
                          href={product.salesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{ gap: "0.375rem", padding: "0 0.75rem" }}
                        >
                          <ExternalLink size={13} />
                          {lang === "bm" ? "Buka" : "Open"}
                        </a>
                      )}
                      <button className="btn btn-ghost btn-icon-sm">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
