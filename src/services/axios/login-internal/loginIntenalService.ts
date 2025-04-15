import generalInternalRequest from "../clients/generalInternalRequest";
import { LoginResponse } from "../../../types/expose-type";
const loginInternalService = async (): Promise<LoginResponse> => {
  const response = await generalInternalRequest.get("/auth/login");
  console.warn("🚀 ~ response:", response);

  return response?.data;
};
export default loginInternalService;
