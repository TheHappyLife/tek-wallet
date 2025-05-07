import { NotificationType } from "../providers/RealtimeProvider/type";
import { Transaction } from "../services/axios/get-activities-service/type";

export type EventHandler = (messageEvent: Transaction) => NotificationType | undefined;

export type EventHandlerHookType = {
  eventHandler: EventHandler;
};

export const useEventHandler = (): EventHandlerHookType => {
  const handler: EventHandler = (messageEvent) => {
    if (!messageEvent) return undefined;
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

  return { eventHandler: handler };
};
