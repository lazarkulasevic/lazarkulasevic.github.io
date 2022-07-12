<script setup>
import RgbCard from './RgbCard.vue'

const getPosts = async () => {
    const modules = import.meta.glob('../blog/*.md')
    const promises = []
    for (const path in modules) {
        if (!path.match('../blog/index.md')) {
            promises.push(modules[path]())
        }
    }
    return Promise.all(promises)
}

const pages = await getPosts()
console.log(pages)

</script>

<template>
    <div class="blog">
        <RgbCard
            v-for="page of pages"
            :title="page.__pageData.title"
            :description="page.__pageData.description">
        </RgbCard>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/breakpoints.scss" as b;

.blog {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 50px;
    justify-items: center;
    justify-content: space-evenly;
    margin: 50px 0;

    @include b.md {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
