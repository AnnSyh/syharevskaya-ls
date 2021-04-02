<template>
  <div class="app-container">

<!--    <headline title="Панель администрирования">-->
<!--      <user-->
<!--          title="Анна Сухаревская"-->
<!--          src="https://cdn1.ozone.ru/s3/multimedia-4/wc1200/6017928400.jpg"-->
<!--      ></user>-->
<!--    </headline>-->

<!--    <navigation/>-->

    <div class="page-content">
      <div class="container">
        <div class="header">
          <span class="header__title">Блок "Обо мне"</span>

          <iconed-btn
              type="iconed"
              v-if="emptyCardIsShown == false"
              @click="emptyCardIsShown = true"
              title="Добавить группу"/>
        </div>
      </div>

      <ul class="skills">
        <li class="item" v-if="emptyCardIsShown">
          <category
            @remove="emptyCardIsShown = false"
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

    </div>


  </div>
</template>

<script>
import icon from "./components/icon/icon";
import navigation from "./components/navigation/navigation.vue";
import card from "./components/card/card";
import iconedBtn from "./components/button/button";
import test from "./components/test/test";
import headline from "./components/headline/headline";
import user from "./components/user/user";
import category from "./components/category/category";


export default {
  components: {
    test,
    user,
    headline,
    iconedBtn,
    card,
    navigation,
    icon,
    category
  },
  data() {
    return {
      emptyCardIsShown:false,
      categories:[]
    }
  },
 created() {
      this.categories = require('../data/categories.json');
 }
}


</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss"></style>
---------------------------------------------------------------

this.$validate().then(async (isValid)=>{
if(isValid === false) return ;

this.isSubmitDisabled = true;
try {
const response = await axios.post("/login", this.user)
const token = response.data.token;
localStorage.setItem('token', token);
$axios.defaults.headers["Authorization"] = `Bearer ${token}`;
console.log('responce = ',responce);
this.$router.replace("/");

}  catch(error) {
console.dir(error.response.data.error)
} finally {
this.isSubmitDisabled = false;
}

})
-------------------------------------------

this.$validate().then((isValid)=>{
if(isValid === false) return ;

this.isSubmitDisabled = true;

axios.post("https://webdev-api.loftschool.com/login", this.user).then(responce =>{
const token = response.data.token;
localStorage.setItem('token', token);
$axios.defaults.headers["Authorization"] = `Bearer ${token}`;
console.log('responce = ',responce);
this.$router.replace("/");
})
.catch((error) => console.dir(error.response.data.error))
.then(()=>{
this.isSubmitDisabled = false;
})
})
