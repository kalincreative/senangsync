"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { copy } from "@/lib/copy";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import {
  LayoutDashboard,
  FolderOpen,
  CreditCard,
  Package,
  Settings,
  Command,
} from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    iconBm: "Papan Pemuka",
    iconEn: "Dashboard",
    key: "dashboard" as const,
    Icon: LayoutDashboard,
  },
  {
    href: "/masterlist",
    iconBm: "Senarai Utama",
    iconEn: "Masterlist",
    key: "masterlist" as const,
    Icon: FolderOpen,
  },
  {
    href: "/subscriptions",
    iconBm: "Langganan",
    iconEn: "Subscriptions",
    key: "subscriptions" as const,
    Icon: CreditCard,
  },
  {
    href: "/products",
    iconBm: "Produk",
    iconEn: "Products",
    key: "products" as const,
    Icon: Package,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { lang, toggleCommandBar, activeWorkspace } = useAppStore();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-md)",
            background: "var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.125rem",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.03em",
            flexShrink: 0,
          }}
        >
          SS
        </div>
        <div>
          <div
            style={{
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              lineHeight: 1.2,
            }}
          >
            SenangSync
          </div>
          <div
            style={{
              fontSize: "0.6875rem",
              color: "var(--color-text-muted)",
              fontWeight: 500,
            }}
          >
            Business OS
          </div>
        </div>
      </div>

      {/* Workspace Switcher */}
      <WorkspaceSwitcher />

      <div className="divider" style={{ margin: "0.75rem 0" }} />

      {/* Command Bar Button */}
      <button
        className="sidebar-item"
        onClick={toggleCommandBar}
        style={{ marginBottom: "0.25rem", width: "100%", textAlign: "left" }}
      >
        <Command size={18} />
        <span style={{ flex: 1 }}>
          {lang === "bm" ? "Cari apa-apa" : "Search anything"}
        </span>
        <span
          style={{
            fontSize: "0.6875rem",
            padding: "0.125rem 0.375rem",
            background: "var(--color-surface-overlay)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-text-muted)",
            fontWeight: 600,
            border: "1px solid var(--color-border)",
          }}
        >
          ⌘K
        </span>
      </button>

      {/* Nav section label */}
      <div className="sidebar-section-label">
        {lang === "bm" ? "Modul" : "Modules"}
      </div>

      {/* Nav Items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
        {NAV_ITEMS.map(({ href, key, Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              {copy.nav[key][lang]}
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      <div className="divider" style={{ margin: "0.75rem 0" }} />

      {/* Settings */}
      <Link
        href="/settings"
        className={`sidebar-item ${pathname.startsWith("/settings") ? "active" : ""}`}
      >
        <Settings size={18} />
        {copy.nav.settings[lang]}
      </Link>

      {/* Active workspace badge */}
      <div
        style={{
          marginTop: "0.5rem",
          padding: "0.625rem 0.875rem",
          background: "var(--color-primary-muted)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ fontSize: "1rem" }}>{activeWorkspace.avatar}</span>
        <div>
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--color-primary)",
              lineHeight: 1.2,
            }}
          >
            {activeWorkspace.name}
          </div>
          <div
            style={{
              fontSize: "0.6875rem",
              color: "var(--color-text-muted)",
            }}
          >
            {activeWorkspace.type === "business"
              ? lang === "bm" ? "Perniagaan" : "Business"
              : lang === "bm" ? "Peribadi" : "Personal"}
          </div>
        </div>
      </div>
    </aside>
  );
}
