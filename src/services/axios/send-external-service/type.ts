export interface SendExternalBody {
  amount: string;
  currency_slug: string;
  passcode: string;
  to_address: string;
  network: string;
  memo: string;
}

export interface SendExternalResponse {
  success: boolean;
  message: string;
  timestamp: string;
}
