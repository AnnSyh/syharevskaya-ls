<template>
<!--  <div-->
<!--      class="['skillAddLine-component',{blocked: blocked}]"-->
<!--  >  -->
    <div
      class="skillAddLine-component"
  >
    <div class="inputs">
      <div class="title">
        <app-input no-side-paddings/>
      </div>
      <div class="percent">
        <app-input type="number" min="0" max="100" maxlength="3"/>
        <span>%</span>
      </div>
    </div>
    <div class="add-btn">
<!--      <round-btn type="iconed"  title=""  />  - ошибки в панели-->
      <iconed-btn type="iconed" title=""/>

    </div>
  </div>
</template>

<script>
import input from "../input/input"
import icon from "../icon/icon"
import iconedBtn from "../button/button";
import roundBtn from "../button/button";

export default {
  props: {
    blocked: Boolean
  },
  components: {
    icon,
    iconedBtn,
    appInput: input,
    roundBtn
  }
}

</script>


<style lang="postcss" src="./skillAddLine.pcss" scoped>
</style>

