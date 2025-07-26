import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface UploadFileButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  className?: string;
}

export const UploadFileButton = forwardRef<HTMLInputElement, UploadFileButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type="file"
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          className={cn(
            "bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 w-fit",
            className
          )}
        >
          {children || 'Upload File'}
        </Button>
      </div>
    );
  }
);

UploadFileButton.displayName = 'UploadFileButton';
