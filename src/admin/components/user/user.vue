<template>
  <div class="user-component">
    <avatar  size="3" v-bind="$attrs"></avatar>
    <div>
      <div class="username">{{title}}</div>
      <div class="usersurname">{{subtitle}}</div>
    </div>
  </div>
</template>
<script>
import avatar from "../avatar";

export default {
  props:{
    title:  String,
    subtitle:  String,
    active: Boolean
  },
  components:{
    avatar
  }

}

</script>
<style lang="postcss" scoped src="./user.pcss"></style>
