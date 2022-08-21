<script setup>
import { ref, watch } from 'vue'
import { useData, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GlassCard from '../../components/GlassCard.vue'
import GlassCardCodeSnippet from '../../components/GlassCardCodeSnippet.vue'
import BlogComments from '../../components/BlogComments.vue'

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
            <div class="blog-meta" v-if="isBlogPost">
                <h1 class="title">{{ page.frontmatter.title }}</h1>
                <p class="date">
                    <span>Published: {{ Utils.formatDateTime(page.frontmatter.publishedOn) }}</span>
                    <span v-if="page.frontmatter.updatedOn">
                        / {{ Utils.formatDateTime(page.frontmatter.updatedOn) }}
                    </span>
                </p>
                <img :src="page.frontmatter.image" :alt="page.frontmatter.title" />
            </div>
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

.blog-meta {
    margin-bottom: 25px;

    .title {
        font-size: 2rem;
        font-weight: bold;
        line-height: 1.2;
        color: var(--vp-c-brand);
    }

    .date {
        font-size: 0.75rem;
        line-height: 2;
        color: var(--vp-c-text-2);
    }

    img {
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }
}
</style>
