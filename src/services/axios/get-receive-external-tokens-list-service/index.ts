import {
  ReceiveExternalTokenList,
  ReceiveExternalTokenListResponse as ReceiveExternalTokenListResponse,
} from "../../../types/expose-type";
import getConfigTokenList, { GetConfigTokenListQuery, TransactionType } from "../get-config-tokens-list-service";

export type GetReceiveTokenListQuery = Omit<GetConfigTokenListQuery, "transactionType">;

const getReceiveExternalTokenList = async (query?: GetReceiveTokenListQuery): Promise<ReceiveExternalTokenList> => {
  const params: GetConfigTokenListQuery = {
    ...query,
    transactionType: TransactionType.DEPOSIT,
  };
  const response = await getConfigTokenList<ReceiveExternalTokenListResponse>(params);

  return response?.data;
};
export default getReceiveExternalTokenList;
