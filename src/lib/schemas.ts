import { z } from "zod";

import {
  CATEGORIES,
  CURRENCIES,
  FEATURES,
  PRODUCERS,
  VAT_RATES,
} from "@/lib/constants";

const decimalString = (label: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${label} jest wymagana` })
    .refine((value) => /^\d+([.,]\d{1,2})?$/.test(value), {
      message: "Podaj poprawną kwotę (maks. 2 miejsca po przecinku)",
    })
    .refine((value) => Number(value.replace(",", ".")) > 0, {
      message: "Kwota musi być większa niż 0",
    });

const integerString = (label: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${label} jest wymagana` })
    .refine((value) => /^\d+$/.test(value), {
      message: "Podaj nieujemną liczbę całkowitą",
    });

export const basicInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Nazwa produktu jest wymagana" })
    .min(3, { message: "Nazwa musi mieć co najmniej 3 znaki" }),
  sku: z
    .string()
    .trim()
    .min(1, { message: "SKU jest wymagane" })
    .max(24, { message: "SKU może mieć maksymalnie 24 znaki" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "SKU może zawierać tylko litery i cyfry",
    }),
  description: z.string().trim().max(500, {
    message: "Opis może mieć maksymalnie 500 znaków",
  }),
  producer: z.enum(PRODUCERS, { error: "Wybierz producenta" }),
  category: z.enum(CATEGORIES, { error: "Wybierz kategorię" }),
  features: z
    .array(z.enum(FEATURES))
    .min(1, { message: "Wybierz co najmniej jedną cechę" }),
});

export const pricingSchema = z.object({
  priceNet: decimalString("Cena netto"),
  priceGross: decimalString("Cena brutto"),
  vatRate: z.enum(VAT_RATES, { error: "Wybierz stawkę VAT" }),
  currency: z.enum(CURRENCIES, { error: "Wybierz walutę" }),
});

export const availabilitySchema = z
  .object({
    isAvailable: z.boolean(),
    isLimited: z.boolean(),
    stockQuantity: z.string().trim(),
    minQuantity: integerString("Minimalna ilość"),
    maxQuantity: integerString("Maksymalna ilość"),
  })
  .superRefine((value, ctx) => {
    if (value.isLimited) {
      const parsed = integerString("Ilość na magazynie").safeParse(
        value.stockQuantity,
      );
      if (!parsed.success) {
        ctx.addIssue({
          code: "custom",
          path: ["stockQuantity"],
          message: parsed.error.issues[0]?.message ?? "Podaj ilość",
        });
      }
    }

    const min = Number(value.minQuantity);
    const max = Number(value.maxQuantity);

    if (Number.isFinite(min) && Number.isFinite(max) && min > max) {
      ctx.addIssue({
        code: "custom",
        path: ["minQuantity"],
        message: "Nie może być większa niż maksymalna",
      });
      ctx.addIssue({
        code: "custom",
        path: ["maxQuantity"],
        message: "Nie może być mniejsza niż minimalna",
      });
    }
  });

export const stepSchemas = [
  basicInfoSchema,
  pricingSchema,
  availabilitySchema,
] as const;
