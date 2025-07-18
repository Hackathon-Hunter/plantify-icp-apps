import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

interface CardHorizontalProps extends React.HTMLAttributes<HTMLDivElement> {
    imageUrl: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonIcon?: React.ReactNode;
    iconPosition?: "left" | "right";
    reverse?: boolean;
}

export const CardHorizontal: React.FC<CardHorizontalProps> = ({
    imageUrl,
    title,
    description,
    buttonText,
    buttonIcon,
    iconPosition = "left",
    reverse = false,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "flex flex-col md:flex-row items-center rounded-xl overflow-hidden bg-neutral-900 text-white border border-neutral-800",
                reverse ? "md:flex-row-reverse" : "",
                className
            )}
            {...props}
        >
            <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[400px]">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <h3 className="text-2xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-300 mb-6">{description}</p>

                {buttonText && (
                    <button className="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 text-sm w-max flex items-center gap-2">
                        {iconPosition === "left" && buttonIcon}
                        <span>{buttonText}</span>
                        {iconPosition === "right" && buttonIcon}
                    </button>
                )}
            </div>
        </div>
    );
};
