export interface ValidateWalletAddressResponse {
  success: boolean;
  message: string;
  data: ValidateWalletAddressData;
  timestamp: string;
}

export interface ValidateWalletAddressData {
  status: number;
  address: string;
  valid: number;
  master_wallet_address: null;
  is_existed: boolean;
  is_current_wallet: boolean;
}

export interface ValidateWalletAddressBody {
  address: string;
  network: string;
}
