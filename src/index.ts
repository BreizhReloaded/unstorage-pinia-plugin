import { PiniaPluginContext } from 'pinia';
import { createStorage, CreateStorageOptions } from 'unstorage';

export const createStoragePlugin = ({ driver }: CreateStorageOptions) => {
  const storage = createStorage({ driver });

  return ({ store }: PiniaPluginContext) => {
    storage.getItem(store.$id).then((state) => {
      Object.assign(store, state);
    });

    store.$subscribe(() => {
      storage.setItem(store.$id, JSON.stringify(store.$state));
    });
  };
};
