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
                @click="edit()"
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
  data() {
    return {
      currentReview: {
        id: '',
        author: '',
        occ: '',
        text: '',
        preview: ''
      }
    }
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`
    },
  },

  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      removeReviewAction: "reviews/remove",
      createReviewAction: "reviews/create",
      updateReviewAction: "reviews/update",
    }),
    edit() {
      this.setReview();
      this.$emit('edit', this.currentReview);
    },
    setReview() {
      this.currentReview = {
        id: this.review.id,
        author: this.review.author,
        occ: this.review.occ,
        text: this.review.text,
        preview: `https://webdev-api.loftschool.com/${this.review.photo}`
      }
    },
    removeReview(){
      if (this.review){
        this.removeReviewAction(this.review.id);
        // console.log('Успешное удаление отзыва');
        this.showTooltip({
          text: 'Успешное удаление отзыва',
          type: "error"
        });
      } else {
        this.$emit('remove');
      }
    },

  },
  created() {
    this.setReview();
  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>

