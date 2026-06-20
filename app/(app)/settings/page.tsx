"use client";

import { useAppStore } from "@/lib/store";
import { copy } from "@/lib/copy";
import {
  THEME_LABELS,
  THEME_COLORS,
  type Theme,
  type Lang,
} from "@/lib/mock-data";
import {
  Settings,
  Globe,
  Palette,
  Building2,
  Plus,
  Check,
  ChevronRight,
} from "lucide-react";

const THEMES = Object.keys(THEME_LABELS) as Theme[];

export default function SettingsPage() {
  const { lang, setLang, theme, setTheme, workspaces, activeWorkspaceId, setActiveWorkspace, activeWorkspace } =
    useAppStore();

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>
            {copy.settings.title[lang]}
          </h1>
          <p style={{ fontSize: "0.875rem", margin: "0.25rem 0 0", color: "var(--color-text-muted)" }}>
            {lang === "bm" ? "Urus workspace dan keutamaan kau" : "Manage your workspace and preferences"}
          </p>
        </div>
      </div>

      {/* Active Workspace Card */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 60%, var(--color-dark)))",
          borderRadius: "var(--radius-xl)",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.75rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "var(--radius-lg)",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            flexShrink: 0,
          }}
        >
          {activeWorkspace.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff" }}>
            {activeWorkspace.name}
          </div>
          <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.7)", marginTop: "0.125rem" }}>
            {activeWorkspace.currency} ·{" "}
            {activeWorkspace.type === "business"
              ? lang === "bm" ? "Perniagaan" : "Business"
              : lang === "bm" ? "Peribadi" : "Personal"}
          </div>
        </div>
        <ChevronRight size={20} color="rgba(255,255,255,0.7)" />
      </div>

      {/* ============ SECTION: Language ============ */}
      <SectionLabel icon={<Globe size={15} />} label={lang === "bm" ? "Bahasa" : "Language"} />

      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        {(["bm", "en"] as Lang[]).map((l, idx) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              padding: "1rem 1.125rem",
              background: "transparent",
              border: "none",
              borderBottom: idx === 0 ? "1px solid var(--color-border)" : "none",
              cursor: "pointer",
              transition: "background var(--transition-fast)",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--color-surface-raised)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--radius-md)",
                background: lang === l ? "var(--color-primary-muted)" : "var(--color-surface-raised)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.125rem",
                flexShrink: 0,
              }}
            >
              {l === "bm" ? "🇲🇾" : "🇬🇧"}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: lang === l ? "var(--color-primary)" : "var(--color-text-primary)",
                }}
              >
                {l === "bm" ? "Bahasa Melayu" : "English"}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                {l === "bm" ? "Tetapan lalai" : "Default setting"}{lang === l ? "" : ""}
              </div>
            </div>
            {lang === l && (
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check size={14} color="#fff" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ============ SECTION: Theme ============ */}
      <SectionLabel icon={<Palette size={15} />} label={lang === "bm" ? "Tema Negeri" : "State Theme"} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.625rem",
          marginBottom: "1.75rem",
        }}
      >
        {THEMES.map((t) => {
          const colors = THEME_COLORS[t];
          const isActive = theme === t;

          return (
            <button
              key={t}
              onClick={() => setTheme(t)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1rem",
                background: isActive ? "var(--color-primary-muted)" : "var(--color-surface)",
                border: isActive
                  ? "1.5px solid var(--color-primary)"
                  : "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                cursor: "pointer",
                transition: "all var(--transition-fast)",
                textAlign: "left",
              }}
            >
              {/* Theme color preview */}
              <div style={{ display: "flex", flexDirection: "column", gap: "3px", flexShrink: 0 }}>
                <div
                  style={{
                    width: 28,
                    height: 12,
                    borderRadius: 3,
                    background: colors.primary,
                  }}
                />
                <div
                  style={{
                    width: 28,
                    height: 8,
                    borderRadius: 3,
                    background: colors.secondary,
                  }}
                />
              </div>

              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "var(--color-primary)" : "var(--color-text-primary)",
                  flex: 1,
                }}
              >
                {THEME_LABELS[t]}
              </span>

              {isActive && (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Check size={12} color="#fff" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* ============ SECTION: Workspaces ============ */}
      <SectionLabel icon={<Building2 size={15} />} label={lang === "bm" ? "Workspace Kau" : "Your Workspaces"} />

      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        {workspaces.map((ws, idx) => (
          <button
            key={ws.id}
            onClick={() => setActiveWorkspace(ws.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              padding: "1rem 1.125rem",
              background:
                ws.id === activeWorkspaceId ? "var(--color-primary-muted)" : "transparent",
              border: "none",
              borderBottom:
                idx < workspaces.length - 1 ? "1px solid var(--color-border)" : "none",
              cursor: "pointer",
              transition: "background var(--transition-fast)",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "var(--radius-md)",
                background:
                  ws.id === activeWorkspaceId
                    ? "var(--color-primary)"
                    : "var(--color-surface-raised)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                flexShrink: 0,
              }}
            >
              {ws.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color:
                    ws.id === activeWorkspaceId
                      ? "var(--color-primary)"
                      : "var(--color-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {ws.name}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                {ws.type === "business"
                  ? lang === "bm" ? "Perniagaan" : "Business"
                  : lang === "bm" ? "Peribadi" : "Personal"}{" "}
                · {ws.currency} · {THEME_LABELS[ws.theme]}
              </div>
            </div>
            {ws.id === activeWorkspaceId ? (
              <span className="badge badge-primary">
                {lang === "bm" ? "Aktif" : "Active"}
              </span>
            ) : (
              <ChevronRight size={16} color="var(--color-text-muted)" />
            )}
          </button>
        ))}

        {/* Create new workspace */}
        <button
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
            padding: "0.875rem 1.125rem",
            background: "transparent",
            border: "none",
            borderTop: "1px solid var(--color-border)",
            cursor: "pointer",
            color: "var(--color-primary)",
            fontSize: "0.9rem",
            fontWeight: 600,
            transition: "background var(--transition-fast)",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--color-primary-muted)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Plus size={20} color="var(--color-primary)" />
          </div>
          {copy.settings.create_workspace[lang]}
        </button>
      </div>

      {/* ============ App info footer ============ */}
      <div
        style={{
          textAlign: "center",
          padding: "1.5rem",
          color: "var(--color-text-muted)",
          fontSize: "0.8125rem",
        }}
      >
        <div style={{ fontWeight: 700, color: "var(--color-primary)", marginBottom: "0.25rem" }}>
          SenangSync
        </div>
        <div>v1.0.0 — Beta</div>
        <div style={{ marginTop: "0.25rem" }}>Built in Malaysia, untuk Malaysia 🇲🇾</div>
      </div>
    </div>
  );
}

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.625rem",
        color: "var(--color-text-muted)",
        fontSize: "0.8125rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      {icon}
      {label}
    </div>
  );
}
