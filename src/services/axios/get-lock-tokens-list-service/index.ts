import getConfigTokenList, {
  GetConfigTokenListQuery,
} from "../get-config-tokens-list-service";
import { LockTokenList } from "./type";
import { LockTokenListResponse } from "./type";

export type GetLockTokenListQuery = Omit<
  GetConfigTokenListQuery,
  "transactionType"
>;

const getLockTokenList = async (
  query?: GetLockTokenListQuery
): Promise<LockTokenList> => {
  const params: GetConfigTokenListQuery = {
    ...query,
    transactionType: "withdrawn",
  };
  const response = await getConfigTokenList<LockTokenListResponse>(params);
  console.warn("🚀 ~ response getConfigTokenList:", response);

  return response?.data;
};
export default getLockTokenList;
