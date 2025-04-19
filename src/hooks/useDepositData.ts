import { useContext } from "react";
import { initialDeposit } from "../providers/DepositProvider";
import { DepositProviderDataType } from "../types/expose-type";
import { DepositContext } from "../providers/DepositProvider";
function useDepositData(): DepositProviderDataType {
  try {
    const data = useContext(DepositContext);

    return data;
  } catch (error) {
    console.error("🚀 ~ useDepositData ~ error:", error);

    return initialDeposit;
  }
}

export default useDepositData;
