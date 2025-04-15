import axios from "axios";
import { REFRESH_TOKEN_STATUS } from "../../../types/expose-type";

const refreshTokenKeycloak = async (
  token: string
): Promise<{
  status: REFRESH_TOKEN_STATUS;
  data: any;
}> => {
  try {
    const response = await axios.post(
      `${process.env.TEK_WALLET_REFRESH_TOKEN_URL}`,
      {
        refresh_token: token || "",
      },
      {
        headers: {
          "x-api-key": process.env.TEK_WALLET_API_KEY || "",
        },
      }
    );
    const data = await response;
    if (data?.status === 200) {
      return {
        status: REFRESH_TOKEN_STATUS.SUCCESS,
        data: data?.data?.data,
      };
    }

    return {
      status: REFRESH_TOKEN_STATUS.FAILED,
      data: null,
    };
  } catch (error) {
    console.error("🚀 ~ refreshTokenKeycloak ~ error:", error);

    return {
      status: REFRESH_TOKEN_STATUS.FAILED,
      data: null,
    };
  }
};

export default refreshTokenKeycloak;
