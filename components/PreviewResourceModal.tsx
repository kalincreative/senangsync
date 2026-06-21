"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Link2, Calendar, Folder, Globe } from "lucide-react";
import { type Resource } from "@/lib/mock-data";

interface PreviewResourceModalProps {
  resource: Resource | null;
  folderName: string;
  lang: "bm" | "en";
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PreviewResourceModal({
  resource,
  folderName,
  lang,
  isOpen,
  onOpenChange,
}: PreviewResourceModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  if (!resource) return null;

  const isLink = resource.type === "link";

  const handleCopyLink = () => {
    if (resource.url) {
      navigator.clipboard.writeText(resource.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderDocumentPreview = () => {
    // If there is an uploaded image preview URL
    if (resource.previewUrl) {
      return (
        <div className="w-full flex items-center justify-center bg-slate-50 border border-gray-100 rounded-xl overflow-hidden p-2 my-4" style={{ minHeight: "200px" }}>
          <img 
            src={resource.previewUrl} 
            alt={resource.name} 
            className="max-h-60 w-auto object-contain rounded-lg shadow-sm"
          />
        </div>
      );
    }

    const nameLower = resource.name.toLowerCase();

    // 1. JAKIM Halal Certificate Mockup
    if (nameLower.includes("halal") || nameLower.includes("jakim")) {
      return (
        <div 
          className="w-full border-2 border-emerald-600/30 bg-[#f4fbf7] rounded-xl p-4 flex flex-col items-center shadow-inner relative overflow-hidden my-4" 
          style={{ minHeight: "240px" }}
        >
          {/* Certificate header */}
          <div className="flex flex-col items-center text-center pb-2 border-b border-emerald-100 w-full mb-3">
            {/* Mock Badge Icon (JAKIM Crest) */}
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold mb-1 shadow-sm">
              حلال
            </div>
            <span className="text-[9px] font-bold text-emerald-800 tracking-wider">SIJIL PENGESAHAN HALAL</span>
            <span className="text-[7px] text-emerald-600 uppercase tracking-widest">Malaysia Halal Directory</span>
          </div>
          
          {/* Certificate content */}
          <div className="flex flex-col items-center text-center flex-1 justify-center w-full">
            <span className="text-[9px] text-emerald-600 italic">Dengan ini disahkan perniagaan / produk:</span>
            <span className="text-[12px] font-extrabold text-emerald-950 my-1 tracking-tight leading-tight uppercase">
              {resource.name}
            </span>
            <span className="text-[9px] text-emerald-700 font-semibold mb-3">KEDAI KEK ALIA ENTERPRISE</span>
            
            {/* Visual verification stamps */}
            <div className="flex gap-4 items-center justify-center bg-white px-3 py-1.5 rounded-lg border border-emerald-100 w-full">
              <div className="flex flex-col text-left">
                <span className="text-[7px] text-emerald-600 font-bold uppercase">No. Sijil</span>
                <span className="text-[8px] font-mono text-emerald-900 font-bold">JAKIM/(S)/(22.00)/492/2</span>
              </div>
              <div className="w-px h-6 bg-emerald-100" />
              <div className="flex flex-col text-left">
                <span className="text-[7px] text-emerald-600 font-bold uppercase">Sah Sehingga</span>
                <span className="text-[8px] font-mono text-emerald-900 font-bold">{resource.expiryDate || "2026-09-15"}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. SSM Registration Form Mockup
    if (nameLower.includes("ssm") || nameLower.includes("daftar") || nameLower.includes("perakuan")) {
      return (
        <div 
          className="w-full border-2 border-orange-600/30 bg-[#fffdfa] rounded-xl p-4 flex flex-col items-center shadow-inner relative overflow-hidden my-4" 
          style={{ minHeight: "240px" }}
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center pb-2 border-b border-orange-100 w-full mb-3">
            <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center text-white text-[9px] font-black mb-1 shadow-sm">
              SSM
            </div>
            <span className="text-[9px] font-extrabold text-orange-850 tracking-wider">SURUHANJAYA SYARIKAT MALAYSIA</span>
            <span className="text-[7px] text-orange-600 uppercase tracking-widest font-semibold">Companies Commission of Malaysia</span>
          </div>

          {/* Body */}
          <div className="flex flex-col items-center text-center flex-1 justify-center w-full">
            <span className="text-[9px] font-extrabold text-orange-800 uppercase tracking-wide">PERAKUAN PENDAFTARAN</span>
            <span className="text-[7px] text-orange-500 italic mb-2">Pendaftaran Perniagaan (Akta Pendaftaran Perniagaan 1956)</span>
            
            <div className="w-full bg-[#fdf8f2] border border-orange-100/50 rounded-lg p-2.5 flex flex-col gap-1.5 text-left mb-2">
              <div className="flex flex-col">
                <span className="text-[7px] text-orange-500 font-bold uppercase">Nama Perniagaan</span>
                <span className="text-[9px] font-extrabold text-orange-950 uppercase">{resource.name}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-[7px] text-orange-500 font-bold uppercase">No. Pendaftaran</span>
                  <span className="text-[8px] font-mono font-bold text-orange-900">202601015342 (AS0432551-A)</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[7px] text-orange-500 font-bold uppercase">Tarikh Tamat</span>
                  <span className="text-[8px] font-mono font-bold text-orange-900">{resource.expiryDate || "2026-12-31"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. Default Document / DuitNow QR Mockup (highly requested for Malaysian/SenangSync context)
    return (
      <div 
        className="w-full border-2 border-rose-600/30 bg-white rounded-xl p-4 flex flex-col items-center shadow-inner relative overflow-hidden my-4" 
        style={{ minHeight: "260px" }}
      >
        {/* DuitNow header */}
        <div className="flex flex-col items-center text-center pb-2 border-b border-rose-100 w-full mb-3">
          <div className="flex items-center gap-1.5 bg-rose-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
            <span style={{ color: "#ffffff" }}>DuitNow</span>
            <span style={{ color: "#ffffff", opacity: 0.9 }}>QR</span>
          </div>
          <span className="text-[8px] text-rose-600 font-bold mt-1 tracking-wider uppercase">National QR Standard</span>
        </div>

        {/* QR Core frame */}
        <div className="relative w-36 h-36 bg-white border border-gray-100 flex items-center justify-center rounded-xl p-2.5 my-1.5 shadow-sm">
          {/* Simulated QR Code SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800" fill="currentColor">
            {/* Finder Patterns */}
            <rect x="0" y="0" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="4.5" />
            <rect x="5.5" y="5.5" width="11" height="11" fill="currentColor" />
            
            <rect x="78" y="0" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="4.5" />
            <rect x="83.5" y="5.5" width="11" height="11" fill="currentColor" />
            
            <rect x="0" y="78" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="4.5" />
            <rect x="5.5" y="83.5" width="11" height="11" fill="currentColor" />
            
            {/* Center DuitNow Pink Badge box */}
            <rect x="40.5" y="40.5" width="19" height="19" fill="#e11d48" rx="3.5" />
            <circle cx="50" cy="50" r="4.5" fill="#ffffff" />
            
            {/* Random QR elements */}
            <rect x="30" y="5" width="8" height="8" />
            <rect x="45" y="0" width="12" height="5" />
            <rect x="65" y="8" width="6" height="12" />
            
            <rect x="5" y="30" width="8" height="6" />
            <rect x="10" y="45" width="12" height="6" />
            
            <rect x="30" y="30" width="6" height="6" />
            <rect x="65" y="30" width="8" height="8" />
            
            <rect x="30" y="65" width="8" height="8" />
            <rect x="45" y="70" width="15" height="5" />
            
            <rect x="65" y="65" width="8" height="8" />
            <rect x="85" y="30" width="10" height="10" />
            <rect x="80" y="50" width="15" height="6" />
            <rect x="85" y="65" width="12" height="12" />
            
            <rect x="30" y="85" width="12" height="6" />
            <rect x="45" y="80" width="6" height="12" />
            <rect x="65" y="80" width="8" height="8" />
          </svg>
        </div>

        {/* Merchant and Details */}
        <div className="flex flex-col items-center text-center mt-2.5 w-full">
          <span className="text-[11px] font-black text-rose-950 uppercase tracking-wide leading-tight">
            {resource.name}
          </span>
          <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">KEDAI KEK ALIA</span>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white border border-gray-200/50 gap-0 animate-in fade-in zoom-in-95 duration-200"
        style={{
          maxWidth: "380px",
          width: "calc(100% - 2rem)",
          padding: "2.25rem", // 36px padding all around
          borderRadius: "1.5rem", // 24px rounded corners
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 10px 20px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)", // Pronounced black shadow
        }}
      >
        <DialogHeader className="flex flex-col items-center text-center">
          {/* Top Badge Icon wrapper */}
          <div 
            style={{
              marginBottom: "1rem",
              display: "flex",
              width: "2.5rem",
              height: "2.5rem",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              backgroundColor: isLink ? "#e2e8f0" : "#dbeafe", // Muted dark for link, light blue for doc
              color: isLink ? "#334155" : "#003087",
            }}
          >
            {isLink ? (
              <Link2 style={{ width: "1.125rem", height: "1.125rem" }} />
            ) : (
              <FileText style={{ width: "1.125rem", height: "1.125rem" }} />
            )}
          </div>
          <DialogTitle 
            className="text-gray-900 tracking-tight"
            style={{
              fontSize: "1.0625rem", // ~17px
              fontWeight: 700,
              margin: 0,
              maxWidth: "280px",
              wordBreak: "break-word",
            }}
          >
            {resource.name}
          </DialogTitle>
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.625rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "0.125rem 0.5rem",
              borderRadius: "9999px",
              backgroundColor: isLink ? "#f1f5f9" : "#eff6ff",
              color: isLink ? "#475569" : "#1e40af",
              display: "inline-block",
            }}
          >
            {isLink ? (lang === "bm" ? "PAUTAN WEB" : "WEB LINK") : (lang === "bm" ? "DOKUMEN" : "DOCUMENT")}
          </div>
        </DialogHeader>

        {isLink ? (
          /* Resource details listing for web links */
          <div 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "0.875rem", 
              marginTop: "1.5rem", 
              marginBottom: "1.5rem",
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Target Folder */}
            <div style={{ display: "flex", alignItems: "center", justifyItems: "space-between", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", width: "40%", flexShrink: 0 }}>
                <Folder size={12} className="text-gray-400" />
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#64748b" }}>
                  {lang === "bm" ? "Folder" : "Folder"}
                </span>
              </div>
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#334155", textAlign: "right", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {folderName}
              </span>
            </div>

            {/* URL */}
            <div style={{ display: "flex", alignItems: "center", justifyItems: "space-between", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", width: "40%", flexShrink: 0 }}>
                <Globe size={12} className="text-gray-400" />
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#64748b" }}>
                  URL
                </span>
              </div>
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  fontSize: "0.6875rem", 
                  fontWeight: 700, 
                  color: "#003087", 
                  textDecoration: "underline", 
                  textAlign: "right", 
                  flex: 1, 
                  overflow: "hidden", 
                  textOverflow: "ellipsis", 
                  whiteSpace: "nowrap" 
                }}
              >
                {resource.url}
              </a>
            </div>

            {/* Date Created */}
            <div style={{ display: "flex", alignItems: "center", justifyItems: "space-between", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", width: "40%", flexShrink: 0 }}>
                <Calendar size={12} className="text-gray-400" />
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#64748b" }}>
                  {lang === "bm" ? "Tarikh Cipta" : "Date Created"}
                </span>
              </div>
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#334155", textAlign: "right", flex: 1 }}>
                {resource.createdAt}
              </span>
            </div>
          </div>
        ) : (
          /* Document Preview container */
          renderDocumentPreview()
        )}

        {/* Footer Actions */}
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
            {lang === "bm" ? "TUTUP" : "CLOSE"}
          </Button>
          {isLink ? (
            <Button
              className="flex-1 font-bold transition-all duration-200"
              onClick={handleCopyLink}
              style={{
                height: "2rem",
                backgroundColor: copied ? "#10b981" : "#003087",
                color: "#ffffff",
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                borderRadius: "0.375rem",
                border: "none",
              }}
            >
              {copied ? (lang === "bm" ? "DISALIN!" : "COPIED!") : (lang === "bm" ? "SALIN PAUTAN" : "COPY LINK")}
            </Button>
          ) : (
            <Button
              className="flex-1 font-bold"
              onClick={() => {
                alert(lang === "bm" ? `Memuat turun ${resource.name}` : `Downloading ${resource.name}`);
              }}
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
              }}
            >
              {lang === "bm" ? "MUAT TURUN" : "DOWNLOAD"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
