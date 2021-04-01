<template>
  <section class="works container">
    <div class="header">
      <h1 class="header__title">Блок "{{this.$route.meta.name}}"</h1>
    </div>
    <div class="card-component">
      <div class="header">
        <div class="text">Добавление тегов</div>
      </div>
      <div class="content">
        <tagsAdder v-model="tags"/>
      </div>
    </div>

  </section>
</template>

<script>
import tagsAdder      from "../components/tagsAdder/tagsAdder";
import tag            from "../components/tag/tag";

export default {
  components: {
    tagsAdder,
    tag,
  },
  props: {
    tags:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      emptyCardIsShown:false,
      categories:[]
    }
  },
  created() {
    this.categories = require('../../data/categories.json');
    console.log(this.$route.meta.name); //получить информацию о пути/стргденаходимся
  },
  model:{
    prop:"tags",
    event:"change"
  },
}
</script>
<style lang="postcss" src="../components/card/card.pcss" scoped>
</style>


