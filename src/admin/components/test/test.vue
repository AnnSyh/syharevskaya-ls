<template>
    <div class="test-component">
      <div
          :class="['image', {'borderd':active}]">
        <img
            v-bind="$attrs"
        />
      </div>
      <div :class="['username',{'bold':active}]">
        {{title}}
      </div>
    </div>
</template>

<script>
  export default {
    props:{
      title:  String,
      active: Boolean
    }
  }
</script>

<style lang="postcss" scoped src="./test.pcss"></style>
