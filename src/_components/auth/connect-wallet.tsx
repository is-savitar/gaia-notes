"use client";
import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { Button } from "@/components/ui/button";
import { LucideWallet } from "lucide-react";
import { Storage } from "@stacks/storage";
// import { storage } from "@/lib/utils/storage";

const privateKey =
  "896adae13a1bf88db0b2ec94339b62382ec6f34cd7e2ff8abae7ec271e05f9d8";
const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });
userSession.store.getSessionData().userData = {
  appPrivateKey: privateKey,
};
const storage = new Storage({ userSession });

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

  const saveUserDataToGaia = async (userData: any) => {
    try {
      await storage.putFile("user_data.json", JSON.stringify(userData), {
        encrypt: true,
      });
      // logger.info("User data saved to gaia");
      console.log("User data saved to gaia");
    } catch (err) {
      // logger.error("Failed to save user data to Gaia", err);
      console.log("Failed to save user data to Gaia", err);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (userSession.isUserSignedIn()) {
      const data = userSession.loadUserData();
      setUserData(data);
      saveUserDataToGaia(userData);
      // saveUserData(data);
    }
  }, [userData]);

  const saveUserData = async (userData: any) => {
    console.log("Saving user data...");
    try {
      const response = await fetch("/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData }),
      });
      if (!response.ok) {
        throw new Error("Failed to save user data");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

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
