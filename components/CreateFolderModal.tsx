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
import { FolderPlus, Plus } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/lib/store";

interface CreateFolderModalProps {
  onFolderCreated: (name: string) => void;
}

export function CreateFolderModal({ onFolderCreated }: CreateFolderModalProps) {
  const { lang } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    onFolderCreated(folderName.trim());
    setFolderName("");
    setIsOpen(false);
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setFolderName("");
      }}
    >
      <DialogTrigger asChild>
        <button className="btn btn-secondary btn-sm">
          <Plus size={15} />
          {lang === "bm" ? "Folder Baru" : "New Folder"}
        </button>
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
            {lang === "bm" ? "Cipta Folder" : "Create Folder"}
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
              ? "Tambah aset perniagaan anda ke repositori ruang kerja baharu."
              : "Add your business assets to a new workspace repository."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", paddingTop: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <Label 
              htmlFor="folder-name" 
              style={{
                fontSize: "0.625rem", // 10px
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#94a3b8", // text-gray-400
              }}
            >
              {lang === "bm" ? "Nama Folder" : "Folder Name"}
            </Label>
            <Input
              id="folder-name"
              type="text"
              placeholder={lang === "bm" ? "cth. Strategi S4" : "e.g. Q4 Strategy"}
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="focus-visible:ring-1 focus-visible:ring-[#003087]/20 focus-visible:border-[#003087] transition-all shadow-none"
              style={{
                width: "100%",
                height: "2rem", // 32px height
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
          
          <DialogFooter 
            className="flex gap-2 sm:flex-row"
            style={{
              paddingTop: "0.25rem",
            }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFolderName("");
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
                cursor: folderName.trim() ? "pointer" : "not-allowed",
              }}
            >
              {lang === "bm" ? "CIPTA FOLDER" : "CREATE FOLDER"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
