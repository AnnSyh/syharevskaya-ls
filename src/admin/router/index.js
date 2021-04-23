import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store    from "../store";
import axios    from "axios";
import config from "../../../env.paths.json" // для  baseURL: config.BASE_URL

axios.defaults.baseURL = config.BASE_URL;

const routes = [
    {   path: '/',
        components: {
            default: () => import("../pages/about/about"),
            header: () => import("../components/siteHeader"),
            navigation: () => import("../components/navigation/navigation")
        },
        meta:{name:"Обо мне!"}
     },
    { path: '/login',
        components: {
            default: () => import("../pages/login/login"),
        },
        meta: {public: true}
    },
    { path: '/reviews',
        components: {
            default: () => import("../pages/review/reviews"),
            header: () => import("../components/siteHeader"),
            navigation: () => import("../components/navigation/navigation")
        },
        meta:{name:"Отзывы!"}
    },
    { path: '/works',
        components: {
            default: () => import("../pages/works/works"),
            header: () => import("../components/siteHeader"),
            navigation: () => import("../components/navigation/navigation")
        },
        meta:{name:"Работы!"}
    },

];

const guard = axios.create({    baseURL: config.BASE_URL});
export const router = new VueRouter({ routes });

// const router = new VueRouter({ routes });
// export default router;

/* */
router.beforeEach(async (to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLoggedIn = store.getters["user/userIsLoggedIn"];
    // console.log('isPublicRoute = ' ,isPublicRoute);
    // console.log('isUserLoggedIn = ' ,isUserLoggedIn);

    // if (isPublicRoute === false && isUserLoggedIn === false) {
    //     const token = localStorage.getItem("token");
    //
    //     guard.defaults.headers["Authorization"] = `Bearer ${token}`;
    //
    //     try {
    //         const response = await guard.get("/user");
    //         commit("user/SET_USER", response.data.user);
    //         next();
    //     } catch (error) {
    //         router.replace("/login");
    //         localStorage.removeItem("token");
    //     }
    // } else if (isPublicRoute && isUserLoggedIn) {
    //     next({ path: from.path });
    // } else {
    //     next();
    // }
    if (!isUserLoggedIn) {
        const token = localStorage.getItem('token');

        if (!token && isPublicRoute) {
            next();
        } else if (token) {
            guard.defaults.headers['Authorization'] = `Bearer ${ token }`;
            try {
                const response = await guard.get('/user');
                store.commit("user/SET_USER", response.data.user);

                (from.path === "/login") ? next() : next({ path: from.path });
            } catch (e) {
                localStorage.removeItem('token');
                next('/login');
            }
        } else {
            next('/login');
        }
    } else if (isPublicRoute && isUserLoggedIn) {
        next(   { path: from.path });
    } else {
        next();
    }
});


