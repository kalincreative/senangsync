"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Folder, FolderPlus, Link2, FileText, UploadCloud, Plus, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { type Folder as FolderType, type Resource } from "@/lib/mock-data";

interface UploadResourceModalProps {
  onResourceAdded: (resource: Resource) => void;
  folders: FolderType[];
  activeFolderId?: string;
  triggerButton?: React.ReactNode;
}

export function UploadResourceModal({
  onResourceAdded,
  folders,
  activeFolderId,
  triggerButton,
}: UploadResourceModalProps) {
  const { lang } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"file" | "link">("file");
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tab 1 (File) State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tab 2 (Link) State
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // Close custom dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Initialize selected folder
  useEffect(() => {
    if (activeFolderId) {
      setSelectedFolderId(activeFolderId);
    } else if (folders.length > 0) {
      setSelectedFolderId(folders[0].id);
    }
  }, [activeFolderId, folders, isOpen]);

  // Reset form when modal closes
  const resetForm = () => {
    setSelectedFile(null);
    setDocumentTitle("");
    setExpiryDate("");
    setLinkTitle("");
    setLinkUrl("");
    setActiveTab("file");
    setIsDropdownOpen(false);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const folderIdToUse = activeFolderId || selectedFolderId;
    if (!folderIdToUse) return;

    if (activeTab === "file") {
      if (!selectedFile || !documentTitle.trim()) return;
      let previewUrl: string | undefined = undefined;
      if (selectedFile.type.startsWith("image/")) {
        previewUrl = URL.createObjectURL(selectedFile);
      }

      const newResource: Resource = {
        id: `r-${Date.now()}`,
        name: documentTitle.trim(),
        type: "document",
        folderId: folderIdToUse,
        fileSize: `${(selectedFile.size / 1024).toFixed(1)} KB`,
        expiryDate: expiryDate || undefined,
        tags: ["Uploaded"],
        createdAt: new Date().toISOString().split("T")[0],
        workspaceId: "ws-1",
        previewUrl,
      };

      onResourceAdded(newResource);
    } else {
      if (!linkTitle.trim() || !linkUrl.trim()) return;

      let formattedUrl = linkUrl.trim();
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
      }

      const newResource: Resource = {
        id: `r-${Date.now()}`,
        name: linkTitle.trim(),
        type: "link",
        folderId: folderIdToUse,
        url: formattedUrl,
        tags: ["Link"],
        createdAt: new Date().toISOString().split("T")[0],
        workspaceId: "ws-1",
      };

      onResourceAdded(newResource);
    }

    resetForm();
    setIsOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Auto-fill title with filename without extension if it's currently empty
      if (!documentTitle.trim()) {
        const nameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        setDocumentTitle(nameWithoutExtension);
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const isFormValid = () => {
    const folderIdToUse = activeFolderId || selectedFolderId;
    if (!folderIdToUse) return false;

    if (activeTab === "file") {
      return !!selectedFile && !!documentTitle.trim();
    } else {
      return !!linkTitle.trim() && !!linkUrl.trim();
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}
    >
      <DialogTrigger asChild>
        {triggerButton || (
          <button className="btn btn-sm bg-[#003087] hover:bg-[#002266] text-white border-none">
            <Plus size={15} />
            {lang === "bm" ? "Muat Naik Fail" : "Upload File"}
          </button>
        )}
      </DialogTrigger>
      
      <DialogContent 
        className="bg-white border border-gray-200/50 gap-0"
        style={{
          maxWidth: "380px",
          width: "calc(100% - 2rem)",
          padding: "2.25rem", // 36px padding all around
          borderRadius: "1.5rem", // 24px rounded corners
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 10px 20px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)", // Pronounced black shadow
        }}
      >
        <DialogHeader className="flex flex-col items-center text-center">
          <div 
            style={{
              marginBottom: "1rem",
              display: "flex",
              width: "2.5rem",
              height: "2.5rem",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              backgroundColor: "#003087", // Solid brand blue
              color: "#ffffff", // White icon
            }}
          >
            <FolderPlus style={{ width: "1.125rem", height: "1.125rem" }} />
          </div>
          <DialogTitle 
            className="text-gray-900 tracking-tight"
            style={{
              fontSize: "1.0625rem", // ~17px
              fontWeight: 700,
              margin: 0,
            }}
          >
            {lang === "bm" ? "Muat Naik Sumber" : "Upload Resource"}
          </DialogTitle>
          <DialogDescription 
            className="text-gray-400 mx-auto"
            style={{
              fontSize: "0.6875rem", // 11px
              marginTop: "0.375rem",
              lineHeight: "1.5",
              maxWidth: "240px",
              textAlign: "center",
            }}
          >
            {lang === "bm"
              ? "Tambah fail dokumen atau pautan web ke folder perniagaan anda."
              : "Add a document file or a web link to your business folders."}
          </DialogDescription>
        </DialogHeader>

        {/* Custom Segmented Tab Controller */}
        <div 
          style={{
            display: "flex",
            backgroundColor: "#f1f5f9",
            padding: "0.25rem",
            borderRadius: "0.5rem",
            marginTop: "1.25rem",
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("file")}
            style={{
              flex: 1,
              padding: "0.375rem 0",
              fontSize: "0.6875rem",
              fontWeight: activeTab === "file" ? 700 : 500,
              textAlign: "center",
              border: "none",
              borderRadius: "0.375rem",
              backgroundColor: activeTab === "file" ? "#ffffff" : "transparent",
              color: activeTab === "file" ? "#0f172a" : "#64748b",
              boxShadow: activeTab === "file" ? "0 1px 3px rgba(0, 0, 0, 0.08)" : "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.375rem",
              transition: "all 0.15s ease-in-out",
            }}
          >
            <FileText size={12} />
            {lang === "bm" ? "Fail Dokumen" : "Document File"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("link")}
            style={{
              flex: 1,
              padding: "0.375rem 0",
              fontSize: "0.6875rem",
              fontWeight: activeTab === "link" ? 700 : 500,
              textAlign: "center",
              border: "none",
              borderRadius: "0.375rem",
              backgroundColor: activeTab === "link" ? "#ffffff" : "transparent",
              color: activeTab === "link" ? "#0f172a" : "#64748b",
              boxShadow: activeTab === "link" ? "0 1px 3px rgba(0, 0, 0, 0.08)" : "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.375rem",
              transition: "all 0.15s ease-in-out",
            }}
          >
            <Link2 size={12} />
            {lang === "bm" ? "Pautan Web" : "Web Link"}
          </button>
        </div>

        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "1.125rem", paddingTop: "1.25rem" }}>
          
          {/* Target Folder Selection - Custom Dropdown Selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <Label 
              htmlFor="target-folder" 
              style={{
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#94a3b8",
              }}
            >
              {lang === "bm" ? "Nama Folder" : "Folder Name"}
            </Label>
            {activeFolderId ? (
              <div
                style={{
                  width: "100%",
                  height: "2rem",
                  padding: "0 0.75rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#475569",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                <Folder size={12} className="text-gray-400" />
                {folders.find(f => f.id === activeFolderId)?.name || ""}
              </div>
            ) : (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    width: "100%",
                    height: "2rem",
                    padding: "0 0.75rem",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    backgroundColor: "rgba(248, 249, 250, 0.4)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.375rem",
                    color: "#334155",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    outline: "none",
                    textAlign: "left",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <Folder size={12} style={{ color: "#94a3b8" }} />
                    {folders.find(f => f.id === selectedFolderId)?.name || (lang === "bm" ? "Pilih Folder" : "Select Folder")}
                  </span>
                  <ChevronDown 
                    size={14} 
                    style={{ 
                      color: "#94a3b8", 
                      transition: "transform 0.2s", 
                      transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" 
                    }} 
                  />
                </button>
                
                {isDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "2.25rem",
                      left: 0,
                      right: 0,
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.375rem",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      zIndex: 50,
                      maxHeight: "10rem",
                      overflowY: "auto",
                      padding: "0.25rem",
                    }}
                  >
                    {folders.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          setSelectedFolderId(f.id);
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          width: "100%",
                          padding: "0.375rem 0.5rem",
                          fontSize: "0.75rem",
                          color: "#334155",
                          textAlign: "left",
                          border: "none",
                          backgroundColor: selectedFolderId === f.id ? "#f1f5f9" : "transparent",
                          fontWeight: selectedFolderId === f.id ? 600 : 400,
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.375rem",
                        }}
                        onMouseEnter={(e) => {
                          if (selectedFolderId !== f.id) {
                            e.currentTarget.style.backgroundColor = "#f8fafc";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedFolderId !== f.id) {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                      >
                        <div style={{ width: "0.375rem", height: "0.375rem", borderRadius: "50%", backgroundColor: f.color || "#003087" }} />
                        {f.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* TAB 1: FILE UPLOAD CONTENT */}
          {activeTab === "file" && (
            <>
              {/* Document Title */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <Label 
                  htmlFor="document-title" 
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#94a3b8",
                  }}
                >
                  {lang === "bm" ? "Nama Dokumen" : "Document Name"}
                </Label>
                <Input
                  id="document-title"
                  type="text"
                  placeholder={lang === "bm" ? "cth. Laporan Kewangan" : "e.g. Financial Report"}
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="focus-visible:ring-1 focus-visible:ring-[#003087]/20 focus-visible:border-[#003087] transition-all shadow-none"
                  style={{
                    width: "100%",
                    height: "2rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    fontSize: "0.75rem",
                    backgroundColor: "rgba(248, 249, 250, 0.4)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.375rem",
                  }}
                />
              </div>

              {/* Dashed Dropzone */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <Label 
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#94a3b8",
                  }}
                >
                  {lang === "bm" ? "Muat Naik Fail" : "Upload File"}
                </Label>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  style={{ display: "none" }} 
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
                />
                <div
                  onClick={triggerFileSelect}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const file = e.dataTransfer.files[0];
                      setSelectedFile(file);
                      // Auto-fill title with filename without extension if currently empty
                      if (!documentTitle.trim()) {
                        const nameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                        setDocumentTitle(nameWithoutExtension);
                      }
                    }
                  }}
                  style={{
                    border: isDragOver ? "2px dashed #003087" : "2px dashed #cbd5e1",
                    backgroundColor: isDragOver ? "rgba(0, 48, 135, 0.02)" : "rgba(248, 249, 250, 0.4)",
                    borderRadius: "0.5rem",
                    padding: "1.25rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    minHeight: "5.5rem",
                    textAlign: "center",
                  }}
                >
                  <UploadCloud style={{ width: "1.375rem", height: "1.375rem", color: "#64748b", marginBottom: "0.375rem" }} />
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#334155", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {selectedFile ? selectedFile.name : (lang === "bm" ? "Pilih fail atau heret ke sini" : "Choose file or drag here")}
                  </span>
                  <span style={{ fontSize: "0.625rem", color: "#94a3b8", marginTop: "0.25rem" }}>
                    {selectedFile 
                      ? `${(selectedFile.size / 1024).toFixed(1)} KB` 
                      : (lang === "bm" ? "Dokumen, Imej sehingga 10MB" : "Documents, Images up to 10MB")}
                  </span>
                </div>
              </div>

              {/* Expiry Date */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <Label 
                  htmlFor="expiry-date" 
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#94a3b8",
                  }}
                >
                  {lang === "bm" ? "Tarikh Tamat Tempoh (Pilihan)" : "Expiry Date (Optional)"}
                </Label>
                <Input
                  id="expiry-date"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  style={{
                    width: "100%",
                    height: "2rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    fontSize: "0.75rem",
                    backgroundColor: "rgba(248, 249, 250, 0.4)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.375rem",
                    color: "#334155",
                  }}
                />
              </div>
            </>
          )}

          {/* TAB 2: LINK UPLOAD CONTENT */}
          {activeTab === "link" && (
            <>
              {/* Link Title */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <Label 
                  htmlFor="link-title" 
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#94a3b8",
                  }}
                >
                  {lang === "bm" ? "Nama Pautan" : "Link Name"}
                </Label>
                <Input
                  id="link-title"
                  type="text"
                  placeholder={lang === "bm" ? "cth. Laman Web Syarikat" : "e.g. Company Website"}
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  className="focus-visible:ring-1 focus-visible:ring-[#003087]/20 focus-visible:border-[#003087] transition-all shadow-none"
                  style={{
                    width: "100%",
                    height: "2rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    fontSize: "0.75rem",
                    backgroundColor: "rgba(248, 249, 250, 0.4)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.375rem",
                  }}
                  autoFocus
                />
              </div>

              {/* Link URL */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <Label 
                  htmlFor="link-url" 
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#94a3b8",
                  }}
                >
                  {lang === "bm" ? "Alamat URL" : "URL Link"}
                </Label>
                <Input
                  id="link-url"
                  type="text"
                  placeholder="e.g. www.senangsync.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="focus-visible:ring-1 focus-visible:ring-[#003087]/20 focus-visible:border-[#003087] transition-all shadow-none"
                  style={{
                    width: "100%",
                    height: "2rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    fontSize: "0.75rem",
                    backgroundColor: "rgba(248, 249, 250, 0.4)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.375rem",
                  }}
                />
              </div>
            </>
          )}
          
          {/* Action Buttons */}
          <DialogFooter 
            className="flex gap-2 sm:flex-row"
            style={{
              paddingTop: "0.5rem",
            }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setIsOpen(false);
              }}
              className="flex-1"
              style={{
                height: "2rem",
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#64748b",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
              }}
            >
              {lang === "bm" ? "BATAL" : "CANCEL"}
            </Button>
            <Button
              type="submit"
              className="flex-1"
              style={{
                height: "2rem",
                backgroundColor: "#003087",
                color: "#ffffff",
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderRadius: "0.375rem",
                border: "none",
                opacity: 1, // Keep solid brand blue at 100% opacity all the time
                cursor: isFormValid() ? "pointer" : "not-allowed",
              }}
            >
              {activeTab === "file" 
                ? (lang === "bm" ? "MUAT NAIK" : "UPLOAD") 
                : (lang === "bm" ? "TAMBAH PAUTAN" : "ADD LINK")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
