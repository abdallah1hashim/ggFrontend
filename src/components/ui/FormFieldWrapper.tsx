import { cn } from "../../lib/utils";

interface FormFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  className?: string;
  children: React.ReactNode;
}

function FormFieldWrapper({ className, children, ...props }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </div>
  );
}

export default FormFieldWrapper;
