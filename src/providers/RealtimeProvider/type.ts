import { ReactNode } from "react";

export interface RealtimeProviderDataType {
  transaction: any;
  isConnected: boolean;
  pushNotification: (notification: NotificationType) => void;
}

export interface NotificationType {
  message: ReactNode;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  id: string;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  open?: boolean;
}
