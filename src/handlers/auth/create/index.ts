import createWalletExternalService from "../../../services/axios/create-wallet-service/createWalletExternalService";
import { NextRequest, NextResponse } from "next/server";
import setLoginInfoToCookies from "../functions/setLoginInfoToCookies";
import errorHandler from "../functions/errorHandler";

const createWalletHandler = async (req: NextRequest) => {
  try {
    console.warn("🚀 ~ createWalletHandler ~ req:", req);
    const { passcode } = await req.json();
    const response = await createWalletExternalService({
      passcode,
    });
    console.warn("🚀 ~ createWalletHandler ~ response:", response);

    if (response.success) {
      const tokenInfo = response.data.user;
      console.warn("setLoginInfoToCookies", {
        accessToken: tokenInfo.access_token,
        refreshToken: tokenInfo.refresh_token,
        expiresAt: tokenInfo.expires_in * 1000 + Date.now(),
        refreshExpiresAt:
          (tokenInfo.refresh_expires_in || 172800) * 1000 + //default 2 days
          Date.now(),
      });
      await setLoginInfoToCookies({
        accessToken: tokenInfo.access_token,
        refreshToken: tokenInfo.refresh_token,
        expiresAt: tokenInfo.expires_in * 1000 + Date.now(),
        refreshExpiresAt:
          (tokenInfo.refresh_expires_in || 172800) * 1000 + //default 2 days
          Date.now(),
      });
    }

    return NextResponse.json(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return errorHandler(err);
  }
};

export default createWalletHandler;
