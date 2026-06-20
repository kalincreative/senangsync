"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { copy } from "@/lib/copy";
import { LayoutDashboard, FolderOpen, CreditCard, Package, Settings } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", key: "dashboard" as const, Icon: LayoutDashboard },
  { href: "/masterlist", key: "masterlist" as const, Icon: FolderOpen },
  { href: "/subscriptions", key: "subscriptions" as const, Icon: CreditCard },
  { href: "/products", key: "products" as const, Icon: Package },
  { href: "/settings", key: "settings" as const, Icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  const lang = useAppStore((s) => s.lang);

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ href, key, Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 1.75}
              color={isActive ? "var(--color-primary)" : "var(--color-text-muted)"}
            />
            <span>{copy.nav[key][lang]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
