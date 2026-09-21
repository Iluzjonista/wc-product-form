export const PRODUCERS = [
    "Apple",
    "Bosch",
    "LG",
    "Philips",
    "Samsung",
    "Sony",
    "Xiaomi",
] as const;

export const CATEGORIES = [
    "Akcesoria",
    "AGD",
    "Komputery",
    "RTV",
    "Telefony",
] as const;

export const FEATURES = [
    "Bluetooth",
    "WiFI",
    "USB-C",
    "Wodoodporny",
    "Bezprzewodowy",
    "Ekologiczny",
    "Premium",
] as const;

export const VAT_RATES = ["0", "5", "8", "23"] as const;

export const CURRENCIES = ["PLN", "EUR", "USD"] as const;

export type Producer = (typeof PRODUCERS)[number];
export type Category = (typeof CATEGORIES)[number];
export type Feature = (typeof FEATURES)[number];
export type VatRate = (typeof VAT_RATES)[number];
export type Currency = (typeof CURRENCIES)[number];

export const PAGE_SIZE = 5;
