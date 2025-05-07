import userClientRequest from "../clients/userClientRequest";
import { LockTokenBody, LockTokenResponse } from "./type";

const lockTokenService = async (body: LockTokenBody): Promise<LockTokenResponse> => {
  const response = await userClientRequest.post("/locked-balances/create-locked-balances", body, {
    headers: {
      "c-payload-signature": "text",
    },
  });

  return response.data;
};

export default lockTokenService;
