import type { port as Port } from "@/formatting/types";
import { popupPortConnectionName } from "@/global.vars";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  // add listener to track popupTogglePort for whenver extension is opened/closed
  browser.runtime.onConnect.addListener((p: Port) => {
    if (p.name !== popupPortConnectionName) return;

    p.onDisconnect.addListener(() => {/* filler */})
  })
});