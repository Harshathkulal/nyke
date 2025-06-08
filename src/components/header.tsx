"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { MobileNav } from "./mobile-nav";
import { SiNike } from "react-icons/si";
import { SearchBar } from "./search-bar";

export function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const [isClient, setIsClient] = useState(false);

  const pathname = usePathname();
  const cartCount = useSelector((state: RootState) => state.cart.itemCount);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowHeader(currentY < lastScrollY.current || currentY < 10);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`z-50 w-full border-b bg-background/95 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } fixed`}
    >
      {/* Top banner */}
      <div className="bg-gray-100 lg:flex flex-row-reverse text-xs font-semibold p-1 px-6 hidden">
        {isClient && (
          <>
            <SignedIn>
              <SignOutButton>
                <button className="font-medium">Logout</button>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <Link href="/signin">Login</Link>
            </SignedOut>
          </>
        )}
        <p className="px-1">Help | </p>
      </div>

      {/* Main navigation */}
      <div className="flex h-14 items-center px-6">
        {/* Logo */}
        <Link href="/" className="mr-4 items-center gap-2 flex lg:mr-6">
          <SiNike size={48} className="ml-4" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex flex-1 items-center gap-6 text-sm font-medium">
          {[
            { href: "/shoes", label: "New & Featured" },
            { href: "/shoes", label: "Men" },
            { href: "/shoes", label: "Women" },
            { href: "/shoes", label: "Kids" },
            { href: "/shoes", label: "Sales" },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={`transition-colors hover:text-foreground/80 ${
                pathname === href ? "text-foreground" : "text-foreground/80"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="ml-auto flex items-center gap-4">
          {/* SearchBar contains its own trigger and Sheet */}
          <SearchBar />

          {/* Favorites */}
          <Link
            href="/favorite"
            className={`transition-colors hover:text-foreground/80 ${
              pathname?.startsWith("/favorite")
                ? "text-foreground"
                : "text-foreground/80"
            }`}
            aria-label="Favorites"
          >
            <Heart size={20} />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className={`relative transition-colors hover:text-foreground/80 ${
              pathname?.startsWith("/cart")
                ? "text-foreground"
                : "text-foreground/80"
            }`}
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <div className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                {cartCount}
              </div>
            )}
          </Link>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
