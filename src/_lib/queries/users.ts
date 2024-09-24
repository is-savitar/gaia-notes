import { API_URL } from "@/lib/constants";
import { toast } from "sonner";
import { getCookies, setCookie } from "cookies-next";

export const handleAuth = async (
  stx_address_mainnet: string,
  password: string,
  action: string,
) => {
  try {
    const url = `${API_URL}/auth/${action}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stx_address_mainnet: stx_address_mainnet,
        password: password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      console.log(res);
      throw new Error(
        `Something weird occurred ${res.status} ${res.statusText}`,
      );
    }

    const resData = await res.json();
    setCookie("accessToken", resData.access_token, {
      httpOnly: true,
      sameSite: "strict",
    });
    setCookie("refreshToken", resData.access_token, {
      httpOnly: true,
      sameSite: "strict",
    });

    console.log(resData);
  } catch (err) {
    console.error(err);
    toast.error("An error occurred");
  }
};

export const validateField = async (
  field: string,
  value: string,
): Promise<{ status: boolean; message: string }> => {
  console.log("validateField");
  try {
    // if (field === "uuid" && !isUUID.v4(value)) {
    //   return {
    //     status: false,
    //     message: "You think you are smart abi :joy:",
    //   };
    // }

    const response = await fetch(`${API_URL}/users/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field, value }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      status: data.status,
      message: data.message,
    };
  } catch (error) {
    console.error("Error checking user existence:", error);
    return {
      status: false,
      message: "Error checking user existence",
    };
  }
};
