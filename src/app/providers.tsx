"use client";

import * as React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ProductsProvider } from "@/hooks/use-products";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <ProductsProvider>{children}</ProductsProvider>
    </NuqsAdapter>
  );
}
