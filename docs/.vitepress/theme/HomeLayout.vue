<script setup>
import DefaultTheme from 'vitepress/theme'
import GlassCard from '../../components/GlassCard.vue'
import GlassCardCodeSnippet from '../../components/GlassCardCodeSnippet.vue'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #home-hero-after>
            <GlassCard>
                <GlassCardCodeSnippet />
            </GlassCard>
        </template>
    </Layout>
</template>

<style lang="scss" scoped>
@use '../../style/breakpoints.scss' as b;

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
        padding-top: 50px;
    }
}

</style>
