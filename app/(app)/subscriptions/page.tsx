"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { copy, formatRM, formatDate, daysUntil } from "@/lib/copy";
import {
  MOCK_SUBSCRIPTIONS,
  getTotalMonthlyBurn,
  getCategoryBreakdown,
  CATEGORY_LABELS_BM,
  CATEGORY_LABELS_EN,
  type SubscriptionCategory,
} from "@/lib/mock-data";
import {
  Plus,
  Download,
  TrendingUp,
  Calendar,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Filter,
} from "lucide-react";

const CATEGORIES: SubscriptionCategory[] = [
  "utilities",
  "design",
  "marketing",
  "production",
  "website",
  "other",
];

const CATEGORY_COLORS: Record<SubscriptionCategory, string> = {
  utilities: "#3b82f6",
  design: "#a855f7",
  marketing: "#f59e0b",
  production: "#22c55e",
  website: "#06b6d4",
  other: "#6b7280",
};

export default function SubscriptionsPage() {
  const { lang } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<SubscriptionCategory | "all">("all");
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  const categoryLabels = lang === "bm" ? CATEGORY_LABELS_BM : CATEGORY_LABELS_EN;

  const filtered = MOCK_SUBSCRIPTIONS.filter((s) => {
    const matchesCategory = activeFilter === "all" || s.category === activeFilter;
    const matchesActive = !showActiveOnly || s.isActive;
    return matchesCategory && matchesActive;
  });

  const totalBurn = getTotalMonthlyBurn(MOCK_SUBSCRIPTIONS);
  const categoryBreakdown = getCategoryBreakdown(MOCK_SUBSCRIPTIONS);

  const handleExportCSV = () => {
    const headers = ["Service", "Category", "Cost (RM)", "Renewal Date", "Billing Source", "Status"];
    const rows = MOCK_SUBSCRIPTIONS.map((s) => [
      s.serviceName,
      categoryLabels[s.category],
      s.cost.toString(),
      s.renewalDate,
      s.billingSource,
      s.isActive ? (lang === "bm" ? "Aktif" : "Active") : (lang === "bm" ? "Tidak Aktif" : "Inactive"),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscriptions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>
            {copy.subscriptions.title[lang]}
          </h1>
          <p style={{ fontSize: "0.875rem", margin: "0.25rem 0 0", color: "var(--color-text-muted)" }}>
            {copy.subscriptions.subtitle[lang]}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={handleExportCSV} className="btn btn-secondary btn-sm" style={{ gap: "0.375rem" }}>
            <Download size={15} />
            {copy.subscriptions.export_csv[lang]}
          </button>
          <button className="btn btn-primary btn-sm" style={{ gap: "0.375rem" }}>
            <Plus size={15} />
            {copy.subscriptions.add_subscription[lang]}
          </button>
        </div>
      </div>

      {/* Monthly Burn Hero Card */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 70%, var(--color-dark)) 100%)",
          borderRadius: "var(--radius-xl)",
          padding: "1.5rem",
          marginBottom: "1.25rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: 60,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <TrendingUp size={16} color="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
              {copy.subscriptions.monthly_total[lang]}
            </span>
          </div>
          <div
            style={{
              fontSize: "clamp(2rem, 6vw, 3rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: "0.875rem",
            }}
          >
            {formatRM(totalBurn)}
          </div>

          {/* Category mini breakdown */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {Object.entries(categoryBreakdown)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 4)
              .map(([cat, amount]) => (
                <div
                  key={cat}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    padding: "0.25rem 0.625rem",
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "var(--radius-full)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: CATEGORY_COLORS[cat as SubscriptionCategory],
                    }}
                  />
                  <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#fff" }}>
                    {categoryLabels[cat as SubscriptionCategory]} · {formatRM(amount)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.25rem",
          overflowX: "auto",
          paddingBottom: "0.25rem",
          scrollbarWidth: "none",
        }}
      >
        <button
          onClick={() => setActiveFilter("all")}
          className={`btn btn-sm ${activeFilter === "all" ? "btn-primary" : "btn-secondary"}`}
          style={{ flexShrink: 0 }}
        >
          {lang === "bm" ? "Semua" : "All"}
        </button>
        {CATEGORIES.map((cat) => {
          const hasItems = MOCK_SUBSCRIPTIONS.some((s) => s.category === cat && s.isActive);
          if (!hasItems) return null;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`btn btn-sm ${activeFilter === cat ? "btn-primary" : "btn-secondary"}`}
              style={{ flexShrink: 0 }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: CATEGORY_COLORS[cat],
                  display: "inline-block",
                }}
              />
              {categoryLabels[cat]}
            </button>
          );
        })}

        {/* Active toggle */}
        <button
          onClick={() => setShowActiveOnly(!showActiveOnly)}
          className={`btn btn-sm ${showActiveOnly ? "btn-secondary" : "btn-secondary"}`}
          style={{
            flexShrink: 0,
            marginLeft: "auto",
            gap: "0.375rem",
            borderColor: showActiveOnly ? "var(--color-primary)" : "var(--color-border-strong)",
            color: showActiveOnly ? "var(--color-primary)" : "var(--color-text-secondary)",
          }}
        >
          <Filter size={13} />
          {showActiveOnly
            ? lang === "bm" ? "Aktif sahaja" : "Active only"
            : lang === "bm" ? "Semua status" : "All status"}
        </button>
      </div>

      {/* Subscription List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <CreditCard size={28} />
          </div>
          <h3 style={{ fontSize: "1.125rem", margin: 0 }}>
            {copy.subscriptions.empty_title[lang]}
          </h3>
          <p style={{ margin: 0, maxWidth: 300 }}>
            {copy.subscriptions.empty_desc[lang]}
          </p>
          <button className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
            <Plus size={16} />
            {copy.subscriptions.add_subscription[lang]}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {filtered.map((sub) => {
            const days = daysUntil(sub.renewalDate);
            const isUrgent = days <= 7 && days >= 0;
            const isPast = days < 0;

            return (
              <div
                key={sub.id}
                className="card"
                style={{
                  padding: "1rem 1.125rem",
                  opacity: sub.isActive ? 1 : 0.55,
                  borderLeft: isUrgent
                    ? "3px solid var(--color-warning)"
                    : "1px solid var(--color-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  {/* Category color dot */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "var(--radius-md)",
                      background: `${CATEGORY_COLORS[sub.category]}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: `1px solid ${CATEGORY_COLORS[sub.category]}30`,
                    }}
                  >
                    <CreditCard size={18} color={CATEGORY_COLORS[sub.category]} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                      <div>
                        <h4
                          style={{
                            fontSize: "0.9375rem",
                            fontWeight: 600,
                            color: "var(--color-text-primary)",
                            margin: "0 0 0.2rem",
                          }}
                        >
                          {sub.serviceName}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            className="badge"
                            style={{
                              background: `${CATEGORY_COLORS[sub.category]}18`,
                              color: CATEGORY_COLORS[sub.category],
                              borderColor: `${CATEGORY_COLORS[sub.category]}30`,
                              border: "1px solid",
                            }}
                          >
                            {categoryLabels[sub.category]}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                            {sub.billingSource}
                          </span>
                        </div>
                      </div>

                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: "1.0625rem",
                            fontWeight: 700,
                            color: "var(--color-text-primary)",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {formatRM(sub.cost)}
                        </div>
                        <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>
                          {copy.common.per_month[lang]}
                        </span>
                      </div>
                    </div>

                    {/* Renewal info */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {isUrgent ? (
                        <AlertTriangle size={12} color="var(--color-warning)" />
                      ) : isPast ? (
                        <AlertTriangle size={12} color="var(--color-danger)" />
                      ) : (
                        <Calendar size={12} color="var(--color-text-muted)" />
                      )}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: isUrgent
                            ? "var(--color-warning)"
                            : isPast
                            ? "var(--color-danger)"
                            : "var(--color-text-muted)",
                        }}
                      >
                        {copy.subscriptions.renews_on[lang]}: {formatDate(sub.renewalDate, lang)}
                        {isUrgent && ` (${days} ${copy.common.days_left[lang]})`}
                      </span>

                      {/* Active badge */}
                      <span className="sr-only">{sub.isActive ? "active" : "inactive"}</span>
                      {!sub.isActive && (
                        <span className="badge badge-neutral" style={{ marginLeft: "auto" }}>
                          {copy.subscriptions.inactive[lang]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary footer */}
      {filtered.length > 0 && (
        <div
          style={{
            marginTop: "1.25rem",
            padding: "0.875rem 1.125rem",
            background: "var(--color-surface-raised)",
            borderRadius: "var(--radius-lg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            {filtered.length} {lang === "bm" ? "langganan ditunjuk" : "subscriptions shown"}
          </span>
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-primary)" }}>
            {formatRM(filtered.filter((s) => s.isActive).reduce((a, s) => a + s.cost, 0))} {copy.common.per_month[lang]}
          </span>
        </div>
      )}
    </div>
  );
}
