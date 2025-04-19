"use client";
import React, { useCallback } from "react";
import {
  WalletProviderDataType,
  LoginInfoResponse,
  Balance,
  CreateWalletServiceBody,
  CreateWalletServiceResponse,
  ImportWalletServiceResponse,
  ImportWalletServiceBody,
  GetSeedPhraseServiceBody,
  GetSeedPhraseServiceResponse,
} from "../../types/expose-type";
import loginInternalService from "../../services/axios/login-internal/loginIntenalService";
import { setAuthToken } from "../../services/axios/clients/userClientRequest";
import getBalanceService from "../../services/axios/get-balance-service/getBalanceService";
import signOutInternalService from "../../services/axios/sign-out-internal/loginIntenalService";
import { PRE_EXPIRED_TIME } from "../../handlers/const";
import createWalletInternalService from "../../services/axios/create-wallet-service/createWalletInternalService";
import importWalletInternalService from "../../services/axios/import-wallet-service/importWalletIntenalService";
import getSeedPhraseService from "../../services/axios/get-seed-phrase-service/getSeedPhraseService";
export const initialWalletData: WalletProviderDataType = {
  isAuthenticated: false,
  session: undefined,
  isAuthLoading: true,
  tokens: undefined,
  isTokensLoading: true,
  updateLogin: () => {},
  updateBalance: () => {},
  disconnect: () => {},
  createWallet: () => Promise.resolve({} as CreateWalletServiceResponse),
  importWallet: () => Promise.resolve({} as ImportWalletServiceResponse),
  getSeedPhrase: () => Promise.resolve({} as GetSeedPhraseServiceResponse),
};

export const WalletDataContext =
  React.createContext<WalletProviderDataType>(initialWalletData);
function WalletDataProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [session, setSession] = React.useState<LoginInfoResponse | undefined>(
    undefined
  );
  const [isAuthLoading, setIsAuthLoading] = React.useState<boolean>(false);
  const [isTokensLoading, setIsTokensLoading] = React.useState<boolean>(false);
  const [tokens, setTokens] = React.useState<Balance[] | undefined>(undefined);

  const timeout = React.useRef<NodeJS.Timeout | undefined>(undefined);

  const updateLogin = useCallback(async () => {
    try {
      console.warn("🚀 ~ update ~ response:");
      setIsAuthLoading(true);
      const response = await loginInternalService();
      console.warn("🚀 ~ update ~ response:", response);
      if (response?.success) {
        setSession(response?.data);
        setAuthToken(response?.data?.accessToken || "");
        setIsAuthenticated(true);
      } else {
        setSession(undefined);
        setAuthToken("");
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    } catch (error) {
      console.error("🚀 ~ error:", error);
    }
  }, []);

  const updateBalance = useCallback(async () => {
    try {
      setIsTokensLoading(true);
      const response = await getBalanceService();
      console.warn("🚀 ~ getBalance ~ response:", response);
      setTokens(response?.balances);
      setIsTokensLoading(false);
    } catch (error) {
      console.error("🚀 ~ getBalance ~ error:", error);
      setIsTokensLoading(false);
    }
  }, []);

  const createWallet = async (
    body: CreateWalletServiceBody,
    onStart?: () => void,
    onSuccess?: (data?: CreateWalletServiceResponse) => void,
    onError?: (error?: Error) => void
  ) => {
    // childPageLayoutRef.current?.showLoading();
    onStart?.();
    const delay = new Promise((resolve) => setTimeout(resolve, 1000));
    const response = createWalletInternalService(body);
    Promise.allSettled([delay, response]).then(async (result) => {
      if (result[1].status === "fulfilled") {
        const data = result[1].value;
        if (data.success) {
          updateLogin();
          onSuccess?.(data);
        } else {
          onError?.(new Error("Create wallet failed"));
        }
      } else {
        onError?.(new Error("Create wallet failed"));
      }
    });

    return response;
  };
  const importWallet = async (
    body: ImportWalletServiceBody,
    onStart?: () => void,
    onSuccess?: (data?: ImportWalletServiceResponse) => void,
    onError?: (error?: Error) => void
  ) => {
    // childPageLayoutRef.current?.showLoading();
    onStart?.();
    const delay = new Promise((resolve) => setTimeout(resolve, 1000));
    const response = importWalletInternalService(body);
    Promise.allSettled([delay, response]).then(async (result) => {
      if (result[1].status === "fulfilled") {
        const data = result[1].value;
        if (data.success) {
          updateLogin();
          onSuccess?.(data);
        } else {
          onError?.(new Error("Create wallet failed"));
        }
      } else {
        onError?.(new Error("Create wallet failed"));
      }
    });

    return response;
  };

  const getSeedPhrase = async (
    body: GetSeedPhraseServiceBody,
    onStart?: () => void,
    onSuccess?: (data?: GetSeedPhraseServiceResponse) => void,
    onError?: (error?: Error) => void
  ) => {
    onStart?.();
    const delay = new Promise((resolve) => setTimeout(resolve, 1000));
    const response = getSeedPhraseService(body);
    Promise.allSettled([delay, response]).then(async (result) => {
      if (result[1].status === "fulfilled") {
        const data = result[1].value;
        if (data.success) {
          onSuccess?.(data);
        } else {
          onError?.(new Error("Get seed phrase failed"));
        }
      } else {
        onError?.(new Error("Get seed phrase failed"));
      }
    });

    return response;
  };

  const disconnect = useCallback(async () => {
    try {
      setIsAuthLoading(true);
      const response = await signOutInternalService();
      if (response?.success) {
        setIsAuthenticated(false);
        setSession(undefined);
        setAuthToken("");
        setTokens(undefined);
      }
      setIsAuthLoading(false);
    } catch (error) {
      console.error("🚀 ~ disconnect ~ error:", error);
      setIsAuthLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (isAuthenticated) {
      updateBalance();
    } else {
      setTokens(undefined);
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    updateLogin();
  }, []);

  React.useEffect(() => {
    !!timeout.current && clearTimeout(timeout.current);
    const expiredTime = +(session?.expiresAt ?? 0);
    console.warn("🚀 ~ React.useEffect ~ expiredTime:", expiredTime, session);
    const currentTime = Date.now();
    const timeDiff = Math.max(expiredTime - currentTime - PRE_EXPIRED_TIME, 0);
    console.warn("🚀 ~ React.useEffect ~ timeDiff:", timeDiff);
    timeout.current = setTimeout(() => {
      updateLogin();
    }, timeDiff);

    return () => clearTimeout(timeout.current);
  }, [session?.expiresAt]);

  return (
    <WalletDataContext.Provider
      value={{
        isAuthenticated,
        session,
        isAuthLoading,
        tokens,
        isTokensLoading,
        updateLogin,
        updateBalance,
        disconnect,
        createWallet,
        importWallet,
        getSeedPhrase,
      }}
    >
      {children}
    </WalletDataContext.Provider>
  );
}

export default WalletDataProvider;
