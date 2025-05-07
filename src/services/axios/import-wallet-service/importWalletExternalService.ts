import generalRequest from "../clients/generalRequest";
import { ImportWalletServiceBody, ImportWalletServiceResponse } from "../../../types/expose-type";
const importWalletExternalService = async (body: ImportWalletServiceBody): Promise<ImportWalletServiceResponse> => {
  const response = await generalRequest.post("/wallets/import-into-apps", body);

  return response?.data;
};
export default importWalletExternalService;
