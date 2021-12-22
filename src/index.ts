import { PiniaPluginContext } from 'pinia';
import { createStorage, Driver, Storage } from 'unstorage';

const storages: Record<string, Storage> = {};

export interface CreateStoragePluginOptions {
  driver?: Driver
}

export const createStoragePlugin = ({ driver }: CreateStoragePluginOptions = {}) => {
  const storage = (driver) ? createStorage({ driver }) : undefined;

  return ({ store }: PiniaPluginContext) => {
    if(storages[store.$id]) {
      storages[store.$id].getItem(store.$id).then((state) => {
        Object.assign(store, state);
      });

      store.$subscribe(() => {
        console.log(storages);
        storages[store.$id].setItem(store.$id, JSON.stringify(store.$state));
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

export interface DefineStoreStorageOptions {
  driver: Driver
}

export const defineStoreStorage = <Id extends string>(id: Id, { driver }: DefineStoreStorageOptions) => {
  storages[id] = createStorage({ driver });
};
