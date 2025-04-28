export interface RealtimeProviderDataType {
  transaction: any;
  isConnected: boolean;
  pushNotification: (notification: NotificationType) => void;
}

export interface NotificationType {
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  id: string;
}
