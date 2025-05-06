"use client";
import { ReactNode } from "react";
import WalletDataProvider from "../WalletDataProvider";
import MuiThemeProvider from "../../theme/mui";
import ReceiveProvider from "../ReceiveProvider";
import LockTokensProvider from "../LockTokenProvider";
import WithdrawProvider from "../WithdrawProvider";
import RealtimeProvider from "../RealtimeProvider";
import ActivitiesProvider from "../ActivitiesProvider";
export interface TekWalletProviderProps {
  children: ReactNode;
}

function TekWalletProvider({ children }: TekWalletProviderProps) {
  return (
    <WalletDataProvider>
      <MuiThemeProvider>
        <RealtimeProvider>
          <ActivitiesProvider>
            <ReceiveProvider>
              <LockTokensProvider>
                <WithdrawProvider>{children}</WithdrawProvider>
              </LockTokensProvider>
            </ReceiveProvider>
          </ActivitiesProvider>
        </RealtimeProvider>
      </MuiThemeProvider>
    </WalletDataProvider>
  );
}

export default TekWalletProvider;
