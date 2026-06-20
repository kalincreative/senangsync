"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { ChevronDown, Plus, Check } from "lucide-react";

export function WorkspaceSwitcher() {
  const { workspaces, activeWorkspace, activeWorkspaceId, setActiveWorkspace, lang } =
    useAppStore();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          padding: "0.625rem 0.75rem",
          background: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          transition: "all var(--transition-fast)",
          color: "var(--color-text-primary)",
        }}
      >
        <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>
          {activeWorkspace.avatar}
        </span>
        <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
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
            {activeWorkspace.currency}
          </div>
        </div>
        <ChevronDown
          size={14}
          style={{
            color: "var(--color-text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform var(--transition-fast)",
            flexShrink: 0,
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "var(--color-surface-overlay)",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
            zIndex: 200,
            animation: "slideDown var(--transition-fast) ease forwards",
          }}
        >
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => {
                setActiveWorkspace(ws.id);
                setOpen(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.625rem 0.875rem",
                background:
                  ws.id === activeWorkspaceId
                    ? "var(--color-primary-muted)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background var(--transition-fast)",
                color: "var(--color-text-primary)",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{ws.avatar}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: ws.id === activeWorkspaceId ? 600 : 500,
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
                <div
                  style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}
                >
                  {ws.type === "business"
                    ? lang === "bm" ? "Perniagaan" : "Business"
                    : lang === "bm" ? "Peribadi" : "Personal"}
                </div>
              </div>
              {ws.id === activeWorkspaceId && (
                <Check size={14} color="var(--color-primary)" />
              )}
            </button>
          ))}

          <div className="divider" />

          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.625rem 0.875rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-secondary)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              transition: "background var(--transition-fast)",
            }}
            onClick={() => setOpen(false)}
          >
            <Plus size={14} />
            {lang === "bm" ? "Cipta Workspace Baru" : "Create New Workspace"}
          </button>
        </div>
      )}
    </div>
  );
}
