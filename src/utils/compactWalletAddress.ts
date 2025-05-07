export default function compactWalletAddress(walletAddress?: string, isLinkAff?: boolean) {
  try {
    if (!walletAddress) return undefined;
    if (walletAddress?.length <= 8) {
      return walletAddress;
    }

    return walletAddress?.slice(0, !isLinkAff ? 3 : 15) + "..." + walletAddress?.slice(!isLinkAff ? -3 : -10);
  } catch (err) {
    console.error("🚀 ~ compactWalletAddress ~ err:", err);

    return walletAddress;
  }
}
