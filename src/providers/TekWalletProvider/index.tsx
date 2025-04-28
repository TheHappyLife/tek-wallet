"use client";
import { ReactNode } from "react";
import WalletDataProvider from "../WalletDataProvider";
import MuiThemeProvider from "../../theme/mui";
import DepositProvider from "../DepositProvider";
import LockTokensProvider from "../LockTokenProvider";
import WithdrawProvider from "../WithdrawProvider";
import RealtimeProvider from "../RealtimeProvider";
export interface TekWalletProviderProps {
  children: ReactNode;
}

function TekWalletProvider({ children }: TekWalletProviderProps) {
  return (
    <WalletDataProvider>
      <RealtimeProvider>
        <DepositProvider>
          <LockTokensProvider>
            <WithdrawProvider>
              <MuiThemeProvider>{children}</MuiThemeProvider>
            </WithdrawProvider>
          </LockTokensProvider>
        </DepositProvider>
      </RealtimeProvider>
    </WalletDataProvider>
  );
}

export default TekWalletProvider;
