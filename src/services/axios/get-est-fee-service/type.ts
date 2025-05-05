export interface GetEstimateFeeServiceQuery {
  amount: string;
  transaction_type: string;
  currency: string;
}
export interface GetEstimateFeeServiceResponse {
  success: boolean;
  message: string;
  data: FeesDataType;
  timestamp: string;
}

export interface FeesDataType {
  feeInUSD: number;
  feeInCurrency: number;
  originalAmountInUSD: number;
  originalAmountInCurrency: number;
  originalCurrency: string;
  feeDetail: FeeDetail[];
}

export interface FeeDetail {
  feeType: FeeType;
  feeInUSD: number;
  feeInCurrency: number;
  feePercent: number;
  currency: Currency;
  feeFixed: number;
}

export interface Currency {
  id: number;
  slug: string;
  full_name: string;
  icon: string;
  link: string;
}

export interface FeeType {
  name: string;
  slug: string;
}
