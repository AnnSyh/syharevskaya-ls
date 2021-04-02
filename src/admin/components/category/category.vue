<template>
  <card>
    <editLine
        slot="title"
        v-model="title"
        :editModeByDefault="empty"
        @remove="$emit('remove',$event)"
        @approve="$emit('approve', $event)"
    />
    <template slot="content">
      <ul class="skills" v-if="empty === false">
        <li class="item"  v-for="skill in skills" :key="skill.id">
          <skill
              :skill="skill"
              @remove="$emit('remove-skill', $event)"
              @approve="$emit('edit-skill', $event)"
          />

        </li>
      </ul>
      <div class="bottom-line">
        <skillAddLine
            @approve="$emit('create-skill', $event)"
            :blocked="empty"/>
      </div>
    </template>
  </card>


</template>

<script>
import card           from "../card/card";
import skill          from "../skill/skill";
import skillAddLine   from "../skillAddLine/skillAddLine";
import editLine       from "../editLine/editLine";
import tagsAdder      from "../tagsAdder/tagsAdder";
import tag            from "../tag/tag";


export default {
  components:{
    card,
    editLine,
    skill,
    skillAddLine,
    tagsAdder,
    tag
  },
  props: {
    empty: Boolean,
    title:{
      type: String,
      default: "",
    },
    skills:{
      type: Array,
      default: () => []
    },
    tags:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      categoryTitle: this.title,
    };
  },
  // model:{
  //   prop:"tags",
  //   event:"change"
  // },
}
</script>


<style lang="postcss" src="./category.pcss" scoped>
</style>

