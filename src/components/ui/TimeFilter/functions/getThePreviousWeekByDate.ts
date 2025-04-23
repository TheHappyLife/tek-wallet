import { sub } from "date-fns";

export const getThePreviousWeekByDate = (date: Date) => {
  return sub(date, {
    days: 6,
  });
};
