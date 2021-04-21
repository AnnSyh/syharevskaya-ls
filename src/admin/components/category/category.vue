<template>
  <card>
    <editLine
        slot="title"
        v-model="categoryTitle"
        :editModeByDefault="empty"
        @remove="removeCategory"
        @approve="approveHandler"
    />
    <template slot="content">
      <ul class="skills" v-if="empty === false">
        <li v-if="!skills.length">
          У вас пока нет skills
        </li>
        <li class="item"  v-for="skill in skills" :key="skill.id">
          <skill
              :skill="skill"
              @remove="$emit('remove-skill', $event)"
              @approve="$emit('edit-skill', $event)"
          />
        </li>
      </ul>
      <div class="bottom-line">
        <skillAddLine
            @approve="$emit('create-skill', $event)"
            :blocked="empty"/>
      </div>
    </template>
  </card>


</template>

<script>
import card           from "../card/card";
import skill          from "../skill/skill";
import skillAddLine   from "../skillAddLine/skillAddLine";
import editLine       from "../editLine/editLine";
import tagsAdder      from "../tagsAdder/tagsAdder";
import tag            from "../tag/tag";
import {mapActions, mapState} from "vuex"


export default {
  components:{
    card,
    editLine,
    skill,
    skillAddLine,
    tagsAdder,
    tag
  },
  props: {
    empty: Boolean,
    title:{
      type: String,
      default: "",
    },
    category:{
      type: Object | null,
      default: null
    },
    skills:{
      type: Array,
      default: () => []
    },
    tags:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      categoryTitle: this.title,
    };
  },
  computed:{
    ...mapState('categories',{
      categories: state => state.data
    })
  },
  methods:{
    ...mapActions({
      showTooltip: "tooltips/show",
      removeCategoryAction: "categories/remove",
      createCategoryAction: "categories/create",
      updateCategoryAction: "categories/update",
    }),

  async  approveHandler(value){
      // console.log(this.category);
      if(this.category &&  this.category.id){
        // console.log('update');
        this.updateCategoryAction({
          id: this.category.id,
          title: value
        });
        // console.log('Правка категории');
        this.showTooltip({
          text: 'Успешное изменение категории',
          type: "success"
        });
      } else {
      await this.createCategoryAction(value);
      // console.log('Создание категории');
        this.showTooltip({
          text: 'Успешное создание категории',
          type: "success"
        });
      }
    this.$emit('remove');
    },

    removeCategory(){
        if (this.category){
          this.removeCategoryAction(this.category.id);
          // console.log('Удаление категории');
          this.showTooltip({
            text: 'Успешное удаление категории',
            type: "error"
          });
        } else {
          this.$emit('remove');
        }
    },
  },
  model:{
    prop:"tags",
    event:"change"
  },
}
</script>


<style lang="postcss" src="./category.pcss" scoped>
</style>

