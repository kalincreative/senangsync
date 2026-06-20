import type { Lang } from "./mock-data";

// ============================================
// SENANG SYNC — COPY / TRANSLATION SYSTEM
// ============================================

type Copy = {
  bm: string;
  en: string;
};

function t(copy: Copy, lang: Lang): string {
  return copy[lang];
}

export const copy = {
  // === NAV ===
  nav: {
    dashboard: { bm: "Papan Pemuka", en: "Dashboard" },
    masterlist: { bm: "Resource Masterlist", en: "Resource Masterlist" },
    subscriptions: { bm: "Subscription Tracker", en: "Subscription Tracker" },
    products: { bm: "Product Catalog", en: "Product Catalog" },
    analytics: { bm: "Analisis", en: "Analytics" },
    settings: { bm: "Tetapan", en: "Settings" },
  },

  // === DASHBOARD ===
  dashboard: {
    greeting_morning: { bm: "Selamat pagi", en: "Good morning" },
    greeting_afternoon: { bm: "Selamat tengahari", en: "Good afternoon" },
    greeting_evening: { bm: "Selamat petang", en: "Good evening" },
    monthly_burn: { bm: "Bakar Bulanan", en: "Monthly Burn" },
    active_subscriptions: { bm: "Langganan Aktif", en: "Active Subscriptions" },
    total_products: { bm: "Jumlah Produk", en: "Total Products" },
    total_folders: { bm: "Jumlah Folder", en: "Total Folders" },
    quick_add: { bm: "Tambah Baru", en: "Add New" },
    add_resource: { bm: "Tambah Sumber", en: "Add Resource" },
    add_subscription: { bm: "Tambah Langganan", en: "Add Subscription" },
    add_product: { bm: "Tambah Produk", en: "Add Product" },
    upcoming_renewals: { bm: "Pembaharuan Akan Datang", en: "Upcoming Renewals" },
    expiring_docs: { bm: "Dokumen Hampir Tamat", en: "Expiring Documents" },
    search_placeholder: { bm: "Cari apa-apa...", en: "Search anything..." },
    no_renewals: { bm: "Tiada pembaharuan dalam 7 hari. Tenang!", en: "No renewals in 7 days. All clear!" },
    command_hint: { bm: "Tekan ⌘K untuk cari", en: "Press ⌘K to search" },
  },

  // === MASTERLIST ===
  masterlist: {
    title: { bm: "Senarai Utama", en: "Masterlist" },
    subtitle: { bm: "Semua dokumen dan link bisnes kau", en: "All your business documents and links" },
    new_folder: { bm: "Folder Baru", en: "New Folder" },
    upload_doc: { bm: "Muat Naik Dokumen", en: "Upload Document" },
    save_link: { bm: "Simpan Link", en: "Save Link" },
    search_placeholder: { bm: "Cari fail atau folder...", en: "Search files or folders..." },
    copy_link: { bm: "Salin Link", en: "Copy Link" },
    download: { bm: "Muat Turun", en: "Download" },
    share_wa: { bm: "Kongsi via WhatsApp", en: "Share via WhatsApp" },
    expiry_label: { bm: "Tamat tempoh", en: "Expires" },
    empty_title: { bm: "Belum ada fail lagi", en: "No files yet" },
    empty_desc: { bm: "Jom tambah dokumen atau link bisnes kau yang pertama!", en: "Add your first business document or link!" },
    empty_folder_title: { bm: "Folder ini kosong", en: "This folder is empty" },
    empty_folder_desc: { bm: "Muat naik dokumen atau simpan link dalam folder ni.", en: "Upload a document or save a link in this folder." },
    back: { bm: "Kembali", en: "Back" },
    resources: { bm: "sumber", en: "resources" },
  },

  // === SUBSCRIPTIONS ===
  subscriptions: {
    title: { bm: "Pelacak Langganan", en: "Subscription Tracker" },
    subtitle: { bm: "Rekod semua perbelanjaan SaaS dan perniagaan berulang", en: "Track all your recurring business expenses" },
    monthly_total: { bm: "Jumlah Bulanan", en: "Monthly Total" },
    add_subscription: { bm: "Tambah Langganan", en: "Add Subscription" },
    renews_on: { bm: "Baharui pada", en: "Renews on" },
    billing_via: { bm: "Bayar via", en: "Billed via" },
    export_csv: { bm: "Eksport CSV", en: "Export CSV" },
    active: { bm: "Aktif", en: "Active" },
    inactive: { bm: "Tidak Aktif", en: "Inactive" },
    all: { bm: "Semua", en: "All" },
    empty_title: { bm: "Tiada langganan lagi", en: "No subscriptions yet" },
    empty_desc: { bm: "Dah ada SaaS yang kau bayar? Jom rekod kat sini!", en: "Have any SaaS tools you're paying for? Add them here!" },
    renewing_soon: { bm: "Baharui dalam masa terdekat", en: "Renewing soon" },
  },

  // === PRODUCTS ===
  products: {
    title: { bm: "Katalog Produk", en: "Product Catalog" },
    subtitle: { bm: "Semua produk, perkhidmatan, dan tawaran digital kau", en: "All your products, services, and digital offerings" },
    add_product: { bm: "Tambah Produk", en: "Add Product" },
    price: { bm: "Harga", en: "Price" },
    visit_sales_page: { bm: "Buka Halaman Jualan", en: "Visit Sales Page" },
    all: { bm: "Semua", en: "All" },
    empty_title: { bm: "Tiada produk lagi", en: "No products yet" },
    empty_desc: { bm: "Kau jual apa? Jom tambah produk atau perkhidmatan kau!", en: "What are you selling? Add your first product or service!" },
    active: { bm: "Aktif", en: "Active" },
    draft: { bm: "Draf", en: "Draft" },
    archived: { bm: "Arkib", en: "Archived" },
  },

  // === SETTINGS ===
  settings: {
    title: { bm: "Tetapan Workspace", en: "Workspace Settings" },
    workspace_name: { bm: "Nama Workspace", en: "Workspace Name" },
    theme: { bm: "Tema", en: "Theme" },
    language: { bm: "Bahasa", en: "Language" },
    currency: { bm: "Mata Wang", en: "Currency" },
    bm: { bm: "Bahasa Melayu", en: "Bahasa Melayu" },
    en: { bm: "English", en: "English" },
    workspaces: { bm: "Workspace Kau", en: "Your Workspaces" },
    create_workspace: { bm: "Cipta Workspace Baru", en: "Create New Workspace" },
    switch_workspace: { bm: "Tukar Workspace", en: "Switch Workspace" },
  },

  // === COMMON ===
  common: {
    save: { bm: "Simpan", en: "Save" },
    cancel: { bm: "Batal", en: "Cancel" },
    delete: { bm: "Padam", en: "Delete" },
    edit: { bm: "Edit", en: "Edit" },
    confirm: { bm: "Sahkan", en: "Confirm" },
    loading: { bm: "Memuatkan...", en: "Loading..." },
    search: { bm: "Cari", en: "Search" },
    add: { bm: "Tambah", en: "Add" },
    close: { bm: "Tutup", en: "Close" },
    create: { bm: "Cipta", en: "Create" },
    update: { bm: "Kemaskini", en: "Update" },
    more_options: { bm: "Pilihan lain", en: "More options" },
    view_all: { bm: "Lihat semua", en: "View all" },
    rm: { bm: "RM", en: "RM" },
    per_month: { bm: "/ bulan", en: "/ month" },
    days_left: { bm: "hari lagi", en: "days left" },
    today: { bm: "Hari ini", en: "Today" },
    yesterday: { bm: "Semalam", en: "Yesterday" },
  },

  // === TOASTS ===
  toast: {
    copied: { bm: "Disalin! Senang kan? 😄", en: "Copied! Easy right? 😄" },
    saved: { bm: "Selamat disimpan! ✅", en: "Saved successfully! ✅" },
    deleted: { bm: "Dah dipadam. Semua clear!", en: "Deleted. All clear!" },
    folder_created: { bm: "Folder baru siap! 📁", en: "New folder created! 📁" },
    subscription_added: { bm: "Langganan ditambah. Rekod kemas! 📋", en: "Subscription added. Records updated! 📋" },
    product_added: { bm: "Produk baru dalam katalog! 🎉", en: "New product in the catalog! 🎉" },
    error: { bm: "Alamak, ada masalah. Cuba lagi!", en: "Oops, something went wrong. Try again!" },
    wa_share: { bm: "Membuka WhatsApp...", en: "Opening WhatsApp..." },
    csv_exported: { bm: "CSV dah siap dimuat turun! 📥", en: "CSV downloaded successfully! 📥" },
  },
} as const;

// Helper: get translated string
export function getString(
  key: keyof typeof copy,
  subKey: string,
  lang: Lang
): string {
  const section = copy[key] as Record<string, Copy>;
  const item = section[subKey];
  if (!item) return subKey;
  return t(item, lang);
}

// Helper: format RM currency
export function formatRM(amount: number): string {
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper: format date in Malaysian style
export function formatDate(dateStr: string, lang: Lang): string {
  const date = new Date(dateStr);
  if (lang === "bm") {
    return date.toLocaleDateString("ms-MY", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return date.toLocaleDateString("en-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Helper: days until date
export function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Helper: greeting based on time
export function getGreeting(lang: Lang): string {
  const hour = new Date().getHours();
  if (hour < 12) return copy.dashboard.greeting_morning[lang];
  if (hour < 17) return copy.dashboard.greeting_afternoon[lang];
  return copy.dashboard.greeting_evening[lang];
}

// Helper: cn (class merge utility)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
