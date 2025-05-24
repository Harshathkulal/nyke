"use client";

import React from "react";

type Props = {
  type?: string;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};

export default function SortForm({ type, sort, setSort }: Props) {
  return (
    <form method="get">
      {/* preserve type query */}
      <input type="hidden" name="type" value={type || ""} />
      <label className="font-semibold">
        Sort By{" "}
        <select
          name="sort"
          value={sort} // Controlled input
          className="ml-2"
          onChange={(e) => setSort(e.target.value)} // Update sort state locally
        >
          <option value="default">Featured</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </label>
    </form>
  );
}
