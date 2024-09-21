import { userSession } from "@/_components/auth/connect-wallet";
import { Storage } from "@stacks/storage";

export const storage = new Storage({ userSession });
