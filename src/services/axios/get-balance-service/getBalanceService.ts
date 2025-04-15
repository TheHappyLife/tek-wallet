import { GetBalanceServiceResponse } from "../../../types/expose-type";
import userClientRequest from "../clients/userClientRequest";

const getBalanceService = async (): Promise<GetBalanceServiceResponse> => {
  const response = await userClientRequest.get("/wallets/detail");

  return response?.data?.data;
};
export default getBalanceService;
