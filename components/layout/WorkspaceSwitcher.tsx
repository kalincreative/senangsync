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
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          transition: "all var(--transition-fast)",
          color: "#ffffff",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
        }}
      >
        <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "#ffffff",
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
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Workspace
          </div>
        </div>
        <ChevronDown
          size={14}
          style={{
            color: "rgba(255, 255, 255, 0.4)",
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
            background: "#0c2656",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
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
                    ? "rgba(255, 255, 255, 0.12)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background var(--transition-fast)",
                color: "#ffffff",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (ws.id !== activeWorkspaceId) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (ws.id !== activeWorkspaceId) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: ws.id === activeWorkspaceId ? 600 : 500,
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {ws.name}
                </div>
                <div
                  style={{ fontSize: "0.6875rem", color: "rgba(255, 255, 255, 0.5)" }}
                >
                  {ws.type === "business"
                    ? lang === "bm" ? "Perniagaan" : "Business"
                    : lang === "bm" ? "Peribadi" : "Personal"}
                </div>
              </div>
              {ws.id === activeWorkspaceId && (
                <Check size={14} color="var(--color-secondary)" />
              )}
            </button>
          ))}

          <div className="divider" style={{ background: "rgba(255, 255, 255, 0.1)" }} />

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
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              transition: "background var(--transition-fast)",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
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
