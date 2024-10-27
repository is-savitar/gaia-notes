type Payload = {
	user: {
		stxAddressMainnet: string;
		id: string;
	};
	jti: string;
	refresh: boolean;
};
import { jwtVerify, type JWTPayload } from "jose";

export async function isValidJWT(token: string, type: "access" | "refresh") {
	const REFRESH_KEY = process.env.REFRESH_SECRET_KEY;
	const ACCESS_KEY = process.env.ACCESS_SECRET_KEY;
	const JWT_SECRET = type === "access" ? ACCESS_KEY : (REFRESH_KEY ?? "");

	const encoder = new TextEncoder();
	const secretKey = encoder.encode(JWT_SECRET);

	try {
		const { payload } = await jwtVerify(token, secretKey, {
			algorithms: ["HS256"],
		});

		const typedPayload = payload as JWTPayload & Payload;

		if (typedPayload.user.id) {
			return true;
		}
	} catch (err) {
		console.error(err, "catch");
		return false;
	}
}

export async function jwtDecode(token: string, type: "access" | "refresh") {
	const REFRESH_KEY = process.env.REFRESH_SECRET_KEY;
	const ACCESS_KEY = process.env.ACCESS_SECRET_KEY;
	const JWT_SECRET = type === "access" ? ACCESS_KEY : (REFRESH_KEY ?? "");

	const encoder = new TextEncoder();
	const secretKey = encoder.encode(JWT_SECRET);

	try {
		const { payload } = await jwtVerify(token, secretKey, {
			algorithms: ["HS256"],
		});

		if (payload) {
			return payload;
		}
	} catch (err) {
		console.error(err, "catch");
		return false;
	}
}
