import type {
  Category,
  Currency,
  Feature,
  Producer,
  VatRate,
} from "@/lib/constants";

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  producer: Producer;
  category: Category;
  features: Feature[];
  priceGross: number;
  vatRate: VatRate;
  currency: Currency;
  isAvailable: boolean;
  isLimited: boolean;
  stockQuantity: number | null;
  minQuantity: number;
  maxQuantity: number;
}