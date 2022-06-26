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
            <span class="card--title">{{ card.title }}</span>
            <div class="card--description">
                <span>{{ card.description }}</span>
                <a :href="card.link" target="_blank" rel="noopener noreferrer">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            </div>
        </GlassCard>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/breakpoints.scss" as b;
@use "../style/variables.scss" as v;

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

    .card {
        position: relative;
        &--title {
            font-size: 22px;
            font-weight: 600;
            color: var(--vp-c-black);
            z-index: 1;
        }

        &--description {
            position: absolute;
            bottom: -100%;
            width: 100%;
            height: 100%;
            padding: 10px 15px;
            background-color: var(--vp-c-white-mute);
            color: var(--vp-c-black);
            transition: 0.3s ease-in-out;
            border-radius: 20px;
            z-index: 2;
            font-size: 14px;

            a {
                position: absolute;
                bottom: 10px;
                right: 10px;
                svg {
                    height: 20px;
                    width: auto;
                }
            }
        }

        .glass:hover {
            .card--description {
                transform: translateY(-100%);
            }
        }
    }
}
</style>
