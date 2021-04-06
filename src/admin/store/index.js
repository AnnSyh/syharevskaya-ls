import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import categories from "./modules/categories";
import skills from "./modules/skills";
import tooltips from "./modules/tooltips";
import auth from "./modules/auth";


export default new Vuex.Store({
    modules: {
        auth,
        categories,
        skills,
        tooltips
    }
});
