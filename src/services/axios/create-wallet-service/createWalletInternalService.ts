import {
  CreateWalletServiceBody,
  CreateWalletServiceResponse,
} from "../../../types/expose-type";
import generalRequestInternal from "../clients/generalInternalRequest";

const createWalletInternalService = async (
  body: CreateWalletServiceBody
): Promise<CreateWalletServiceResponse> => {
  const response = await generalRequestInternal.post("/auth/create", body);

  return response?.data;
};
export default createWalletInternalService;
