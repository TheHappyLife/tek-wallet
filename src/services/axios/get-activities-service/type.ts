import { Paginated } from "../type";

export interface GetActivitiesServiceQuery {
  page?: number;
  take?: number;
  from_date?: string;
  to_date?: string;
  transaction_type?: string;
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
  slug: string;
}

export interface Transaction {
  id: number;
  transaction_type: string;
  from_address: string;
  to_address: string;
  network: string;
  from_app_slug: null | string;
  currency_slug: string;
  fee: string;
  amount: string;
  transaction_status: string;
  user_created: string;
  user_updated: string;
  date_created: string;
  date_updated: null;
  description: null | string;
  from_locked_balance: null;
  to_locked_balance: null;
}
