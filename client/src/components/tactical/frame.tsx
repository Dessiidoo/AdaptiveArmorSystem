import React from "react";
import { cn } from "@/lib/utils";

interface TacticalFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  corner?: "tr" | "bl" | "both" | "none";
  glowing?: boolean;
}

export function TacticalFrame({ 
  children, 
  className, 
  title, 
  corner = "both", 
  glowing = false,
  ...props 
}: TacticalFrameProps) {
  return (
    <div 
      className={cn(
        "relative bg-card/50 border border-border/50 p-4 overflow-hidden backdrop-blur-sm transition-all duration-300",
        corner === "tr" && "clip-corner-tr",
        corner === "bl" && "clip-corner-bl",
        corner === "both" && "clip-corner-tr clip-corner-bl",
        glowing && "border-primary/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]",
        className
      )} 
      {...props}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50" />

      {/* Title Label */}
      {title && (
        <div className="absolute top-0 left-4 px-2 py-0.5 bg-primary/10 border-b border-x border-primary/20 text-[10px] font-mono tracking-widest text-primary uppercase">
          {title}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}

export function StatBar({ label, value, max = 100, color = "bg-primary" }: { label: string, value: number, max?: number, color?: string }) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono text-primary">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-secondary overflow-hidden relative">
        <div 
          className={cn("h-full transition-all duration-500 ease-out relative overflow-hidden", color)} 
          style={{ width: `${percentage}%` }}
        >
           <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] w-full animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </div>
  );
}
