"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Folder, FolderPlus, Link2, FileText, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { type Folder as FolderType, type Resource } from "@/lib/mock-data";

interface EditResourceModalProps {
  resource: Resource | null;
  folders: FolderType[];
  lang: "bm" | "en";
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (resourceId: string, updatedFields: Partial<Resource>) => void;
}

export function EditResourceModal({
  resource,
  folders,
  lang,
  isOpen,
  onOpenChange,
  onSave,
}: EditResourceModalProps) {
  const [resourceName, setResourceName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown clicking outside
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

  // Prepopulate form fields when resource changes
  useEffect(() => {
    if (resource) {
      setResourceName(resource.name);
      setSelectedFolderId(resource.folderId);
      setExpiryDate(resource.expiryDate || "");
      setLinkUrl(resource.url || "");
    }
  }, [resource, isOpen]);

  if (!resource) return null;

  const isLink = resource.type === "link";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceName.trim()) return;

    const updatedFields: Partial<Resource> = {
      name: resourceName.trim(),
      folderId: selectedFolderId,
    };

    if (isLink) {
      let formattedUrl = linkUrl.trim();
      if (formattedUrl && !/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
      }
      updatedFields.url = formattedUrl;
    } else {
      updatedFields.expiryDate = expiryDate || undefined;
    }

    onSave(resource.id, updatedFields);
    onOpenChange(false);
  };

  const isFormValid = () => {
    if (!resourceName.trim()) return false;
    if (isLink && !linkUrl.trim()) return false;
    return true;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white border border-gray-200/50 gap-0"
        style={{
          maxWidth: "380px",
          width: "calc(100% - 2rem)",
          padding: "2.25rem",
          borderRadius: "1.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 10px 20px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)",
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
              backgroundColor: "#003087",
              color: "#ffffff",
            }}
          >
            <FolderPlus style={{ width: "1.125rem", height: "1.125rem" }} />
          </div>
          <DialogTitle 
            className="text-gray-900 tracking-tight"
            style={{
              fontSize: "1.0625rem",
              fontWeight: 700,
              margin: 0,
            }}
          >
            {lang === "bm" ? "Edit Sumber" : "Edit Resource"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem", paddingTop: "1.25rem" }}>
          
          {/* Target Folder Selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <Label 
              htmlFor="edit-target-folder" 
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
          </div>

          {/* Name Field (Document Name or Link Name) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <Label 
              htmlFor="edit-resource-name" 
              style={{
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#94a3b8",
              }}
            >
              {isLink
                ? (lang === "bm" ? "Nama Pautan" : "Link Name")
                : (lang === "bm" ? "Nama Dokumen" : "Document Name")}
            </Label>
            <Input
              id="edit-resource-name"
              type="text"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
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
              required
            />
          </div>

          {/* Link URL (if Link) */}
          {isLink && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              <Label 
                htmlFor="edit-link-url" 
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
                id="edit-link-url"
                type="text"
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
                required
              />
            </div>
          )}

          {/* Expiry Date (if Document) */}
          {!isLink && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              <Label 
                htmlFor="edit-expiry-date" 
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
                id="edit-expiry-date"
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
              onClick={() => onOpenChange(false)}
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
                opacity: 1,
                cursor: isFormValid() ? "pointer" : "not-allowed",
              }}
            >
              {lang === "bm" ? "SIMPAN" : "SAVE"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
