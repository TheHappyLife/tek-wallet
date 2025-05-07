import { useContext } from "react";
import { ReceiveContext, initialReceive } from "../providers/ReceiveProvider";
import { initialWalletData, WalletDataContext } from "../providers/WalletDataProvider";
import { Wallet } from "../types/expose-type";
import { initialLockTokens, LockTokensContext } from "../providers/LockTokenProvider";
import { initialWithdraw, WithdrawContext } from "../providers/WithdrawProvider";
import { RealtimeContext, initialRealtime } from "../providers/RealtimeProvider";
import { ActivitiesContext, initialActivities } from "../providers/ActivitiesProvider";
function useWallet(): Wallet {
  const receiveData = useContext(ReceiveContext);
  const withdrawData = useContext(WithdrawContext);
  const walletData = useContext(WalletDataContext);
  const lockTokensData = useContext(LockTokensContext);
  const realtimeData = useContext(RealtimeContext);
  const activitiesData = useContext(ActivitiesContext);
  try {
    delete walletData.session;

    return {
      ...walletData,
      ...receiveData,
      ...lockTokensData,
      ...withdrawData,
      ...realtimeData,
      ...activitiesData,
    };
  } catch (error) {
    console.error("🚀 ~ useWallet ~ error:", error);
    delete initialWalletData.session;

    return {
      ...initialWalletData,
      ...initialReceive,
      ...initialLockTokens,
      ...initialWithdraw,
      ...initialRealtime,
      ...initialActivities,
    };
  }
}

export default useWallet;
