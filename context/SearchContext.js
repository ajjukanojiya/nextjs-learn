"use client";

import { createContext, useContext, useState } from 'react';

// 1. Context create kiya
const SearchContext = createContext();

// 2. Provider Component banaya jo poori app ko wrap karega
export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Universal function jo kisi bhi state ko update kar dega
  const updateState = (field, value) => {
    if (field === "searchTerm") setSearchTerm(value);
    if (field === "products") setProducts(value);
    if (field === "loading") setLoading(value);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, products, loading, updateState }}>
      {children}
    </SearchContext.Provider>
  );
}

// 3. Custom Hook taaki components mein easily use kar sakein
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}