import { AuthenticationByPasscodeBody, AuthenticationByPasscodeResponse } from "./type";

import userClientRequest from "../clients/userClientRequest";
export default async function authenticationByPasscode(
  body: AuthenticationByPasscodeBody
): Promise<AuthenticationByPasscodeResponse> {
  const response = await userClientRequest.post("/wallets/verify-passcode", body, {
    headers: {
      "c-payload-signature": "text",
    },
  });
  console.warn("🚀 ~ response authenticationByPasscode:", response);

  return response?.data;
}
