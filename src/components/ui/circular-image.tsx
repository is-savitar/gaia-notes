import { cn } from "@/lib/utils";
import Image from "next/image";

interface CircularImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function CircularImage({
  src,
  alt,
  size = 115,
  className,
}: CircularImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-full", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
}
