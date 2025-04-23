export interface LockTokenBody {
  passcode: string;
  locked_balances: LockedBalance[];
}

export interface LockedBalance {
  locked_currency_slug: string;
  locked_amount: string;
}

export interface LockTokenResponse {
  success: boolean;
  message: string;
  data: Datum[];
  timestamp: string;
}

interface Datum {
  id: string;
  balance_id: string;
  locked_value: string;
  locked_total_value: string;
  locked_balance_status: string;
  description: null;
  user_created: string;
  user_updated: string;
  date_created: string;
  date_updated: null;
  locked_from_app_slug: string;
}
