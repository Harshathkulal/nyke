"use client"; // 👈 Required to ensure this component is rendered only on the client

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
// import { useUser, SignOutButton } from "@clerk/nextjs";
import { MobileNav } from "./mobile-nav";
import { SiNike } from "react-icons/si";

export function Header() {
  const [search, setSearch] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  // const { isSignedIn } = useUser();
  const cartCount = useSelector((state: RootState) => state.cart.itemCount);

  const toggleSearch = (close = false) => {
    setSearch(close ? false : !search);
  };

  useEffect(() => {
    if (search && inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);

  // Smart sticky scroll behavior
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
      className={`z-50 w-full border-b bg-background/95  transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } fixed`}
    >
      {/* Top banner for large screens */}
      <div className="bg-gray-100 lg:flex flex-row-reverse text-xs font-semibold p-1 px-6 hidden">
        {/* {isSignedIn ? (
          <SignOutButton>
            <button className="font-medium">Logout</button>
          </SignOutButton>
        ) : (
          <Link href="/signin" className="font-medium">
            Login
          </Link>
        )} */}
        <p className="px-1">Help | </p>
      </div>

      {/* Main navigation */}
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <Link href="/" className="mr-4 items-center gap-2 flex lg:mr-6">
          <SiNike size={48} className="ml-4" />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex flex-1 items-center">
          <nav className="flex gap-6 text-sm font-medium">
            {[ 
              { href: "/shoe", label: "New & Featured" },
              { href: "/shoe/dunk", label: "Men" },
              { href: "/shoe/women", label: "Women" },
              { href: "/shoe/kids", label: "Kids" },
              { href: "/shoe/sales", label: "Sales" }
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === href ? "text-foreground" : "text-foreground/80"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right-side icons */}
        <div className="ml-auto flex items-center gap-4">
          {/* Desktop search */}
          <div
            className="hidden border border-gray-200 bg-gray-100 rounded-full items-center p-1 lg:flex"
            onClick={() => toggleSearch(false)}
          >
            <Search size={18} className="ml-2 text-gray-600" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              className="bg-transparent text-sm ml-1 w-32 focus:outline-none"
            />
          </div>

          {/* Mobile search icon */}
          <button
            className="lg:hidden text-foreground/80 hover:text-foreground"
            onClick={() => toggleSearch(false)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Favorite */}
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

          {/* User */}
          {/* <Link
            href={isSignedIn ? "/profile" : "/signin"}
            className={`transition-colors hover:text-foreground/80 ${
              pathname?.startsWith("/signin") ||
              pathname?.startsWith("/profile")
                ? "text-foreground"
                : "text-foreground/80"
            }`}
            aria-label="Profile"
          >
            <User size={20} />
          </Link> */}

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

          {/* Mobile nav menu */}
          <MobileNav />
        </div>
      </div>

      {/* Full-screen mobile search overlay */}
      {search && (
        <div className="fixed inset-0 z-50">
          <div
            onClick={() => toggleSearch(true)}
            className="fixed inset-0 bg-black bg-opacity-50"
          />
          <div className="fixed top-0 left-0 w-full h-60 bg-white shadow-lg">
            <div className="container mx-auto p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center border border-gray-300 bg-gray-100 rounded-md w-full p-2">
                  <Search size={20} className="text-gray-500 mr-2" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search"
                    className="bg-transparent w-full focus:outline-none"
                  />
                </div>
                <button
                  className="font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => toggleSearch(true)}
                  aria-label="Close search"
                >
                  <X size={20} className="mr-1" />
                  <span>Cancel</span>
                </button>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">Popular Search Terms</p>
                <ul className="mt-2 space-y-2">
                  {["dunk", "Airforce", "Jordan-1", "Blazer"].map((term) => (
                    <li key={term}>
                      <Link
                        href={`/shoe/${term}`}
                        onClick={() => toggleSearch(true)}
                        className="text-gray-800 hover:underline"
                      >
                        {term.replace("-", " ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
