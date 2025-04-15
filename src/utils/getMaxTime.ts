import { startOfDay, endOfDay } from "date-fns";

const getMaxTime = (startDate: string, endDate: string) => {
  try {
    return {
      startDate: startOfDay(new Date(startDate)).toISOString(),
      endDate: endOfDay(new Date(endDate)).toISOString(),
    };
  } catch (error) {
    console.error("🚀 ~ getMaxTime ~ error:", error);

    return null;
  }
};

export default getMaxTime;
