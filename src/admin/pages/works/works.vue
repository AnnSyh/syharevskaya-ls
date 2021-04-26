<template>
  <section class="works-page-component container wrapper--white">
    <div class="page-content">
      <div class="container">
        <div class="header  page-header">
          <h1 class="header__title page-title">Блок "{{this.$route.meta.name}}"</h1>
        </div>
<!--          <pre>{{works}}</pre>-->
          <ul class="works-cards">
            <li v-if="emptyCardIsShown" class="li-form">
              <app-form class="form"
                        :currentWork="currentWork"
                        @close="closeHandler"
                        @click="handleClick"
              />
            </li>
            <li v-else class="empty-work">
              <square-btn
                  type="square"
                  v-if="emptyCardIsShown == false"
                  @click="emptyCardIsShown = true"
                  title="Добавить работу"/>
            </li>
            <li
                class="item"
                v-for="work in works"
                :key="work.id"
                :emptyCardIsShown="emptyCardIsShown"
            >
              <work-card
                  :work="work"
                  @edit="editHandler"
              />
            </li>
          </ul>
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
import squareBtn from "../../components/button/button";


export default {
  components: {
    tagsAdder,
    tag,
    appForm,
    workCard,
    card,
    icon,
    iconedBtn, squareBtn,
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
      categories:[],
      currentWork:null
    }

  },
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchWorks: "works/fetch",
    }),
    handleClick(){
      // console.log('handleClick',this.emptyCardIsShown);
      // console.log('this.reviews.status',this.reviews.status)
      if(this.works.status == 1){
        this.emptyCardIsShown = false
      }
    },
    editHandler(work){
        this.currentWork = {...work}
        this.emptyCardIsShown = true;
    },
    closeHandler(){
      // console.log('here');
      this.emptyCardIsShown = false
    }

  },
  watch: {
    emptyCardIsShown(){
      if(!this.emptyCardIsShown){
        this.currentWork = null
      }
    }
  },

  mounted() {
    this.fetchWorks();
  },
  created() {
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


