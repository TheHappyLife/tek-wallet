import {
  GetSeedPhraseServiceBody,
  GetSeedPhraseServiceResponse,
} from "../../../types/expose-type";
import userClientRequest from "../clients/userClientRequest";

export default async function getSeedPhraseService(
  body: GetSeedPhraseServiceBody
): Promise<GetSeedPhraseServiceResponse> {
  const response = await userClientRequest.post(
    "/wallets/export/seed-pharse",
    body
  );
  console.warn("🚀 ~ response:", response);

  return response.data;
}
