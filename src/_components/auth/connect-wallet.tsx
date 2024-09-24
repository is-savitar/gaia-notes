"use client";
import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { Button } from "@/components/ui/button";
import { LucideWallet } from "lucide-react";
import { handleAuth, validateField } from "@/_lib/queries/users";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks Next.js Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);

    const handleUserSession = async () => {
      if (userSession.isUserSignedIn()) {
        const data = userSession.loadUserData();
        console.log(data);
        setUserData(data);
        // const res = await validateField(
        //   "stx_address_mainnet",
        //   data.profile.stxAddress.mainnet,
        // );
        // console.log(res, "Konichiwa");

        const response = await fetch("/auth", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stx_address_mainnet: data.profile.stxAddress.mainnet,
            password: data.decentralizedID as string,
          }),
        });
        console.log(response);

        // if (res.status) {
        //   try {
        //     await handleAuth(
        //       data.profile.stxAddress.mainnet,
        //       data.decentralizedID as string,
        //       "login",
        //     );
        //   } catch (err) {
        //     console.error("Error logging in", err);
        //   }
        // } else {
        //   try {
        //     await handleAuth(
        //       data.profile.stxAddress.mainnet,
        //       data.decentralizedID as string,
        //       "signup",
        //     );
        //   } catch (err) {
        //     console.error("Error signing up data:", err);
        //   }
        // }
      }
    };

    handleUserSession();
  }, []);

  if (mounted && userSession.isUserSignedIn() && userData) {
    return (
      <Wrapper>
        <Button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </Button>
        <p>mainnet: {userData.profile.stxAddress.mainnet}</p>
        <p>testnet: {userData.profile.stxAddress.testnet}</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Button onClick={authenticate} className="gap-4 w-full max-w-[300px]">
        <LucideWallet size={17} />
        Connect Wallet
      </Button>
    </Wrapper>
  );
};

export default ConnectWallet;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center gap-16">
      <div className="flex items-center justify-center flex-col gap-4 !w-full">
        {children}
      </div>
    </div>
  );
};
