import { Loader2 } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: { value: string | number; label: string }[];
  error?: FieldError;
  placeholder?: string;
  withPlaceholder?: boolean;
  withError?: boolean;
  isLoading?: boolean;
  loadingError?: boolean;
}

const FormSelect = forwardRef(
  (
    {
      id,
      label,
      options,
      error,
      placeholder = "Select an option",
      withPlaceholder = true,
      withError = true,
      isLoading = false,
      loadingError = false,
      ...rest
    }: FormSelectProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-primary-50"
        >
          {label}
        </label>
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Loading</span>
          </div>
        ) : loadingError ? (
          <p className="mt-1 text-sm text-red-500">Failed to load options</p>
        ) : (
          <select
            id={id}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={`${id}-error`}
            className={`block h-9 w-full rounded-md border border-primary-300 bg-primary-800 px-3 py-1 text-purple-50 shadow-sm sm:text-sm ${
              error ? "border-red-500" : ""
            }`}
            {...rest}
          >
            {withPlaceholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        {error && withError && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);

FormSelect.displayName = "FormSelect"; // Set display name for better debugging

export default FormSelect;
