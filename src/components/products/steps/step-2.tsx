"use client";

import { FormField, toErrorMessage } from "@/components/products/form-field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductFormApi } from "@/hooks/use-product-form";
import { CURRENCIES, VAT_RATES } from "@/lib/constants";
import type { Currency, VatRate } from "@/lib/constants";
import {
  grossFromNet,
  netFromGross,
  parseAmount,
  toAmountString,
} from "@/lib/format";

/** Zostawia tylko cyfry i jeden separator dziesiętny, maks. 2 miejsca po nim. */
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
          const error = field.state.meta.isTouched
            ? toErrorMessage(field.state.meta.errors)
            : undefined;
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

                  // Netto steruje brutto przy aktualnej stawce VAT.
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
          const error = field.state.meta.isTouched
            ? toErrorMessage(field.state.meta.errors)
            : undefined;
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

                  // Brutto steruje netto, ten sam wzór w drugą stronę.
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
          const error = field.state.meta.isTouched
            ? toErrorMessage(field.state.meta.errors)
            : undefined;
          return (
            <FormField name={field.name} label="Stawka VAT" error={error}>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value as VatRate);
                  field.handleBlur();

                  // Nowa stawka przelicza brutto z niezmienionego netta.
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
                <SelectContent>
                  {VAT_RATES.map((rate) => (
                    <SelectItem key={rate} value={rate}>
                      {rate}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="currency">
        {(field) => {
          const error = field.state.meta.isTouched
            ? toErrorMessage(field.state.meta.errors)
            : undefined;
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
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          );
        }}
      </form.Field>
    </div>
  );
}