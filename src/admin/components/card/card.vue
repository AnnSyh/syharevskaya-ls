<template>
  <div class="card-component card_plain" v-if="simple">
    <slot name="default">simple</slot>
  </div>
  <div :class="['card-component', { slim: slim }]" v-else>
    <div class="header">
<!--      <div class="text" v-text="title">card.vue 1111</div>-->
      <slot name="title" v-if="!!title === false"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    simple: Boolean,
    slim: Boolean,
  }
};
</script>


<style lang="postcss" src="./card.pcss" scoped>
</style>

