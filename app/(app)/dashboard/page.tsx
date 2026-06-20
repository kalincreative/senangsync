"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { formatRM, getGreeting } from "@/lib/copy";
import {
  MOCK_SUBSCRIPTIONS,
  MOCK_PRODUCTS,
  MOCK_RESOURCES,
} from "@/lib/mock-data";
import {
  FolderOpen,
  CreditCard,
  Package,
  Search,
  Bell,
  TrendingUp,
  Command,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Link2,
  AlertCircle,
  Palette,
  Layers,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { lang, toggleLang, toggleCommandBar, activeWorkspace } = useAppStore();
  const [selectedCat, setSelectedCat] = useState<{ name: string; amount: number; color: string; percentage: number } | null>(null);

  const greeting = getGreeting(lang);
  const firstName = activeWorkspace.name.split(" ")[0];

  // Mockup values matching the reference image exactly
  const documentCount = 128;
  const activeSubsCount = 12;
  const productCount = 24;
  const totalSpend = 1870;

  // Spending categories matching mockup
  const spendingCategories = [
    { name: "Design", amount: 620, percentage: 33, color: "var(--color-primary)" },
    { name: "Marketing", amount: 450, percentage: 24, color: "var(--color-secondary)" },
    { name: "Website", amount: 300, percentage: 16, color: "#00A8E8" },
    { name: "Utilities", amount: 250, percentage: 13, color: "var(--color-dark)" },
    { name: "Production", amount: 250, percentage: 13, color: "#10B981" },
  ];

  // Unified list of upcoming renewals (subscriptions) and expiries (documents)
  const upcomingRenewalsAndExpiries = [
    {
      name: "Canva Pro",
      date: lang === "bm" ? "Baharu pada 23 Jun 2026" : "Renews on 23 Jun 2026",
      cost: "RM 65",
      type: "subscription",
      Icon: Palette,
      iconColor: "#00C4FF",
      iconBg: "rgba(0, 196, 255, 0.1)",
    },
    {
      name: "Adobe Creative Cloud",
      date: lang === "bm" ? "Baharu pada 24 Jun 2026" : "Renews on 24 Jun 2026",
      cost: "RM 190",
      type: "subscription",
      Icon: Layers,
      iconColor: "#FF2233",
      iconBg: "rgba(255, 34, 51, 0.1)",
    },
    {
      name: "Google Workspace",
      date: lang === "bm" ? "Baharu pada 26 Jun 2026" : "Renews on 26 Jun 2026",
      cost: "RM 60",
      type: "subscription",
      Icon: Mail,
      iconColor: "#4285F4",
      iconBg: "rgba(66, 133, 244, 0.1)",
    },
    {
      name: "SSM Sijil Pendaftaran",
      date: lang === "bm" ? "Tamat pada 30 Jun 2026 (25 hari lagi)" : "Expires on 30 Jun 2026 (25 days left)",
      cost: lang === "bm" ? "Penting" : "Critical",
      type: "expiry-danger",
      Icon: AlertCircle,
      iconColor: "var(--color-danger)",
      iconBg: "rgba(239, 68, 68, 0.1)",
    },
    {
      name: "Microsoft 365",
      date: lang === "bm" ? "Baharu pada 02 Jul 2026" : "Renews on 02 Jul 2026",
      cost: "RM 45",
      type: "subscription",
      Icon: CreditCard,
      iconColor: "#10B981",
      iconBg: "rgba(16, 185, 129, 0.1)",
    },
    {
      name: "AWS Cloud Hosting",
      date: lang === "bm" ? "Baharu pada 05 Jul 2026" : "Renews on 05 Jul 2026",
      cost: "RM 850",
      type: "subscription",
      Icon: CreditCard,
      iconColor: "#F4C542",
      iconBg: "rgba(244, 197, 66, 0.1)",
    },
    {
      name: "HRDCorp Sijil",
      date: lang === "bm" ? "Tamat pada 15 Jul 2026 (40 hari lagi)" : "Expires on 15 Jul 2026 (40 days left)",
      cost: lang === "bm" ? "Amaran" : "Warning",
      type: "expiry-warning",
      Icon: AlertCircle,
      iconColor: "var(--color-warning)",
      iconBg: "rgba(245, 158, 11, 0.1)",
    },
    {
      name: "Zoom Business",
      date: lang === "bm" ? "Baharu pada 18 Jul 2026" : "Renews on 18 Jul 2026",
      cost: "RM 120",
      type: "subscription",
      Icon: FolderOpen,
      iconColor: "#8B5CF6",
      iconBg: "rgba(139, 92, 246, 0.1)",
    }
  ];

  return (
    <div className="page-container animate-fade-in">
      {/* Top Header Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {lang === "bm" ? "Selamat datang, Kalin!" : "Welcome back, Kalin!"} 👋
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: "0.25rem 0 0" }}>
            {lang === "bm" ? "Ini ringkasan bisnes anda hari ini." : "Here is your business summary today."}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          {/* BM/EN Toggle */}
          <div
            style={{
              background: "var(--color-surface-raised)",
              padding: "0.25rem",
              borderRadius: "var(--radius-md)",
              display: "flex",
              border: "1px solid var(--color-border)",
            }}
          >
            <button
              onClick={() => lang !== "bm" && toggleLang()}
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                background: lang === "bm" ? "var(--color-dark)" : "transparent",
                color: lang === "bm" ? "#ffffff" : "var(--color-text-secondary)",
                transition: "all var(--transition-fast)",
              }}
            >
              BM
            </button>
            <button
              onClick={() => lang !== "en" && toggleLang()}
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                background: lang === "en" ? "var(--color-dark)" : "transparent",
                color: lang === "en" ? "#ffffff" : "var(--color-text-secondary)",
                transition: "all var(--transition-fast)",
              }}
            >
              BI
            </button>
          </div>

          {/* Notification bell */}
          <button
            className="btn btn-secondary"
            style={{
              width: 40,
              height: 40,
              padding: 0,
              borderRadius: "50%",
              position: "relative",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bell size={18} />
            <span
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                width: 16,
                height: 16,
                background: "var(--color-primary)",
                color: "#ffffff",
                borderRadius: "50%",
                fontSize: "0.625rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--color-bg)",
              }}
            >
              2
            </span>
          </button>
        </div>
      </div>

      {/* Global Search Bar */}
      <button
        onClick={toggleCommandBar}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.875rem 1rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          cursor: "pointer",
          marginBottom: "1.75rem",
          transition: "all var(--transition-fast)",
          color: "var(--color-text-muted)",
          fontSize: "0.9rem",
          textAlign: "left",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#F4C542";
          e.currentTarget.style.boxShadow = "var(--shadow-md)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <Search size={18} />
        <span style={{ flex: 1 }}>
          {lang === "bm" ? "Cari apa sahaja dalam SenangSync..." : "Search anything in SenangSync..."}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.25rem 0.5rem",
            background: "var(--color-surface-raised)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border)",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--color-text-muted)",
          }}
        >
          <Command size={11} />
          <span>K</span>
        </div>
      </button>

      {/* Main Grid Layout split into Content and Aside */}
      <div className="dashboard-grid">
        {/* Left Side: Stats and Graphs */}
        <div className="dashboard-main">
          
          {/* Top 3 Colored Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {/* Box 1: Masterlist (Blue) */}
            <div className="relative w-full h-[160px] overflow-hidden rounded-3xl group bg-gradient-to-br from-[#003087] to-[#3B82F6] shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" style={{ color: "#ffffff" }}>
              {/* Soft glowing texture blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full pointer-events-none z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 blur-2xl rounded-full pointer-events-none z-0"></div>
              
              {/* Left Side Content: Title, Number, Subtext */}
              <div className="absolute left-6 top-6 bottom-6 flex flex-col justify-between pointer-events-none z-10">
                <div className="flex flex-col">
                  <div className="text-white font-bold tracking-wider uppercase text-[0.75rem]">
                    Dokumen & Link
                  </div>
                  <div className="text-[2.25rem] font-black leading-none mt-1 text-white">
                    {documentCount}
                  </div>
                </div>
                <div className="text-white font-medium text-[0.75rem]">
                  +12 {lang === "bm" ? "bulan ini" : "this month"}
                </div>
              </div>

              {/* Right Side Content: Top Icon */}
              <div className="absolute right-6 top-6 z-10">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "1rem",
                    background: "rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <FolderOpen size={20} color="#ffffff" />
                </div>
              </div>

              {/* Clickable Action Arrow (Only the arrow icon, no circle background) */}
              <Link href="/masterlist" className="absolute z-20 bottom-5 right-5 w-10 h-10 flex items-center justify-center hover:scale-110 transition-all">
                <ArrowUpRight size={24} strokeWidth={2.5} color="#ffffff" />
              </Link>
            </div>

            {/* Box 2: Subscription Tracker (Red) */}
            <div className="relative w-full h-[160px] overflow-hidden rounded-3xl group bg-gradient-to-br from-[#CC0001] via-[#E60000] to-[#E60000] shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" style={{ color: "#ffffff" }}>
              {/* Soft glowing texture blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full pointer-events-none z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 blur-2xl rounded-full pointer-events-none z-0"></div>
              
              {/* Left Side Content: Title, Number, Subtext */}
              <div className="absolute left-6 top-6 bottom-6 flex flex-col justify-between pointer-events-none z-10">
                <div className="flex flex-col">
                  <div className="text-white font-bold tracking-wider uppercase text-[0.75rem]">
                    Subscription Aktif
                  </div>
                  <div className="text-[2.25rem] font-black leading-none mt-1 text-white">
                    {activeSubsCount}
                  </div>
                </div>
                <div className="text-white font-medium text-[0.75rem]">
                  RM 1,870 / {lang === "bm" ? "bulan" : "month"}
                </div>
              </div>

              {/* Right Side Content: Top Icon */}
              <div className="absolute right-6 top-6 z-10">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "1rem",
                    background: "rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <CreditCard size={20} color="#ffffff" />
                </div>
              </div>

              {/* Clickable Action Arrow (Only the arrow icon, no circle background) */}
              <Link href="/subscriptions" className="absolute z-20 bottom-5 right-5 w-10 h-10 flex items-center justify-center hover:scale-110 transition-all">
                <ArrowUpRight size={24} strokeWidth={2.5} color="#ffffff" />
              </Link>
            </div>

            {/* Box 3: Product Catalog (Yellow) */}
            <div className="relative w-full h-[160px] overflow-hidden rounded-3xl group bg-gradient-to-br from-[#F4C542] to-[#E8A800] shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer" style={{ color: "#ffffff" }}>
              {/* Soft glowing texture blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full pointer-events-none z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 blur-2xl rounded-full pointer-events-none z-0"></div>
              
              {/* Left Side Content: Title, Number, Subtext */}
              <div className="absolute left-6 top-6 bottom-6 flex flex-col justify-between pointer-events-none z-10">
                <div className="flex flex-col">
                  <div className="text-white font-bold tracking-wider uppercase text-[0.75rem]">
                    Produk
                  </div>
                  <div className="text-[2.25rem] font-black leading-none mt-1 text-white">
                    {productCount}
                  </div>
                </div>
                <div className="text-white font-medium text-[0.75rem]">
                  +3 {lang === "bm" ? "bulan ini" : "this month"}
                </div>
              </div>

              {/* Right Side Content: Top Icon */}
              <div className="absolute right-6 top-6 z-10">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "1rem",
                    background: "rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <Package size={20} color="#ffffff" />
                </div>
              </div>

              {/* Clickable Action Arrow (Only the arrow icon, no circle background) */}
              <Link href="/products" className="absolute z-20 bottom-5 right-5 w-10 h-10 flex items-center justify-center hover:scale-110 transition-all">
                <ArrowUpRight size={24} strokeWidth={2.5} color="#ffffff" />
              </Link>
            </div>
          </div>

          {/* Upcoming Renewals & Expiries Card */}
          <div className="card flex-grow relative overflow-hidden hover:!border-[#F4C542] hover:shadow-md transition-all duration-300" style={{ background: "var(--color-surface)", display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Soft glowing texture blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#003087]/5 blur-3xl rounded-full pointer-events-none z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#CC0001]/5 blur-2xl rounded-full pointer-events-none z-0"></div>
            
            <div className="relative z-10 flex flex-col flex-grow h-full">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, margin: 0 }}>
                    {lang === "bm" ? "Pembaharuan & Tamat Tempoh Akan Datang" : "Upcoming Renewals & Expiries"}
                  </h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: "0.25rem 0 0" }}>
                    {lang === "bm" ? "Peringatan pembaharuan subscription dan dokumen penting" : "Alerts for upcoming subscription renewals and document expiries"}
                  </p>
                </div>
                <Link
                  href="/subscriptions"
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  {lang === "bm" ? "Urus Semua" : "Manage All"}
                  <ArrowRight size={12} />
                </Link>
              </div>

              {/* Combined Renewals & Expiries List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flexGrow: 1 }}>
                {upcomingRenewalsAndExpiries.slice(0, 5).map((item, idx) => {
                  const ItemIcon = item.Icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-surface-raised)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "var(--radius-sm)",
                          background: item.iconBg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <ItemIcon size={18} color={item.iconColor} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            color: "var(--color-text-primary)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                          {item.date}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 800,
                          color: item.type.startsWith("expiry") 
                            ? (item.type === "expiry-danger" ? "var(--color-danger)" : "var(--color-warning)") 
                            : "var(--color-text-primary)",
                          padding: item.type.startsWith("expiry") ? "0.25rem 0.5rem" : "0",
                          background: item.type.startsWith("expiry") 
                            ? (item.type === "expiry-danger" ? "rgba(239, 68, 68, 0.05)" : "rgba(245, 158, 11, 0.05)") 
                            : "transparent",
                          borderRadius: "var(--radius-sm)",
                          border: item.type.startsWith("expiry") 
                            ? `1px solid ${item.type === "expiry-danger" ? "rgba(239, 68, 68, 0.15)" : "rgba(245, 158, 11, 0.15)"}` 
                            : "none",
                        }}
                      >
                        {item.cost}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Spend & Quick actions */}
        <div className="dashboard-aside">
          {/* Monthly Spend breakdown Card */}
          <div className="card relative overflow-hidden hover:!border-[#F4C542] hover:shadow-md transition-all duration-300" style={{ background: "var(--color-surface)", display: "flex", flexDirection: "column" }}>
            {/* Soft glowing texture blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#CC0001]/5 blur-3xl rounded-full pointer-events-none z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#F4C542]/5 blur-2xl rounded-full pointer-events-none z-0"></div>
            
            <div className="relative z-10 flex flex-col flex-grow h-full">
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                {lang === "bm" ? "Perbelanjaan Bulanan" : "Monthly Spend"}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "1.5rem", marginTop: 0 }}>
                {lang === "bm" ? "Ringkasan perbelanjaan bulan ini" : "Summary of expenses for this month"}
              </p>

              {/* SVG Semi-Circle Chart */}
              <div style={{ position: "relative", width: 260, height: 140, margin: "0 auto 0.5rem auto", flexShrink: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 100 55" style={{ display: "block" }}>
                  {/* Background light yellow arc */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="rgba(244, 197, 66, 0.15)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  
                  {/* Foreground active solid yellow arc */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#F4C542"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${selectedCat ? (selectedCat.percentage / 100) * 125.66 : 125.66} 125.66`}
                    strokeDashoffset="0"
                    style={{
                      transition: "stroke-dasharray 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </svg>

                {/* Inner text inside the semi-circle */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {selectedCat ? selectedCat.name : (lang === "bm" ? "Jumlah" : "Total")}
                  </span>
                  <span
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      color: "var(--color-text-primary)",
                      marginTop: "2px",
                      transition: "all 0.2s",
                    }}
                  >
                    {formatRM(selectedCat ? selectedCat.amount : totalSpend)}
                  </span>
                </div>
              </div>

              {/* Category pills list below the chart */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}>
                {spendingCategories.map((cat) => {
                  const isSelected = selectedCat?.name === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => {
                        if (selectedCat?.name === cat.name) {
                          setSelectedCat(null);
                        } else {
                          setSelectedCat(cat);
                        }
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        padding: "0.375rem 0.75rem",
                        borderRadius: "var(--radius-md)",
                        background: isSelected ? "rgba(244, 197, 66, 0.1)" : "transparent",
                        border: `1px solid ${isSelected ? "#F4C542" : "transparent"}`,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      className="hover:bg-gray-50/80"
                    >
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: isSelected ? "#F4C542" : "var(--color-text-muted)", display: "inline-block" }} />
                      <span style={{ fontSize: "0.8125rem", fontWeight: isSelected ? 700 : 500, color: isSelected ? "#d4a313" : "var(--color-text-primary)" }}>
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section: Tindakan Pantas (Quick Actions) */}
          <div className="card relative overflow-hidden hover:!border-[#F4C542] hover:shadow-md transition-all duration-300" style={{ background: "var(--color-surface)", padding: "1.25rem", display: "flex", flexDirection: "column" }}>
            {/* Soft glowing texture blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F4C542]/5 blur-3xl rounded-full pointer-events-none z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#003087]/5 blur-2xl rounded-full pointer-events-none z-0"></div>
            
            <div className="relative z-10 flex flex-col flex-grow h-full">
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.875rem" }}>
                {lang === "bm" ? "Tindakan Pantas" : "Quick Actions"}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Link
                  href="/masterlist"
                  className="flex items-center gap-3 w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm rounded-xl transition-all border-none"
                  style={{ color: "#000000" }}
                >
                  <Plus size={16} className="text-blue-600" />
                  <span style={{ color: "#000000" }}>{lang === "bm" ? "Tambah Masterlist" : "Add Masterlist"}</span>
                </Link>

                <Link
                  href="/subscriptions"
                  className="flex items-center gap-3 w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm rounded-xl transition-all border-none"
                  style={{ color: "#000000" }}
                >
                  <Plus size={16} className="text-red-600" />
                  <span style={{ color: "#000000" }}>{lang === "bm" ? "Tambah Subscription" : "Add Subscription"}</span>
                </Link>

                <Link
                  href="/products"
                  className="flex items-center gap-3 w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 font-semibold text-sm rounded-xl transition-all border-none"
                  style={{ color: "#000000" }}
                >
                  <Plus size={16} className="text-yellow-600" />
                  <span style={{ color: "#000000" }}>{lang === "bm" ? "Tambah Produk" : "Add Product"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
