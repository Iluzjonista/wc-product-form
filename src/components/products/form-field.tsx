"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function toErrorMessage(errors: unknown[]): string | undefined {
  for (const error of errors) {
    if (typeof error === "string" && error.length > 0) return error;
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
    ) {
      return (error as { message: string }).message;
    }
  }
  return undefined;
}

export function getFieldError(field: {
  state: { meta: { isTouched: boolean; errors: unknown[] } };
}): string | undefined {
  return field.state.meta.isTouched
    ? toErrorMessage(field.state.meta.errors)
    : undefined;
}

interface SelectItemsProps {
  items: readonly string[];
  format?: (item: string) => string;
}

export function SelectItems({ items, format }: SelectItemsProps) {
  return (
    <SelectContent>
      {items.map((item) => (
        <SelectItem key={item} value={item}>
          {format ? format(item) : item}
        </SelectItem>
      ))}
    </SelectContent>
  );
}

interface FormFieldProps {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  name,
  label,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={name}>
        {label}
      </Label>
      {children}
      {error ? (
        <p
          id={`${name}-error`}
          role="alert"
          className="text-xs text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
