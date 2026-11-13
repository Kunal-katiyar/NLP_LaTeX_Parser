// import { storage } from "wxt/utils/storage";
// import { popupStorageKey } from "@@/global.vars";

const lightModeIcon = {
    16: "icon/light-16.png",
    32: "icon/light-32.png",
    48: "icon/light-48.png",
    96: "icon/light-96.png",
    128: "icon/light-128.png",
}

const darkModeIcon = {
    16: "icon/dark-16.png",
    32: "icon/dark-32.png",
    48: "icon/dark-48.png",
    96: "icon/dark-96.png",
    128: "icon/dark-128.png",
}

async function enableLightModeIcon() {
    await browser.action.setIcon({ path: lightModeIcon });
}

async function enableDarkModeIcon() {
    await browser.action.setIcon({ path: darkModeIcon });
}

export default defineBackground(async () => {
    async function requestActiveTabTheme(tabId: number) {
        try {
            await browser.tabs.sendMessage(tabId, { type: "theme-request" });
        } catch (error) {
            if (
                !(error instanceof Error) ||
                !error.message.includes("Receiving end does not exist")
            ) {
                console.error("Unable to request the active tab theme:", error);
            }
        }
    }

    browser.runtime.onMessage.addListener(async (message, sender) => {
        if (message.type !== "theme-changed") return;

        if (sender.tab?.id !== undefined && sender.tab.windowId !== undefined) {
            const [activeTab] = await browser.tabs.query({
                active: true,
                windowId: sender.tab.windowId,
            });

            if (activeTab?.id !== undefined && sender.tab.id !== activeTab.id) {
                return;
            }
        }

        try {
            if (message.dark) await enableDarkModeIcon();
            else await enableLightModeIcon();
        } catch (error) {
            console.error("Unable to update extension icon:", error);
        }
    });

    browser.tabs.onActivated.addListener(({ tabId }) => {
        void requestActiveTabTheme(tabId);
    });

    const [activeTab] = await browser.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });

    if (activeTab?.id !== undefined) {
        await requestActiveTabTheme(activeTab.id);
    }

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
