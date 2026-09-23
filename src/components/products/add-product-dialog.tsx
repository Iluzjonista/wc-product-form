"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { toast } from "sonner";

import { Step1 } from "@/components/products/steps/step-1";
import { Step2 } from "@/components/products/steps/step-2";
import { Step3 } from "@/components/products/steps/step-3";
import { Stepper } from "@/components/products/stepper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProductForm } from "@/hooks/use-product-form";
import { useProducts } from "@/hooks/use-products";
import {
  TOTAL_STEPS,
  isStepValid,
  type ProductFormState,
} from "@/lib/form-default";
import { parseAmount } from "@/lib/format";
import type { Category, Currency, Producer, VatRate } from "@/lib/constants";
import type { Product } from "@/lib/types";

function toProduct(values: ProductFormState): Omit<Product, "id"> {
  return {
    name: values.name.trim(),
    sku: values.sku.trim(),
    description: values.description.trim(),
    producer: values.producer as Producer,
    category: values.category as Category,
    features: values.features,
    priceGross: parseAmount(values.priceGross),
    vatRate: values.vatRate as VatRate,
    currency: values.currency as Currency,
    isAvailable: values.isAvailable,
    isLimited: values.isLimited,
    stockQuantity: values.isLimited ? Number(values.stockQuantity) : null,
    minQuantity: Number(values.minQuantity),
    maxQuantity: Number(values.maxQuantity),
  };
}

export function AddProductDialog() {
  const { addProduct } = useProducts();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);

  const stepRef = React.useRef(step);
  React.useEffect(() => {
    stepRef.current = step;
  }, [step]);

  const form = useProductForm({
    getStep: () => stepRef.current,
    onSubmit: (values) => {
      addProduct(toProduct(values));
      toast.success("Produkt został dodany");
      setOpen(false);
      setStep(0);
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      form.reset();
      setStep(0);
    }
  };

  const isLastStep = step === TOTAL_STEPS - 1;

  const goToNextStep = React.useCallback(() => {
    setStep((current) => Math.min(current + 1, TOTAL_STEPS - 1));
  }, []);

  const goToPreviousStep = React.useCallback(() => {
    setStep((current) => Math.max(current - 1, 0));
  }, []);

  const handleSave = React.useCallback(() => {
    void form.handleSubmit();
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus />
          Dodaj produkt
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        aria-describedby="add-product-description"
        className={
          "top-0 left-0 right-0 bottom-0 translate-x-0 translate-y-0 " +
          "h-dvh w-full max-w-full flex flex-col overflow-hidden " +
          "rounded-none p-0 gap-0 " +
          "sm:top-1/2 sm:left-1/2 sm:right-auto sm:bottom-auto " +
          "sm:-translate-x-1/2 sm:-translate-y-1/2 " +
          "sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-181 sm:rounded-2xl"
        }
      >
        <DialogHeader className="border-b border-border px-6 py-5 sm:px-7">
          <DialogTitle>Dodaj nowy produkt</DialogTitle>
        </DialogHeader>

        <Stepper currentStep={step} />

        <div
          className="flex min-h-0 flex-1 flex-col"
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            if (event.target instanceof HTMLTextAreaElement) return;
            event.preventDefault();
            if (!isLastStep && isStepValid(step, form.state.values)) {
              goToNextStep();
            }
          }}
        >
          <div className="flex-1 overflow-y-auto border-t border-border px-6 py-5 sm:px-7">
            {step === 0 ? <Step1 form={form} /> : null}
            {step === 1 ? <Step2 form={form} /> : null}
            {step === 2 ? <Step3 form={form} /> : null}
          </div>

          <form.Subscribe selector={(state) => state.values}>
            {(values) => {
              const canContinue = isStepValid(step, values);

              return (
                <DialogFooter className="mx-0 mb-0 flex-row items-center gap-3 rounded-b-none px-6 py-4 sm:px-7">
                  {step > 0 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPreviousStep}
                    >
                      <ArrowLeft />
                      Wstecz
                    </Button>
                  ) : null}

                  <div className="ml-auto">
                    {isLastStep ? (
                      <Button
                        type="button"
                        disabled={!canContinue}
                        onClick={handleSave}
                      >
                        Zapisz produkt
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        disabled={!canContinue}
                        onClick={goToNextStep}
                      >
                        Dalej
                        <ArrowRight />
                      </Button>
                    )}
                  </div>
                </DialogFooter>
              );
            }}
          </form.Subscribe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
