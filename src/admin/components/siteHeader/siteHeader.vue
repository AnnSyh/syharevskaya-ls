<template>
  <div>
    <headline v-if="this.$route.path !== '/login'"
              title="Панель администрирования">
      <user
          title="Анна Сухаревская"
          src="https://cdn1.ozone.ru/s3/multimedia-4/wc1200/6017928400.jpg"
      ></user>
    </headline>
    <navigation v-if="this.$route.path !== '/login'"/>
  </div>
</template>

<script>
import headline from "../headline/headline";
import user from "../user";

export default {
  components: {
    headline,
    user
  },
  props: {
    username: {
      type: String,
      default: "Анна Сухаревская"
    },
    title: {
      type: String,
      default: "Панель администрирования"
    },
    avatar: {
      type: String,
      default: "https://cdn1.ozone.ru/s3/multimedia-4/wc1200/6017928400.jpg"
    },
  }
}

</script>


<style lang="postcss" src="./siteHeader.pcss" scoped>
</style>

