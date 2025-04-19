import { useContext } from "react";
import { DepositContext, initialDeposit } from "../providers/DepositProvider";
import {
  initialWalletData,
  WalletDataContext,
} from "../providers/WalletDataProvider";
import { Wallet } from "../types/expose-type";

function useWallet(): Wallet {
  const depositData = useContext(DepositContext);
  const walletData = useContext(WalletDataContext);
  try {
    delete walletData.session;

    return { ...walletData, ...depositData };
  } catch (error) {
    console.error("🚀 ~ useWallet ~ error:", error);
    delete initialWalletData.session;

    return { ...initialWalletData, ...initialDeposit };
  }
}

export default useWallet;
