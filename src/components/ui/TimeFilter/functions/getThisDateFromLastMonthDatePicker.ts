import { sub } from "date-fns";
export const getThisDateFromLastMonthDatePicker = (date: Date) => {
  return sub(date, {
    days: 29,
  });
};
