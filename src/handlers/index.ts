import { NextRequest, NextResponse } from "next/server";
import importWalletHandler from "./auth/import";
import signoutHandler from "./auth/signout";
import loginHandler from "./auth/login";
import createWalletHandler from "./auth/create";
const tekWalletHandler = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  console.warn("🚀 ~ tekWalletHandler ~ pathname:", pathname);

  switch (pathname?.replace("/api/tek-wallet", "")) {
    case "/auth/create": {
      return await createWalletHandler(req);
    }
    case "/auth/import": {
      return await importWalletHandler(req);
    }
    case "/auth/login": {
      return await loginHandler();
    }
    case "/auth/signout": {
      return await signoutHandler();
    }
    default: {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }
};

export default tekWalletHandler;
