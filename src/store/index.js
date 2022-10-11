import { createStore } from 'vuex'
import request from '../utils/request'
const layout_module = {
    state: {
        tagsList: [],
        collapse: false
    },
    mutations: {
        delTagsItem(state, data) {
            state
                .tagsList
                .splice(data.index, 1);
        },
        setTagsItem(state, data) {
            state
                .tagsList
                .push(data)
        },
        clearTags(state) {
            state.tagsList = []
        },
        closeTagsOther(state, data) {
            state.tagsList = data;
        },
        closeCurrentTag(state, data) {
            for (let i = 0, len = state.tagsList.length; i < len; i++) {
                const item = state.tagsList[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data
                            .$router
                            .push(state.tagsList[i + 1].path);
                    } else if (i > 0) {
                        data
                            .$router
                            .push(state.tagsList[i - 1].path);
                    } else {
                        data
                            .$router
                            .push("/");
                    }
                    state
                        .tagsList
                        .splice(i, 1);
                    break;
                }
            }
        },
        // 侧边栏折叠
        handleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {}
};
const main = {
    state: {
        userInfo: {
            id: 0,
            userName: 'admin'
        },
        useNormalRouteView: true,
        relocalMenu: false, //是否重新定位左边菜单
        permission: []
    },
    // 获取
    getters: {
        getUserInfo: state => {
            return state.userInfo;
        },
        getIsLogin: state => {
            return true;
            if (state.userInfo && state.userInfo.id > 0) {
                return true;
            }
            return false;
        },
        getUseNormalRouteView: state => {
            return state.useNormalRouteView;
        },
        getRelocalMenu: state => {
            return state.relocalMenu;
        }
    },
    //设置
    mutations: {
        setUserInfo(state, model) {
            state.userInfo = model;
        },
        setNormalRouteView(state, value) {
            state.useNormalRouteView = value;
        },
        setRelocalMenu(state, value) {
            state.relocalMenu = value;
        },
        setPermission(state, permission) {
            state.permission = permission;
        }
    },
    actions: {
        dealPermission({ commit }, token) {
            commit('setUserInfo', {});
            commit('setPermission', []);
            return new Promise((resolve, reject) => {
                let res = {
                    id: 1,
                    name: 'admin',
                    resources: [],
                }
                let ms_username = sessionStorage.getItem('ms_username');
                request.get(`/login/v2/permission/${ms_username}`).then(
                        res => {
                            // console.log(res);
                            if (res.code !== 200) {
                                console.log(111);
                                reject(false);
                                return;
                            }
                            let permission = [];
                            let tabslist = []
                            dealPermission(res.data);

                            function dealPermission(trees) {
                                tabslist = Object.keys(trees)
                                permission = permission.concat(tabslist)
                                tabslist.forEach(item => {
                                    permission = permission.concat(trees[item])
                                })
                            }
                            console.log(permission);
                            commit('setPermission', permission);
                            sessionStorage.setItem('ms_permission', JSON.stringify(permission));
                        }
                    )
                    // let userInfo = {
                    //     id: res.id,
                    //     userName: res.name
                    // };
                    // commit('setUserInfo', userInfo);
                    // let permission = [];
                    // dealPermission(res.resources);

                // function dealPermission(trees) {
                //     trees.forEach(v => {
                //         permission.push(v)
                //         if (v.children && v.children.length > 0) {
                //             dealPermission(v.children)
                //         }
                //     })
                // }
                // commit('setPermission', permission);
                resolve(true);
            })
        },
    }
};


export default createStore({
    modules: {
        layout_module,
        main
    }
})