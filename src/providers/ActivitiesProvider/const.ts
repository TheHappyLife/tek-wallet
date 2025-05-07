import { TransactionSlug, TransactionType } from "../../services/axios/get-activities-service/type";

export const ACTIVITIES_PAGE_SIZE = 10;
export const ACTIVITIES_TYPE_ALL: TransactionType = {
  id: -1,
  status: "all",
  name: "All",
  slug: TransactionSlug.All,
  description: null,
  icon: "",
  link: "",
  icon_svg: "",
};
