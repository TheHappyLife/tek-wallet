"use client";
import React, { useCallback, useState } from "react";
import { WithdrawProviderDataType } from "../../types/expose-type";
import useWalletData from "../../hooks/useWalletData";
import { WithdrawCurrency } from "../../services/axios/get-withdraw-tokens-list-service/type";
import getWithdrawTokenList from "../../services/axios/get-withdraw-tokens-list-service";
export const initialWithdraw: WithdrawProviderDataType = {
  isLoadingWithdrawToken: true,
  withdrawTokens: undefined,
  updateWithdrawToken: () => {},
};

export const WithdrawContext =
  React.createContext<WithdrawProviderDataType>(initialWithdraw);
function WithdrawProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useWalletData();
  const [isLoadingWithdrawToken, setIsLoadingWithdrawToken] =
    useState<boolean>(true);
  const [withdrawTokens, setWithdrawTokens] = React.useState<
    WithdrawCurrency[] | undefined
  >(undefined);

  const updateWithdrawToken = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        throw new Error("Authenticate to get withdraw tokens");
      }
      setIsLoadingWithdrawToken(true);
      const response = await getWithdrawTokenList();
      console.warn("🚀 ~ getBalance ~ response:", response);
      setWithdrawTokens(response?.supported_tokens);
      setIsLoadingWithdrawToken(false);
    } catch (error) {
      console.error("🚀 ~ getBalance ~ error:", error);
      setIsLoadingWithdrawToken(false);
    }
  }, [isAuthenticated]);

  return (
    <WithdrawContext.Provider
      value={{
        isLoadingWithdrawToken,
        withdrawTokens,
        updateWithdrawToken,
      }}
    >
      {children}
    </WithdrawContext.Provider>
  );
}

export default WithdrawProvider;
