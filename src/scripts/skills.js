import Vue from "vue"

const skillsItem = {
    props:["skill"],
    template:"#skills-item",
    computed:{
        getPercent(){
            const r=3.14*2*40
            return r-r/100*this.skill.percent
        }
    }
}

const skillsRow = {
    props:["category"],
    template:"#skills-row",
    components:{
        skillsItem:skillsItem
    }
}

new Vue({
    el: '#skills-component',
    template:"#skills-list",
    components:{
        skillsRow:skillsRow
    },
    data(){
        return{
            skills: []
        }
    },
    created() {
        this.skills = require("../data/skills.json");
    }
})

