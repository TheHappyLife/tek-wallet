import { NextResponse } from "next/server";
import { ResponseError, SignOutResponse } from "../../../types/expose-type";
import clearLoginInfo from "../functions/clearLoginInfo";

const signoutHandler = async (): Promise<NextResponse<SignOutResponse | ResponseError>> => {
  try {
    await clearLoginInfo();

    return NextResponse.json({
      success: true,
      message: "Sign out successfully",
    });
  } catch (err) {
    console.error("🚀 ~ loginHandler ~ err:", err);

    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export default signoutHandler;
