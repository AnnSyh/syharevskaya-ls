<template>
  <section class="works-page-component container wrapper--white">
    <div class="page-content">
    <div class="container" v-if="categories.length">
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
    <div class="container" v-else>
      loading....
    </div>
    </div>
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
      showTooltip: "tooltips/show",
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
      this.showTooltip({
         text: "Успешное создание скилла!",
         type: "success"
       })
      skill.title="",
      skill.percent=""
    },

    removeSkill(skill){
      this.removeSkillAction(skill);
      this.showTooltip({
        text: "Успешное удаление скилла!",
        type: "error"
      })
    },

    async editSkill(skill){
      try {
        await this.editSkillAction(skill);
        skill.editmode = false;

        this.showTooltip({
          text: "Навык успешно изменен",
          type: "success"
        })

      }  catch (error){
        this.showTooltip({
          text: 'Ошибка заполните поля',
          type: "error"
        })
        console.log(error.message)
      }

    },

   async createCategory(categoryTitle){
      try {
        await this.createCategoryAction(categoryTitle)
        this.emptyCardIsShown = false;
      } catch (error) {
        this.showTooltip({
          text: error.response.data.error,
          type: "error"
        })
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



