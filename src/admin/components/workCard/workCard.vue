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
                @click="edit()"
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
  data() {
    return {
      currentWork: {
        id: '',
        title: '',
        description:  '',
        link:  '',
        techs:  '',
        preview:  ''
      }
    }
  },
  computed: {
    ...mapState('works',{
      works: state => state.data
    }),
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`
    },
  },

  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      removeWorkAction: "works/remove",
      createWorkAction: "works/create",
      updateWorkAction: "works/update",
    }),
    edit() {
      this.setCurrentWork();
      this.$emit('edit', this.currentWork);
    },
    setCurrentWork() {
      this.currentWork = {
        id: this.work.id,
        title: this.work.title,
        description: this.work.description,
        link: this.work.link,
        techs: this.work.techs,
        preview: `https://webdev-api.loftschool.com/${this.work.photo}`
      }
    },
    removeWork(){
      if (this.work){
        this.removeWorkAction(this.work.id);
        // console.log('Успешное удаление работы');
        this.showTooltip({
          text: 'Успешное удаление работы',
          type: "error"
        });
      } else {
        this.$emit('remove');
      }
    },
    // watch:{
    //   img(){
    //     this.img = this.img
    //   }
    // }

  },
  created() {
    this.setCurrentWork();
  },
};
</script>

<style scoped lang="postcss" src="./workCard.pcss"></style>

