import createWalletExternalService from "../../../services/axios/create-wallet-service/createWalletExternalService";
import { NextRequest, NextResponse } from "next/server";
import setLoginInfoToCookies from "../functions/setLoginInfoToCookies";

const createWalletHandler = async (req: NextRequest) => {
  try {
    console.warn("🚀 ~ createWalletHandler ~ req:", req);
    const { passcode, appSlug } = await req.json();
    const response = await createWalletExternalService({
      passcode,
      appSlug,
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
  } catch (err) {
    console.error("🚀 ~ createWalletHandler ~ err:", err);

    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};

export default createWalletHandler;
