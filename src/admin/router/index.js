import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import About    from '../pages/about'
import Login    from '../pages/login'
import Navies  from '../pages/navies'
import Works    from '../pages/works'
import Reviews    from '../pages/reviews'

import headline from "../components/headline/headline";

const routes = [
    { path: '/',
        components: { About
            // default: About,
            // header: headline
        },
        meta:{name:"Обо мне!"}
     },
    { path: '/login',
        components: { Login
            // default: Login,
            // header: headline
        },
    },
    { path: '/navies',  component: Navies,  meta:{name:"Навыки!"}  },
    { path: '/reviews', component: Reviews, meta:{name:"Отзывы!"}  },
    { path: '/works',   component: Works,   meta:{name:"Работы!"}  },

]

 export const router = new VueRouter({
    routes // сокращённая запись для `routes: routes`
})
