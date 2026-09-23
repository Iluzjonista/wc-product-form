"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface StepDefinition {
  title: string;
  subtitle: string;
}

export const STEPS: StepDefinition[] = [
  { title: "Informacje", subtitle: "Dane podstawowe" },
  { title: "Cena", subtitle: "Dane cenowe" },
  { title: "Dostępność", subtitle: "Stany magazynowe" },
];

function StepCircle({
  index,
  state,
}: {
  index: number;
  state: "done" | "active" | "idle";
}) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
        state === "idle"
          ? "bg-step-idle-bg text-step-idle-fg"
          : "bg-primary text-primary-foreground",
      )}
    >
      {state === "done" ? (
        <Check className="size-4" strokeWidth={3} />
      ) : (
        index + 1
      )}
    </span>
  );
}

function StepLabel({
  step,
  isIdle,
}: {
  step: StepDefinition;
  isIdle: boolean;
}) {
  return (
    <span className="flex flex-col leading-tight">
      <span
        className={cn(
          "text-sm font-medium",
          isIdle ? "text-muted-foreground" : "text-foreground",
        )}
      >
        {step.title}
      </span>
      <span className="mt-0.5 text-xs text-muted-foreground">
        {step.subtitle}
      </span>
    </span>
  );
}

export function Stepper({ currentStep }: { currentStep: number }) {
  const stateOf = (index: number) =>
    index < currentStep ? "done" : index === currentStep ? "active" : "idle";

  return (
    <div className="px-6 py-5 sm:px-7">
      <ol className="grid grid-cols-3 gap-3 sm:hidden">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-3">
            <StepCircle index={index} state={stateOf(index)} />
            <StepLabel step={step} isIdle={stateOf(index) === "idle"} />
          </li>
        ))}
      </ol>

      <ol className="hidden items-center sm:flex">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className={cn("flex items-center", index > 0 && "flex-1")}
          >
            {index > 0 ? (
              <span
                aria-hidden
                className={cn(
                  "mx-4 h-px flex-1",
                  index <= currentStep ? "bg-primary" : "bg-border",
                )}
              />
            ) : null}
            <span className="flex items-center gap-3">
              <StepCircle index={index} state={stateOf(index)} />
              <StepLabel step={step} isIdle={stateOf(index) === "idle"} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}