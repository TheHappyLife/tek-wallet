"use client";
import { ReactNode } from "react";
import WalletDataProvider from "../WalletDataProvider";
import MuiThemeProvider from "../../theme/mui";
import DepositProvider from "../DepositProvider";
import LockTokensProvider from "../LockTokenProvider";
export interface TekWalletProviderProps {
  children: ReactNode;
}

function TekWalletProvider({ children }: TekWalletProviderProps) {
  return (
    <WalletDataProvider>
      <DepositProvider>
        <LockTokensProvider>
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </LockTokensProvider>
      </DepositProvider>
    </WalletDataProvider>
  );
}

export default TekWalletProvider;
