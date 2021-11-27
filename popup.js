document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("targetRpc", ({ targetRpc }) => {
    document.querySelector("#targetRpc").value = targetRpc;
  });
});

document.querySelector("form").addEventListener("submit", () => {
  let targetRpc = document.querySelector("#targetRpc").value;
  if (!targetRpc.endsWith("/")) {
    targetRpc += "/";
    document.querySelector("#targetRpc").value = targetRpc;
  }

  chrome.storage.sync.set({ targetRpc });
});
