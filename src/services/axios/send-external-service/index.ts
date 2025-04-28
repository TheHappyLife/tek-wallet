import userClientRequest from "../clients/userClientRequest";
import { SendExternalBody, SendExternalResponse } from "./type";

const sendExternalService = async (
  body: SendExternalBody
): Promise<SendExternalResponse> => {
  const response = await userClientRequest.post(
    "/transaction/withdrawn",
    body,
    {
      headers: {
        "c-payload-signature": "text",
      },
    }
  );

  return response.data;
};

export default sendExternalService;
