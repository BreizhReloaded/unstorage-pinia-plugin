import { defineStore, DefineStoreOptions, PiniaPluginContext, StateTree, Store, StoreDefinition, _GettersTree } from 'pinia';
import { createStorage, Storage } from 'unstorage';
import { PluginOptions, StoreOptions } from './type';

const configureStore = (store: Store, storage: Storage, filter?: Array<string>) => {
  storage.getItem(store.$id).then((state) => {
    Object.assign(store, state);
  });

  const _filter = (filter) ?? Object.keys(store.$state);

  store.$subscribe(() => storage.setItem(store.$id,
    JSON.stringify(Object.fromEntries(
      Object.entries(store.$state).filter(([key]) => (_filter.indexOf(key) ?? 0) > -1)
    ))
  ));

  storage.setItem(store.$id,
    JSON.stringify(Object.fromEntries(
      Object.entries(store.$state).filter(([key]) => (_filter.indexOf(key) ?? 0) > -1)
    ))
  );
};

const unstorageOptionsBag: Record<string, StoreOptions> = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export const defineUnstore = <Id extends string, S extends StateTree = {}, G extends _GettersTree<S> = {}, A = {}>(id: Id, options: Omit<DefineStoreOptions<Id, S, G, A>, 'id'>, unstorageOptions: StoreOptions): StoreDefinition<Id, S, G, A> => {
  const store = defineStore(id, options);
  unstorageOptionsBag[id] = unstorageOptions;
  return store;
};

export const createUnstoragePlugin = ({ driver }: PluginOptions = {}) => {
  return({ options, store }: PiniaPluginContext) => {
    if(options.unstorage) {
      configureStore(store, createStorage({ driver: options.unstorage.driver }), options.unstorage.filter);
    }
    else if(unstorageOptionsBag[store.$id]) {
      configureStore(store, createStorage({ driver: unstorageOptionsBag[store.$id].driver }), unstorageOptionsBag[store.$id].filter );
    }
    else if(driver) {
      configureStore(store, createStorage({ driver }));
    }
  };
};
