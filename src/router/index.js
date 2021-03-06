import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: "/articles/:id",
            name: "Articles",
            component: () => import("../components/page/Articles.vue"),
            meta: { title: '文章详情' }
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: {
                        title: '系统首页',
                        requiresAuth: true
                    }
                },
                // {
                //     path: '/icon',
                //     component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                //     meta: { title: '自定义图标' }
                // },
                // {
                //     path: '/table',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                //     meta: { title: '基础表格' }
                // },
                // {
                //     path: '/tabs',
                //     component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                //     meta: { title: 'tab选项卡' }
                // },
                // {
                //     path: '/form',
                //     component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                //     meta: { title: '基本表单' }
                // },
                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                //     meta: { title: '富文本编辑器' }
                // },
                // {
                //     // markdown组件
                //     path: '/markdown',
                //     component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                //     meta: { title: 'markdown编辑器' }
                // },
                // {
                //     // 图片上传组件
                //     path: '/upload',
                //     component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                //     meta: { title: '文件上传' }
                // },
                // {
                //     // vue-schart组件
                //     path: '/charts',
                //     component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                //     meta: { title: 'schart图表' }
                // },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                //     meta: { title: '拖拽列表' }
                // },
                // {
                //     // 拖拽Dialog组件
                //     path: '/dialog',
                //     component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                //     meta: { title: '拖拽弹框' }
                // },
                // {
                //     // 国际化组件
                //     path: '/i18n',
                //     component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                //     meta: { title: '国际化' }
                // },
                // {
                //     // 权限页面
                //     path: '/permission',
                //     component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                //     meta: { title: '权限测试', permission: true }
                // },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                // {
                //     path: '/donate',
                //     component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                //     meta: { title: '支持作者' }
                // }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/LoginPage.vue'),
            meta: { title: '登录' }
        },
        {
            path: "/display",
            name: "Display",
            component: () =>
                import("@/components/page/Display.vue"),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

// 注册全局钩子用来拦截导航以及进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    const token = window.sessionStorage.getItem('token');
    if (to.meta.requiresAuth) {
        if(token) {
            if(Object.keys(from.query).length === 0){//判断路由来源是否有query，处理不是目的跳转的情况
                next()
            }
            else {
                let redirect = from.query.redirect
                if(to.path === redirect){
                    next()
                }
                else{
                    next({path:redirect})
                }
            }
        }
        else{
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    }
    else {
        next()
    }
    //     if(!role && to.path !== '/login') {
    //         next('/login');
    //         next();
    //     }
    //     else {
    //         if (to.meta.permission) {
    //             // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //             role === 'admin' ? next() : next('/403');
    //         } else {
    //             // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    //             if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //                 Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //                     confirmButtonText: '确定'
    //                 });
    //             } else {
    //                 next();
    //             }
    //         }
    //     }
    // }
});

export default router;
