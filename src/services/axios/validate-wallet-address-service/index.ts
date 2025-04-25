import userClientRequest from "../clients/userClientRequest";
import { ValidateWalletAddressBody, ValidateWalletAddressData } from "./type";

const validateWalletAddressService = async (
  body: ValidateWalletAddressBody
): Promise<ValidateWalletAddressData | undefined> => {
  try {
    const response = await userClientRequest.get(
      `/crypto/validate-address/${body.network}?address=${body.address}`
    );

    return response.data?.data;
  } catch (error) {
    console.error(error);

    return;
  }
};

export default validateWalletAddressService;
