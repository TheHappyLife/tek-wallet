import * as Ably from "ably";
import { Message } from "ably";
import { ABLY_CHANNELS_NAME } from "./type";

export class AblyService {
  private readonly ably: Ably.Realtime;
  private readonly channels: Map<string, Ably.RealtimeChannel> = new Map();

  constructor() {
    this.ably = new Ably.Realtime({
      key: process.env.NEXT_PUBLIC_TEK_WALLET_ABLY_API_KEY,
      clientId: `${process.env.NEXT_PUBLIC_TEK_WALLET_APP_SLUG}-FE`,
    });
  }

  getChannels() {
    return this.channels;
  }

  getClient(): Ably.Realtime {
    return this.ably;
  }

  async listenMessage(
    walletAddress: string,
    onMessage: (message: Message) => void
  ) {
    try {
      const channel = this.ably.channels.get(walletAddress);

      await channel.subscribe(
        ABLY_CHANNELS_NAME.TRANSACTION,
        (message: Message) => {
          onMessage(message);
        }
      );

      // await this.cleanup(walletAddress);
    } catch (error) {
      console.error(`Test failed for wallet ${walletAddress}:`, error);
    }
  }

  async publish(channel: string, event: string, data: any): Promise<void> {
    const message: Message = {
      name: event,
      data: data,
    };

    return this.ably.channels.get(channel).publish(message);
  }

  async subscribe(
    channel: string,
    event: string,
    callback: (message: any) => void
  ) {
    await this.ably.channels.get(channel).subscribe(event, callback);
  }

  async cleanup(walletAddress: string): Promise<void> {
    const channel = this.channels.get(walletAddress);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(walletAddress);
      // eslint-disable-next-line no-console
      console.log(`Unsubscribed from wallet ${walletAddress}`);
    }
  }
}
