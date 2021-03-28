<template>
  <card>
    <editLine
        slot="title"
        v-model="title"
        :editModeByDefault="empty"
        @remove="$emit('remove',$event)"
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
        <tagsAdder v-model="tags"/>
        <skillAddLine :blocked="empty"/>
      </div>
    </template>
  </card>


</template>

<script>
import card           from "../card/card";
import skill          from "../skill/skill";
import skillAddLine   from "../skillAddLine/skillAddLine";
import editLine       from "../editLine/editLine";
import tagsAdder       from "../tagsAdder/tagsAdder";


export default {
  components:{
    card,
    editLine,
    skill,
    skillAddLine,
    tagsAdder
  },
  props: {
    empty: Boolean,
    title:{
      type: String,
    },
    skills:{
      type: Array,
      default: () => []
    }
  },
}
</script>


<style lang="postcss" src="./category.pcss" scoped>
</style>

