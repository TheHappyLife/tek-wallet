export interface AuthenticationByPasscodeBody {
  passcode: string;
  wallet_address: string;
}
export interface AuthenticationByPasscodeResponse {
  success: boolean;
  message: string;
  timestamp: string;
}
