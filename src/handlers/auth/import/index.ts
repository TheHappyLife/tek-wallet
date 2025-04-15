import importWalletExternalService from "../../../services/axios/import-wallet-service/importWalletExternalService";
import { NextRequest, NextResponse } from "next/server";
import setLoginInfoToCookies from "../functions/setLoginInfoToCookies";

const importWalletHandler = async (req: NextRequest) => {
  try {
    console.warn("🚀 ~ importWalletHandler ~ req:", req);
    const { seed_pharse, app_slugs } = await req.json();
    const response = await importWalletExternalService({
      seed_pharse,
      app_slugs,
    });
    console.warn("🚀 ~ importWalletHandler ~ response:", response);

    if (response.success) {
      const tokenInfo = response.data.tokens;
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
    console.error("🚀 ~ importWalletHandler ~ err:", err);

    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

export default importWalletHandler;
