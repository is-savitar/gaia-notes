import Link from "next/link";
import { cn } from "@/lib/utils";
import { PROJECT_NAME } from "@/lib/constants";
import CircularImage from "@/components/ui/circular-image";

export const LogoLink = ({ footer = false }: { footer?: boolean }) => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <CircularImage
        src={"/logo.jpg"}
        alt="StacksInk Logo"
        size={40}
        className="rounded-lg"
      />
      <p
        className={cn("text-center text-lg font-semibold", footer && "text-xl")}
      >
        {PROJECT_NAME}
      </p>
    </Link>
  );
};
