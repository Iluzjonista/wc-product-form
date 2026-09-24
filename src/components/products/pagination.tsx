"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { pluralizeProducts } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ProductsPaginationProps {
  page: number;
  pageCount: number;
  total: number;
  onPageChange: (page: number) => void;
  variant?: "desktop" | "mobile";
}

export function Pagination({
  page,
  pageCount,
  total,
  onPageChange,
  variant = "desktop",
}: ProductsPaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const summary = `Strona ${page} z ${pageCount} · ${total} ${pluralizeProducts(total)}`;

  const controls = (
    <nav aria-label="Paginacja" className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-md px-2 text-sm text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:text-muted-foreground/60"
      >
        <ChevronLeft className="size-4" />
        Wstecz
      </button>

      {pages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPageChange(item)}
          aria-current={item === page ? "page" : undefined}
          className={cn(
            "inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-sm transition-colors",
            item === page
              ? "bg-primary font-medium text-primary-foreground"
              : "text-foreground hover:bg-muted",
          )}
        >
          {item}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-md px-2 text-sm text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:text-muted-foreground/60"
      >
        Dalej
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );

  if (variant === "mobile") {
    return (
      <div className="flex flex-col items-center gap-3 pb-4">
        <p className="text-sm text-muted-foreground">{summary}</p>
        {controls}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-t border-border px-6 py-3">
      <p className="text-sm text-muted-foreground">{summary}</p>
      {controls}
    </div>
  );
}
