"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductsTable({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="px-6 py-10 text-center text-sm text-muted-foreground">
        Brak produktów.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="h-12 px-6 font-normal text-muted-foreground">
            Nazwa
          </TableHead>
          <TableHead className="h-12 px-6 font-normal text-muted-foreground">
            SKU
          </TableHead>
          <TableHead className="h-12 px-6 font-normal text-muted-foreground">
            Kategoria
          </TableHead>
          <TableHead className="h-12 px-6 font-normal text-muted-foreground">
            Cena Brutto
          </TableHead>
          <TableHead className="h-12 px-6 font-normal text-muted-foreground">
            Status
          </TableHead>
          <TableHead className="h-12 px-6 font-normal text-muted-foreground">
            Magazyn
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="px-6 py-4 font-medium">
              {product.name}
            </TableCell>
            <TableCell className="px-6 py-4 text-muted-foreground">
              {product.sku}
            </TableCell>
            <TableCell className="px-6 py-4 text-muted-foreground">
              {product.category}
            </TableCell>
            <TableCell className="px-6 py-4 font-semibold">
              {formatPrice(product.priceGross, product.currency)}
            </TableCell>
            <TableCell className="px-6 py-4">
              <Badge variant={product.isAvailable ? "success" : "danger"}>
                {product.isAvailable ? "Dostępny" : "Niedostępny"}
              </Badge>
            </TableCell>
            <TableCell
              className={
                "px-6 py-4" +
                (product.isLimited ? "" : " text-muted-foreground")
              }
            >
              {product.isLimited ? product.stockQuantity : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
