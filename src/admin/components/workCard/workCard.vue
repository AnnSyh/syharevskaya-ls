<template>
  <card simple>
    <div class="works-wrapper">
      <div class="pic">
        <img class="image" :src="cover"/>
        <div class="tag">
          <tags-list :tags="work.techs"/>
        </div>
      </div>
      <div class="data">
        <div class="title">{{work.title}}</div>
        <div class="text">
          <p>{{work.description}}</p>
        </div>
        <a :href="work.link" class="link">{{work.link}}</a>
        <div class="btns">
<!--          <p>emptyCardIsShown = {{emptyCardIsShown}}</p>-->
<!--          @keydown.enter="editWork"-->
          <icon symbol="pencil" title="Править"
                @click="$emit('edit', work)"
          ></icon>
          <icon symbol="cross" title="Удалить"
                @click="removeWork"
          ></icon>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import card from "../card";
import icon from "../icon";
import tagsList from "../tagsList";
import {mapActions, mapState} from "vuex"


export default {
  components: { card, icon, tagsList },
  props: {
    work: Object,
    emptyCardIsShown: {
      type: Boolean
    },
  },
  computed: {
    ...mapState('works',{
      categories: state => state.data
    }),
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`
    },
  },

  methods: {
    ...mapActions({
      removeWorkAction: "works/remove",
      createWorkAction: "works/create",
      updateWorkAction: "works/update",
    }),
    removeWork (){}

  },
};
</script>

<style scoped lang="postcss" src="./workCard.pcss"></style>

