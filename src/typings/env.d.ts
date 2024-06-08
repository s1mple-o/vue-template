/// <reference types="vite/client" />
// https://cn.vitejs.dev/guide/env-and-mode

declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}