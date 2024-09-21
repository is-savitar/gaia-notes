import { headers } from "next/headers";

const getUserData = async () => {
  try {
    const host = headers().get("host");
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
    const response = await fetch(`${protocol}://${host}/auth/session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { userData } = await response.json();
    return userData;
  } catch (error) {
    console.error("Failed to retrieve user data:", error);
    return null;
  }
};

export default async function Home() {
  const userData = await getUserData();

  return (
    <div>
      {userData ? (
        <p>Welcome, {userData.profile.name}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
      {userData && <p>Address: {userData.profile.stxAddress.mainnet}</p>}
    </div>
  );
}
