import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import loadmore from './plugins/el-table-loadmore/index'
import './assets/css/icon.css'
const app = createApp(App)
import PermissionDirective from './components/permission.directive.js';
app.directive('permission', PermissionDirective)
installElementPlus(app)
app
    .use(store)
    .use(router)
    .use(loadmore)
    .mount('#app')


// 调用,一般是在main.js或者vuex里面调用
// Fingerprint2.get(function(components) {
//     const values = components.map(function(component, index) {
//             if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
//                 return component.value.replace(/\bNetType\/\w+\b/, '')
//             }
//             return component.value
//         })
//         // 生成最终id murmur 
//     console.log(values) //使用的浏览器信息
//     const murmur = Fingerprint2.x64hash128(values.join(''), 31)
//     console.log(murmur) //生成的标识码
// })