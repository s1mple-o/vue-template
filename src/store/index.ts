import type {App} from "vue";
import {createPinia, Pinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store: Pinia = createPinia();
store.use(piniaPluginPersistedstate)

// 全局注册 store
export function setupStore(app: App<Element>) {
    app.use(store);
}
