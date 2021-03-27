<template>
  <div class="tags-adder-component">
    <app-input
      title="Добавление тега"
      v-model="currentTags"
      @input="$emit('change', currentTags)"
    />
    <ul class="tags">
      <li
          v-for="(tag, index) in tagsArray"
          :key="index"
          v-if="tag.trim()"
      >
        <tag
            interactive
            :title="tag"
            @click="removeTag(tag)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import appInput from "../input"
import tag from "../tag"

export default {
  components: {
    appInput,
    tag
  },
  props:{
    tags:{
      type: String,
      default: ""
    }
  },
  model:{
    prop:"tags",
    event:"change"
  },
  data(){
    return{
      currentTags: this.tags
    }
  },
  computed:{
    tagsArray(){
      return this.currentTags.trim().split(", ");
    },
  },
  methods:{
    removeTag(tag){  console.log('removeTag')

      const tags = [...this.tagsArray];
      const tagNdx = tags.indexOf(tag);

      console.log('tags = ',tags);
      console.log('tagNdx = ',tagNdx);

      if (tagNdx < 0) return;

      tags.splice(tagNdx,1);      console.log('tags.slice = ',tags);
      this.currentTags = tags.join(", ");

      this.$emit("change", this.currentTags)
    }
  }
}

</script>


<style lang="postcss" src="./tagsAdder.pcss" scoped>
</style>

