type RGB = {
    r: number;
    g: number;
    b: number;
};

const rgbWhite = {
    r: 255,
    g: 255,
    b: 255,
};
const rgbBlack = {
    r: 0,
    g: 0,
    b: 0,
};

/**
 * 将颜色组件转换为十六进制字符串。
 * 
 * 颜色组件是一个0到255之间的整数，代表RGB颜色模型中的一个分量。
 * 该函数的目的是将这个整数转换为两位的十六进制字符串，用于表示颜色。
 * 如果组件值是一位数字，则在前面补0，以确保结果总是两位的十六进制字符串。
 * 
 * @param c 颜色组件的整数值，范围是0到255。
 * @returns 表示颜色组件的两位十六进制字符串。
 */
function componentToHex(c: number): string {
    // 将组件值转换为十六进制字符串
    const hex = Math.round(c).toString(16);
    // 如果结果是一位数字，则在前面补0
    return hex.length === 1 ? '0' + hex : hex;
}

/**
 * 将RGB颜色值转换为十六进制颜色代码。
 * @param rgb - 一个包含红色（r）、绿色（g）和蓝色（b）分量的RGB对象。
 * @returns 返回一个表示RGB颜色的十六进制字符串，例如"#ff0000"。
 */
function rgbToHex(rgb: RGB): string {
    // 使用componentToHex函数将RGB的每个分量转换为两位十六进制字符串，并通过拼接得到最终的十六进制颜色代码。
    return `#${componentToHex(rgb.r)}${componentToHex(rgb.g)}${componentToHex(rgb.b)}`;
}

/**
 * 按照权重混合两种颜色。
 * 
 * 该函数通过线性插值方法来混合两种RGB颜色。权重参数控制混合的程度，
 * 权重越接近0，混合结果越接近第一种颜色；权重越接近1，混合结果越接近第二种颜色。
 * 
 * @param color 第一种颜色，使用RGB格式表示。
 * @param mixColor 第二种颜色，使用RGB格式表示。
 * @param weight 权重，用于控制颜色混合的比例，取值范围在0到1之间。
 * @returns 返回一个新的RGB对象，表示两种颜色按指定权重混合后的结果。
 */
function mix(color: RGB, mixColor: RGB, weight: number): RGB {
    return {
        r: color.r * (1 - weight) + mixColor.r * weight,
        g: color.g * (1 - weight) + mixColor.g * weight,
        b: color.b * (1 - weight) + mixColor.b * weight,
    };
}

/**
 * 将十六进制颜色值转换为RGB对象。
 * 
 * @param hex 十六进制颜色值，可以是3位或6位格式，例如#FF0或#FF0000。
 * @returns 返回一个包含RGB值的对象。
 * @throws 如果输入的十六进制值不合法，则抛出错误。
 */
function hexToRGB(hex: string): RGB {
    if (!/^[0-9A-Fa-f]{3}$|[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error("请传入合法的16进制颜色值，eg: #FF0000");
    }
    // 移除可能存在的 # 符号
    hex = hex.replace('#', '');
    // 确保十六进制代码是有效的

    // 返回 RGB 对象
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
    };
}
/**
 * 更新 element-plus 框架的颜色主题。
 * 
 * 该函数通过修改文档根元素的样式属性，来实现对 element-plus 框架主题颜色的定制。
 * 它根据提供的基础颜色，生成一系列颜色值，并将其应用于预定义的 CSS 类名上。
 * 这些类名遵循 element-plus 的主题颜色命名规范，可用于组件的背景色、边框色等。
 * 
 * @param type 主题类型名称，用于生成特定类型的主题颜色。
 * @param baseColor 基础颜色值，用于生成主题颜色的起点。
 */
function updateElementPlusTheme(type: string, baseColor: string): void {
    // 针对 element-ui 进行修改
    const colorArray: Record<string, string>[] = [
        {className: `--el-color-${type}`, color: rgbToHex(mix(hexToRGB(baseColor), rgbBlack, 0))},
        {className: `--el-color-${type}-dark-2`, color: rgbToHex(mix(hexToRGB(baseColor), rgbBlack, 0.2))},
        {className: `--el-color-${type}-light-3`, color: rgbToHex(mix(hexToRGB(baseColor), rgbWhite, 0.3))},
        {className: `--el-color-${type}-light-5`, color: rgbToHex(mix(hexToRGB(baseColor), rgbWhite, 0.5))},
        {className: `--el-color-${type}-light-7`, color: rgbToHex(mix(hexToRGB(baseColor), rgbWhite, 0.7))},
        {className: `--el-color-${type}-light-8`, color: rgbToHex(mix(hexToRGB(baseColor), rgbWhite, 0.78))},
        {className: `--el-color-${type}-light-9`, color: rgbToHex(mix(hexToRGB(baseColor), rgbWhite, 0.85))},
    ]

    colorArray.forEach(item => {
        document.documentElement.style.setProperty(item.className, item.color);
    })
}


export {
    RGB,
    hexToRGB,
    rgbToHex,
    updateElementPlusTheme
}
