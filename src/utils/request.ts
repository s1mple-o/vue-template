import axios, {InternalAxiosRequestConfig, AxiosResponse} from "axios";
/**
 * 使用方式 :
 *
 * import request from "@/utils/request";
 *
 * export function functionName(data: ?) : AxiosPromise<?> {
 *   return request({
 *     url: "",
 *     method: "",
 *     data: data
 *   });
 * }
 */
// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 50000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        console.log(config);
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
        console.log(response)
        return response;
    },
    (error: any) => {
        console.log(error)
        return Promise.reject(error.message);
    }
);

// 导出 axios 实例
export default service;
