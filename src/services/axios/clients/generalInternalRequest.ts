import axios from "axios";

const generalRequestInternal = axios.create({
  baseURL: `/api/tek-wallet`,
  timeout: 600000,
  headers: {
    "app-slug": process.env.NEXT_PUBLIC_TEK_WALLET_APP_SLUG || "",
  },
});

export default generalRequestInternal;
