import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LoginInfo } from "../../../types/expose-type";

const getLoginInfoFromCookies = async (): Promise<LoginInfo | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tek_wallet_login");

    if (!token) {
      return null;
    }

    // Verify và decode JWT token
    const decoded = jwt.verify(
      token.value,
      process.env.TEK_WALLET_AUTH_SECRET || "your-default-secret-key"
    ) as LoginInfo;

    return {
      accessToken: decoded.accessToken,
      refreshToken: decoded.refreshToken,
      expiresAt: decoded.expiresAt,
      refreshExpiresAt: decoded.refreshExpiresAt,
    };
  } catch (error) {
    console.error("🚀 ~ getLoginInfoFromCookies ~ error:", error);

    return null;
  }
};

export default getLoginInfoFromCookies;
