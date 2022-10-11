import Store from '../store/index.js'
export default {
    mounted: async(el, { value }) => {
        if (typeof value === 'undefined') {
            console.warn(`使用权限指令，需要绑定值. 示例：v-permission="'collect:management'"`);
            return;
        }
        // let permissions = Store.state.main.permission;
        let permissions = JSON.parse(sessionStorage.getItem('ms_permission'))
        let hasPermission = false;
        for (let v in permissions) {
            // console.log(`permissions[v]:${permissions[v]}--------value:${value}`);
            if (permissions[v].includes(value)) {
                hasPermission = true;
                break;
            }
        }
        // permissions.forEach(v => {
        //     if (v === value) {
        //         hasPermission = true;
        //     }
        // })
        if (hasPermission) {
            el.className = el.className.replace("_permission-hide", " ");
        } else {
            el.className += " " + "_permission-hide";
        }
    }
}