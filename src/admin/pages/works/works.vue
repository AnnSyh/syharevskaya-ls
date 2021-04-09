<template>
  <section class="works-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="header  page-header">
          <h1 class="header__title page-title">Блок "{{this.$route.meta.name}}"</h1>
        </div>
        <div class="">
          <div class="form">
            <app-form />
          </div>
<!--          <ul class="cards">-->
<!--            <li class="item" v-for="work in works" :key="work.id">-->
<!--              <work-card-->
<!--                  :work="work"-->
<!--              />-->
<!--            </li>-->
<!--          </ul>-->

<!--              <tagsAdder v-model="tags"/>-->

        </div>
      </div>
    </div>

  </section>
</template>

<script>
import tagsAdder      from "../../components/tagsAdder/tagsAdder";
import tag            from "../../components/tag/tag";
import appForm        from "../../components/form";

export default {
  components: {
    tagsAdder,
    tag,
    appForm
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
    this.categories = require('../../../data/categories.json');
    console.log(this.$route.meta.name); //получить информацию о пути/стргденаходимся
  },
  model:{
    prop:"tags",
    event:"change"
  },
}
</script>
<style lang="postcss" src="./works.pcss" scoped>
</style>


