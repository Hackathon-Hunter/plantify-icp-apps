import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex items-center w-full h-10 bg-neutral-800 px-3 text-base shadow-xs transition-colors",
          "focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
      >
        {leftIcon && <div className="mr-2 text-white">{leftIcon}</div>}

        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full bg-transparent text-white placeholder:text-neutral-300 outline-none border-none",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        />

        {rightIcon && <div className="ml-2 text-white">{rightIcon}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
