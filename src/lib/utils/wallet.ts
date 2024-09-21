import { AppConfig, UserSession } from "@stacks/connect";

const privateKey =
  "896adae13a1bf88db0b2ec94339b62382ec6f34cd7e2ff8abae7ec271e05f9d8";
export const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });
// eslint-disable-next-line
userSession.store.getSessionData().userData = <any>{
  appPrivateKey: privateKey,
};

export const appDetails = {
  name: "Gaia Notes",
  icon: "/logo.jpg",
};

// export async function getUserData() {
//   // if (typeof window === "undefined") {
//   //   return null; // Return null on the server side
//   // }
//
//   // if (userSession.isUserSignedIn()) {
//   //   return userSession.loadUserData();
//   // }
//   let userData;
//
//   if (userSession.isSignInPending()) {
//     userData = await userSession.handlePendingSignIn();
//     console.log(userData, "FROM UTIL");
//   } else if (userSession.isUserSignedIn()) {
//     userData = userSession.loadUserData();
//     console.log(userData, "FROM UTIL");
//   }
//
//   // return null;
// }
//
// export async function getUserAddress() {
//   const userData = await getUserData();
//   return userData ? userData?.profile?.stxAddress.mainnet : "Connect Wallet";
// }
