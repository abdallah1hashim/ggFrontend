import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("container flex flex-col gap-2 py-32", className)}
        {...props}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = "Section";

export default Section;
