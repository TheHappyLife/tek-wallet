import { useContext } from "react";
import {
  WalletDataContext,
  initialWalletData,
} from "../providers/WalletDataProvider";
import { Wallet } from "../types/expose-type";
function useWallet(): Wallet {
  try {
    const data = useContext(WalletDataContext);
    delete data.session;

    return data;
  } catch (error) {
    console.error("🚀 ~ useWallet ~ error:", error);
    delete initialWalletData.session;

    return initialWalletData;
  }
}

export default useWallet;
