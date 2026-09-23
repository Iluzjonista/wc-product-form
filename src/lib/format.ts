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

export function parseAmount(value: string) {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function roundTo2(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function toAmountString(value: number) {
  if (!Number.isFinite(value)) return "";
  return roundTo2(value).toFixed(2);
}

export const grossFromNet = (net: number, vatRate: number) =>
  roundTo2(net * (1 + vatRate / 100));

export const netFromGross = (gross: number, vatRate: number) =>
  roundTo2(gross / (1 + vatRate / 100));
