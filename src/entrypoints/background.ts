import { storage } from "wxt/utils/storage";
import { popupStorageKey } from "@@/global.vars";

export default defineBackground(() => {
    // browser.runtime.onConnect.addListener(async (port) => {
    //     if (port.name === 'popup-tracker') {
    //         try {
    //             await storage.setItem(popupStorageKey, true);
    //         } catch (error) {
    //             console.error("Error setting storage state! (isPopupOpen: true)")
    //         }

    //     port.onDisconnect.addListener(async () => {
    //         try {
    //             await storage.setItem(popupStorageKey, false);
    //         } catch (error) {
    //             console.error("Error setting storage state! (isPopupOpen: false)")
    //         }
    //     });
    //     }
    // });
});
