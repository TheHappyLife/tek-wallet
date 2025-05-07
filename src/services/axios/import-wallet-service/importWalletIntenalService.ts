import generalInternalRequest from "../clients/generalInternalRequest";
import { ImportWalletServiceBody, ImportWalletServiceResponse } from "../../../types/expose-type";

const importWalletInternalService = async (body: ImportWalletServiceBody): Promise<ImportWalletServiceResponse> => {
  const response = await generalInternalRequest.post("/auth/import", body);
  console.warn("🚀 ~ response:", response);

  return response?.data;
};
export default importWalletInternalService;
