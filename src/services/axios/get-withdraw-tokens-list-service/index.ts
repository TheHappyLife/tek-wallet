import getConfigTokenList, {
  GetConfigTokenListQuery,
} from "../get-config-tokens-list-service";
import {
  GetWithdrawTokenListQuery,
  WithdrawTokenList,
  WithdrawTokenListResponse,
} from "./type";

const getWithdrawTokenList = async (
  query?: GetWithdrawTokenListQuery
): Promise<WithdrawTokenList> => {
  const params: GetConfigTokenListQuery = {
    ...query,
    transactionType: "withdrawn",
  };
  const response = await getConfigTokenList<WithdrawTokenListResponse>(params);
  console.warn("🚀 ~ response getWithdrawTokenList:", response);

  return response?.data;
};
export default getWithdrawTokenList;
