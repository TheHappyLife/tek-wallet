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
import {
  initialWithdraw,
  WithdrawContext,
} from "../providers/WithdrawProvider";
function useWallet(): Wallet {
  const depositData = useContext(DepositContext);
  const withdrawData = useContext(WithdrawContext);
  const walletData = useContext(WalletDataContext);
  const lockTokensData = useContext(LockTokensContext);
  try {
    delete walletData.session;

    return {
      ...walletData,
      ...depositData,
      ...lockTokensData,
      ...withdrawData,
    };
  } catch (error) {
    console.error("🚀 ~ useWallet ~ error:", error);
    delete initialWalletData.session;

    return {
      ...initialWalletData,
      ...initialDeposit,
      ...initialLockTokens,
      ...initialWithdraw,
    };
  }
}

export default useWallet;
