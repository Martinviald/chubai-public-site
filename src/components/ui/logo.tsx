import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'compact' | 'compact-horizontal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ variant = 'default', size = 'lg', className }: LogoProps) {
  const dimensions = {
    sm: { width: 120, height: 36 },
    md: { width: 160, height: 48 },
    lg: { width: 200, height: 60 },
  };

  const compactSize = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  const compactHorizontal = {
    sm: { width: 84, height: 24 },
    md: { width: 96, height: 28 },
    lg: { width: 108, height: 32 },
  };

  const getSize = () => {
    if (variant === 'compact') return compactSize[size];
    if (variant === 'compact-horizontal') return compactHorizontal[size];
    return dimensions[size];
  };

  const { width, height } = getSize() as { width: number; height: number };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Image
        src="/logo_sin_fondo.png"
        alt="Chubai"
        width={width}
        height={height}
        className="object-contain max-h-6 sm:max-h-7"
        priority
      />
    </div>
  );
}
