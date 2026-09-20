import { cn } from "../lib/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "black" | "white" | "accent" | "outline";
  size?: "sm" | "default" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "black", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider transition-colors focus-visible:outline-none disabled:opacity-50",
          size === "sm" ? "clip-bl-sm" : "clip-bl",
          variant === "black" && "bg-rain-black text-rain-white hover:bg-black",
          variant === "white" && "bg-rain-white text-rain-black hover:bg-rain-grey",
          variant === "accent" && "bg-rain-accent text-rain-white hover:bg-[#d63510]",
          variant === "outline" && "border-2 border-current bg-transparent",
          size === "default" && "h-10 px-6 text-xs",
          size === "sm" && "h-8 px-4 text-[10px]",
          size === "icon" && "h-10 w-10",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
