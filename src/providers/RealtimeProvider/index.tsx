"use client";
import React, { useEffect, useState } from "react";
import useWalletData from "../../hooks/useWalletData";
import { NotificationType, RealtimeProviderDataType } from "./type";
import { AblyService } from "../../services/ably/ably.service";
import { Snackbar } from "@mui/material";
import { SnackbarProvider, VariantType } from "notistack";

import Slide, { SlideProps } from "@mui/material/Slide";
export const initialRealtime: RealtimeProviderDataType = {
  transaction: undefined,
  isConnected: false,
  pushNotification: () => {},
};

export interface Notification {
  message: string;
  variant: VariantType;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export const RealtimeContext =
  React.createContext<RealtimeProviderDataType>(initialRealtime);
function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const { masterWallet } = useWalletData();
  const [isConnected, setIsConnected] = useState<
    RealtimeProviderDataType["isConnected"]
  >(initialRealtime.isConnected);
  const [transaction, setTransaction] = useState<
    RealtimeProviderDataType["transaction"]
  >(initialRealtime.transaction);

  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const pushNotification = (notification: NotificationType) => {
    setNotifications((prev) => [...prev, notification]);
  };

  useEffect(() => {
    try {
      if (!masterWallet) return;
      const ablyService = new AblyService();
      console.warn("Connecting to realtime");
      ablyService.listenMessage(masterWallet, (message) => {
        // eslint-disable-next-line no-console
        console.log("🚀 ~ ablyService.listenMessage ~ message:", message);
        setIsConnected(true);
        setTransaction(message);
      });
    } catch (error) {
      console.error("🚀 ~ TEK-WALLET: Error connecting to realtime", error);
    }
  }, [masterWallet]);

  return (
    <RealtimeContext.Provider
      value={{
        isConnected,
        transaction,
        pushNotification,
      }}
    >
      {children}
      <SnackbarProvider maxSnack={2}>
        {notifications.map((notification) => (
          <Snackbar
            open={true}
            onClose={() => {}}
            slots={{ transition: SlideTransition }}
            message={notification.message}
            key={notification.id}
            autoHideDuration={notification.duration ?? 2000}
          />
        ))}
      </SnackbarProvider>
    </RealtimeContext.Provider>
  );
}

export default RealtimeProvider;
