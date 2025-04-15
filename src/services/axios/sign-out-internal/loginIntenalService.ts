import { SignOutResponse } from "../../../types/expose-type";
import generalInternalRequest from "../clients/generalInternalRequest";

const signOutInternalService = async (): Promise<SignOutResponse> => {
  const response = await generalInternalRequest.get("/auth/signout");
  console.warn("🚀 ~ response:", response);

  return response?.data;
};
export default signOutInternalService;
