import { Paginated } from "../type";

export interface GetActivitiesServiceQuery {
  page?: number;
  take?: number;
  from_date?: string;
  to_date?: string;
  transaction_types?: TransactionSlug;
}

export interface GetActivitiesServiceResponse {
  success: boolean;
  message: string;
  data: Data;
  timestamp: string;
}

export interface Data {
  transactions: Transaction[];
  transaction_types: TransactionType[];
  paginated: Paginated;
}

export interface TransactionType {
  name: string;
  slug: TransactionSlug;
}

export interface Transaction {
  id: number;
  transaction_type: TransactionSlug;
  from_address: string;
  to_address: string;
  network: string;
  from_app_slug: null | string;
  currency_slug: string;
  fee: string;
  amount: string;
  transaction_status: TransactionStatus;
  user_created: string;
  user_updated: string;
  date_created: string;
  date_updated: null;
  description: null | string;
  from_locked_balance: null;
  to_locked_balance: null;
  icon: string;
}

export enum TransactionSlug {
  All = "all",
  Send = "send",
  Receive = "receive",
  Swap = "swap",
  TransferInternal = "transfer-internal",
  Deposit = "deposit",
  Withdrawn = "withdrawn",
  UpdateBalances = "update-balances",
  LockedBalances = "locked_balance",
  CapitalAdjustment = "capital-adjustment",
}

export enum TransactionStatus {
  Processing = "processing",
  Success = "success",
  Failed = "failed",
}
