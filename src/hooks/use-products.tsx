"use client";

import * as React from "react";

import { MOCK_PRODUCTS } from "@/lib/mockdata";
import type { Product } from "@/lib/types";

interface ProductsContextValue {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
}

const ProductsContext = React.createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = React.useState<Product[]>(MOCK_PRODUCTS);

  const addProduct = React.useCallback((product: Omit<Product, "id">) => {
    setProducts((current) => [
      ...current,
      { ...product, id: `p-${crypto.randomUUID()}` },
    ]);
  }, []);

  const value = React.useMemo(
    () => ({ products, addProduct }),
    [products, addProduct],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = React.useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}