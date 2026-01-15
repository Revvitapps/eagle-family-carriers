(() => {
  if (window.__efcCaptureListener) return;
  window.__efcCaptureListener = true;

  const status = document.createElement("div");
  status.textContent = "Chrome helper active";
  status.style.cssText = [
    "position:fixed",
    "bottom:24px",
    "right:24px",
    "padding:8px 12px",
    "background:rgba(2,6,23,0.9)",
    "color:#9feaf9",
    "border-radius:999px",
    "font-size:12px",
    "font-weight:600",
    "z-index:9999",
    "pointer-events:none",
  ].join(";");
  document.body.appendChild(status);

  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type !== "efcCapture" || !message.payload) return;
    const event = new CustomEvent("efcAdminCapture", { detail: message.payload });
    window.dispatchEvent(event);
  });
})();
