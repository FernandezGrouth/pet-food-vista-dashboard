
import React from 'react';
import { cn } from '@/lib/utils';

type SkeletonProps = {
  className?: string;
  count?: number;
};

export const SkeletonLoader: React.FC<SkeletonProps> = ({ className, count = 1 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={cn("skeleton h-4 w-full my-1", className)} />
        ))}
    </>
  );
};
