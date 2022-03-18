import { Driver, Storage } from 'unstorage';

export interface PluginOptions {
  driver?: Driver
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface StoreOptions<S extends StateTree = StateTree> {
  driver: Driver,
  filter?: Array<string>
  storage?: Storage
}

import { StateTree } from 'pinia';

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    unstorage?: StoreOptions<S>
  }
}
