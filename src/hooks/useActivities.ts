import { useContext } from "react";
import { initialActivities, ActivitiesContext } from "../providers/ActivitiesProvider";
import { ActivitiesProviderDataType } from "../providers/ActivitiesProvider/type";
function useActivities(): ActivitiesProviderDataType {
  try {
    const data = useContext(ActivitiesContext);

    return data;
  } catch (error) {
    console.error("🚀 ~ useActivities ~ error:", error);

    return initialActivities;
  }
}

export default useActivities;
