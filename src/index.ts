import { PiniaPluginContext } from 'pinia';
import { createStorage, Driver, Storage } from 'unstorage';

export interface CreateStoragePluginOptions {
  driver?: Driver
}

export interface DefineStoreStorageOptions {
  driver: Driver,
  filter?: Array<string>
}

interface StoreStorage {
  storage: Storage,
  filter?: Array<string>
}

const storages: Record<string, StoreStorage> = {};

export const createStoragePlugin = ({ driver }: CreateStoragePluginOptions = {}) => {
  const storage = (driver) ? createStorage({ driver }) : undefined;

  return ({ store }: PiniaPluginContext) => {
    if(storages[store.$id]) {
      storages[store.$id].storage.getItem(store.$id).then((state) => {
        Object.assign(store, state);
      });

      store.$subscribe(() => {
        storages[store.$id].storage.setItem(
          store.$id,
          JSON.stringify(Object.fromEntries(
            Object.entries(store.$state).filter(([key]) => (storages[store.$id].filter?.indexOf(key) ?? 0) > -1)
          ))
        );
      });
    }
    else if(storage) {
      storage.getItem(store.$id).then((state) => {
        Object.assign(store, state);
      });

      store.$subscribe(() => {
        storage.setItem(store.$id, JSON.stringify(store.$state));
      });
    }
  };
};

export const defineStoreStorage = <Id extends string>(id: Id, { driver, filter }: DefineStoreStorageOptions) => {
  storages[id] = { storage: createStorage({ driver }), filter };
};
