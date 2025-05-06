import {
  Transaction,
  TransactionType,
} from "../../services/axios/get-activities-service/type";

export interface ActivitiesProviderDataType {
  isLoadingActivities: boolean;
  activities: Activities | undefined;
  updateActivities: () => void;
  activityTypes: ActivityTypes[] | undefined;
  page: number;
  gotoPage: (page: number) => void;
}

export type Activities = Record<ActivityTypes["slug"], Transaction[]>;

export interface ActivityTypes extends TransactionType {}
