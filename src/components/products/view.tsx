"use client";

import * as React from "react";
import { parseAsInteger, useQueryState } from "nuqs";

import { AddProductDialog } from "@/components/products/add-product-dialog";
import { CardList } from "@/components/products/card-list";
import { Pagination } from "@/components/products/pagination";
import { ProductsTable } from "@/components/products/table";
import { PAGE_SIZE } from "@/lib/constants";
import { pluralizeProducts } from "@/lib/format";
import { useProducts } from "@/hooks/use-products";

export function View() {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ history: "push" }),
  );

  const { products } = useProducts();
  const pageCount = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), pageCount);

  React.useEffect(() => {
    if (page !== currentPage) {
      void setPage(currentPage === 1 ? null : currentPage);
    }
  }, [page, currentPage, setPage]);

  const visibleProducts = React.useMemo(
    () =>
      products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [products, currentPage],
  );

  const handlePageChange = (next: number) => {
    void setPage(next === 1 ? null : next);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Produkty</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} {pluralizeProducts(products.length)} w katalogu
          </p>
        </div>
        <AddProductDialog />
      </header>

      <section className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <ProductsTable products={visibleProducts} />
        <Pagination
          page={currentPage}
          pageCount={pageCount}
          total={products.length}
          onPageChange={handlePageChange}
        />
      </section>

      <section className="flex flex-col gap-4 md:hidden">
        <CardList products={visibleProducts} />
        <Pagination
          page={currentPage}
          pageCount={pageCount}
          total={products.length}
          onPageChange={handlePageChange}
          variant="mobile"
        />
      </section>
    </div>
  );
}
