"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { copy, formatDate } from "@/lib/copy";
import {
  MOCK_FOLDERS,
  MOCK_RESOURCES,
  type Folder,
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
  ChevronRight,
  ArrowLeft,
  Clock,
  AlertTriangle,
  MoreVertical,
  ExternalLink,
} from "lucide-react";

export default function MasterlistPage() {
  const { lang } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState<Folder | null>(null);

  const filteredFolders = MOCK_FOLDERS.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const folderResources = activeFolder
    ? MOCK_RESOURCES.filter((r) => r.folderId === activeFolder.id)
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
          className={`folder-card ${activeFolder.colorClass}`}
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
          <button 
            className="border border-gray-200 text-gray-700 hover:bg-gray-50 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 bg-white"
          >
            <Plus size={15} />
            {lang === "bm" ? "Folder Baru" : "New Folder"}
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} />
            {lang === "bm" ? "Muat Naik Fail" : "Upload File"}
          </button>
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
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1rem",
          }}
        >
          {filteredFolders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setActiveFolder(folder)}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 transition-all duration-300 ease-in-out cursor-pointer group hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1 text-left w-full flex flex-col justify-between"
              style={{
                aspectRatio: "1 / 0.85",
              }}
            >
              <div className="flex items-start justify-between w-full mb-4">
                <FolderOpen size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                <ChevronRight size={16} className="text-gray-400 group-hover:text-white/60 transition-colors" />
              </div>
              <div>
                <div className="text-gray-900 group-hover:text-white font-semibold text-sm transition-colors mb-1">
                  {folder.name}
                </div>
                <div className="text-gray-500 group-hover:text-blue-100 text-xs transition-colors">
                  {folder.resourceCount} {copy.masterlist.resources[lang]}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Recent Resources section */}
      {MOCK_RESOURCES.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.875rem" }}>
            {lang === "bm" ? "Ditambah Baru-baru Ini" : "Recently Added"}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {MOCK_RESOURCES.slice(0, 4).map((resource) => (
              <div
                key={resource.id}
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
                    {MOCK_FOLDERS.find((f) => f.id === resource.folderId)?.name}
                  </div>
                </div>

                {/* Quick Actions Group */}
                <div className="flex items-center gap-1 mr-1">
                  {resource.type === "link" ? (
                    <button 
                      className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                      title={lang === "bm" ? "Salin Pautan" : "Copy Link"}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Copy size={15} />
                    </button>
                  ) : (
                    <button 
                      className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                      title={lang === "bm" ? "Muat Turun" : "Download"}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Download size={15} />
                    </button>
                  )}
                  
                  <button 
                    className="p-2 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 transition-colors"
                    title={lang === "bm" ? "Kongsi WhatsApp" : "Share WhatsApp"}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Share2 size={15} />
                  </button>
                </div>

                <button 
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
