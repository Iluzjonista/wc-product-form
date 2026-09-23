"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
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
  optional,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={name}>
        {label}
        {optional ? (
          <span className="ml-1.5 font-normal text-muted-foreground">
            (opcjonalne)
          </span>
        ) : null}
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
