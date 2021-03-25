<template>
  <card>
    <editLine
        slot="title"
        v-model="title"
        editModeByDefault
    />
    <template slot="content">
      <ul class="skills">
        <li class="item"  v-for="skill in skills" :key="skill.id">
          <skill :skill="skill"/>
        </li>
      </ul>
      <div class="bottom-line">
        <skillAddLine/>
      </div>
    </template>
  </card>


</template>

<script>
import card      from "../card/card";
import skill     from "../skill/skill";
import skillAddLine     from "../skillAddLine/skillAddLine";
import editLine  from "../editLine/editLine";


const skills = [
  {id: 0, title: "HTML", percent: 80},
  {id: 1, title: "Css", percent: 80},
  {id: 2, title: "JavaScript", percent: 80},
]
export default {
  components:{card,editLine,skill,skillAddLine},
  data(){
    return {
        title:"",
        skills
    }
  }
}
</script>


<style lang="postcss" src="./category.pcss" scoped>
</style>

