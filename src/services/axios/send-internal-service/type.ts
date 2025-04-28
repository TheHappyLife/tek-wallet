export interface SendInternalBody {
  amount: string;
  to_address: string;
  currency_slug: string;
  passcode: string;
}

export interface SendInternalResponse {
  success: boolean;
  message: string;
  timestamp: string;
}
