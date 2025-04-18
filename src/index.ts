import TekWalletProvider from "./providers/TekWalletProvider";
import tekWalletHandler from "./handlers";
import RequireConnect from "./components/ui/RequireConnect";
import GetWalletSeedPhrase from "./components/ui/GetWalletSeedPhrase";
import DepositFunction from "./components/ui/DepositFunction";
import useWallet from "./hooks/useWallet";

export * from "./types/expose-type";
export {
  TekWalletProvider,
  tekWalletHandler,
  RequireConnect,
  GetWalletSeedPhrase,
  DepositFunction,
  useWallet,
};
