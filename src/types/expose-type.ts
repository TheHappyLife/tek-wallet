import { LockTokensProviderDataType } from "../providers/LockTokenProvider/type";

// 1. Enums
export enum LoginMessage {
  SUCCESS = "Login is successfully",
  ERROR = "Login is failed",
  EXPIRED = "Login info is expired",
  NOT_FOUND = "Login info is not found",
  REFRESH_TOKEN_FAILED = "Refresh token is failed",
}

export enum REFRESH_TOKEN_STATUS {
  FAILED = "Refresh token is failed",
  SUCCESS = "Refresh token is successfully",
}

// 2. Interfaces for Response and Service
export interface ResponseError<T = string> {
  status: number;
  message: T;
}

export interface LoginResponse {
  success: boolean;
  message?: LoginMessage;
  data?: LoginInfoResponse;
}

export interface SignOutResponse {
  success: boolean;
  message?: string;
}

export interface CreateWalletServiceBody {
  passcode: string;
}

export interface CreateWalletServiceResponse {
  success: boolean;
  message: string;
  data: WalletData;
  timestamp: string;
}

export interface ImportWalletServiceResponse {
  success: boolean;
  message: string;
  data: ImportWalletData;
  timestamp: string;
}

export interface GetBalanceServiceResponse {
  id: string;
  user_updated: string;
  date_created: string;
  date_updated: null;
  user_created: string;
  address: string;
  app_slug: string[];
  balances: Balance[];
  blockchain_wallets: BlockchainWallet[];
}

// 3. Models (Data related Interfaces)
export interface WalletProviderDataType {
  isAuthenticated: boolean | undefined;
  session: LoginInfoResponse | undefined;
  isAuthLoading: boolean | undefined;
  tokens: Balance[] | undefined;
  isTokensLoading: boolean | undefined;
  updateLogin: () => void;
  updateBalance: () => void;
  disconnect: () => void;
  createWallet: (
    body: CreateWalletServiceBody,
    onStart?: () => void,
    onSuccess?: (data?: CreateWalletServiceResponse) => void,
    onError?: (error?: Error) => void
  ) => Promise<CreateWalletServiceResponse>;
  importWallet: (
    body: ImportWalletServiceBody,
    onStart?: () => void,
    onSuccess?: (data?: ImportWalletServiceResponse) => void,
    onError?: (error?: Error) => void
  ) => Promise<ImportWalletServiceResponse>;
  getSeedPhrase: (
    body: GetSeedPhraseServiceBody,
    onStart?: () => void,
    onSuccess?: (data?: GetSeedPhraseServiceResponse) => void,
    onError?: (error?: Error) => void
  ) => Promise<GetSeedPhraseServiceResponse>;
}

export interface DepositProviderDataType {
  isLoadingDepositToken: boolean;
  depositTokens: DepositCurrency[] | undefined;
  updateDepositToken: () => void;
}

export type Wallet = Omit<WalletProviderDataType, "session"> &
  DepositProviderDataType &
  LockTokensProviderDataType;
export interface LoginInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  refreshExpiresAt: number;
}

export interface LoginInfoResponse
  extends Omit<LoginInfo, "refreshToken" | "refreshExpiresAt"> {}

export interface WalletData {
  id: string;
  user_updated: string;
  date_created: string;
  date_updated: null;
  user_created: string;
  address: string;
  app_slug: string[];
  balances: Balance[];
  blockchain_wallets: BlockchainWallet[];
  seed_pharse: string;
  user: User;
}

export interface User {
  action_token_url: string;
  user_id: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

export interface BlockchainWallet {
  master_address: string;
  blockchain_address: string;
  network_slug: string;
}

export interface Balance {
  id: string;
  master_wallet_id: string;
  currency_slug: string;
  current_value: string;
  total_value: string;
  user_created: string;
  user_updated: string;
  date_created: string;
  date_updated: null;
  currency: Currency;
}

export interface Currency {
  id: number;
  name: string;
  slug: string;
  full_name: string;
  icon: string;
  link: string;
}

export interface Tokens {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
}

export interface ImportWalletData {
  id: string;
  user_updated: string;
  date_created: string;
  date_updated: null;
  user_created: string;
  address: string;
  app_slug: string[];
  balances: null[][];
  assets: number;
  blockchain_wallets: null[][];
  tokens: Tokens;
}

export interface GetSeedPhraseServiceBody {
  passcode: string;
}

export interface GetSeedPhraseServiceResponse {
  success: boolean;
  message: string;
  data: GetSeedPhraseServiceData;
  timestamp: string;
}

export interface GetSeedPhraseServiceData {
  seed_pharse: string;
}

export interface ImportWalletServiceBody {
  seed_pharse: string;
  app_slugs: string[];
}

// 4. Other Interfaces
export interface ResponseError<T = string> {
  status: number;
  message: T;
}

export interface DepositTokenListResponse {
  success: boolean;
  message: string;
  data: DepositTokenList;
  timestamp: string;
}

export interface DepositTokenList {
  data: DepositCurrency[];
  paginated: Paginated;
}

export interface Paginated {
  keyword: string;
  page: number;
  take: number;
  sort: string;
  sorted: string;
  from_date: string;
  to_date: string;
  number_records: number;
  pages: number;
  has_prev: boolean;
  has_next: boolean;
}

export interface Networkdata {
  id: number;
  status: string;
  name: string;
  slug: string;
  network_type: string;
}

export interface DepositCurrency {
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
}
