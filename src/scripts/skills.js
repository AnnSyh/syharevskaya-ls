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
new Vue({
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
                        },
                        {
                            title: "css",
                            percent: 89
                        },
                        {
                            title: "javascript",
                            percent: 35
                        },
                        {
                            title: "Vue",
                            percent: 75
                        },
                    ],
                },
                {
                    category: "Workflow",
                    skills: [
                        {
                            title: "Git",
                            percent: 99
                        },
                        {
                            title: "Terminal",
                            percent: 34
                        },
                        {
                            title: "Gulp",
                            percent: 87
                        },
                        {
                            title: "Webpack",
                            percent: 45
                        }

                    ],
                },
            ],
        }
    }

})

