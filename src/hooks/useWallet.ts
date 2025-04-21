import { useContext } from "react";
import { DepositContext, initialDeposit } from "../providers/DepositProvider";
import {
  initialWalletData,
  WalletDataContext,
} from "../providers/WalletDataProvider";
import { Wallet } from "../types/expose-type";
import {
  initialLockTokens,
  LockTokensContext,
} from "../providers/LockTokenProvider";

function useWallet(): Wallet {
  const depositData = useContext(DepositContext);
  const walletData = useContext(WalletDataContext);
  const lockTokensData = useContext(LockTokensContext);
  try {
    delete walletData.session;

    return { ...walletData, ...depositData, ...lockTokensData };
  } catch (error) {
    console.error("🚀 ~ useWallet ~ error:", error);
    delete initialWalletData.session;

    return {
      ...initialWalletData,
      ...initialDeposit,
      ...initialLockTokens,
    };
  }
}

export default useWallet;
