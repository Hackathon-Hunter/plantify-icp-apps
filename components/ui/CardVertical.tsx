import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

interface CardVerticalProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  title?: string; // opsional
  description?: string; // opsional
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  iconPosition?: "left" | "right";
  reverse?: boolean;
}

export const CardVertical: React.FC<CardVerticalProps> = ({
  imageUrl,
  title,
  description,
  buttonText,
  buttonIcon,
  iconPosition = "left",
  reverse: _reverse,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-neutral-900 text-white overflow-hidden border border-neutral-800 shadow-md flex flex-col",
        "w-full",
        className
      )}
      {...props}
    >
      {imageUrl && (
        <div className="relative w-full h-48 sm:h-56 md:h-64">
          <Image
            src={imageUrl}
            alt={title || "Card Image"}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4 sm:p-6 flex flex-col justify-between flex-1">
        {(title || description) && (
          <div>
            {title && (
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 leading-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {buttonText && (
          <div className="mt-4 sm:mt-6">
            <button className="bg-white text-black text-sm font-medium px-4 py-2 hover:bg-gray-300 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              {iconPosition === "left" && buttonIcon}
              <span>{buttonText}</span>
              {iconPosition === "right" && buttonIcon}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
