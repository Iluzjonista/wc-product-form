"use client";

import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function CardList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
        Brak produktów.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {products.map((product) => (
        <li
          key={product.id}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-medium">{product.name}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {product.sku}
              </p>
            </div>
            <Badge
              variant={product.isAvailable ? "success" : "danger"}
              className="shrink-0"
            >
              {product.isAvailable ? "Dostępny" : "Niedostępny"}
            </Badge>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-muted p-3">
            <div>
              <dt className="text-xs text-muted-foreground">Kategoria</dt>
              <dd className="mt-1 text-sm">{product.category}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Cena brutto</dt>
              <dd className="mt-1 text-sm font-medium">
                {formatPrice(product.priceGross, product.currency)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Magazyn</dt>
              <dd className="mt-1 text-sm">
                {product.isLimited ? product.stockQuantity : "-"}
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
