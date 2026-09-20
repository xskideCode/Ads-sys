import { cn } from "../lib/utils";
import React from "react";

interface BadgeProps {
  variant?: "black" | "white" | "accent" | "outline";
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ className, variant = "black", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase clip-bl-sm",
        variant === "black" && "bg-rain-black text-rain-white",
        variant === "white" && "bg-rain-white text-rain-black",
        variant === "accent" && "bg-rain-accent text-rain-white",
        variant === "outline" && "border border-current opacity-70",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
