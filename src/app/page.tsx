import { CardList } from "@/components/products/card-list";
import { ProductsTable } from "@/components/products/table";
import { MOCK_PRODUCTS } from "@/lib/mockdata";
import { pluralizeProducts } from "@/lib/format";

export default function HomePage() {
  return (
    <main className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Produkty</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {MOCK_PRODUCTS.length} {pluralizeProducts(MOCK_PRODUCTS.length)} w
            katalogu
          </p>
        </header>

        <section className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
          <ProductsTable products={MOCK_PRODUCTS} />
        </section>

        <section className="flex flex-col gap-4 md:hidden">
          <CardList products={MOCK_PRODUCTS} />
        </section>
      </div>
    </main>
  );
}
