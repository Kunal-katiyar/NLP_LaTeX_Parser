// track preferences or toggled features like having writing pad open/closed and such
import { storage } from "wxt/utils/storage";

export const writingPadEnabled = storage.defineItem<boolean>("local:padEnabled", { fallback: true }) // fallback value is default value if something goes wrong, change to false if wanted