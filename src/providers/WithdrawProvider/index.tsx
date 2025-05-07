"use client";
import React, { useCallback, useState } from "react";
import { WithdrawProviderDataType } from "../../types/expose-type";
import useWalletData from "../../hooks/useWalletData";
import { WithdrawCurrency } from "../../services/axios/get-withdraw-tokens-list-service/type";
import getWithdrawTokenList from "../../services/axios/get-withdraw-tokens-list-service";
export const initialWithdraw: WithdrawProviderDataType = {
  isLoadingWithdrawToken: false,
  withdrawTokens: undefined,
  updateWithdrawToken: () => {},
  isLoadingSendInternalToken: true,
  sendInternalTokens: undefined,
  updateSendInternalToken: () => {},
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
  const [isLoadingSendInternalToken, setIsLoadingSendInternalToken] =
    useState<boolean>(true);
  const [sendInternalTokens, setSendInternalTokens] = React.useState<
    WithdrawCurrency[] | undefined
  >(undefined);

  const updateWithdrawToken = useCallback(async () => {
    console.warn(
      "🚀 ~ updateWithdrawToken ~ updateWithdrawToken:",
      isAuthenticated
    );
    try {
      if (!isAuthenticated) {
        throw new Error("Authenticate to get withdraw tokens");
      }
      setIsLoadingWithdrawToken(true);
      const response = await getWithdrawTokenList();
      console.warn(
        "🚀 ~ getBalance getWithdrawTokenList ~ response:",
        response
      );
      setWithdrawTokens(response?.supported_tokens);
      setIsLoadingWithdrawToken(false);
    } catch (error) {
      console.error("🚀 ~ getBalance ~ error getWithdrawTokenList:", error);
      setWithdrawTokens(undefined);
      setIsLoadingWithdrawToken(false);
    }
  }, [isAuthenticated]);
  const updateSendInternalToken = useCallback(async () => {
    console.warn(
      "🚀 ~ updateWithdrawToken ~ updateWithdrawToken:",
      isAuthenticated
    );
    try {
      if (!isAuthenticated) {
        throw new Error("Authenticate to get withdraw tokens");
      }
      setIsLoadingSendInternalToken(true);
      const response = await getWithdrawTokenList();
      console.warn(
        "🚀 ~ getBalance getWithdrawTokenList ~ response:",
        response
      );
      setSendInternalTokens(response?.supported_tokens);
      setIsLoadingSendInternalToken(false);
    } catch (error) {
      console.error("🚀 ~ getBalance ~ error getWithdrawTokenList:", error);
      setSendInternalTokens(undefined);
      setIsLoadingSendInternalToken(false);
    }
  }, [isAuthenticated]);

  return (
    <WithdrawContext.Provider
      value={{
        isLoadingWithdrawToken,
        withdrawTokens,
        updateWithdrawToken,
        isLoadingSendInternalToken,
        sendInternalTokens,
        updateSendInternalToken,
      }}
    >
      {children}
    </WithdrawContext.Provider>
  );
}

export default WithdrawProvider;
