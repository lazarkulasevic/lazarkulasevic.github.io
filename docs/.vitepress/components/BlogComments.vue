<script setup>
import { onMounted, ref } from 'vue'
import { giscusConfig } from '../config/giscus'
import Utils from '../utils/Utils'

const giscusRef = ref()
const currentTheme = document.documentElement.classList.value.includes('dark') ? 'dark_dimmed' : 'light'

const renderGiscus = (currentTheme) => {
  const giscus = document.createElement('script')
  Utils.setAttributes(giscus, giscusConfig(currentTheme))
  giscusRef.value.appendChild(giscus)
}

onMounted(() => {
  renderGiscus(currentTheme)
})
</script>

<template>
  <div ref="giscusRef" class="comments"></div>
</template>

<style lang="scss" scoped>
.comments {
  padding-top: 10px;
}
</style>
