import { Paginated, Networkdata } from "../type";
export interface LockCurrency {
  id: number;
  status: string;
  name: string;
  slug: string;
  is_crypto_token: boolean;
  address: string;
  network: number;
  wallet_integrations_currencies: number;
  wallet_integrations_input_withdrawn: number;
  wallet_integrations_output_withdrawn: number;
  full_name: string;
  icon: string;
  usd_rate: string;
  icon_svg: string;
  network_data: Networkdata;
  balance: string;
  min_value: number;
  max_value: number;
}

export interface LockTokenList {
  supported_tokens: LockCurrency[];
  paginated: Paginated;
}
export interface LockTokenListResponse {
  success: boolean;
  message: string;
  data: LockTokenList;
  timestamp: string;
}
