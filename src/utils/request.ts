import axios, { AxiosResponse } from 'axios';
import { globalData } from './config';

// 创建axios实例
const service = axios.create({

  baseURL: globalData.domainUrl,
  // 设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': true,
  //   'Content-Type': 'application/json;charset=utf-8',
  // },
  // withCredentials: true // 允许携带cookie
  timeout: 5000,
});
const serviceUpload = axios.create({
  baseURL: globalData.domainUrl,
  timeout: 5000,
});

// service.defaults.baseURL =  globalData.domainUrl;

const codeMessage: any = {
  200: 'success',
};



// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // Add X-Token header to every request, you can add other custom headers here

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// 响应拦截器

async function filter<T>(response: AxiosResponse<T>): Promise<T> {
  const res = response.data as any;

  if (response && response.status >= 200 && response.status < 300) {
 
    return response.data;
  
  }
  // 请求的状态错误
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(errortext);
  error.name = response.status.toString();
  return Promise.reject(error);
}



export default {
  async post<T = any>(url: string, data?: any) {
    try { //  post
      console.log(url + ' post request ', data);
      const response = await service.request<T>({
        method: 'post',
        url,
        data,
        headers:{'Content-Type':'application/json;charset=utf-8'}
      });

      console.log(url + ' post response', response);
      
      
      const final = await filter<T>(response);
      return final;

    } catch (error) {
      console.log(url + ' post response error.message', error.message);
      // 错误返回空对象
      return {} as T;
    }
  },
  async upload<T = any>(url: string, data?: any) {
    try { 
      const response = await serviceUpload.request<T>({
        method: 'post',
        url,
        data,
        headers:{'Content-Type':'application/json;charset=utf-8'}
      });
      const final = await filter<T>(response);
      return final;

    } catch (error) {
      console.log(url + ' post response error.message', error.message);
      // 错误返回空对象
      return {} as T;
    }
  },
  async get<T = any>(url: string, params?: any) { // get
    try {
      console.log(url + ' get request ', params);
      const response = await service.request<T>({
        method: 'get',
        url,
        params,
      });
      console.log(url + ' get response', response);
      const final = await filter<T>(response);
      return final;
    } catch (error) {
      console.log(url + ' get response error.message', error.message);
      // 错误返回空对象
      return {} as T;
    }
  },
};

