import { useContext } from "react";
import { initialWithdraw } from "../providers/WithdrawProvider";
import { WithdrawProviderDataType } from "../types/expose-type";
import { WithdrawContext } from "../providers/WithdrawProvider";
function useWithdrawData(): WithdrawProviderDataType {
  try {
    const data = useContext(WithdrawContext);

    return data;
  } catch (error) {
    console.error("🚀 ~ useWithdrawData ~ error:", error);

    return initialWithdraw;
  }
}

export default useWithdrawData;
