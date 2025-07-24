'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface UploadFileButtonProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  className?: string;
  children?: React.ReactNode;
}

const UploadFileButton = React.forwardRef<HTMLInputElement, UploadFileButtonProps>(
  ({ onChange, accept = '*', className, children = 'Choose File' }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex items-center justify-center cursor-pointer",
          "bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white",
          "text-sm px-4 py-2 mt-4 w-fit",
          className
        )}
      >
        {children}
        <input
          ref={ref}
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
      </label>
    );
  }
);

UploadFileButton.displayName = 'UploadFileButton';

export { UploadFileButton };
