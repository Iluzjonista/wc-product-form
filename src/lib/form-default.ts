import type {
  Category,
  Currency,
  Feature,
  Producer,
  VatRate,
} from "@/lib/constants";
import { stepSchemas } from "@/lib/schemas";

export interface ProductFormState {
  name: string;
  sku: string;
  description: string;
  producer: Producer | "";
  category: Category | "";
  features: Feature[];
  priceNet: string;
  priceGross: string;
  vatRate: VatRate;
  currency: Currency;
  isAvailable: boolean;
  isLimited: boolean;
  stockQuantity: string;
  minQuantity: string;
  maxQuantity: string;
}

export const DEFAULT_FORM_VALUES: ProductFormState = {
  name: "",
  sku: "",
  description: "",
  producer: "",
  category: "",
  features: [],
  priceNet: "",
  priceGross: "",
  vatRate: "23",
  currency: "PLN",
  isAvailable: true,
  isLimited: false,
  stockQuantity: "",
  minQuantity: "1",
  maxQuantity: "10",
};

export const TOTAL_STEPS = stepSchemas.length;

export function isStepValid(step: number, values: ProductFormState) {
  const schema = stepSchemas[step];
  if (!schema) return false;
  return schema.safeParse(values).success;
}
