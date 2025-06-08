"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

type SearchResult = {
  id: string;
  name: string;
  imageUrl: string;
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const popularTerms = ["dunk", "Airforce", "Jorden-1", "Blazer"];

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.trim()) {
        try {
          setLoading(true);
          setHasFetched(false);
          const res = await fetch(
            `/api/products?name=${encodeURIComponent(query)}`
          );
          const data = await res.json();
          setSearchResults(data || []);
        } catch (err) {
          console.error("Search error:", err);
          setSearchResults([]);
        } finally {
          setLoading(false);
          setHasFetched(true);
        }
      } else {
        setSearchResults([]);
        setHasFetched(false);
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      {/* Desktop Search Button */}
      <div
        onClick={() => setOpen(true)}
        className="hidden lg:flex border border-gray-200 bg-gray-100 rounded-full items-center p-1 cursor-pointer"
      >
        <Search size={18} className="ml-2 text-gray-600" />
        <span className="text-sm ml-1 text-gray-600 w-32">Search</span>
      </div>

      {/* Mobile Search Icon */}
      <button
        className="lg:hidden text-foreground/80 hover:text-foreground"
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search size={20} />
      </button>

      {/* Sheet Content */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="top" className="h-[250px] pt-4 px-4">
          {/* Header */}
          <div className="flex justify-between mb-4">
            {/* Logo */}
            <SheetTitle>
              <div className="text-xl font-bold hidden lg:flex">Logo</div>
            </SheetTitle>

            <div className="flex-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg p-2 w-full max-w-md">
                  <Search size={20} className="text-gray-500 mr-2" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent w-full focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Results or Popular Terms */}
              <div className="flex justify-center items-start">
                <div className=" flex flex-col items-start w-full max-w-md space-y-2 overflow-y-auto max-h-40 pr-1">
                  {query ? (
                    <>
                      {loading && (
                        <p className="text-sm text-gray-500">Searching...</p>
                      )}
                      {!loading && hasFetched && searchResults.length > 0 && (
                        <>
                          <p className="text-sm text-gray-500">
                            Search Results
                          </p>
                          <ul className="flex flex-col items-start space-y-2">
                            {searchResults.map((item) => (
                              <li key={item.id}>
                                <Link
                                  href={`/shoes/${item.id}`}
                                  onClick={() => {
                                    setQuery("");
                                    setOpen(false);
                                  }}
                                  className="text-gray-800 hover:underline flex items-center space-x-2 gap-4"
                                >
                                  {item.name}
                                  <Image 
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={30}
                                    height={30}
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {!loading && hasFetched && searchResults.length === 0 && (
                        <p className="text-sm text-gray-500">
                          No results found.
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">
                        Popular Search Terms
                      </p>
                      <ul className="flex flex-col items-start space-y-2">
                        {popularTerms.map((term) => (
                          <li key={term}>
                            <Link
                              href={`/shoes//?type=${term}`}
                              onClick={() => {
                                setQuery("");
                                setOpen(false);
                              }}
                              className="text-gray-800 hover:underline block"
                            >
                              {term}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="pl-8"></div>
          </div>

          {/* Centered Search Input */}
        </SheetContent>
      </Sheet>
    </>
  );
}
