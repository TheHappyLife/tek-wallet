import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (err: any) => {
  console.error("🚀 ~ errorHandler ~ err:", err);

  return NextResponse.json(
    {
      error: err || "Internal server error",
    },
    { status: err?.status || 500 }
  );
};

export default errorHandler;
