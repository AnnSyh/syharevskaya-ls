<template>
  <div class="app-container page-content" >

    <div :class="{'wrapper--dark':this.$route.path === '/login'}">

    <router-view name="header"/>
    <router-view name="navigation"/>

    <div >
      <router-view/>
    </div>

    <div :class="['notify-container', {active: isTooltipShown}]">
      <div class="notification">
        <notification
            :text="tooltipText"
            :type="tooltipType"
            @click="hideTooltip"
        />
      </div>
    </div>

    </div>

  </div>
</template>

<script>
import notification from "./components/notification";

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
import { mapState, mapActions } from "vuex";
import works      from "./pages/works/works";


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
    category,
    notification,
    works
  },
  methods: {
    ...mapActions({
      hideTooltip: "tooltips/hide"
    })
  },
  computed: {
    ...mapState("tooltips", {
      isTooltipShown: (state) => state.isShown,
      tooltipText: (state) => state.text,
      tooltipType: (state) => state.type,
    }),
  },

  created() {
    console.log(this.$route); //получить информацию о пути/стргденаходимся
  }

}


</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "../styles/main.pcss";
@import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss"></style>
