import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        {children}
      </TooltipProvider>
    </>
  );
}
