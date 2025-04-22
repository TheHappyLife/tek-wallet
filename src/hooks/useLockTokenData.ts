import { useContext } from "react";
import { initialLockTokens } from "../providers/LockTokenProvider";
import { LockTokensContext } from "../providers/LockTokenProvider";
import { LockTokensProviderDataType } from "../providers/LockTokenProvider/type";
function useLockTokenData(): LockTokensProviderDataType {
  try {
    const data = useContext(LockTokensContext);

    return data;
  } catch (error) {
    console.error("🚀 ~ useLockTokenData ~ error:", error);

    return initialLockTokens;
  }
}

export default useLockTokenData;
