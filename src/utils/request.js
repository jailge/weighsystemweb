import axios from 'axios'
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
const request = axios.create({
        timeout: 5000,

    })
    // request 拦截器 ./Adminiastrator
    // 可以自请求发送前对请求做一些处理
    // 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    // console.log(nprogress)
    nprogress.start()
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    config.headers['Authorization'] = 'Bearer' + ' ' + sessionStorage.getItem('ms_token')
        // config.headers['Content-Type'] = 'application/json;charset=utf-8';
        // config.headers['X-Ca-Key'] = '22491667';
        // config.headers['X-Ca-Signature-Headers'] = 'x-ca-key';
        // config.headers['X-Ca-Signature'] = 'niZT4wOmnzRjbYSP6sRjuvvZjFvZUxi3Yjd6w/VcqVw=';
        // config.headers['token'] = user.token;  // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }

        nprogress.done()
        return res;
    },
    error => {
        if (error.response.status == 403) {
            return error.response.data;
        }
        console.log(error.response.data.message) // for debug
        return Promise.reject(error.response.data)
    }
)


export default request