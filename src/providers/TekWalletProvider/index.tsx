"use client";
import { ReactNode } from "react";
import WalletDataProvider from "../WalletDataProvider";
import MuiThemeProvider from "../../theme/mui";
import DepositProvider from "../DepositProvider";
export interface TekWalletProviderProps {
  children: ReactNode;
}

function TekWalletProvider({ children }: TekWalletProviderProps) {
  return (
    <WalletDataProvider>
      <DepositProvider>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </DepositProvider>
    </WalletDataProvider>
  );
}

export default TekWalletProvider;
