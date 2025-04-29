"use client";
import React, { useCallback, useState } from "react";
import {
  ReceiveCurrency,
  ReceiveProviderDataType,
} from "../../types/expose-type";
import getReceiveTokenList from "../../services/axios/get-receive-tokens-list-service";
import useWalletData from "../../hooks/useWalletData";
export const initialReceive: ReceiveProviderDataType = {
  isLoadingReceiveToken: true,
  receiveTokens: undefined,
  updateReceiveToken: () => {},
};

export const ReceiveContext =
  React.createContext<ReceiveProviderDataType>(initialReceive);
function ReceiveProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useWalletData();
  const [isLoadingReceiveToken, setIsLoadingReceiveToken] =
    useState<boolean>(true);
  const [receiveTokens, setReceiveTokens] = React.useState<
    ReceiveCurrency[] | undefined
  >(undefined);

  const updateReceiveToken = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        throw new Error("Authenticate to get receive tokens");
      }
      setIsLoadingReceiveToken(true);
      const response = await getReceiveTokenList();
      console.warn("🚀 ~ getBalance ~ response:", response);
      setReceiveTokens(response?.supported_tokens);
      setIsLoadingReceiveToken(false);
    } catch (error) {
      console.error("🚀 ~ getBalance ~ error:", error);
      setIsLoadingReceiveToken(false);
    }
  }, [isAuthenticated]);

  return (
    <ReceiveContext.Provider
      value={{
        isLoadingReceiveToken,
        receiveTokens,
        updateReceiveToken,
      }}
    >
      {children}
    </ReceiveContext.Provider>
  );
}

export default ReceiveProvider;
