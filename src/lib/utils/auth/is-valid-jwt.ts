import { jwtVerify } from "jose";

// Define an asynchronous function to verify the JWT token using jose
export default async function isValidJWT(token: string) {
  // You should have a secret key stored in your .env.local
  const JWT_SECRET = process.env["JWT_SECRET"] ?? "";

  // Convert the secret to a Uint8Array, since jose expects it
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(JWT_SECRET);

  try {
    // Verify the token using jose's jwtVerify function
    const { payload } = await jwtVerify(token, secretKey);

    // You can return the payload for additional verification, or true if it's valid
    console.log(payload, "here"); // Log the payload for debugging
    if (payload.user_id) {
      return true; // Return true if the token is valid
    }
  } catch (err) {
    // If verification fails, log the error and return false
    console.error(err);
    return false;
  }
}
