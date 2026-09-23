"use client";

import { FormField, getFieldError } from "@/components/products/form-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { ProductFormApi } from "@/hooks/use-product-form";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

export function Step3({ form }: { form: ProductFormApi }) {
  return (
    <div className="flex flex-col">
      <form.Field name="isAvailable">
        {(field) => (
          <div className="flex items-center gap-3 border-b border-border py-4 first:pt-0">
            <Switch
              id={field.name}
              checked={field.state.value}
              onCheckedChange={(checked) => field.handleChange(checked)}
            />
            <Label htmlFor={field.name} className="cursor-pointer">
              Produkt jest dostępny
            </Label>
          </div>
        )}
      </form.Field>

      <form.Field name="isLimited">
        {(field) => (
          <div className="flex items-center gap-3 border-b border-border py-4">
            <Checkbox
              id={field.name}
              checked={field.state.value}
              onCheckedChange={(checked) => {
                const isLimited = checked === true;
                field.handleChange(isLimited);
                if (!isLimited) {
                  form.setFieldValue("stockQuantity", "");
                }
              }}
            />
            <Label htmlFor={field.name} className="cursor-pointer">
              Produkt limitowany
            </Label>
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.isLimited}>
        {(isLimited) =>
          isLimited ? (
            <div className="border-b border-border py-4">
              <form.Field name="stockQuantity">
                {(field) => {
                  const error = getFieldError(field);
                  return (
                    <FormField
                      name={field.name}
                      label="Ilość na magazynie"
                      error={error}
                      className="max-w-full sm:max-w-[calc(50%-10px)]"
                    >
                      <Input
                        id={field.name}
                        name={field.name}
                        inputMode="numeric"
                        value={field.state.value}
                        placeholder="0"
                        aria-invalid={Boolean(error)}
                        aria-describedby={
                          error ? `${field.name}-error` : undefined
                        }
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(onlyDigits(event.target.value))
                        }
                      />
                    </FormField>
                  );
                }}
              </form.Field>
            </div>
          ) : null
        }
      </form.Subscribe>

      <div className="pt-5">
        <h3 className="text-base font-semibold">Limity koszyka</h3>

        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <form.Field name="minQuantity">
            {(field) => {
              const error = getFieldError(field);
              return (
                <FormField
                  name={field.name}
                  label="Minimalna ilość"
                  error={error}
                >
                  <Input
                    id={field.name}
                    name={field.name}
                    inputMode="numeric"
                    value={field.state.value}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${field.name}-error` : undefined}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      field.handleChange(onlyDigits(event.target.value));
                      form.validateField("maxQuantity", "change");
                    }}
                  />
                </FormField>
              );
            }}
          </form.Field>

          <form.Field name="maxQuantity">
            {(field) => {
              const error = getFieldError(field);
              return (
                <FormField
                  name={field.name}
                  label="Maksymalna ilość"
                  error={error}
                >
                  <Input
                    id={field.name}
                    name={field.name}
                    inputMode="numeric"
                    value={field.state.value}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${field.name}-error` : undefined}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      field.handleChange(onlyDigits(event.target.value));
                      form.validateField("minQuantity", "change");
                    }}
                  />
                </FormField>
              );
            }}
          </form.Field>
        </div>
      </div>
    </div>
  );
}
