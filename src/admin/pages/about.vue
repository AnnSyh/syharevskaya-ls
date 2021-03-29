<template>
  <section class="about">
    <div class="container">

      <div class="about__header">
        <h1 class="about__title">Блок "{{this.$route.meta.name}}"</h1>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  created() {
    console.log(this.$route.meta.name); //получить информацию о пути/стргденаходимся
  }
}
</script>

