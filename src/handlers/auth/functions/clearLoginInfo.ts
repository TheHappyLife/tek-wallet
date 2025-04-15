import { cookies } from "next/headers";

export default async function clearLoginInfo() {
  const cookieStore = await cookies();
  cookieStore.delete("tek_wallet_login");
}
