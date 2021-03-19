import Vue from "vue"

const skill= {
    template: "#skill",
    props: ["skill"],
    computed:{
        getPercent(){
            const r=3.14*2*40
            return r-r/100*this.skill.percent
        }
    }
}
const skillsList= {
    template: "#skills-list",
    props: ["categories"],
    components:{
        skill
    },

}
var app = new Vue({
    el: '#skills-component',
    components:{
        skillsList
    },
    data() {
        return {
            categories: [
                {
                    category: "Frontend",
                    skills: [
                        {
                            title: "HTML",
                            percent: 25
                        }
                    ],
                },
            ],
        }
    }

})

// Vue.component('skills-list', {
//     template: '#skills-list',
//
//     components:{
//         // skills,
//     },
//
//     data(){
//         return{
//             skills:[],
//         };
//     },
//     // проверитьчтокомпонент былвмонтирован
//     mounted() {
//         console.log('компонент #skills-list вмонтирован')
//     },
//
//     created(){
//         this.skills = require("../data/skills.json");
//     }
// })
