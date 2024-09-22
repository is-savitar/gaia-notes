"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ScrollPositionProps {
  children: React.ReactNode;
  className?: string;
  normal?: string;
  isTopTrue: string;
  isTopFalse: string;
}

export function ScrollPosition({
  children,
  className,
  normal,
  isTopTrue,
  isTopFalse,
}: ScrollPositionProps) {
  const [isAtTop, setIsAtTop] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsAtTop(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cn(className, normal, isAtTop ? isTopTrue : isTopFalse)}>
      {children}
    </div>
  );
}
