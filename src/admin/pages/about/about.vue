<template>
  <section class="about">
<!--    <div class="container" v-if="categories.length">-->
    <div class="container">
      <div class="header">
        <span class="header__title">Блок "{{this.$route.meta.name}}"</span>

        <iconed-btn
            type="iconed"
            v-if="emptyCardIsShown == false"
            @click="emptyCardIsShown = true"
            title="Добавить группу"/>

      </div>
<!--      <pre>{{categories}}</pre>-->
      <ul class="skills">
        <li class="item" v-if="emptyCardIsShown">
          <category
              @remove="emptyCardIsShown = false"
              @approve="createCategory"
              empty
          />
        </li>
        <li v-if="!categories.length">
          У вас пока нет categories
        </li>
        <li
            class="item"
            v-for="category in categories"
            :key="category.id"
        >
<!--          {{category.id}}-->
          <category
              :title="category.category"
              :skills="category.skills"
              :category="category"
              @create-skill="createSkill($event,category.id)"
              @edit-skill="editSkill"
              @remove-skill="removeSkill"
          />
        </li>
      </ul>
    </div>
<!--    <div class="container" v-else>-->
<!--      loading....-->
<!--    </div>-->
  </section>
</template>

<script>
import icon from "../../components/icon/icon";
import card from "../../components/card/card";
import iconedBtn from "../../components/button/button";
import category from "../../components/category/category";
import {mapActions, mapState, mapGetters} from "vuex"

export default {
  components: {
    iconedBtn,
    card,
    icon,
    category
  },
  data() {
    return {
      emptyCardIsShown:false,
    }
  },
  computed:{
    ...mapState('categories',{
      categories: state => state.data
    }),
    ...mapGetters({
      get_categories: 'categories/get_categories'
    })
  },
  methods:{
    ...mapActions({
      createCategoryAction:"categories/create",
      fetchCategoriesAction: "categories/fetch",
      addSkillAction:"skills/add",
      removeSkillAction:"skills/remove",
      editSkillAction:"skills/edit"
    }),
   async createSkill(skill,categoryId){
      const newSkill = {
        ...skill,
        category:categoryId
      }
      await this.addSkillAction(newSkill);

      skill.title="",
      skill.percent=""
    },
    removeSkill(skill){
      this.removeSkillAction(skill);
    },
    async editSkill(skill){
      await this.editSkillAction(skill);
      skill.editmode = false;
    },
   async createCategory(categoryTitle){
      console.log('about.vue createCategory')
      try {
        await this.createCategoryAction(categoryTitle)
        this.emptyCardIsShown = false;
      } catch (error){
        console.log(error.message)
      }
    },
    removeCategory(){
      this.removeCategoriesAction(this.category);
    },
  },
  created() {
    this.fetchCategoriesAction();
  }
}
</script>

<style>
.about .container {
  max-width: 67.75rem;
}
</style>

