import { useContext } from "react";
import {
  initialRealtime,
  RealtimeContext,
} from "../providers/RealtimeProvider";
import { RealtimeProviderDataType } from "../providers/RealtimeProvider/type";
function useRealtime(): RealtimeProviderDataType {
  try {
    const data = useContext(RealtimeContext);

    return data;
  } catch (error) {
    console.error("🚀 ~ useRealtime ~ error:", error);

    return initialRealtime;
  }
}

export default useRealtime;
