<template>
    <div class="headline-component">
      <div class="container headline-container">
        <div class="headline__left">
          <slot />
          <div class="title">{{title}}</div>
        </div>
        <div class="btns">
          <button type="button" @click="logout" class="btn">Выйти</button>
        </div>
      </div>
    </div>
</template>

<script>

  export default {
    props:{
      title:  String,
      default: "Панель администрирования"
    },
    methods:{
      logout() {
        this.$emit('logout');
      }
    }
  }
</script>

<style lang="postcss" scoped src="../../app.pcss"></style>
<style lang="postcss" scoped src="./headline.pcss"></style>
