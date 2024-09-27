export const DEV = true;
export const API_URL = DEV
  ? "http://127.0.0.1:8000/api/v1"
  : process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const PROJECT_NAME = "StacksInk";
export const BASE_URL = DEV
  ? "http://localhost:3000"
  : process.env.NEXT_PUBLIC_BASE_URL || "";
