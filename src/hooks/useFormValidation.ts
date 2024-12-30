import { useState } from "react";

export function useFormValidation<T extends Record<string, any>>() {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validateForm = (
    data: T,
    rules: Record<keyof T, (value: any) => string | null>,
  ) => {
    const errors: Record<string, string> = {};

    Object.keys(rules).forEach((field) => {
      const error = rules[field as keyof T](data[field]);
      if (error) {
        errors[field] = error;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { validationErrors, validateForm };
}
