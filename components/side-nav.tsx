"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "rocket",
  },
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
    icon: "dollarSign",
  },
  {
    title: "Ad Accounts",
    href: "/dashboard/ad-accounts",
    icon: "user",
  },
  {
    title: "Media Assets",
    href: "/dashboard/media",
    icon: "image",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "settings",
  },
] as const;

type IconName = keyof typeof Icons;

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-[200px] flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="font-semibold">DMA</span>
        </Link>
      </div>
      <div className="flex-1 space-y-1 p-2">
        {sidebarLinks.map((link) => {
          const Icon = Icons[link.icon as IconName];
          return (
            <Button
              key={link.href}
              variant={pathname === link.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === link.href && "bg-muted"
              )}
              asChild
            >
              <Link href={link.href}>
                <Icon className="mr-2 h-4 w-4" />
                {link.title}
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
} 