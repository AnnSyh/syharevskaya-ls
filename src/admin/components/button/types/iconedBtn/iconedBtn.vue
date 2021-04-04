<template>
  <button
    v-on="$listeners"
    class="button-component"
  >{{title}}</button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>


<style lang="postcss" scoped src="./iconedBtn.pcss"></style>
