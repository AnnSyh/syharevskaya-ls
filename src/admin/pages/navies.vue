<template>
  <section class="login">
    <div class="container">
      <h1>navies</h1>
      <h1 class="about__title">Блок "{{this.$route.meta.name}}"</h1>
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

