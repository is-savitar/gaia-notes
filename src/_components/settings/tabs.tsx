import React from "react";
import Account from "./account";
import Membership from "./membership";
import Notifications from "./notifications";
import Publishing from "./publishing";
import Security from "./security";
import { cn } from "@/lib/utils";

export const settings_tabs = [
  {
    title: "Account",
    value: "account",
    component: Account,
  },
  {
    title: "Publishing",
    value: "publishing",
    component: Publishing,
  },
  {
    title: "Notifications",
    value: "notifications",
    component: Notifications,
  },
  {
    title: "Membership and payment",
    value: "membership",
    component: Membership,
  },
];

export const TabsWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow",
        className,
      )}
    >
      {children}
    </div>
  );
};
