const ab2str = (buf) => {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

let targetRpcCache = "";

const swapRpc = (requestDetails) => {
  if (requestDetails.url === targetRpcCache) {
    return;
  }

  if (
    requestDetails.requestBody &&
    requestDetails.requestBody.raw &&
    requestDetails.requestBody.raw[0]
  ) {
    if (ab2str(requestDetails.requestBody.raw[0].bytes).includes("jsonrpc")) {
      return {
        redirectUrl: targetRpcCache,
      };
    }
  }
};

chrome.webRequest.onBeforeRequest.addListener(
  swapRpc,
  {
    urls: ["<all_urls>"],
  },
  ["blocking", "requestBody"]
);

chrome.runtime.onInstalled.addListener(() => {
  let targetRpc = "https://api.mainnet-beta.solana.com/";
  chrome.storage.sync.set({ targetRpc });
});

chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get("targetRpc", ({ targetRpc }) => {
    targetRpcCache = targetRpc;
  });
});

chrome.storage.sync.get("targetRpc", ({ targetRpc }) => {
  targetRpcCache = targetRpc;
});
