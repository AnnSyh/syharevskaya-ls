<template>
    <nav class="nav-component">
      <div class="container">
          <ul class="nav-component__list">
        <li
            :class="['nav-component__item']"
            v-for="item in menuLinks" :key="item.id"
        >
          <router-link :to="`/${item.alias}`" class="nav-component__link" exact active-class="active">{{item.title}}</router-link>
        </li>
      </ul>
      </div>
    </nav>
</template>

<script>
  const menuLinks = [
    {id: 0, title: "Обо мне", alias: "", active: false},
    {id: 1, title: "Навыки", alias: "navies", active: true},
    {id: 2, title: "Работы", alias: "works", active: false},
    {id: 3, title: "Отзывы", alias: "reviews", active: false},

    // {id: 0, title: "Обо мне", alias: "about", active: false},
    // {id: 1, title: "Навыки", alias: "navies", active: true},
    // {id: 2, title: "Работы", alias: "works", active: false},
    // {id: 3, title: "Отзывы", alias: "review", active: false},
  ];

  export default {
    data(){
      return  {
        menuLinks
      }
    },
  }
</script>

<style lang="postcss" scoped src="../../app.pcss"></style>
<style lang="postcss" scoped src="./navigation.pcss"></style>
