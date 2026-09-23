"use client";

import { useForm } from "@tanstack/react-form";

import {
  DEFAULT_FORM_VALUES,
  type ProductFormState,
} from "@/lib/form-default";
import { stepSchemas } from "@/lib/schemas";

interface UseProductFormOptions {
  getStep: () => number;
  onSubmit: (values: ProductFormState) => void;
}

export function useProductForm({ getStep, onSubmit }: UseProductFormOptions) {
  return useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    validators: {
      onChange: ({ value }) => {
        const schema = stepSchemas[getStep()];
        const result = schema.safeParse(value);
        if (result.success) return undefined;

        const fields: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const key = issue.path.join(".");
          if (key && !(key in fields)) {
            fields[key] = issue.message;
          }
        }
        return { fields };
      },
    },
    onSubmit: ({ value, formApi }) => {
      if (getStep() !== stepSchemas.length - 1) return;

      onSubmit(value);
      formApi.reset();
    },
  });
}

export type ProductFormApi = ReturnType<typeof useProductForm>;
