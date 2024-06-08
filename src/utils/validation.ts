export function validateEmail(email: string): boolean {
    // 正则表达式：电子邮件地址
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export function validatePhoneNumber(phoneNumber: string): boolean {
    // 正则表达式：手机号码，以1开头，后面跟10位数字
    const phoneRegex = /^1\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

export function validateURL(url: string): boolean {
    // 正则表达式：URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}

export function validateIDCard(idCard: string): boolean {
    // 正则表达式：身份证号码（简单校验，18位数字或17位数字加一位校验码）
    const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return idCardRegex.test(idCard);
}

export function validateBankCard(bankCardNumber: string): boolean {
    // 正则表达式：银行卡号（简单校验，16到19位数字）
    const bankCardRegex = /^\d{16,19}$/;
    return bankCardRegex.test(bankCardNumber);
}

export function validateDate(date: string): boolean {
    // 正则表达式：日期（YYYY-MM-DD 格式）
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
}

export function validateIPv4(ipv4: string): boolean {
    // 正则表达式：IPv4 地址
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ipv4);
}

export function validateCustomRegex(value: string, regex: RegExp): boolean {
    // 自定义正则表达式校验
    return regex.test(value);
}
