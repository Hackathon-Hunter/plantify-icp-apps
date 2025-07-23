'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bgClass?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, leftIcon, rightIcon, bgClass = "bg-neutral-800", children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex items-center w-full h-10 px-3 text-base shadow-xs transition-colors bg-neutral",
          "focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          bgClass,
          className
        )}
      >
        {leftIcon && <div className="mr-2 text-white">{leftIcon}</div>}

        <select
          ref={ref}
          className={cn(
            "w-full bg-transparent text-white placeholder:text-neutral-300 outline-none border-none appearance-none pr-6",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        >
          {children}
        </select>

        {rightIcon && <div className="ml-2 text-white">{rightIcon}</div>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
