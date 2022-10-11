import request from '../utils/request';
// import Fingerprint2 from 'fingerprintjs2-modular'

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
// export function requestIdleCallback2() {
//     return new Promise((resolve) => {
//         Fingerprint2.get(function(components) {
//             const values = components.map(component => component.value) // 配置的值的数组
//             const murmur = Fingerprint2.x64hash128(values.join(''), 31) // 生成浏览器指纹
//                 // console.log('写浏览器,requestIdleCallback', murmur)
//                 // localStorage.setItem('browser', JSON.stringify(murmur.toString()))
//             resolve({ flag: true, murmur })
//         })
//     })
// }

export const signin = query => {
    return request({
        url: '/login/v2/login',
        method: 'post',
        data: query
    });
};
export const weightapi = {
    getallrecord: () => {
        return request({
            url: '/api/weight/record',
            method: 'get'
                // params: query
        })
    },
    record_page: query => {
        return request({
            url: '/api/weight/record_page',
            method: 'post',
            data: query
        })
    },
    // 称重记录查询
    search_data_weigh: query => {
        return request({
            url: '/api/weight/weigh_multi_condition_search',
            method: 'post',
            data: query
        })
    },
    // 理算记录查询
    search_data_cal: query => {
        return request({
            url: '/api/weight/cal_multi_condition_search',
            method: 'post',
            data: query
        })
    },
    // 懒加载全部数据
    weigh_record_page: query => {
        return request({
            url: '/api/weight/weigh_record_page',
            method: 'post',
            data: query
        })
    }
}
export const baseapi = {
        getall_parameter: () => {
            return request({
                url: '/api/weight/all_parameter',
                method: 'get'
                    // params: query
            })
        },
        weight_parameter: (path, method, data) => {
            return request({
                url: `/api/weight/${path}`,
                method,
                data
            })
        },
        getall_parameter: () => {
            return request({
                url: '/api/weight/all_parameter',
                method: 'get'
                    // params: query
            })
        },
        getall_parameter: () => {
            return request({
                url: '/api/weight/all_parameter',
                method: 'get'
                    // params: query
            })
        }
    }
    // export const fetchData = query => {
    //     return request({
    //         url: './table.json',
    //         method: 'get',
    //         params: query
    //     });
    // };