import userClientRequest from "../clients/userClientRequest";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWN = "withdrawn",
  TRANSFER_INTERNAL = "transfer-internal",
}
export interface GetConfigTokenListQuery {
  page?: number;
  take?: number;
  transactionType: TransactionType;
}

const getConfigTokenList = async <T>(query?: GetConfigTokenListQuery): Promise<T> => {
  const response = await userClientRequest.get("/platform-config/list-tokens", {
    params: {
      page: query?.page,
      take: query?.take,
      transaction_type: query?.transactionType,
    },
  });

  console.warn("🚀 ~ getConfigTokenList response:", response);

  return response.data;
};
export default getConfigTokenList;
