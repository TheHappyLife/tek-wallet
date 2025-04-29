"use client";
import { ReactNode } from "react";
import WalletDataProvider from "../WalletDataProvider";
import MuiThemeProvider from "../../theme/mui";
import ReceiveProvider from "../ReceiveProvider";
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
        <ReceiveProvider>
          <LockTokensProvider>
            <WithdrawProvider>
              <MuiThemeProvider>{children}</MuiThemeProvider>
            </WithdrawProvider>
          </LockTokensProvider>
        </ReceiveProvider>
      </RealtimeProvider>
    </WalletDataProvider>
  );
}

export default TekWalletProvider;
