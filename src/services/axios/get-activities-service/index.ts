import userClientRequest from "../clients/userClientRequest";
import {
  GetActivitiesServiceQuery,
  GetActivitiesServiceResponse,
} from "./type";

const getActivitiesServices = async (
  query?: GetActivitiesServiceQuery
): Promise<GetActivitiesServiceResponse> => {
  const response = await userClientRequest.get("/transaction/list", {
    params: query,
  });

  return response?.data?.data;
};
export default getActivitiesServices;
