<template>
  <div class="skillAddLine-component">
    <div class="inputs">
      <div class="title">
        <app-input no-side-paddings/>
      </div>
      <div class="percent">
        <app-input type="number" min="0" max="100" maxlength="3"/>
      </div>
    </div>
    <div class="add-btn">
      <iconed-btn type="iconed" title=""/>
    </div>
  </div>
</template>

<script>
import input from "../input/input"
import icon from "../icon/icon"
import iconedBtn from "../button/button";

export default {
  components: {
    icon,
    iconedBtn,
    appInput: input
  }
}

</script>


<style lang="postcss" src="./skillAddLine.pcss" scoped>
</style>

