<template>
    <div
      class="skillAddLine-component"
      :class="['skill-add-line-component', {blocked: blocked}]"
  >
    <div class="inputs">
      <div class="title">
        <app-input
            v-model="skill.title"
            placeholder="новой навык"
            :error-message="validation.firstError('skill.title')"
        />
      </div>
      <div class="percent">
        <app-input
            v-model="skill.percent"
            placeholder="100"
            :error-message="validation.firstError('skill.percent')"
        />
        <span>%</span>
      </div>
    </div>
    <div class="add-btn">
      <iconed-btn type="iconed" @click="handleClick"/>
    </div>
  </div>
</template>

<script>
import input from "../input/input"
import icon from "../icon/icon"
import iconedBtn from "../button/button";
import roundBtn from "../button/button";
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';

export default {
  mixins: [ValidatorMixin],
  validators: {
    "skill.title": value => {
      return Validator.value(value).required("Не может быть пустым");
    },
    "skill.percent": value => {
      return Validator.value(value)
          .integer("Должнобытьчисло")
          .between(0,100,"Не коректное значение")
          .required("Не может быть пустым");
    },
  },
  props: {
    blocked: Boolean
  },
  components: {
    icon,
    iconedBtn,
    appInput: input,
    roundBtn
  },
  data(){
    return{
      skill: {
        title:"",
        percent:"",
      },
    }
  },
  methods:{
    async handleClick(){
      if(await  this.$validate() === false) return;
      this.$emit('approve', this.skill)
    }
  }
}

</script>


<style lang="postcss" src="./skillAddLine.pcss" scoped>
</style>

