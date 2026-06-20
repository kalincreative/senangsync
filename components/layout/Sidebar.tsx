"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { copy } from "@/lib/copy";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { THEME_LABELS } from "@/lib/mock-data";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  CreditCard,
  Package,
  Settings,
  ChevronDown,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    key: "dashboard" as const,
    Icon: LayoutDashboard,
  },
  {
    href: "/masterlist",
    key: "masterlist" as const,
    Icon: FolderOpen,
  },
  {
    href: "/subscriptions",
    key: "subscriptions" as const,
    Icon: CreditCard,
  },
  {
    href: "/products",
    key: "products" as const,
    Icon: Package,
  },
];

const THEME_EMOJIS: Record<string, string> = {
  malaysia: "🇲🇾",
  selangor: "🔴🟡",
  penang: "🔵⚪",
  sabah: "🔵🟢",
  johor: "🔵🔴",
  kelantan: "🔴⚪",
};

export function Sidebar() {
  const pathname = usePathname();
  const { lang } = useAppStore();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <aside className="sidebar">

      {/* Sidebar Content (z-index wrapper to stay interactive and visible) */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", gap: "0.25rem" }}>
        
        {/* Logo */}
        <div className="sidebar-logo">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.125rem",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              flexShrink: 0,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            SS
          </div>
          <div>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              SenangSync
            </div>
            <div
              style={{
                fontSize: "0.6875rem",
                color: "rgba(255, 255, 255, 0.5)",
                fontWeight: 500,
              }}
            >
              Business OS untuk SME
            </div>
          </div>
        </div>

        {/* Workspace Switcher */}
        <WorkspaceSwitcher />

        <div className="divider" style={{ margin: "0.75rem 0" }} />

        {/* Nav Items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
          {NAV_ITEMS.map(({ href, key, Icon }) => {
            const isActive = href !== "#" && pathname.startsWith(href);
            return (
              <Link
                key={key}
                href={href}
                className={`sidebar-item ${isActive ? "active" : ""}`}
                style={
                  isActive
                    ? {
                        background: "#ffffff",
                        color: "#0c2656",
                        border: "1px solid #ffffff",
                        fontWeight: 600,
                      }
                    : undefined
                }
              >
                <Icon size={18} style={isActive ? { color: "#0c2656" } : undefined} />
                {copy.nav[key][lang]}
              </Link>
            );
          })}
        </nav>

        {/* Spacer to push items down */}
        <div style={{ flex: 1, minHeight: "2rem" }} />

        {/* User Card: Kalin Sabri with Dropdown */}
        <div style={{ position: "relative", width: "100%" }}>
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            style={{
              width: "100%",
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "var(--radius-md)",
              padding: "0.625rem 0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              cursor: "pointer",
              textAlign: "left",
              color: "#ffffff",
              transition: "background var(--transition-fast)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              KS
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.2,
                }}
              >
                Kalin Sabri
              </div>
              <div
                style={{
                  fontSize: "0.6875rem",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                Admin
              </div>
            </div>
            <ChevronDown
              size={14}
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                transform: profileMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform var(--transition-fast)",
              }}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {profileMenuOpen && (
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 6px)",
                left: 0,
                right: 0,
                background: "#0c2656",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.4)",
                zIndex: 210,
                overflow: "hidden",
                animation: "slideUp var(--transition-fast) ease forwards",
              }}
            >
              {/* Settings Option */}
              <Link
                href="/settings"
                onClick={() => setProfileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.625rem 0.875rem",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#ffffff",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background var(--transition-fast)",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Settings size={16} />
                <span>{copy.nav.settings[lang]}</span>
              </Link>

              <div className="divider" style={{ background: "rgba(255, 255, 255, 0.1)", margin: 0 }} />

              {/* Log Out Option */}
              <Link
                href="/login"
                onClick={() => setProfileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.625rem 0.875rem",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#ff4a4a",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background var(--transition-fast)",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 40, 40, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <LogOut size={16} />
                <span>{lang === "bm" ? "Log Keluar" : "Log Out"}</span>
              </Link>
            </div>
          )}
        </div>

      </div>
    </aside>
  );
}
