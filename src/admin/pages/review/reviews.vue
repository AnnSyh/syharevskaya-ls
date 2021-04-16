<template>
  <section class="works-page-component container">
    <div class="page-content">
      <div class="container">
        <div class="header  page-header">
          <h1 class="header__title page-title">Блок "{{this.$route.meta.name}}"</h1>
        </div>
        <div class="form-component">

          <ul class="works-cards">
            <li v-if="emptyCardIsShown" class="li-form">
              <form-review class="form"
                           :currentReview="currentReview"
                           @close="closeHandler"
                           @click="handleClick"
              />
            </li>
            <li v-else class="empty-work">
              <square-btn
                  v-if="emptyCardIsShown == false"
                  type="square"
                  title="Добавить отзыв"
                  @click="emptyCardIsShown = true"
              />
            </li>
            <li class="item" v-for="review in reviews"
                :key="review.id"
                :emptyCardIsShown="emptyCardIsShown"
            >
              <review-card
                  :review="review"
                  @edit="editHandler"
              />
            </li>
          </ul>
<!--          <pre>{{reviews}}</pre>-->
        </div>
      </div>
    </div>

  </section>
</template>

<script>


import formReview from "../../components/formReview/formReview";
import reviewCard       from "../../components/reviewCard";
import { mapState, mapActions } from "vuex";

import card from "../../components/card";
import icon from "../../components/icon";
import iconedBtn from "../../components/button/button";
import squareBtn from "../../components/button/button";

export default {
  components:{
    formReview,
    reviewCard,
    card,
    icon,
    iconedBtn, squareBtn,
  },
  data() {
    return {
      emptyCardIsShown:false,
      currentReview:null
    }

  },
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchReviews: 'reviews/fetch',
    }),
    handleClick(){
      console.log('handleClick',this.emptyCardIsShown);
      // console.log('this.reviews.status',this.reviews.status)
      if(this.reviews.status == 1){
        this.emptyCardIsShown = false
      }


    },
    editHandler(review){
      // console.log('editHandler review = ',review);
      this.currentReview = {...review}
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
        this.currentReview = null
      }
    }
  },
  mounted() {
    this.fetchReviews();
  },
  created() {
    // console.log('!!! created() this.fetchReviews() = ', this.fetchReviews())
    this.fetchReviews();
  },
}
</script>
<!--<style lang="postcss" src="../../components/card/card.pcss" scoped>-->
<!--</style>-->
<style lang="postcss" src="./review.pcss" scoped>
</style>

