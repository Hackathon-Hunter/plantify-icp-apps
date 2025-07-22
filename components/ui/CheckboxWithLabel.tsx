import React from "react";
import { cn } from "@/lib/utils";

interface CheckboxWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode; 
  className?: string;
}

export default function CheckboxWithLabel({
  label,
  className,
  ...props
}: CheckboxWithLabelProps) {
  return (
    <label className={cn("flex items-center gap-2 cursor-pointer", className)}>
      <input
        type="checkbox"
        className="mt-1 form-checkbox h-4 w-4 text-purple-600 bg-neutral-800 border-neutral-600 rounded"
        {...props}
      />
      <div className="text-neutral-400 text-sm leading-snug">{label}</div>
    </label>
  );
}
