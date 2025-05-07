import { GetConfigTokenListQuery } from "../get-config-tokens-list-service";
import { Paginated, NetworkData } from "../type";
export type GetWithdrawTokenListQuery = Omit<GetConfigTokenListQuery, "transactionType">;
export interface WithdrawCurrency {
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
  network_data: NetworkData;
  balance: string;
  min_value: number;
  max_value: number;
  decimal: number;
}

export interface WithdrawTokenList {
  supported_tokens: WithdrawCurrency[];
  paginated: Paginated;
}
export interface WithdrawTokenListResponse {
  success: boolean;
  message: string;
  data: WithdrawTokenList;
  timestamp: string;
}
