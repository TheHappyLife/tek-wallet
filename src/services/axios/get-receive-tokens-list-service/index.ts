import {
  ReceiveTokenList,
  ReceiveTokenListResponse,
} from "../../../types/expose-type";
import getConfigTokenList, {
  GetConfigTokenListQuery,
  TransactionType,
} from "../get-config-tokens-list-service";

export type GetReceiveTokenListQuery = Omit<
  GetConfigTokenListQuery,
  "transactionType"
>;

const getReceiveTokenList = async (
  query?: GetReceiveTokenListQuery
): Promise<ReceiveTokenList> => {
  const params: GetConfigTokenListQuery = {
    ...query,
    transactionType: TransactionType.DEPOSIT,
  };
  const response = await getConfigTokenList<ReceiveTokenListResponse>(params);

  return response?.data;
};
export default getReceiveTokenList;
