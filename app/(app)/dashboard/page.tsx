"use client";

import { useAppStore } from "@/lib/store";
import { copy, formatRM, getGreeting, daysUntil, formatDate } from "@/lib/copy";
import {
  MOCK_SUBSCRIPTIONS,
  MOCK_FOLDERS,
  MOCK_PRODUCTS,
  MOCK_RESOURCES,
  getTotalMonthlyBurn,
  getUpcomingRenewals,
  getExpiringDocs,
} from "@/lib/mock-data";
import {
  FolderOpen,
  CreditCard,
  Package,
  Plus,
  Search,
  Bell,
  AlertTriangle,
  TrendingUp,
  Command,
  ArrowRight,
  Calendar,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { lang, toggleLang, toggleCommandBar, activeWorkspace } = useAppStore();

  const monthlyBurn = getTotalMonthlyBurn(MOCK_SUBSCRIPTIONS);
  const upcomingRenewals = getUpcomingRenewals(MOCK_SUBSCRIPTIONS, 7);
  const expiringDocs = getExpiringDocs(MOCK_RESOURCES, 30);
  const activeSubs = MOCK_SUBSCRIPTIONS.filter((s) => s.isActive).length;

  const greeting = getGreeting(lang);
  const firstName = activeWorkspace.name.split(" ")[0];

  return (
    <div className="page-container">
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1.75rem",
          gap: "1rem",
        }}
      >
        <div>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>
            {greeting} 👋
          </p>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {firstName}
            <span style={{ color: "var(--color-primary)" }}>.</span>
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* BM/EN Toggle */}
          <button
            onClick={toggleLang}
            className="btn btn-secondary btn-sm"
            title={lang === "bm" ? "Switch to English" : "Tukar ke BM"}
          >
            <span style={{ fontWeight: 700, color: "var(--color-primary)" }}>
              {lang === "bm" ? "BM" : "EN"}
            </span>
            <span style={{ color: "var(--color-text-muted)" }}>
              {lang === "bm" ? "→ EN" : "→ BM"}
            </span>
          </button>

          {/* Notification bell */}
          <button className="btn-icon btn btn-secondary" style={{ position: "relative" }}>
            <Bell size={18} />
            {(upcomingRenewals.length > 0 || expiringDocs.length > 0) && (
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  background: "var(--color-primary)",
                  borderRadius: "50%",
                  border: "2px solid var(--color-bg)",
                }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Command Bar Prompt */}
      <button
        onClick={toggleCommandBar}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.875rem 1rem",
          background: "var(--color-surface)",
          border: "1.5px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          cursor: "pointer",
          marginBottom: "1.75rem",
          transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
          color: "var(--color-text-muted)",
          fontSize: "0.9375rem",
          textAlign: "left",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-primary)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px var(--color-primary-muted)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }}
      >
        <Search size={18} />
        <span style={{ flex: 1 }}>
          {copy.dashboard.search_placeholder[lang]}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.25rem 0.5rem",
            background: "var(--color-surface-raised)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border)",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--color-text-muted)",
          }}
        >
          <Command size={11} />
          <span>K</span>
        </div>
      </button>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.875rem",
          marginBottom: "1.75rem",
        }}
      >
        {/* Monthly Burn */}
        <div className="stat-card" style={{ gridColumn: "span 2" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "0.375rem",
                }}
              >
                {copy.dashboard.monthly_burn[lang]}
              </p>
              <div
                style={{
                  fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                  fontWeight: 800,
                  color: "var(--color-text-primary)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {formatRM(monthlyBurn)}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                background: "var(--color-primary-muted)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <TrendingUp size={20} color="var(--color-primary)" />
            </div>
          </div>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", margin: 0 }}>
            {lang === "bm"
              ? `Daripada ${activeSubs} langganan aktif bulan ini`
              : `From ${activeSubs} active subscriptions this month`}
          </p>
        </div>

        {/* Active Subscriptions */}
        <div className="stat-card">
          <div
            style={{
              width: 40,
              height: 40,
              background: "var(--color-secondary-muted)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.875rem",
            }}
          >
            <CreditCard size={18} color="var(--color-secondary)" />
          </div>
          <div
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1,
              marginBottom: "0.25rem",
            }}
          >
            {activeSubs}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: 0 }}>
            {copy.dashboard.active_subscriptions[lang]}
          </p>
        </div>

        {/* Products */}
        <div className="stat-card">
          <div
            style={{
              width: 40,
              height: 40,
              background: "var(--color-dark-muted)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.875rem",
            }}
          >
            <Package size={18} color="var(--color-dark)" style={{ filter: "brightness(2)" }} />
          </div>
          <div
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1,
              marginBottom: "0.25rem",
            }}
          >
            {MOCK_PRODUCTS.filter((p) => p.status === "active").length}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: 0 }}>
            {copy.dashboard.total_products[lang]}
          </p>
        </div>

        {/* Folders */}
        <div className="stat-card" style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "var(--color-primary-muted)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FolderOpen size={18} color="var(--color-primary)" />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--color-text-primary)",
                    lineHeight: 1,
                  }}
                >
                  {MOCK_FOLDERS.length}
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: 0 }}>
                  {copy.dashboard.total_folders[lang]}
                </p>
              </div>
            </div>
            <Link href="/masterlist" className="btn btn-ghost btn-sm" style={{ gap: "0.25rem" }}>
              {copy.common.view_all[lang]}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {(upcomingRenewals.length > 0 || expiringDocs.length > 0) && (
        <div style={{ marginBottom: "1.75rem" }}>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              marginBottom: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Bell size={16} color="var(--color-primary)" />
            {lang === "bm" ? "Perlu Perhatian" : "Needs Attention"}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {upcomingRenewals.map((sub) => {
              const days = daysUntil(sub.renewalDate);
              return (
                <div
                  key={sub.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "0.875rem 1rem",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderLeft: "3px solid var(--color-secondary)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "var(--color-secondary-muted)",
                      borderRadius: "var(--radius-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Calendar size={16} color="var(--color-secondary)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {sub.serviceName}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                      {lang === "bm"
                        ? `Baharui dalam ${days} hari — ${formatRM(sub.cost)}`
                        : `Renews in ${days} days — ${formatRM(sub.cost)}`}
                    </div>
                  </div>
                  <span className="badge badge-warning">
                    {days === 0 ? (lang === "bm" ? "Hari ini" : "Today") : `${days}d`}
                  </span>
                </div>
              );
            })}

            {expiringDocs.map((doc) => {
              const days = daysUntil(doc.expiryDate!);
              return (
                <div
                  key={doc.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "0.875rem 1rem",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderLeft: "3px solid var(--color-danger)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "rgba(239,68,68,0.1)",
                      borderRadius: "var(--radius-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <AlertTriangle size={16} color="var(--color-danger)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {doc.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                      {lang === "bm"
                        ? `Tamat dalam ${days} hari`
                        : `Expires in ${days} days`}
                    </div>
                  </div>
                  <span className="badge badge-danger">{days}d</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            marginBottom: "0.875rem",
          }}
        >
          {copy.dashboard.quick_add[lang]}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.625rem" }}>
          <Link
            href="/masterlist"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 0.75rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-primary)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-primary-muted)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-surface)";
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "var(--color-primary-muted)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText size={18} color="var(--color-primary)" />
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {copy.dashboard.add_resource[lang]}
            </span>
          </Link>

          <Link
            href="/subscriptions"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 0.75rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-secondary)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-secondary-muted)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-surface)";
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "var(--color-secondary-muted)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CreditCard size={18} color="var(--color-secondary)" />
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {copy.dashboard.add_subscription[lang]}
            </span>
          </Link>

          <Link
            href="/products"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 0.75rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-dark)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-dark-muted)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-surface)";
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "var(--color-dark-muted)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Package size={18} color="var(--color-dark)" style={{ filter: "brightness(2.5)" }} />
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {copy.dashboard.add_product[lang]}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
