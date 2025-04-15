import generalRequest from "../clients/generalRequest";
import {
  CreateWalletServiceBody,
  CreateWalletServiceResponse,
} from "../../../types/expose-type";

const createWalletService = async (
  body: CreateWalletServiceBody
): Promise<CreateWalletServiceResponse> => {
  const response = await generalRequest.post("/wallets/create/master", body);

  return response?.data;
};
export default createWalletService;
