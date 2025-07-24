'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SuccessCardProps {
  title?: string;
  description?: string;
  className?: string;
  bgClass?: string;
  titleClass?: string;
  descriptionClass?: string;
}

export default function SuccessCard({
  title = 'Ready to Launch?',
  description = 'Once submitted, your campaign will enter our review process. You’ll receive updates via email.',
  className,
  bgClass = 'bg-green-950',
  titleClass = 'text-green-300',
  descriptionClass = 'text-white',
}: SuccessCardProps) {
  return (
    <div className={cn('p-4 flex flex-col gap-4 rounded-lg', bgClass, className)}>
      <span className={cn('text-xl font-semibold', titleClass)}>{title}</span>
      <span className={cn('', descriptionClass)}>{description}</span>
    </div>
  );
}
