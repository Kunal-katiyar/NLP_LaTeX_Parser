export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",

  main() {
    const theme = window.matchMedia("(prefers-color-scheme: dark)");

    const updateIcon = () => {
      void browser.runtime.sendMessage({
        type: "theme-changed",
        dark: theme.matches,
      }).catch((error) => {
        console.warn("Unable to update extension icon:", error);
      });
    };

    browser.runtime.onMessage.addListener((message) => {
      if (message.type === "theme-request") {
        updateIcon();
      }
    });

    updateIcon();
    theme.addEventListener("change", updateIcon);
  },
});