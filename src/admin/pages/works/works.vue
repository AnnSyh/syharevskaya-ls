<template>
  <section class="works-page-component container">
    <div class="page-content">
      <div class="container">
        <div class="header  page-header">
          <h1 class="header__title page-title">Блок "{{this.$route.meta.name}}"</h1>
        </div>
        <div class="form-component card-component">
          <div class="form" v-if="emptyCardIsShown">
            <app-form />
          </div>
          <card simple v-else class="empty-work">
            <iconed-btn
                type="iconed"
                v-if="emptyCardIsShown == false"
                @click="emptyCardIsShown = true"
                title="Добавить работу"/>
          </card>

<!--          <pre>{{works}}</pre>-->
          <ul class="works-cards">
            <li class="item" v-for="work in works"
                :key="work.id"
            >
<!--          {{work.id}}-->
              <work-card
                  :work="work"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import tagsAdder      from "../../components/tagsAdder/tagsAdder";
import tag            from "../../components/tag/tag";
import appForm        from "../../components/form";
import workCard       from "../../components/workCard";
import { mapState, mapActions } from "vuex";

import card from "../../components/card";
import icon from "../../components/icon";
import iconedBtn from "../../components/button/button";


export default {
  components: {
    tagsAdder,
    tag,
    appForm,
    workCard,
    card,
    icon,
    iconedBtn
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
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchWorks: "works/fetch"
    }),
  },
  mounted() {
    this.fetchWorks();
  },
  created() {
    console.log('this.fetchWorks() = ', this.fetchWorks())
    this.fetchWorks();
  },
  model:{
    prop:"tags",
    event:"change"
  },
}
</script>
<style lang="postcss" src="./works.pcss" scoped>
</style>


