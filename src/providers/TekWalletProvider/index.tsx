"use client";
import { ReactNode } from "react";
import WalletDataProvider from "../WalletDataProvider";
import MuiThemeProvider from "../../theme/mui";
import DepositProvider from "../DepositProvider";
import LockTokensProvider from "../LockTokenProvider";
import WithdrawProvider from "../WithdrawProvider";
export interface TekWalletProviderProps {
  children: ReactNode;
}

function TekWalletProvider({ children }: TekWalletProviderProps) {
  return (
    <WalletDataProvider>
      <DepositProvider>
        <LockTokensProvider>
          <WithdrawProvider>
            <MuiThemeProvider>{children}</MuiThemeProvider>
          </WithdrawProvider>
        </LockTokensProvider>
      </DepositProvider>
    </WalletDataProvider>
  );
}

export default TekWalletProvider;
