"use client";
import React, { useEffect, useState } from "react";
import useWalletData from "../../hooks/useWalletData";
import { NotificationType, RealtimeProviderDataType } from "./type";
import { AblyService } from "../../services/ably/ably.service";
import { Snackbar } from "@mui/material";
import { SnackbarProvider } from "notistack";

import Slide, { SlideProps } from "@mui/material/Slide";
export const initialRealtime: RealtimeProviderDataType = {
  transaction: undefined,
  isConnected: false,
  pushNotification: () => {},
};

function GrowTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
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

  const closeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, open: false } : n))
    );
  };

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
            open={notification.open ?? true}
            anchorOrigin={{
              vertical: notification?.anchorOrigin?.vertical ?? "top",
              horizontal: notification?.anchorOrigin?.horizontal ?? "right",
            }}
            onClose={() => {
              closeNotification(notification.id);
            }}
            slots={{ transition: GrowTransition }}
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
