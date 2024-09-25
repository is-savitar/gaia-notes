import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonLoaderProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  loaderSize?: number;
  loaderColor?: string;
}

export default function ButtonLoader({
  children,
  isLoading = false,
  loadingText,
  loaderSize = 16,
  loaderColor = "currentColor",
  className,
  disabled,
  ...props
}: ButtonLoaderProps) {
  return (
    <Button
      className={cn("flex items-center justify-center", className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2
          size={loaderSize}
          color={loaderColor}
          className="mr-2 animate-spin"
        />
      )}
      {isLoading && loadingText ? loadingText : children}
    </Button>
  );
}
