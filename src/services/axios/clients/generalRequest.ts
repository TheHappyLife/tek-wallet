import axios from "axios";

const generalRequest = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_TEK_WALLET_SERVER_URL}`,
  timeout: 600000,
  headers: {
    "app-slug": process.env.NEXT_PUBLIC_TEK_WALLET_APP_SLUG || "",
  },
});

export default generalRequest;
