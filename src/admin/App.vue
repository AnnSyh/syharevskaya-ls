<template>
  <div class="app-container">

    <headline title="Панель администрирования">
      <user
          title="Анна Сухаревская"
          src="https://cdn1.ozone.ru/s3/multimedia-4/wc1200/6017928400.jpg"
      ></user>
    </headline>

    <navigation/>

    <div class="page-content">
      <div class="container">
        <div class="header">
          <span class="header__title">Блок "Обо мне"</span>
          <iconed-btn type="iconed" title="Добавить группу"/>
        </div>
      </div>

<!--      <div class="cards">-->
<!--        <category title="Frontend"></category>-->
<!--      </div>-->

      <ul class="skills">
        <li class="item">
          <category/>
        </li>
        <li class="item">
          <category/>
        </li>
        <li class="item">
          <category/>
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
