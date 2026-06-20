"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang, Theme, Workspace } from "./mock-data";
import { MOCK_WORKSPACES } from "./mock-data";

// ============================================
// APP STORE — Zustand
// ============================================

interface AppState {
  // Workspace
  workspaces: Workspace[];
  activeWorkspaceId: string;
  activeWorkspace: Workspace;
  setActiveWorkspace: (id: string) => void;
  addWorkspace: (workspace: Workspace) => void;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Language
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;

  // Command Bar
  commandBarOpen: boolean;
  setCommandBarOpen: (open: boolean) => void;
  toggleCommandBar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // === WORKSPACE ===
      workspaces: MOCK_WORKSPACES,
      activeWorkspaceId: MOCK_WORKSPACES[0].id,
      activeWorkspace: MOCK_WORKSPACES[0],

      setActiveWorkspace: (id: string) => {
        const { workspaces } = get();
        const workspace = workspaces.find((w) => w.id === id);
        if (workspace) {
          set({
            activeWorkspaceId: id,
            activeWorkspace: workspace,
            theme: workspace.theme,
            lang: workspace.language,
          });
        }
      },

      addWorkspace: (workspace: Workspace) => {
        set((state) => ({
          workspaces: [...state.workspaces, workspace],
        }));
      },

      // === THEME ===
      theme: MOCK_WORKSPACES[0].theme,
      setTheme: (theme: Theme) => {
        set({ theme });
        // Update active workspace theme too
        set((state) => ({
          workspaces: state.workspaces.map((w) =>
            w.id === state.activeWorkspaceId ? { ...w, theme } : w
          ),
          activeWorkspace: { ...state.activeWorkspace, theme },
        }));
      },

      // === LANGUAGE ===
      lang: MOCK_WORKSPACES[0].language,
      setLang: (lang: Lang) => {
        set({ lang });
        set((state) => ({
          workspaces: state.workspaces.map((w) =>
            w.id === state.activeWorkspaceId ? { ...w, language: lang } : w
          ),
          activeWorkspace: { ...state.activeWorkspace, language: lang },
        }));
      },
      toggleLang: () => {
        const { lang } = get();
        get().setLang(lang === "bm" ? "en" : "bm");
      },

      // === COMMAND BAR ===
      commandBarOpen: false,
      setCommandBarOpen: (open: boolean) => set({ commandBarOpen: open }),
      toggleCommandBar: () =>
        set((state) => ({ commandBarOpen: !state.commandBarOpen })),
    }),
    {
      name: "senangsync-app-store",
      partialState: (state) => ({
        activeWorkspaceId: state.activeWorkspaceId,
        theme: state.theme,
        lang: state.lang,
      }),
    } as Parameters<typeof persist>[1]
  )
);
