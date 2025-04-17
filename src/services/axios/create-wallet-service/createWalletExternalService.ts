import generalRequest from "../clients/generalRequest";
import {
  CreateWalletServiceBody,
  CreateWalletServiceResponse,
} from "../../../types/expose-type";

const createWalletExternalService = async (
  body: CreateWalletServiceBody
): Promise<CreateWalletServiceResponse> => {
  const response = await generalRequest.post("/wallets/create/master", body);
  console.warn("🚀 ~ createWalletExternalService ~ response:", response);

  return response?.data;
};
export default createWalletExternalService;
