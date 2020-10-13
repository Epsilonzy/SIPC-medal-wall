import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [{
            path: '/medal/changeMedal',
            name: "changeMedal",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../pages/medal/changeMedal.vue')
        },
        {
            path: '/medal/addMedal',
            name: "addMedal",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../pages/medal/addMedal.vue')
        },
        {
            path: '/user/',
            name: "user",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../pages/user/index.vue')
        },
        {
            path: '/statistics',
            name: "statistics",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../pages/statistics/index.vue')
        },
    ],
    component: () =>
        import ( /* webpackChunkName: "about" */ '../pages/index.vue')
}, {
    path: '/login',
    name: 'Login',
    component: () =>
        import ( /* webpackChunkName: "about" */ '../pages/login/index.vue')
}]

const router = new VueRouter({
    routes
})

export default router