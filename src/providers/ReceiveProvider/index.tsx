"use client";
import React, { useCallback, useState } from "react";
import { ReceiveExternalCurrency, ReceiveInternalCurrency, ReceiveProviderDataType } from "../../types/expose-type";
import getReceiveExternalTokenList from "../../services/axios/get-receive-external-tokens-list-service";
import useWalletData from "../../hooks/useWalletData";
import getReceiveInternalTokenList from "../../services/axios/get-receive-internal-tokens-list-service";
export const initialReceive: ReceiveProviderDataType = {
  isLoadingReceiveExternalToken: false,
  receiveExternalTokens: undefined,
  updateReceiveExternalToken: () => {},
  isLoadingReceiveInternalToken: false,
  receiveInternalTokens: undefined,
  updateReceiveInternalToken: () => {},
};

export const ReceiveContext = React.createContext<ReceiveProviderDataType>(initialReceive);
function ReceiveProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useWalletData();
  const [isLoadingReceiveExternalToken, setIsLoadingReceiveExternalToken] = useState<boolean>(
    initialReceive.isLoadingReceiveExternalToken
  );
  const [receiveExternalTokens, setReceiveExternalTokens] = React.useState<ReceiveExternalCurrency[] | undefined>(
    initialReceive.receiveExternalTokens
  );
  const [isLoadingReceiveInternalToken, setIsLoadingReceiveInternalToken] = useState<boolean>(
    initialReceive.isLoadingReceiveInternalToken
  );
  const [receiveInternalTokens, setReceiveInternalTokens] = React.useState<ReceiveInternalCurrency[] | undefined>(
    initialReceive.receiveInternalTokens
  );

  const updateReceiveExternalToken = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        throw new Error("Authenticate to get receive tokens");
      }
      setIsLoadingReceiveExternalToken(true);
      const response = await getReceiveExternalTokenList();
      console.warn("🚀 ~ getBalance ~ response:", response);
      setReceiveExternalTokens(response?.supported_tokens);
      setIsLoadingReceiveExternalToken(false);
    } catch (error) {
      console.error("🚀 ~ getBalance ~ error:", error);
      setIsLoadingReceiveExternalToken(false);
    }
  }, [isAuthenticated]);
  const updateReceiveInternalToken = useCallback(async () => {
    console.warn("🚀 ~ updateReceiveInternalToken ~ isAuthenticated:", isAuthenticated);
    try {
      if (!isAuthenticated) {
        throw new Error("Authenticate to get receive tokens");
      }
      setIsLoadingReceiveInternalToken(true);
      const response = await getReceiveInternalTokenList();
      console.warn("🚀 ~ getBalance ~ response:", response);
      setReceiveInternalTokens(response?.supported_tokens);
      setIsLoadingReceiveInternalToken(false);
    } catch (error) {
      console.error("🚀 ~ getBalance ~ error:", error);
      setIsLoadingReceiveInternalToken(false);
    }
  }, [isAuthenticated]);

  return (
    <ReceiveContext.Provider
      value={{
        isLoadingReceiveExternalToken,
        receiveExternalTokens,
        updateReceiveExternalToken,
        isLoadingReceiveInternalToken,
        receiveInternalTokens,
        updateReceiveInternalToken,
      }}
    >
      {children}
    </ReceiveContext.Provider>
  );
}

export default ReceiveProvider;
