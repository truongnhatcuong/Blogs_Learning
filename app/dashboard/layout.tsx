import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { CircleUser, DollarSign, Globe, Home } from "lucide-react";
import DashBoardItems from "../components/dashboard/DashBoardItems";
import { ModeToggle } from "../components/dashboard/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
export const navLinks = [
  {
    name: "DashBoard",
    link: "/dashboard",
    icon: Home,
  },
  {
    name: "Sites",
    link: "/dashboard/sites",
    icon: Globe,
  },
  {
    name: "Pricing",
    link: "/dashboard/pricing",
    icon: DollarSign,
  },
];

export default function Dashboardlayout({ children }: { children: ReactNode }) {
  return (
    <section
      className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
      suppressHydrationWarning
    >
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-3">
            <Link
              href="/"
              className="flex items-center  font-semibold relative"
            >
              <Image
                src={"/logo.png"}
                alt=""
                height={70}
                width={70}
                className=""
              />
              <h3 className="font-bold text-2xl mr-4 absolute left-14 top-[22px]">
                Blog
                <span className="text-2xl font-semibold text-blue-700">
                  Marshal
                </span>
              </h3>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-4">
              <DashBoardItems />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="ml-auto flex items-center gap-x-5">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"secondary"}
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <LogoutLink>Logout</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-5">
          {children}
        </main>
      </div>
    </section>
  );
}
