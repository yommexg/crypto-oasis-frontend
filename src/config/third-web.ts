import { createThirdwebClient } from "thirdweb";
import { clientId } from "./env";

export const client = createThirdwebClient({
  clientId: clientId,
});
