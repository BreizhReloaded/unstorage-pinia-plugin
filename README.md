# unstorage-pinia-plugin

Persist and hydrate your pinia state using [unstorage](https://github.com/unjs/unstorage)!

## Install
```sh
# npm
npm i unstorage unstorage-pinia-plugin

# yarn
yarn add unstorage unstorage-pinia-plugin
```

## Usage
You can use any available [unstorage driver](https://github.com/unjs/unstorage#drivers). Drivers can be set either globally or per store. Locally defined driver overrides global definition.

Global driver:
```ts
// pinia.ts
import { createPinia } from 'pinia';
import { createStoragePlugin } from 'unstorage-pinia-plugin';
import localStorageDriver from 'unstorage/drivers/localstorage';

const pinia = createPinia();

pinia.use(createStoragePlugin({
  driver: localStorageDriver()
}));

export default pinia;
```

Per store driver:
```ts
// pinia.ts
import { createPinia } from 'pinia';
import { createStoragePlugin } from 'unstorage-pinia-plugin';

const pinia = createPinia();

pinia.use(createStoragePlugin());

export default pinia;
```

```ts
// store.ts
import { defineStore } from 'pinia';
import { defineStoreStorage } from 'unstorage-pinia-plugin';
import localStorageDriver from 'unstorage/drivers/localstorage';

export const useDemo = defineStore('store', {
  // define your state, getters and actions
});

defineStoreStorage('demo', {
  driver: localStorageDriver()
});
```
