import { Suspense } from "react";

import { View } from "@/components/products/view";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-314 px-4 py-8 sm:px-6 sm:py-12">
      <Suspense>
        <View />
      </Suspense>
    </main>
  );
}
