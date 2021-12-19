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
Set up the driver you want to use, and voilà! For example, using local storage:
```ts
import { createPinia } from 'pinia';
import { createStoragePlugin } from 'unstorage-pinia-plugin';
import localStorageDriver from 'unstorage/drivers/localstorage';

const pinia = createPinia();

pinia.use(createStoragePlugin({
  driver: localStorageDriver()
}));

export default pinia;
```
