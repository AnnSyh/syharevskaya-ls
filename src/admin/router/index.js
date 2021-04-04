import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import siteHeader from "../components/siteHeader";
import navigation from "../components/navigation/navigation";

import About    from '../pages/about/about'
import Login    from '../pages/login/login'
import Navies  from '../pages/navies'
import Works    from '../pages/works'
import Reviews    from '../pages/reviews'

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
            default: Login
        },
    },
    {  path: '/navies',
        components: {
            default: Navies,
            header: siteHeader,
            navigation: navigation
        },
        meta:{name:"Навыки!"}

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

 export const router = new VueRouter({
    routes // сокращённая запись для `routes: routes`
})
