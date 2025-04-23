"use client";
import React, { useCallback, useState } from "react";
import {
  DepositCurrency,
  DepositProviderDataType,
} from "../../types/expose-type";
import getDepositTokenList from "../../services/axios/get-deposit-tokens-list-service";
import useWalletData from "../../hooks/useWalletData";
export const initialDeposit: DepositProviderDataType = {
  isLoadingDepositToken: true,
  depositTokens: undefined,
  updateDepositToken: () => {},
};

export const DepositContext =
  React.createContext<DepositProviderDataType>(initialDeposit);
function DepositProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useWalletData();
  const [isLoadingDepositToken, setIsLoadingDepositToken] =
    useState<boolean>(true);
  const [depositTokens, setDepositTokens] = React.useState<
    DepositCurrency[] | undefined
  >(undefined);

  const updateDepositToken = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        throw new Error("Authenticate to get deposit tokens");
      }
      setIsLoadingDepositToken(true);
      const response = await getDepositTokenList();
      console.warn("🚀 ~ getBalance ~ response:", response);
      setDepositTokens(response?.supported_tokens);
      setIsLoadingDepositToken(false);
    } catch (error) {
      console.error("🚀 ~ getBalance ~ error:", error);
      setIsLoadingDepositToken(false);
    }
  }, [isAuthenticated]);

  return (
    <DepositContext.Provider
      value={{
        isLoadingDepositToken,
        depositTokens,
        updateDepositToken,
      }}
    >
      {children}
    </DepositContext.Provider>
  );
}

export default DepositProvider;
