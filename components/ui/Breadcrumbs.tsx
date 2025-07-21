"use client"

import React from "react"
import { ArrowLeft } from "lucide-react"

interface BreadcrumbsProps {
  backLink?: string
  backLabel?: string
  segments: {
    label: string
    href?: string
    active?: boolean
  }[]
}

export default function Breadcrumbs({ backLabel = "Back", segments }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
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
    </div>
  )
}
