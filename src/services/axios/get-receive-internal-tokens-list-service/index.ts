import { ReceiveInternalTokenList, ReceiveInternalTokenListResponse } from "../../../types/expose-type";
import getConfigTokenList, { GetConfigTokenListQuery, TransactionType } from "../get-config-tokens-list-service";

export type GetReceiveTokenListQuery = Omit<GetConfigTokenListQuery, "transactionType">;

const getReceiveInternalTokenList = async (query?: GetReceiveTokenListQuery): Promise<ReceiveInternalTokenList> => {
  const params: GetConfigTokenListQuery = {
    ...query,
    transactionType: TransactionType.TRANSFER_INTERNAL,
  };
  const response = await getConfigTokenList<ReceiveInternalTokenListResponse>(params);

  return response?.data;
};
export default getReceiveInternalTokenList;
