"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { SiJordan } from "react-icons/si";
import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const NavLink = ({
  href,
  children,
  hasChevron = false,
}: {
  href: string;
  children: React.ReactNode;
  hasChevron?: boolean;
}) => (
  <SheetClose asChild>
    <Link
      href={href}
      className="flex items-center justify-between py-3 text-lg font-medium hover:text-foreground/80 w-full"
    >
      {children}
      {hasChevron && <ChevronRight size={18} />}
    </Link>
  </SheetClose>
);

export function MobileNav() {
  const { isSignedIn } = useUser();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            aria-label="Open menu"
            className="text-foreground/80 hover:text-foreground"
          >
            <Menu size={20} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[85%] max-w-sm overflow-y-auto">
          <div className="pt-6 pb-8">
            <nav className="flex flex-col">
              <NavLink href="/shoe" hasChevron>
                New & Featured
              </NavLink>
              <NavLink href="/shoe/dunk" hasChevron>
                Men
              </NavLink>
              <NavLink href="/shoe" hasChevron>
                Women
              </NavLink>
              <NavLink href="/shoe" hasChevron>
                Kids
              </NavLink>
              <NavLink href="/shoe" hasChevron>
                Sales
              </NavLink>
            </nav>

            <div className="flex items-center gap-2 mt-6 font-semibold px-1">
              <SiJordan size={24} />
              <span>Jordan</span>
            </div>

            <div className="mt-6">
              <p className="text-gray-600 text-sm">
                Become a Chitralekha Member for the best products, inspiration
                and stories.
                <span className="text-black font-medium ml-1 hover:underline cursor-pointer">
                  Learn more
                </span>
              </p>
            </div>

            <div className="mt-6">
              {isSignedIn ? (
                <SignOutButton>
                  <button className="px-6 py-2 rounded-full bg-black text-white font-medium">
                    Sign Out
                  </button>
                </SignOutButton>
              ) : (
                <SheetClose asChild>
                  <Link
                    href="/signin"
                    className="px-6 py-2 rounded-full bg-black text-white font-medium inline-block"
                  >
                    Sign In
                  </Link>
                </SheetClose>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
