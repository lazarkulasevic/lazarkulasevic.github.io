<script setup>
import DefaultTheme from 'vitepress/theme'
import GlassCard from '../../components/GlassCard.vue'
import GlassCardCodeSnippet from '../../components/GlassCardCodeSnippet.vue'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #home-hero-after>
            <GlassCard :height="216">
                <GlassCardCodeSnippet />
            </GlassCard>
        </template>
    </Layout>
</template>

<style lang="scss" scoped>
@use "../../style/breakpoints.scss" as b;

.Layout::v-deep(.VPContent.is-home) {
    display: grid;
    align-content: center;
    align-items: center;
    justify-items: stretch;
}

.Layout::v-deep(.VPHome) {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    z-index: 0;

    @include b.lg {
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        min-height: 90vh;
        .VPHero {
            padding-left: 100px;
            padding-right: 0;
        }
    }
}

.Layout::v-deep(.VPContent .aside) {
    display: none;
}
</style>
