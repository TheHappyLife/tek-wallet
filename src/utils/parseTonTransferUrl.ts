import { Address } from "ton-core";

export interface TonTransferUrlParams {
  protocol?: "ton" | "https";
  address: string;
  amount: string | undefined;
  text: string | undefined;
  bin: string | undefined;
  init: string | undefined;
  jetton: string | undefined;
  isDeepLinkFormat: boolean;
}

export default function parseTonTransferUrl(url: string): TonTransferUrlParams {
  try {
    let protocol: "ton" | "https";
    let address: string | undefined;
    let queryString = "";
    let isDeepLinkFormat = false;

    // Xác định loại URL
    if (url.startsWith("ton://transfer/")) {
      protocol = "ton";
      const [path, query] = url.split("?");
      address = path.split("/transfer/")[1];
      queryString = query || "";
    } else if (url.startsWith("https://app.tonkeeper.com/transfer/")) {
      protocol = "https";
      const [path, query] = url.split("?");
      address = path.split("/transfer/")[1];
      queryString = query || "";
    } else if (url.startsWith("ton:")) {
      protocol = "ton";
      isDeepLinkFormat = true;
      const [path, query] = url.slice(4).split("?");
      address = path;
      queryString = query || "";
    } else {
      throw new Error(
        'Invalid TON transfer URL. Must start with "ton://transfer/", "https://app.tonkeeper.com/transfer/", or "ton:"'
      );
    }

    if (!address) {
      throw new Error("Missing TON address in URL");
    }

    // Xác thực địa chỉ là TON address
    try {
      Address.parse(address); // Throws nếu không hợp lệ
    } catch {
      throw new Error("Invalid TON address");
    }

    const result: TonTransferUrlParams = {
      protocol,
      address,
      amount: undefined,
      text: undefined,
      bin: undefined,
      init: undefined,
      jetton: undefined,
      isDeepLinkFormat,
    };

    if (queryString) {
      const params = new URLSearchParams(queryString);

      // amount
      const amount = params.get("amount");
      if (amount) {
        if (!/^\d+(\.\d+)?$/.test(amount)) {
          throw new Error("Invalid amount: must be a number");
        }
        result.amount = amount;
      }

      // text
      if (params.has("text")) {
        result.text = decodeURIComponent(params.get("text")!);
      }

      // bin
      const bin = params.get("bin");
      if (bin) {
        if (!/^[A-Za-z0-9-_]+={0,2}$/.test(bin)) {
          throw new Error("Invalid bin: must be Base64 URL-safe encoded");
        }
        result.bin = bin;
      }

      // init
      const init = params.get("init");
      if (init) {
        if (!/^[A-Za-z0-9-_]+={0,2}$/.test(init)) {
          throw new Error("Invalid init: must be Base64 URL-safe encoded");
        }
        result.init = init;
      }

      // jetton
      const jetton = params.get("jetton");
      if (jetton) {
        try {
          Address.parse(jetton); // kiểm tra hợp lệ
          result.jetton = jetton;
        } catch {
          throw new Error("Invalid jetton address");
        }
      }
    }

    return result;
  } catch (error) {
    console.error("error", error);

    return {
      protocol: undefined,
      address: url,
      amount: undefined,
      text: undefined,
      bin: undefined,
      init: undefined,
      jetton: undefined,
      isDeepLinkFormat: false,
    };
  }
}
