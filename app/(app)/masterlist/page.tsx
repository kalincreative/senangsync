"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { copy, formatDate } from "@/lib/copy";
import {
  MOCK_FOLDERS,
  MOCK_RESOURCES,
  type Folder,
  type Resource,
} from "@/lib/mock-data";
import {
  FolderOpen,
  Plus,
  Search,
  Link2,
  FileText,
  Download,
  Copy,
  Share2,
  ArrowLeft,
  Clock,
  AlertTriangle,
  MoreVertical,
  ExternalLink,
  X,
} from "lucide-react";
import { CreateFolderModal } from "@/components/CreateFolderModal";
import { UploadResourceModal } from "@/components/UploadResourceModal";
import { PreviewResourceModal } from "@/components/PreviewResourceModal";
import { EditResourceModal } from "@/components/EditResourceModal";

export default function MasterlistPage() {
  const { lang } = useAppStore();
  const [folders, setFolders] = useState<Folder[]>(MOCK_FOLDERS);
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState<Folder | null>(null);

  const filteredFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFolderCreated = (name: string) => {
    const newFolder: Folder = {
      id: `f-${Date.now()}`,
      name: name,
      color: "#003087", // Unified theme color
      colorClass: "folder-malaysia-3",
      resourceCount: 0,
      workspaceId: "ws-1",
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setFolders([newFolder, ...folders]);
  };

  const handleResourceAdded = (newResource: Resource) => {
    setResources([newResource, ...resources]);
    
    // Update the folder's resourceCount
    setFolders(folders.map(f => {
      if (f.id === newResource.folderId) {
        return { ...f, resourceCount: f.resourceCount + 1 };
      }
      return f;
    }));

    // If activeFolder is open, update activeFolder state to reflect the new resourceCount
    if (activeFolder && activeFolder.id === newResource.folderId) {
      setActiveFolder(prev => prev ? { ...prev, resourceCount: prev.resourceCount + 1 } : null);
    }
  };

  const [previewingResource, setPreviewingResource] = useState<Resource | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [activeMenuResourceId, setActiveMenuResourceId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuResourceId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteResource = (resourceId: string) => {
    const resourceToDelete = resources.find((r) => r.id === resourceId);
    if (!resourceToDelete) return;

    setResources(resources.filter((r) => r.id !== resourceId));

    // Decrement the folder's resourceCount
    setFolders(
      folders.map((f) => {
        if (f.id === resourceToDelete.folderId) {
          return { ...f, resourceCount: Math.max(0, f.resourceCount - 1) };
        }
        return f;
      })
    );

    // If activeFolder is open, update activeFolder state to reflect the decremented resourceCount
    if (activeFolder && activeFolder.id === resourceToDelete.folderId) {
      setActiveFolder((prev) =>
        prev ? { ...prev, resourceCount: Math.max(0, prev.resourceCount - 1) } : null
      );
    }
  };

  const handleResourceUpdated = (resourceId: string, updatedFields: Partial<Resource>) => {
    const oldResource = resources.find((r) => r.id === resourceId);
    if (!oldResource) return;

    setResources(
      resources.map((r) => {
        if (r.id === resourceId) {
          return { ...r, ...updatedFields };
        }
        return r;
      })
    );

    // Handle folder movement count update if folderId changed
    if (updatedFields.folderId && updatedFields.folderId !== oldResource.folderId) {
      setFolders(
        folders.map((f) => {
          if (f.id === oldResource.folderId) {
            return { ...f, resourceCount: Math.max(0, f.resourceCount - 1) };
          }
          if (f.id === updatedFields.folderId) {
            return { ...f, resourceCount: f.resourceCount + 1 };
          }
          return f;
        })
      );

      if (activeFolder) {
        if (activeFolder.id === oldResource.folderId) {
          setActiveFolder((prev) =>
            prev ? { ...prev, resourceCount: Math.max(0, prev.resourceCount - 1) } : null
          );
        } else if (activeFolder.id === updatedFields.folderId) {
          setActiveFolder((prev) =>
            prev ? { ...prev, resourceCount: prev.resourceCount + 1 } : null
          );
        }
      }
    }
  };

  const folderResources = activeFolder
    ? resources.filter((r) => r.folderId === activeFolder.id)
    : [];

  // Folder detail view
  if (activeFolder) {
    return (
      <div className="page-container animate-fade-in">
        {/* Back header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <button
            onClick={() => setActiveFolder(null)}
            className="btn btn-ghost btn-sm"
            style={{ padding: "0 0.5rem", gap: "0.375rem" }}
          >
            <ArrowLeft size={16} />
            {copy.masterlist.back[lang]}
          </button>
          <span style={{ color: "var(--color-text-muted)" }}>/</span>
          <span style={{ fontWeight: 600, color: "var(--color-text-primary)", fontSize: "0.9375rem" }}>
            {activeFolder.name}
          </span>
        </div>

        {/* Folder header card */}
        <div
          className="bg-[#003087] text-white rounded-2xl"
          style={{
            padding: "1.5rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.25rem" }}>
              <FolderOpen size={20} />
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "inherit", margin: 0 }}>
                {activeFolder.name}
              </h2>
            </div>
            <p style={{ fontSize: "0.8125rem", opacity: 0.8, margin: 0, color: "inherit" }}>
              {folderResources.length} {copy.masterlist.resources[lang]}
            </p>
          </div>
          <UploadResourceModal 
            onResourceAdded={handleResourceAdded}
            folders={folders}
            activeFolderId={activeFolder.id}
            triggerButton={
              <button
                className="btn"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "inherit",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  gap: "0.375rem",
                  fontSize: "0.8125rem",
                }}
              >
                <Plus size={16} />
                {lang === "bm" ? "Tambah" : "Add"}
              </button>
            }
          />
        </div>

        {/* Resource list */}
        {folderResources.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FolderOpen size={28} />
            </div>
            <h3 style={{ fontSize: "1.125rem", margin: 0 }}>
              {copy.masterlist.empty_folder_title[lang]}
            </h3>
            <p style={{ margin: 0, maxWidth: 300 }}>
              {copy.masterlist.empty_folder_desc[lang]}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {folderResources.map((resource) => {
              const isExpiring =
                resource.expiryDate &&
                new Date(resource.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

              return (
                <div
                  key={resource.id}
                  className="card"
                  style={{ padding: "1rem 1.125rem" }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                    {/* Type icon */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--radius-md)",
                        background:
                          resource.type === "link"
                            ? "var(--color-dark-muted)"
                            : "var(--color-primary-muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {resource.type === "link" ? (
                        <Link2 size={18} color="var(--color-dark)" />
                      ) : (
                        <FileText size={18} color="var(--color-primary)" />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                        <div>
                          <h4
                            style={{
                              fontSize: "0.9375rem",
                              fontWeight: 600,
                              color: "var(--color-text-primary)",
                              margin: "0 0 0.25rem",
                              lineHeight: 1.3,
                            }}
                          >
                            {resource.name}
                          </h4>
                          {resource.description && (
                            <p
                              style={{
                                fontSize: "0.8125rem",
                                color: "var(--color-text-muted)",
                                margin: "0 0 0.5rem",
                              }}
                            >
                              {resource.description}
                            </p>
                          )}
                        </div>
                        <span
                          className={`badge ${resource.type === "link" ? "badge-neutral" : "badge-primary"}`}
                          style={{ flexShrink: 0 }}
                        >
                          {resource.type === "link" ? "Link" : "Dokumen"}
                        </span>
                      </div>

                      {/* Meta row */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                        {resource.fileSize && (
                          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                            {resource.fileSize}
                          </span>
                        )}
                        {resource.expiryDate && (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              fontSize: "0.75rem",
                              color: isExpiring ? "var(--color-warning)" : "var(--color-text-muted)",
                            }}
                          >
                            {isExpiring ? <AlertTriangle size={12} /> : <Clock size={12} />}
                            {copy.masterlist.expiry_label[lang]}: {formatDate(resource.expiryDate, lang)}
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                        {resource.type === "link" ? (
                          <>
                            <button className="btn btn-secondary btn-sm" style={{ gap: "0.375rem" }}>
                              <Copy size={13} />
                              {copy.masterlist.copy_link[lang]}
                            </button>
                            <button className="btn btn-ghost btn-sm" style={{ gap: "0.375rem" }}>
                              <ExternalLink size={13} />
                              {lang === "bm" ? "Buka" : "Open"}
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="btn btn-secondary btn-sm" style={{ gap: "0.375rem" }}>
                              <Download size={13} />
                              {copy.masterlist.download[lang]}
                            </button>
                          </>
                        )}
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ gap: "0.375rem", color: "var(--color-success)" }}
                        >
                          <Share2 size={13} />
                          {copy.masterlist.share_wa[lang]}
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

  // Folder grid view
  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>
            {copy.masterlist.title[lang]}
          </h1>
          <p style={{ fontSize: "0.875rem", margin: "0.25rem 0 0", color: "var(--color-text-muted)" }}>
            {copy.masterlist.subtitle[lang]}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <CreateFolderModal onFolderCreated={handleFolderCreated} />
          <UploadResourceModal 
            onResourceAdded={handleResourceAdded}
            folders={folders}
          />
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "1.5rem" }}>
        <Search
          size={16}
          style={{
            position: "absolute",
            left: "0.875rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-text-muted)",
          }}
        />
        <input
          className="input"
          style={{ paddingLeft: "2.625rem" }}
          placeholder={copy.masterlist.search_placeholder[lang]}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Folder Grid */}
      {filteredFolders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FolderOpen size={28} />
          </div>
          <h3 style={{ fontSize: "1.125rem", margin: 0 }}>
            {copy.masterlist.empty_title[lang]}
          </h3>
          <p style={{ margin: 0, maxWidth: 300 }}>
            {copy.masterlist.empty_desc[lang]}
          </p>
          <button className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
            <Plus size={16} />
            {copy.masterlist.new_folder[lang]}
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))",
            gap: "1rem",
          }}
        >
          {filteredFolders.map((folder) => (
            <div 
              key={folder.id}
              onClick={() => setActiveFolder(folder)}
              className="relative w-full cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] group"
              style={{ aspectRatio: "1 / 0.82" }}
            >
              {/* 1. Back Tab */}
              <div 
                className="absolute top-0 left-3.5 w-[38%] h-[22%] bg-[#003087] rounded-t-lg transition-all duration-300 group-hover:bg-[#002266]"
              />
              
              {/* 2. Inner Paper Sheet */}
              <div 
                className="absolute top-[8%] left-[4%] w-[92%] h-[82%] bg-white border border-gray-200 rounded-t-lg shadow-[0_-3px_8px_rgba(0,0,0,0.12),_0_2px_4px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                {/* Decorative sheet bar */}
                <div className="w-[80%] h-1 bg-gray-200 rounded-full mx-auto mt-2.5 opacity-60" />
              </div>

              {/* 3. Front Cover */}
              <div 
                className="absolute bottom-0 left-0 w-full h-[80%] bg-[#003087] rounded-xl shadow-[0_6px_12px_-3px_rgba(0,32,96,0.18)] flex flex-col justify-end transition-all duration-300 group-hover:bg-[#002266] group-hover:shadow-[0_10px_20px_-3px_rgba(0,32,96,0.25)] overflow-hidden"
              >
                {/* Glowing blur blob to create a premium gradient blue-white highlights */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
                
                <div 
                  style={{
                    paddingLeft: "1.125rem",
                    paddingRight: "1rem",
                    paddingBottom: "1.125rem",
                    paddingTop: "2rem",
                  }}
                  className="flex flex-col text-left"
                >
                  <div className="text-white font-bold text-[0.8125rem] leading-snug group-hover:scale-[1.01] origin-left transition-all">
                    {folder.name}
                  </div>
                  <div className="text-blue-200/90 text-[0.625rem] font-bold uppercase tracking-wider mt-1">
                    {folder.resourceCount} {lang === "bm" ? "ASET" : "ASSETS"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Resources section */}
      {resources.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.875rem" }}>
            {lang === "bm" ? "Ditambah Baru-baru Ini" : "Recently Added"}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {resources.slice(0, 4).map((resource) => (
              <div
                key={resource.id}
                onClick={() => setPreviewingResource(resource)}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50/80 transition-colors"
                style={{
                  padding: "0.75rem 1rem",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "var(--radius-sm)",
                    background: resource.type === "link" ? "var(--color-dark-muted)" : "var(--color-primary-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {resource.type === "link" ? (
                    <Link2 size={14} color="var(--color-dark)" />
                  ) : (
                    <FileText size={14} color="var(--color-primary)" />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {resource.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    {folders.find((f) => f.id === resource.folderId)?.name}
                  </div>
                </div>

                {/* Right-aligned Actions Group */}
                <div className="flex items-center gap-4">
                  {resource.type === "link" ? (
                    <button 
                      className="p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                      title={lang === "bm" ? "Salin Pautan" : "Copy Link"}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(resource.url || "");
                        alert(lang === "bm" ? "Pautan disalin!" : "Link copied!");
                      }}
                    >
                      <Copy size={15} />
                    </button>
                  ) : (
                    <button 
                      className="p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                      title={lang === "bm" ? "Muat Turun" : "Download"}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(lang === "bm" ? `Memuat turun ${resource.name}` : `Downloading ${resource.name}`);
                      }}
                    >
                      <Download size={15} />
                    </button>
                  )}
                  
                  <button 
                    className="p-2 rounded-md text-gray-400 hover:text-green-500 hover:bg-green-50 transition-colors"
                    title={lang === "bm" ? "Kongsi WhatsApp" : "Share WhatsApp"}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(lang === "bm" ? `Berkongsi ${resource.name} di WhatsApp` : `Sharing ${resource.name} on WhatsApp`);
                    }}
                  >
                    <Share2 size={15} />
                  </button>

                  <div style={{ position: "relative" }}>
                    <button 
                      className="p-2 rounded-md text-gray-400 hover:bg-gray-100 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuResourceId(activeMenuResourceId === resource.id ? null : resource.id);
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeMenuResourceId === resource.id && (
                      <div
                        ref={menuRef}
                        style={{
                          position: "absolute",
                          top: "2.25rem",
                          right: 0,
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.375rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          zIndex: 40,
                          width: "6rem",
                          padding: "0.25rem",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuResourceId(null);
                            setEditingResource(resource);
                          }}
                          style={{
                            padding: "0.375rem 0.5rem",
                            fontSize: "0.75rem",
                            color: "#334155",
                            textAlign: "left",
                            border: "none",
                            backgroundColor: "transparent",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                          }}
                          className="hover:bg-slate-50 text-left w-full"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuResourceId(null);
                            handleDeleteResource(resource.id);
                          }}
                          style={{
                            padding: "0.375rem 0.5rem",
                            fontSize: "0.75rem",
                            color: "#ef4444",
                            textAlign: "left",
                            border: "none",
                            backgroundColor: "transparent",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                          }}
                          className="hover:bg-red-50 text-left w-full"
                        >
                          {lang === "bm" ? "Padam" : "Delete"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview details modal */}
      <PreviewResourceModal
        resource={previewingResource}
        folderName={folders.find((f) => f.id === previewingResource?.folderId)?.name || ""}
        lang={lang}
        isOpen={!!previewingResource}
        onOpenChange={(open) => {
          if (!open) setPreviewingResource(null);
        }}
      />

      {/* Edit resource modal */}
      <EditResourceModal
        resource={editingResource}
        folders={folders}
        lang={lang}
        isOpen={!!editingResource}
        onOpenChange={(open) => {
          if (!open) setEditingResource(null);
        }}
        onSave={handleResourceUpdated}
      />
    </div>
  );
}
