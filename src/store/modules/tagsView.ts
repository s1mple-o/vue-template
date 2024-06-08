import {StoreTypeEnum} from "@/store/type";

/**
 * 页签对象
 */
export interface TagView {
    /** 页签名称 */
    name: string;
    /** 页签标题 */
    title: string;
    /** 页签路由路径 */
    path: string;
    /** 页签路由完整路径 */
    fullPath: string;
    /** 页签图标 */
    icon?: string;
    /** 是否固定页签 */
    affix?: boolean;
    /** 是否开启缓存 */
    keepAlive?: boolean;
    /** 路由查询参数 */
    query?: any;
}

export const useTagsViewStore = defineStore(StoreTypeEnum.TAGS_VIEW, {
    state: (): {
        visitedViews: TagView[];    //  已打开的页签
        cachedViews: string[];      //  缓存的页签
    } => {
        return {
            visitedViews: [],
            cachedViews: []
        }
    },
    persist: {
        paths: ['visitedViews']
    },
    getters: {},
    actions: {
        /**
         * 添加已打开的页签
         * @param tag 当前点击的页签对象
         */
        saveVisitedView(tag: TagView) {
            // 如果已经存在于已访问的视图列表中，则不再添加
            if (this.visitedViews.some((item) => item.path === tag.path)) {
                return;
            }
            // 如果视图是固定的（affix），则在已访问的视图列表的开头添加
            if (tag.affix) {
                this.visitedViews.unshift(tag);
            } else {
                // 如果视图不是固定的，则在已访问的视图列表的末尾添加
                this.visitedViews.push(tag);
            }
        },
        /**
         * 删除已打开的页签
         * @param tag 当前点击的页签对象
         */
        removeTagView(tag: TagView) {
            for (const [index, value] of this.visitedViews.entries()) {
                // 找到与指定视图路径匹配的视图，在已访问视图列表中删除该视图
                if (value.path === tag.path) {
                    this.visitedViews.splice(index, 1);
                    break;
                }
            }
        },
        /**
         * 修改页签 ( 主要解决 fullPath 不一样 )
         * @param tag 页签
         */
        updateVisitedView(tag: TagView) {
            for (let v of this.visitedViews) {
                if (v.path === tag.path) {
                    v = Object.assign(v, tag);
                    break;
                }
            }
        },
        /**
         * 添加缓存的页签到缓存视图列表
         * @param {TagView} tag 要添加到缓存的页签对象
         */
        saveCachedView(tag: TagView) {
            const tagName = tag.name;
            // 如果缓存视图列表中已存在相同名称的视图，则不再添加
            if (this.cachedViews.includes(tagName)) {
                return;
            }

            // 如果该页签需要被缓存（keepAlive为true），则将其名称添加到缓存视图列表
            if (tag.keepAlive) {
                this.cachedViews.push(tagName);
            }
        },
        /**
         * 从缓存视图列表中删除指定页签
         * @param {TagView} tag 要从缓存中删除的页签对象
         */
        removeCachedView(tag: TagView) {
            // 获取要删除的页签的名称
            const tagName = tag.name;
            // 查找该页签在缓存视图列表中的索引
            const index = this.cachedViews.indexOf(tagName);
            // 如果找到了该页签，则从缓存视图列表中删除它
            if (index > -1) {
                this.cachedViews.splice(index, 1);
            }
        },
        /**
         * 设置目前展示的页签列表
         * @param tagsView
         */
        setVisitedView(tagsView: TagView[]) {
            this.visitedViews = tagsView;
        },
        /**
         * 设置缓存的页签列表
         * @param cachedViews
         */
        setCachedView(cachedViews: string[]) {
            this.cachedViews = cachedViews;
        }
    }
})
