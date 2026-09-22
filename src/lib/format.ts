export function formatPrice(value: number, currency: string) {
  const amount = new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `${amount} ${currency}`;
}

export function pluralizeProducts(count: number) {
  if (count === 1) return "produkt";

  const lastTwo = count % 100;
  const last = count % 10;

  if (lastTwo >= 12 && lastTwo <= 14) return "produktów";
  if (last >= 2 && last <= 4) return "produkty";
  return "produktów";
}
