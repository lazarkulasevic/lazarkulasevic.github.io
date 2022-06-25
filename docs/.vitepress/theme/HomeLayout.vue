<script setup>
import DefaultTheme from 'vitepress/theme'
import GlassCard from '../../components/GlassCard.vue'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #home-hero-after>
            <GlassCard></GlassCard>
        </template>
    </Layout>
</template>

<style lang="scss" scoped>
@use '../../style/breakpoints.scss' as b;

.Layout::v-deep(.VPHome) {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include b.lg {
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }
}
</style>
