import { GetConfigTokenListResponse } from "./type";
import userClientRequest from "../clients/userClientRequest";

const getConfigTokenList = async (): Promise<GetConfigTokenListResponse> => {
  const response = await userClientRequest.get("/platform-config/list-tokens");
  console.warn("🚀 ~ getConfigTokenList ~ response:", response);

  return response?.data?.data;
};
export default getConfigTokenList;
