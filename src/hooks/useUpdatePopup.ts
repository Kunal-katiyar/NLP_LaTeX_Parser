import { popupStorageKey } from '@@/global.vars';
import { useState, useEffect } from 'react';
import { storage } from 'wxt/utils/storage';

export function usePopupStatus() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    void storage.getItem<boolean>(popupStorageKey).then((val) => { setIsOpen(!!val) });

    const unwatch = storage.watch<boolean>(popupStorageKey, (newValue) => { setIsOpen(!!newValue) });

    return () => unwatch();
  }, []);

  return isOpen;
}
