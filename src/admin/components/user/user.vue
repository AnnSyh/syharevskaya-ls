<template>
  <div class="user-component">
    <avatar  size="3" v-bind="$attrs"></avatar>
    <div class="username">{{title}}</div>
  </div>
</template>
<script>
import avatar from "../avatar";

export default {
  props:{
    title:  String,
    active: Boolean
  },
  components:{
    avatar
  }

}

</script>
<style lang="postcss" scoped src="./user.pcss"></style>
