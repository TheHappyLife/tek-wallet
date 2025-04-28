import userClientRequest from "../clients/userClientRequest";
import { GetEstimateFeeServiceResponse } from "./type";
import { GetEstimateFeeServiceQuery } from "./type";

export default async function getEstimateFeeService(
  query: GetEstimateFeeServiceQuery
): Promise<GetEstimateFeeServiceResponse> {
  const response = await userClientRequest.get(
    `/fee/calculate?amount=${query.amount}&transaction_type=${query.transaction_type}&currency=${query.currency}`,
    {
      params: query,
    }
  );
  console.warn("🚀 ~ getEstimateFeeService response:", response);

  return response.data;
}
