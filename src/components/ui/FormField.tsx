import { Label } from "./label";
import { Input } from "./input";
import React, { ForwardedRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  children?: React.ReactNode;
}

const FormField = React.forwardRef(
  (
    { id, label, error, type = "text", children, ...rest }: FormFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type={type}
          aria-invalid={!!error}
          aria-describedby={`${id}-error`}
          ref={ref} // Forward ref to the Input component
          {...rest}
        />
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
