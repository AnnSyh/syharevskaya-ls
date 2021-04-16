<template>
  <ul class="tags-list-component">
<!--    <pre>{{tagsArray}}</pre>-->
    <li class="item" v-for="tag in tagsArray" :key="tag.id">
      <tag :title="tag"/>
    </li>
  </ul>
</template>

<script>
import tag from "../tag";
export default {
  components: {tag},
  props: {
    tags: String
  },
  computed: {
    tagsArray() {
      return this.tags.split(",");
    }
  }
}
</script>


<style lang="postcss" src="./tagsList.pcss" scoped>
</style>

