<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
import GlassCard from '../components/GlassCard.vue'

const props = defineProps({
    height: {
        type: Number,
        required: false
    }
})
</script>

<template>
    <div class="container">
        <GlassCard v-for="(card, i) of frontmatter.cards" :start-light="i" :height="props.height">
            <div>{{ card.title }}</div>
            <div>{{ card.description }}</div>
        </GlassCard>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/breakpoints.scss" as b;

.container {
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
