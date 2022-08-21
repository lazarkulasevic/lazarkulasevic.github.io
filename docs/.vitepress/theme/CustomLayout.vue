<script setup>
import { ref, watch } from 'vue'
import { useData, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GlassCard from '../../components/GlassCard.vue'
import GlassCardCodeSnippet from '../../components/GlassCardCodeSnippet.vue'
import BlogComments from '../../components/BlogComments.vue'
import PostHeader from '../../components/PostHeader.vue'

const { Layout } = DefaultTheme
const { page } = useData()
const router = useRouter()
const isBlogPost = ref(false)

watch(() => router.route.data.relativePath, () => {
    isBlogPost.value = page.value.frontmatter.type === 'article'
}, { immediate: true })

</script>

<template>
    <Layout>
        <template #home-hero-after>
            <GlassCard :height="216">
                <GlassCardCodeSnippet />
            </GlassCard>
        </template>
        <template #doc-before>
            <PostHeader
                v-if="isBlogPost"
                :title="page.frontmatter.title"
                :published-on="page.frontmatter.publishedOn"
                :updated-on="page.frontmatter.updatedOn"
                :image="page.frontmatter.image">
            </PostHeader>
        </template>
        <template #doc-after>
            <BlogComments v-if="isBlogPost" />
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
