import { useContext } from "react";
import { WalletDataContext, initialWalletData } from "../providers/WalletDataProvider";
import { WalletProviderDataType } from "../types/expose-type";
function useWalletData(): WalletProviderDataType {
  try {
    const data = useContext(WalletDataContext);

    return data;
  } catch (error) {
    console.error("🚀 ~ useWalletData ~ error:", error);

    return initialWalletData;
  }
}

export default useWalletData;
