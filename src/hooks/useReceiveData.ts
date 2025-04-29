import { useContext } from "react";
import { initialReceive } from "../providers/ReceiveProvider";
import { ReceiveProviderDataType } from "../types/expose-type";
import { ReceiveContext } from "../providers/ReceiveProvider";
function useReceiveData(): ReceiveProviderDataType {
  try {
    const data = useContext(ReceiveContext);

    return data;
  } catch (error) {
    console.error("🚀 ~ useReceiveData ~ error:", error);

    return initialReceive;
  }
}

export default useReceiveData;
