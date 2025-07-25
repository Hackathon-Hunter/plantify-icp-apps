"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BreadcrumbsProps {
  backLink?: string;
  goBack?: boolean;
  backLabel?: string;
  segments: {
    label: string;
    href?: string;
    active?: boolean;
  }[];
}

export default function Breadcrumbs({
  goBack = true,
  segments,
}: BreadcrumbsProps) {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-2 text-sm"
      onClick={() => goBack && router.back()}
    >
      <ArrowLeft className="text-gray-400" />
      {segments.map((seg, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className={
              seg.active
                ? "text-purple-600 font-medium"
                : "text-gray-400 hover:text-gray-600 cursor-pointer"
            }
          >
            {seg.label}
          </span>
          {i < segments.length - 1 && <span className="text-gray-400">/</span>}
        </div>
      ))}
    </button>
  );
}
