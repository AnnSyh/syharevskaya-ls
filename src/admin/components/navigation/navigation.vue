<template>
    <nav class="nav-component">
      <ul class="nav-component__list">
        <li
            :class="['nav-component__item',{active:item.active}]"
            v-for="item in menuLinks" :key="item.id"
        >
          <a :href="`/${item.alias}`" class="nav-component__link">{{item.title}}</a>
        </li>
      </ul>
    </nav>
</template>

<script>
  const menuLinks = [
    {id: 0, title: "Обо мне", alias: "about", active: false},
    {id: 1, title: "Навыки", alias: "navies", active: true},
    {id: 2, title: "Работы", alias: "works", active: false},
    {id: 3, title: "Отзывы", alias: "review", active: false},
  ];

  export default {
    data(){
      return  {
        menuLinks
      }
    },
  }
</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>
