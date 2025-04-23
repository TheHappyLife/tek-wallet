import {
  DepositTokenList,
  DepositTokenListResponse,
} from "./../../../types/expose-type";
import getConfigTokenList, {
  GetConfigTokenListQuery,
} from "../get-config-tokens-list-service";

export type GetDepositTokenListQuery = Omit<
  GetConfigTokenListQuery,
  "transactionType"
>;

const getDepositTokenList = async (
  query?: GetDepositTokenListQuery
): Promise<DepositTokenList> => {
  const params: GetConfigTokenListQuery = {
    ...query,
    transactionType: "deposit",
  };
  const response = await getConfigTokenList<DepositTokenListResponse>(params);

  return response?.data;
};
export default getDepositTokenList;
