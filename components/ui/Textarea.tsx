'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bgClass?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, leftIcon, rightIcon, bgClass = "bg-neutral-800", ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex w-full px-3 py-2 text-base shadow-xs transition-colors",
          "focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          bgClass,
          className
        )}
      >
        {leftIcon && <div className="mr-2 mt-1 text-white">{leftIcon}</div>}

        <textarea
          ref={ref}
          className={cn(
            "w-full bg-transparent text-white placeholder:text-neutral-300 outline-none border-none resize-none min-h-[80px]",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        />

        {rightIcon && <div className="ml-2 mt-1 text-white">{rightIcon}</div>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
