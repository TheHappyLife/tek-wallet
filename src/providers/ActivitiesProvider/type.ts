import {
  GetActivitiesServiceQuery,
  Transaction,
  TransactionSlug,
  TransactionType,
} from "../../services/axios/get-activities-service/type";

export interface ActivitiesProviderDataType {
  isLoadingActivities: Partial<Record<TransactionSlug, boolean>>;
  activities: Activities | undefined;
  updateActivities: (query?: GetActivitiesServiceQuery) => void;
  activityTypes: ActivityTypes[] | undefined;
  page: number;
  gotoPage: (page: number) => void;
}

export type Activities = Partial<Record<TransactionSlug, Transaction[]>>;

export interface ActivityTypes extends TransactionType {}
