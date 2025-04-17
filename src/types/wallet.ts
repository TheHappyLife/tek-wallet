export interface WalletResponse<DataType> {
  success: boolean;
  message: WalletResponseMessage;
  data: DataType;
  status: WalletResponseStatus;
  serverStatus: number | null;
}

export enum WalletResponseMessage {
  SUCCESS = "Success",
  SERVER_ERROR = "Server Error",
  WALLET_HANDLE_ERROR = "Wallet handle error",
}

export enum WalletResponseStatus {
  SUCCESS = 200,
  SERVER_ERROR = 500,
  WALLET_HANDLE_ERROR = 400,
}
