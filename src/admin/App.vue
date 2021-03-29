<template>
  <div class="app-container" :class="{'wrapper--dark':this.$route.path === '/login'}">

    <siteHeader v-if="this.$route.path !== '/login'" />

    <navigation v-if="this.$route.path !== '/login'"/>

<!--    <router-view name="headline"/>-->
    <router-view/>

  </div>
</template>

<script>
import icon       from "./components/icon/icon";
import navigation from "./components/navigation/navigation";
import card       from "./components/card/card";
import iconedBtn  from "./components/button/button";
import test       from "./components/test/test";
import headline   from "./components/headline/headline";
import siteHeader   from "./components/siteHeader/siteHeader";
import def        from "./components/deff/deff";
import user       from "./components/user/user";
import category   from "./components/category/category";


export default {
  components: {
    test,
    user,
    headline,
    siteHeader,
    def,
    iconedBtn,
    card,
    navigation,
    icon,
    category
  },
  created() {
    console.log(this.$route); //получить информацию о пути/стргденаходимся
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
