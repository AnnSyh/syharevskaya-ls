import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import siteHeader from "../components/siteHeader";
import navigation from "../components/navigation/navigation";

import About    from '../pages/about/about'
import Login    from '../pages/login/login'
import Works    from '../pages/works/works'
import Reviews  from '../pages/review/reviews'

import store    from "../store";
import axios    from "axios";
import config from "../../../env.paths.json" // для  baseURL: config.BASE_URL

const routes = [
    { path: '/',
        components: {
            default: About,
            header: siteHeader,
            navigation: navigation
        },
        meta:{name:"Обо мне!"}
     },
    { path: '/login',
        components: {
            default: Login,
            meta:{
                public:true
            }
        },
    },
    { path: '/reviews',
        components: {
            default: Reviews,
            header: siteHeader,
            navigation: navigation
        },
        meta:{name:"Отзывы!"}
    },
    { path: '/works',
        components: {
            default: Works,
            header: siteHeader,
            navigation: navigation
        },
        meta:{name:"Работы!"}
    },

]

export const router = new VueRouter({ routes })

const guard = axios.create({
    baseURL: config.BASE_URL
});

router.beforeEach(async (to,from,next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLoggedIn = store.getters["auth/userIsLoggedIn"];

    console.log('isPublicRoute = ',isPublicRoute);
    console.log('isUserLoggedIn = ',isUserLoggedIn);

    if (isPublicRoute === false && isUserLoggedIn === false) {
        console.log('!!!!- if')
        const token = localStorage.getItem("token");
        guard.defaults.headers["Authorization"] = `Bearer ${token}`;

        try {
            const response = await guard.get("/user");
            store.dispatch("user/login", await response.data.user);
            console.log('response.data.user = ',response.data.user)

            next();
        } catch (error) {
            console.log('catch');
            await router.replace("/login");
            localStorage.removeItem("token");
        }
    } else {
        console.log('next');
        next();
    }
});
