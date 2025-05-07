import getLoginInfoFromCookies from "../functions/getLoginInfoFromCookies";
import { NextResponse } from "next/server";
import isExpired from "../functions/isExpired";
import { LoginMessage, LoginResponse, REFRESH_TOKEN_STATUS, ResponseError } from "../../../types/expose-type";
import refreshTokenKeycloak from "../functions/refreshTokenKeycloak";
import setLoginInfoToCookies from "../functions/setLoginInfoToCookies";
import clearLoginInfo from "../functions/clearLoginInfo";

const loginHandler = async (): Promise<NextResponse<LoginResponse | ResponseError>> => {
  try {
    const loginInfo = await getLoginInfoFromCookies();
    console.warn("🚀 ~ loginHandler ~ loginInfo:", loginInfo);

    //no login info
    if (!loginInfo) {
      return NextResponse.json({
        success: false,
        message: LoginMessage.NOT_FOUND,
      });
    }

    //refresh token is expired
    if (isExpired(loginInfo.refreshExpiresAt)) {
      await clearLoginInfo();

      return NextResponse.json({
        success: false,
        message: LoginMessage.EXPIRED,
      });
    }

    //access token is not expired
    if (!isExpired(loginInfo.expiresAt)) {
      return NextResponse.json({
        success: true,
        message: LoginMessage.SUCCESS,
        data: {
          accessToken: loginInfo.accessToken,
          expiresAt: loginInfo.expiresAt,
        },
      });
    }

    //access token is expired and refresh token is not expired
    if (isExpired(loginInfo.expiresAt) && !isExpired(loginInfo.refreshExpiresAt)) {
      //refresh token
      const refreshedTokens = await refreshTokenKeycloak(loginInfo.refreshToken);
      console.warn("🚀 ~ jwt ~ refreshedTokens:", loginInfo.refreshToken, refreshedTokens);
      if (refreshedTokens.status === REFRESH_TOKEN_STATUS.SUCCESS) {
        const data = refreshedTokens.data;
        loginInfo.accessToken = data?.access_token;
        loginInfo.refreshToken = data?.refresh_token;
        loginInfo.expiresAt = data?.expires_in * 1000 + Date.now();
        loginInfo.refreshExpiresAt =
          (data?.refresh_expires_in || 172800) * 1000 + //default 2 days
          Date.now();

        await setLoginInfoToCookies(loginInfo);

        return NextResponse.json({
          success: true,
          message: LoginMessage.SUCCESS,
          data: {
            accessToken: loginInfo.accessToken,
            expiresAt: loginInfo.expiresAt,
          },
        });
      } else {
        await clearLoginInfo();

        return NextResponse.json({
          success: false,
          message: LoginMessage.REFRESH_TOKEN_FAILED,
        });
      }
    }
    await clearLoginInfo();

    return NextResponse.json({
      success: false,
      message: LoginMessage.ERROR,
    });
  } catch (err) {
    console.error("🚀 ~ loginHandler ~ err:", err);
    await clearLoginInfo();

    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export default loginHandler;
