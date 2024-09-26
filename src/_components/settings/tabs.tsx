import Account from "./account";
import Membership from "./membership";
import Notifications from "./notifications";
import Publishing from "./publishing";
import Security from "./security";

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
