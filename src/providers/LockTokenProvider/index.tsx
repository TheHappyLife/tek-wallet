"use client";
import React, { useCallback, useEffect, useState } from "react";
import getLockTokenList from "../../services/axios/get-lock-tokens-list-service";
import useWalletData from "../../hooks/useWalletData";
import { LockTokensProviderDataType } from "./type";
import { LockCurrency } from "../../services/axios/get-lock-tokens-list-service/type";
export const initialLockTokens: LockTokensProviderDataType = {
  isLoadingLockToken: false,
  lockTokens: undefined,
  updateLockToken: () => {},
};

export const LockTokensContext = React.createContext<LockTokensProviderDataType>(initialLockTokens);
function LockTokensProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useWalletData();
  const [isLoadingLockToken, setIsLoadingLockToken] = useState<boolean>(initialLockTokens.isLoadingLockToken);
  const [lockTokens, setLockTokens] = React.useState<LockCurrency[] | undefined>(initialLockTokens.lockTokens);

  const updateLockToken = useCallback(async () => {
    try {
      if (isLoadingLockToken) return;
      if (!isAuthenticated) {
        throw new Error("Authenticate to get lock tokens");
      }
      setIsLoadingLockToken(true);
      const response = await getLockTokenList();
      console.warn("🚀 ~ getBalance ~ response: ", response);
      setLockTokens(response?.supported_tokens);
      setIsLoadingLockToken(false);
    } catch (error) {
      console.error("🚀 ~ getBalance ~ error:", error);
      setIsLoadingLockToken(false);
    }
  }, [isAuthenticated, isLoadingLockToken]);

  useEffect(() => {
    if (!!lockTokens) return;
    updateLockToken();
  }, [isAuthenticated, lockTokens]);

  return (
    <LockTokensContext.Provider
      value={{
        isLoadingLockToken,
        lockTokens,
        updateLockToken,
      }}
    >
      {children}
    </LockTokensContext.Provider>
  );
}

export default LockTokensProvider;
