import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LoginInfo } from "../../../types/expose-type";

const setLoginInfoToCookies = async (loginInfo: LoginInfo) => {
  const data = {
    accessToken: loginInfo.accessToken,
    refreshToken: loginInfo.refreshToken,
    expiresAt: loginInfo.expiresAt,
    refreshExpiresAt: loginInfo.refreshExpiresAt,
  };
  console.warn("🚀 ~ data:", data);

  const token = jwt.sign(
    data,
    process.env.TEK_WALLET_AUTH_SECRET || "your-default-secret-key",
    {
      algorithm: "HS256",
    }
  );

  const cookieStore = await cookies();
  cookieStore.set("tek_wallet_login", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
};

export default setLoginInfoToCookies;
