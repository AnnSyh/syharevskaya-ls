<template>
  <section class="navies container">
    <div class="header">
      <h1 class="header__title">Блок "{{this.$route.meta.name}}"</h1>
    </div>
    <div class="card-component">
      <div class="header">
        <div class="text">Заголовок контента</div>
      </div>
      <div class="content">
        content
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    console.log(this.$route); //получить информацию о пути/стргденаходимся
  }
}
</script>

<style lang="postcss" src="../components/card/card.pcss" scoped>
</style>
