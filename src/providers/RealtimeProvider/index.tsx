"use client";
import React, { useEffect, useState } from "react";
import useWalletData from "../../hooks/useWalletData";
import { NotificationType, RealtimeProviderDataType } from "./type";
import { AblyService } from "../../services/ably/ably.service";
import { Alert, Grow, GrowProps, Snackbar, useTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Transaction } from "../../services/axios/get-activities-service/type";

export const initialRealtime: RealtimeProviderDataType = {
  transaction: undefined,
  isConnected: false,
  pushNotification: () => {},
};

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

export const RealtimeContext = React.createContext<RealtimeProviderDataType>(initialRealtime);
function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { masterWallet } = useWalletData();
  const [isConnected, setIsConnected] = useState<RealtimeProviderDataType["isConnected"]>(initialRealtime.isConnected);
  const [transaction, setTransaction] = useState<RealtimeProviderDataType["transaction"]>(initialRealtime.transaction);

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
        const eventData = message.data as Transaction;
        setIsConnected(true);
        setTransaction(eventData);
        const theMessage = eventHandler(eventData);
        if (theMessage) {
          pushNotification(theMessage);
        }
      });
    } catch (error) {
      console.error("🚀 ~ TEK-WALLET: Error connecting to realtime", error);
    }
  }, [masterWallet]);

  const closeNotification = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, open: false } : n)));
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
            key={notification.id}
            autoHideDuration={notification.duration ?? 2000}
          >
            <Alert
              icon={false}
              severity={notification.type}
              sx={{
                width: "fit-content",
                borderRadius: theme.mixins.customRadius.r16,
                mx: "auto",
                padding: `${theme.mixins.customPadding.p0} ${theme.mixins.customPadding.p12}`,
                fontSize: theme.typography.fontSize14,
                "& .MuiAlert-message": {
                  padding: `${theme.mixins.customPadding.p6} ${theme.mixins.customPadding.p0}`,
                },
              }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        ))}
      </SnackbarProvider>
    </RealtimeContext.Provider>
  );
}

export default RealtimeProvider;

const eventHandler = (messageEvent: Transaction): NotificationType | null => {
  if (!messageEvent) return null;
  const type = messageEvent.transaction_type;
  const amount = messageEvent.amount;
  const currency = messageEvent.currency_slug;
  const status = messageEvent.transaction_status;
  const transactionId = messageEvent.id;

  let notificationType: NotificationType["type"] = "success";

  switch (status) {
    case "processing":
      notificationType = "info";
      break;
    case "failed":
      notificationType = "error";
      break;
    case "success":
      notificationType = "success";
      break;
    default:
      notificationType = "info";
  }

  return {
    message: `${type} ${amount} ${currency} is ${status}`,
    type: notificationType,
    id: `${transactionId}-${status}`,
  };
};
