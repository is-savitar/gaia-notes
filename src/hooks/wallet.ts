// src/hooks/wallet.ts

import { useState, useEffect } from "react";
import { showConnect } from "@stacks/connect";
import { appDetails, userSession } from "../lib/utils/wallet";

export const useWallet = () => {
  const [userData, setUserData] = useState(null);
  // const [userSession] = useState(new UserSession({ appConfig }));

  const handleAuth = async () => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setUserData(userData);
      await saveUserData(userData);
    } else if (userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn();
      setUserData(userData);
      await saveUserData(userData);
    }
  };

  const saveUserData = async (userData: any) => {
    console.log("Getting here");
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

  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: handleAuth,
      userSession,
    });
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return { userData, connectWallet, userSession };
};
