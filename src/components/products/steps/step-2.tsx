"use client";

import {
  FormField,
  getFieldError,
  SelectItems,
} from "@/components/products/form-field";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ProductFormApi } from "@/hooks/use-product-form";
import { CURRENCIES, VAT_RATES } from "@/lib/constants";
import type { Currency, VatRate } from "@/lib/constants";
import {
  grossFromNet,
  netFromGross,
  parseAmount,
  toAmountString,
} from "@/lib/format";

function sanitizeAmount(value: string) {
  const normalized = value.replace(/[^\d.,]/g, "").replace(",", ".");
  const [whole, ...rest] = normalized.split(".");
  return rest.length > 0 ? `${whole}.${rest.join("").slice(0, 2)}` : whole;
}

export function Step2({ form }: { form: ProductFormApi }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <form.Field name="priceNet">
        {(field) => {
          const error = getFieldError(field);
          return (
            <FormField name={field.name} label="Cena netto" error={error}>
              <Input
                id={field.name}
                name={field.name}
                inputMode="decimal"
                value={field.state.value}
                placeholder="0.00"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.name}-error` : undefined}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  const next = sanitizeAmount(event.target.value);
                  field.handleChange(next);

                  const vat = Number(form.getFieldValue("vatRate"));
                  form.setFieldValue(
                    "priceGross",
                    next === ""
                      ? ""
                      : toAmountString(grossFromNet(parseAmount(next), vat)),
                  );
                }}
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="priceGross">
        {(field) => {
          const error = getFieldError(field);
          return (
            <FormField name={field.name} label="Cena brutto" error={error}>
              <Input
                id={field.name}
                name={field.name}
                inputMode="decimal"
                value={field.state.value}
                placeholder="0.00"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.name}-error` : undefined}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  const next = sanitizeAmount(event.target.value);
                  field.handleChange(next);

                  const vat = Number(form.getFieldValue("vatRate"));
                  form.setFieldValue(
                    "priceNet",
                    next === ""
                      ? ""
                      : toAmountString(netFromGross(parseAmount(next), vat)),
                  );
                }}
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="vatRate">
        {(field) => {
          const error = getFieldError(field);
          return (
            <FormField name={field.name} label="Stawka VAT" error={error}>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value as VatRate);
                  field.handleBlur();

                  const net = form.getFieldValue("priceNet");
                  if (net !== "") {
                    form.setFieldValue(
                      "priceGross",
                      toAmountString(
                        grossFromNet(parseAmount(net), Number(value)),
                      ),
                    );
                  }
                }}
              >
                <SelectTrigger id={field.name} aria-invalid={Boolean(error)}>
                  <SelectValue />
                </SelectTrigger>
                <SelectItems items={VAT_RATES} format={(rate) => `${rate}%`} />
              </Select>
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="currency">
        {(field) => {
          const error = getFieldError(field);
          return (
            <FormField name={field.name} label="Waluta" error={error}>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value as Currency);
                  field.handleBlur();
                }}
              >
                <SelectTrigger id={field.name} aria-invalid={Boolean(error)}>
                  <SelectValue />
                </SelectTrigger>
                <SelectItems items={CURRENCIES} />
              </Select>
            </FormField>
          );
        }}
      </form.Field>
    </div>
  );
}
