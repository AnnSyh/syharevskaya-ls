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
          <app-input
              no-side-paddings
              v-model="currentSkill.title"
              :error-message="validation.firstError('currentSkill.title')"
          />
        </div>
        <div class="percent">
          <app-input
              v-model="currentSkill.percent"
              :error-message="validation.firstError('currentSkill.percent')"
          />
        </div>
      </div>
      <div class="btns">
        <icon symbol="tick" class="btn" @click="approveHandler"/>
        <icon symbol="cross" class="btn"@click="currentSkill.editmode = false"/>
      </div>

    </div>

  </div>
</template>

<script>
import input from "../input/input"
import icon from "../icon/icon"
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';

export default {
  mixins: [ValidatorMixin],
  validators: {
    "currentSkill.title": value => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "currentSkill.percent": value => {
      return Validator.value(value).required("Введите имя пользователя");
    }
  },
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
  },
  methods:{
    async approveHandler(){
      console.log("here");
      if ((await this.$validate()) === false) return;

      // $emit('approve',currentSkill)  ????
    }
  }
}
</script>


<style lang="postcss" src="./skill.pcss" scoped>
</style>

