<template>
  <card simple>
    <div class="review-wrapper">
      <div class="card-header">
        <user
            :title="review.author"
            :subtitle="review.occ"
            :src="cover"
        ></user>
      </div>
      <div class="data">
        <div class="text">
          <p>{{review.text}}</p>
        </div>
        <div class="btns">
          <icon symbol="pencil" title="Править"
                @click="$emit('edit', review)"
          ></icon>
          <icon symbol="cross" title="Удалить"
                @click="removeReview"
          ></icon>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import card from "../card";
import icon from "../icon";
import user from "../user";
import {mapActions, mapState} from "vuex"


export default {
  components: { card, icon, user },
  props: {
    // review: Object,
    review:{
      type:Object,
      default:() => ({})
    },
    emptyCardIsShown: {
      type: Boolean
    },
  },
  computed: {
    ...mapState('reviews',{
      categories: state => state.data
    }),
    cover() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`
    },
  },

  methods: {
    ...mapActions({
      removeReviewAction: "reviews/remove",
      createReviewAction: "reviews/create",
      updateReviewAction: "reviews/update",
    }),
    removeReview(){
      if (this.review){
        this.removeReviewAction(this.review.id);
      } else {
        this.$emit('remove');
      }
    },

  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>

