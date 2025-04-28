import userClientRequest from "../clients/userClientRequest";
import { SendInternalBody, SendInternalResponse } from "./type";

const sendInternalService = async (
  body: SendInternalBody
): Promise<SendInternalResponse> => {
  const response = await userClientRequest.post(
    "/transaction/transfer-internal",
    body,
    {
      headers: {
        "c-payload-signature": "text",
      },
    }
  );

  return response.data;
};

export default sendInternalService;
