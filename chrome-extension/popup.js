document.getElementById("capture")?.addEventListener("click", () => {
  chrome.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => {
      const tab = tabs[0];
      if (!tab?.id) return;
      const payload = {
        url: tab.url ?? "",
        title: tab.title ?? "",
        timestamp: new Date().toISOString(),
      };
      chrome.tabs.sendMessage(tab.id, { type: "efcCapture", payload });
    })
    .catch((err) => {
      console.error("EFC popup action failed", err);
    });
});
