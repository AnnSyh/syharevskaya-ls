<template>
  <div>
    <div class="skill-component" v-if="currentSkill.editmode === false">
      <div class="inputs">
        <div class="title">{{ skill.title }}</div>
        <div class="percent">{{ skill.percent }}</div>
      </div>
      <div class="btns">
        <icon symbol="pencil" class="btn"  @click="currentSkill.editmode = true" grayscale />
        <icon symbol="trash" class="btn"
              @click="$emit('remove', currentSkill)"
              grayscale/>
      </div>
    </div>

    <div class="skill-component" v-else>
      <div class="inputs">
        <div class="title">
          <app-input no-side-paddings v-model="currentSkill.title"/>
        </div>
        <div class="percent">
          <app-input v-model="currentSkill.percent"/>
        </div>
      </div>
      <div class="btns">
        <icon symbol="tick" class="btn" @click="$emit('approve', currentSkill)"/>
        <icon symbol="cross" class="btn"@click="currentSkill.editmode = false"/>
      </div>

    </div>

  </div>
</template>

<script>
import input from "../input/input"
import icon from "../icon/icon"


export default {
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true
    },

  },
  data() {
    return {
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editmode: false,
      },
    };
  },
  components: {
    icon,
    appInput: input
  }
}
</script>


<style lang="postcss" src="./skill.pcss" scoped>
</style>

