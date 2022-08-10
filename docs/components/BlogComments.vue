<script setup>
import { onMounted, ref } from 'vue'
import Utils from '../utils/Utils'

const giscusRef = ref()
const currentTheme = document.documentElement.classList.value === 'dark' ? 'dark_dimmed' : 'light'
const giscus = document.createElement('script')

onMounted(() => {
    Utils.setAttributes(giscus, {
        async: true,
        'src': 'https://giscus.app/client.js',
        'data-repo': 'lazarkulasevic/lazarkulasevic.github.io',
        'data-repo-id': 'lMDEwOlJlcG9zaXRvcnkyOTUwMDExNjY=',
        'data-category': 'General',
        'data-category-id': 'DIC_kwDOEZVcTs4CQt8M',
        'data-mapping': 'pathname',
        'data-strict': '1',
        'data-reactions-enabled': '1',
        'data-emit-metadata': '0',
        'data-input-position': 'top',
        'data-theme': currentTheme,
        'data-lang': 'en',
        'data-loading': 'lazy',
        'crossorigin': 'anonymous'
    })
    giscusRef.value.appendChild(giscus)
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
