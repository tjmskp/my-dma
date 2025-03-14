"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Ad Accounts",
    href: "/dashboard/ad-accounts",
  },
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
  },
  {
    title: "Media",
    href: "/dashboard/media",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6">
      <Link href="/dashboard" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">
          DMA Platform
        </span>
      </Link>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
} 