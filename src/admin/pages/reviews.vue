<template>
  <section class="reviews container">
    <div class="header">
      <h1 class="header__title">Блок "{{this.$route.meta.name}}"</h1>
    </div>
    <div class="card-component">
      <div class="header">
        <div class="text">Новый отзыв</div>
      </div>
      <div class="content">
        <div class="form">
          <formReview></formReview>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import formReview from "../components/formReview/formReview";

export default {
  components:{
    formReview
  }
}
</script>
<style lang="postcss" src="../components/card/card.pcss" scoped>
</style>

