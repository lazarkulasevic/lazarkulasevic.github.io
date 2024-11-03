<script setup>
import { useData } from 'vitepress'
import Tag from './Tag.vue'

const props = defineProps({
  frontmatterKey: {
    type: String
  }
})
const { frontmatter } = useData()
</script>

<template>
  <div class="group">
    <Tag
      v-for="tech of frontmatter[props.frontmatterKey].split(',').filter(Boolean)"
      :text="tech.trim()"
      :enableHover="false"
    />
  </div>
</template>

<style lang="scss" scoped>
.group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 1rem 0;
}
</style>
