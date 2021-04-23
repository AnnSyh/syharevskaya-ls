import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json"

axios.defaults.baseURL = config.BASE_URL;

const skillsItem = {
    props:["skill"],
    template:"#skills-item",
    methods:{
        drawPercentegeCircle(){
            const  circle=this.$refs["colored-circle"];
            const dashArray= parseInt(
                getComputedStyle(circle).getPropertyValue("stroke-dasharray")
            );
            const percent = (dashArray/100)*(100-this.skill.percent);
            circle.style.strokeDashoffset = percent;
        }
    },
    mounted() {
        this.drawPercentegeCircle();
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
    // created() {
    //     this.skills = require("../data/skills.json");
    // }
  async created() {

        // const user = await this.$axios.get('/user');//получаю user
        // console.log('user = ', user);
        // const user_id = user.data.user.id;//получаю user id
        // console.log('user_id = ', user_id);

        // const {data} = await axios.get(`/categories/${user_id}`);
      const {data} = await axios.get(`/categories/453`);
        this.skills = data;
    }
})

