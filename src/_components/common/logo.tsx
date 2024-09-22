"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PROJECT_NAME } from "@/lib/constants";
import CircularImage from "@/components/ui/circular-image";

export const LogoLink = ({ footer = false }: { footer?: boolean }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link href={"/"} className="flex items-center gap-2">
      <motion.div
        initial={{ x: 50 }}
        animate={{ x: showText ? 0 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <CircularImage
          src={"/logo.jpg"}
          alt="StacksInk Logo"
          size={40}
          className="rounded-lg"
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: showText ? 1 : 0, x: showText ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className={cn("text-center text-lg font-semibold", footer && "text-xl")}
      >
        {PROJECT_NAME}
      </motion.p>
    </Link>
  );
};
