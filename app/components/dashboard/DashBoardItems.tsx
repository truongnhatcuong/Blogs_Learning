"use client";
import { navLinks } from "@/app/dashboard/layout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashBoardItems() {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((item, index) => (
        <Link
          href={item.link}
          key={index}
          className={cn(
            pathname === item.link
              ? "bg-muted text-blue-600"
              : "text-muted-foreground bg-none ",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          )}
        >
          <item.icon className="size-4" />
          {item.name}
        </Link>
      ))}
    </>
  );
}
