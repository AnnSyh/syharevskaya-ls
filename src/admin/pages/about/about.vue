<template>
  <section class="about container">
      <div class="header">
        <span class="header__title">Блок "{{this.$route.meta.name}}"</span>

        <iconed-btn
            type="iconed"
            v-if="emptyCardIsShown == false"
            @click="emptyCardIsShown = true"
            title="Добавить группу"/>

      </div>
      <ul class="skills">
        <li class="item" v-if="emptyCardIsShown">
          <category
              @remove="emptyCardIsShown = false"
              @approve="createCategory"
              empty
          />
        </li>
        <li
            class="item"
            v-for="category in categories"
            :key="category.id"
        >
          <!--          11<pre>{{category.id}}}</pre>22-->
          <category
              :title="category.category"
              :skills="category.skills"
          />
        </li>
      </ul>
  </section>
</template>

<script>
import icon from "../../components/icon/icon";
import card from "../../components/card/card";
import iconedBtn from "../../components/button/button";
import category from "../../components/category/category";
import {mapActions} from "vuex"

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
      categories:[]
    }
  },
  methods:{
    ...mapActions({
      createCategoryActions:"categories/create"

    }),
    createCategory(categotyTitle){
      this.createCategoryActions(categotyTitle);
      // console.log('categotyTitle = ',categotyTitle)
    }
  },
  created() {
    this.categories = require('../../../data/categories.json');
    console.log(this.$route.meta.name); //получить информацию о пути/стргденаходимся
  }
}
</script>

