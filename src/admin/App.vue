<template>
  <div class="app-container page-content" >

    <div :class="{'wrapper--dark':this.$route.path === '/login'}">

      <router-view name="header" @logout="logout"/>
      <router-view name="navigation"/>

    <div>
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
import navigation from "./components/navigation/navigation";
import siteHeader   from "./components/siteHeader/siteHeader";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    navigation,
    siteHeader,
    notification,
  },
  methods: {
    ...mapActions({
      hideTooltip: "tooltips/hide",
      logoutAction: 'auth/logout',
    }),
    async logout() {
      await this.logoutAction();
      this.$router.replace('/login');
    }
  },
  computed: {
    ...mapState("tooltips", {
      isTooltipShown: (state) => state.isShown,
      tooltipText: (state) => state.text,
      tooltipType: (state) => state.type,
    }),
  },

  created() {
    // console.log('стргде находимся',this.$route); //получить информацию о пути/стргденаходимся
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
