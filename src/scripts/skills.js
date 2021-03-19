import Vue from "vue";

new Vue({
    el: "#skills-component",
    template: '#skills-list',

    components:{
        skills,
    },

    data(){
        return{
            skills:[],
        };
    },

    created(){
        this.skills = require("../data/skills.json");
    }
})
