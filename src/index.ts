import TekWalletProvider from "./providers/TekWalletProvider";
import RequireConnect from "./components/ui/RequireConnect";
import GetWalletSeedPhrase from "./components/ui/GetWalletSeedPhrase";
import DepositFunction from "./components/ui/DepositFunction";
import useWallet from "./hooks/useWallet";
import tekWalletHandler from "./handlers";

export * from "./types/expose-type";
export {
  TekWalletProvider,
  RequireConnect,
  useWallet,
  tekWalletHandler,
  GetWalletSeedPhrase,
  DepositFunction,
};
