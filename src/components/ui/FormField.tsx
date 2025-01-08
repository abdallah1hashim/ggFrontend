import { Label } from "./label";
import { Input } from "./input";
import React, { ForwardedRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  additionalLabel?: string;
  children?: React.ReactNode;
}

const FormField = React.forwardRef(
  (
    {
      id,
      label,
      error,
      type = "text",
      additionalLabel,
      children,
      ...rest
    }: FormFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <>
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center gap-4">
          {additionalLabel && <span>{additionalLabel}</span>}
          <Input
            id={id}
            type={type}
            aria-invalid={!!error}
            aria-describedby={`${id}-error`}
            ref={ref} // Forward ref to the Input component
            {...rest}
          />
        </div>
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
        {children}
      </>
    );
  },
);

FormField.displayName = "FormField"; // Set display name for better debugging

export default FormField;
