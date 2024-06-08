import {StoreTypeEnum} from "@/store/type";
import {LayoutEnum} from "@/enums/LayoutEnum";
import {ThemeEnum} from "@/enums/ThemeEnum";
import {SizeEnum} from "@/enums/SizeEnum";
import {updateElementPlusTheme} from "@/utils/color";
import {ElementPlusModifyEnum} from "@/enums/ElementPlusModifyEnum";
import {DeviceEnum} from "@/enums/DeviceEnum";
import {SidebarStatusEnum} from "@/enums/SidebarStatusEnum";
import defaultSettings from "@/settings";
import _ from 'lodash';

export interface AppSettings {
    settingsVisible: boolean;                                       // 是否开启
    fixedHeader: boolean;                                           // 是否固定头部
    tagsView: boolean;                                              // 是否展示标签页
    sidebarLogo: boolean;                                           // 是否展示侧边栏图标
    breadCrumb: boolean;                                            // 是否展示面包屑
    layout: LayoutEnum;                                             // 布局
    theme: ThemeEnum;                                               // 主题
    themeColor: ThemeColor;                                         // 主题颜色
    animateCss: string;                                             // 动画样式
    watermarkEnabled: boolean;                                      // 是否开启水印
}

export interface AppState {
    size: SizeEnum;                                                 // 大小
    device: DeviceEnum;                                             // 设备
    sidebarStatus: SidebarStatusEnum;                               // 是否打开菜单栏
    tourStatus: boolean;                                            // 是否开启引导页
}

interface ThemeColor {
    info: string,
    primary: string,
    success: string,
    warning: string,
    danger: string,
}

export const useSystemStore = defineStore(StoreTypeEnum.SYSTEM, {
    state: (): {
        app: AppState,
        settings: AppSettings
    } => {
        return {
            app: {...defaultSettings.app},
            // 解决浅拷贝对象指向同一地址问题
            settings: _.cloneDeep(defaultSettings.settings)
        }
    },
    persist: true,
    // 定义计算属性
    getters: {
        fontStyle(state): string {
            let fontStyle = state.app.size.toString();
            switch (fontStyle) {
                case 'large':
                    break;
                case 'default':
                    fontStyle = 'base';
                    break;
                case 'small':
                    break;
                default:
                    // 走到这,表示值被破坏，需要重置
                    this.app.size = SizeEnum.DEFAULT
                    fontStyle = 'base'
            }
            return `var(--el-font-size-${fontStyle})`
        }
    },
    // 定义操作
    actions: {
        /**
         * 设置主题
         * @param theme 主题类型
         */
        setTheme(theme: ThemeEnum) {
            if (theme === ThemeEnum.LIGHT) {
                // light 主题
                this.settings.theme = ThemeEnum.LIGHT;
                document.documentElement.classList.remove("dark");
            } else if (theme === ThemeEnum.DARK) {
                // dark 主题
                this.settings.theme = ThemeEnum.DARK;
                document.documentElement.classList.add("dark");
            }
        },
        /**
         * 设置 设置框 是否显示
         * @param flag 标志
         */
        setSettingsVisible(flag: boolean) {
            this.settings.settingsVisible = flag;
        },
        /**
         * 设置 layout
         * @param layout layout 类型
         */
        setLayOut(layout: LayoutEnum) {
            this.settings.layout = layout;
        },
        /**
         * 切换 Sidebar 状态
         * @param status 状态类型 (OPENED , CLOSED)
         */
        setSidebarStatus(status: SidebarStatusEnum) {
            this.app.sidebarStatus = status;
        },
        /**
         * 设置主题颜色
         * @param type 类型
         * @param color 颜色
         */
        setThemeColor(type: ElementPlusModifyEnum, color: string) {
            // 修改 store 中主题颜色的值
            this.settings.themeColor[type] = color

            // 更新 Element Plus 主题
            updateElementPlusTheme(type, color);
        },
        /**
         * 修改设备类型 (1200 大屏 , 768-1199 中屏 , <768 小屏)
         * @param deviceWidth 设备宽度
         */
        setDeviceType(deviceWidth: number) {
            if (deviceWidth >= 1200) {
                // 大屏默认开启 sidebar
                this.setSidebarStatus(SidebarStatusEnum.OPENED)
                this.app.device = DeviceEnum.DESKTOP
            } else if (deviceWidth >= 992) {
                this.app.device = DeviceEnum.TABLET
                // 中屏非顶部模式默认关闭 sidebar
                this.setSidebarStatus(SidebarStatusEnum.CLOSED)
            } else {
                // 小屏默认关闭 sidebar
                this.setSidebarStatus(SidebarStatusEnum.CLOSED)
                this.app.device = DeviceEnum.MOBILE
            }
        },
        /**
         * 设置漫游导航状态
         * @param tourStatus 漫游导航状态
         */
        setTourStatus(tourStatus: boolean) {
            this.app.tourStatus = tourStatus;
        }
    },
})
