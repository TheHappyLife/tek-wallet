export interface GetEstimateFeeServiceQuery {
  amount: string;
  transaction_type: string;
  currency: string;
}
export interface GetEstimateFeeServiceResponse {
  success: boolean;
  message: string;
  data: Data;
  timestamp: string;
}

interface Data {
  feeInUSD: number;
  feeInCurrency: number;
  originalAmountInUSD: number;
  originalAmountInCurrency: number;
  originalCurrency: string;
  feeDetail: FeeDetail[];
}

interface FeeDetail {
  feeType: FeeType;
  feeInUSD: number;
  feeInCurrency: number;
  feePercent: number;
  feeFixed: number;
}

interface FeeType {
  name: string;
  slug: string;
}
