import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap font-bold rounded-xl transition-colors " +
    "leading-none text-center min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background " +
    "disabled:pointer-events-none disabled:cursor-not-allowed border py-1.5 sm:py-2",
{
    variants: {
      variant: {
        
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary " +
          "disabled:bg-muted disabled:text-muted-foreground border border-transparent",

        
        secondary:
          "bg-background text-foreground border border-border hover:bg-muted focus-visible:ring-border " +
          "disabled:bg-muted disabled:text-muted-foreground",

        outline:
          "bg-transparent text-foreground border border-border hover:bg-muted focus-visible:ring-border",
        "outline-purple": "border-2 border-[#633AF8] bg-background text-[#633AF8] hover:bg-[#633AF8]/10 hover:text-[#633AF8]",
        ghost: "bg-transparent hover:bg-muted text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive",
        link: "bg-transparent text-primary underline-offset-4 hover:underline",
      },

      size: {
        //basado en recomendación de figma make// 

        sm: "h-9 sm:h-10 md:h-11 px-3 sm:px-4 md:px-5 text-sm sm:text-base md:text-lg",
        md: "h-11 sm:h-12 md:h-12 px-6 sm:px-7 md:px-8 text-base sm:text-lg md:text-xl",              
        lg: "h-12 sm:h-14 md:h-16 px-8 sm:px-9 md:px-10 text-lg sm:text-xl md:text-2xl",  
        icon: "h-9 sm:h-10 md:h-11 w-9 sm:w-10 md:w-11",

        fluid: [
          "h-[clamp(44px,6.5vw,52px)]",
          "px-[clamp(16px,3vw,24px)]",
          "text-[clamp(14px,1.8vw,18px)]",
          "w-full"
        ].join(" "),
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
