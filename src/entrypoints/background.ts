import { storage } from "wxt/utils/storage";
import { popupStorageKey } from "@@/global.vars";

export default defineBackground(() => {
    browser.action.onClicked.addListener(async (tab) => {
        try {
            const isOpen = await storage.getItem<boolean>(popupStorageKey)

            await storage.setItem(popupStorageKey, isOpen !== true)
        } catch (error) {
            console.error("Error toggling canvas visibility", error)
        }
    })
});
