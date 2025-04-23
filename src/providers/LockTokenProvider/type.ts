import { LockCurrency } from "../../services/axios/get-lock-tokens-list-service/type";

export interface LockTokensProviderDataType {
  isLoadingLockToken: boolean;
  lockTokens: LockCurrency[] | undefined;
  updateLockToken: () => void;
}
