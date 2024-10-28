"use server";
import { ConflictError } from "@/exceptions";
import makeFetch from "@/lib/fetch";
import { unauthenticatedAction } from "@/lib/zsa";
import type { User } from "@/types/user";
import { z } from "zod";

export const authAction = unauthenticatedAction
	.createServerAction()
	.input(
		z.object({
			username: z.string(),
			password: z.string(),
		}),
	)
	.handler(async ({ input: { password, username } }) => {
		const signUp = makeFetch<User>("/signup", null, {
			method: "POST",
			body: {
				password,
				username,
			},
		});

		try {
			return await signUp();
		} catch (err) {
			if (err instanceof ConflictError) {
				console.log("lol login joor");
			}
			console.log(err);
		}
	});
