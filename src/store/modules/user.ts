import {RouteRecordRaw} from "vue-router";
import {StoreTypeEnum} from "@/store/type";
import {constantRoutes} from "@/router/core/ConstantRoutes";


export const useUserStore = defineStore(StoreTypeEnum.USER, {
    state: (): {
        userInfo: any,
        authInfo: any,
        routes: RouteRecordRaw[]
        role: any,
        permission: any,
    } => {
        return {
            // 用户信息
            userInfo: {},
            // 认证信息
            authInfo: {},
            // 菜单信息
            routes: constantRoutes,
            // 角色信息
            role: [],
            // 权限信息
            permission: [],
        }
    },
    persist: {
        paths: ['authInfo'],
    },
    getters: {},
    actions: {}
})
