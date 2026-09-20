import { cn } from "../lib/utils";
import React from "react";

interface CardProps {
  variant?: "white" | "black" | "accent" | "grey";
  notch?: "none" | "tr" | "bl" | "both";
  withTechBorder?: boolean;
  children?: React.ReactNode;
  className?: string;
  key?: string | number;
}

export function Card({ 
  className, 
  variant = "white", 
  notch = "none",
  withTechBorder = false,
  children, 
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        "relative",
        variant === "white" && "bg-rain-white text-rain-black",
        variant === "black" && "bg-rain-black text-rain-white",
        variant === "grey" && "bg-rain-grey text-rain-black",
        variant === "accent" && "bg-rain-accent text-rain-white",
        
        notch === "tr" && "clip-tr",
        notch === "bl" && "clip-bl",
        notch === "both" && "clip-both",
        className
      )}
      {...props}
    >
      {withTechBorder && (
        <>
          <div className={cn("absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 m-2 z-10 pointer-events-none", variant === "black" ? "border-rain-white" : "border-rain-black")} />
          <div className={cn("absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 m-2 z-10 pointer-events-none", variant === "black" ? "border-rain-white" : "border-rain-black")} />
        </>
      )}
      {children}
    </div>
  );
}
