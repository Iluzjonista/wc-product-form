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
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ProductFormApi } from "@/hooks/use-product-form";
import { CATEGORIES, FEATURES, PRODUCERS } from "@/lib/constants";
import type { Category, Feature, Producer } from "@/lib/constants";

export function Step1({ form }: { form: ProductFormApi }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <form.Field name="name">
        {(field) => {
          const error = field.state.meta.isTouched
            ? toErrorMessage(field.state.meta.errors)
            : undefined;
          return (
            <FormField name={field.name} label="Nazwa produktu" error={error}>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="np. MacBook Pro 14"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.name}-error` : undefined}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="sku">
        {(field) => {
          const error = field.state.meta.isTouched
            ? toErrorMessage(field.state.meta.errors)
            : undefined;
          return (
            <FormField name={field.name} label="SKU produktu" error={error}>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="np. MBP14M3PRO"
                maxLength={24}
                autoCapitalize="characters"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${field.name}-error` : undefined}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(event.target.value.toUpperCase())
                }
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="description">
        {(field) => {
          const error = field.state.meta.isTouched
            ? toErrorMessage(field.state.meta.errors)
            : undefined;
          return (
            <FormField
              name={field.name}
              label="Opis"
              optional
              error={error}
              className="sm:col-span-2"
            >
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="Krótki opis produktu"
                aria-invalid={Boolean(error)}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="producer">
        {(field) => {
          const error = field.state.meta.isTouched
            ? toErrorMessage(field.state.meta.errors)
            : undefined;
          return (
            <FormField name={field.name} label="Producent" error={error}>
              <Select
                value={field.state.value || undefined}
                onValueChange={(value) => {
                  field.handleChange(value as Producer);
                  field.handleBlur();
                }}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${field.name}-error` : undefined}
                >
                  <SelectValue placeholder="Wybierz producenta" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCERS.map((producer) => (
                    <SelectItem key={producer} value={producer}>
                      {producer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="category">
        {(field) => {
          const error = field.state.meta.isTouched
            ? toErrorMessage(field.state.meta.errors)
            : undefined;
          return (
            <FormField name={field.name} label="Kategoria" error={error}>
              <Select
                value={field.state.value || undefined}
                onValueChange={(value) => {
                  field.handleChange(value as Category);
                  field.handleBlur();
                }}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${field.name}-error` : undefined}
                >
                  <SelectValue placeholder="Wybierz kategorię" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="features">
        {(field) => {
          const error = field.state.meta.isTouched
            ? toErrorMessage(field.state.meta.errors)
            : undefined;
          return (
            <FormField
              name={field.name}
              label="Cechy produktu"
              error={error}
              className="sm:col-span-2"
            >
              <ToggleGroup
                type="multiple"
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value as Feature[]);
                  field.handleBlur();
                }}
                className="flex-wrap justify-start gap-2"
              >
                {FEATURES.map((feature) => (
                  <ToggleGroupItem
                    key={feature}
                    value={feature}
                    variant="outline"
                    className="rounded-full data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    {feature}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FormField>
          );
        }}
      </form.Field>
    </div>
  );
}
