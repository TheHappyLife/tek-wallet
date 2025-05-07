import generalRequest from "../clients/generalRequest";
import { CreateWalletServiceBody, CreateWalletServiceResponse } from "../../../types/expose-type";

const createWalletExternalService = async (body: CreateWalletServiceBody): Promise<CreateWalletServiceResponse> => {
  const response = await generalRequest.post("/wallets/create/master", body);

  return response?.data;
};
export default createWalletExternalService;
