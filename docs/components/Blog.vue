<script setup>
import { useRouter } from 'vitepress'
import BlogCard from './BlogCard.vue'
import Utils from '../utils/Utils'

const router = useRouter()

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

const rawPosts = await getPosts()

const posts = rawPosts
    .map(post => post.__pageData)
    .sort((a, b) => new Date(a.publishedOn) > new Date(b.publishedOn) ? -1 : 1)

const handleClick = (event) => {
    router.go(event)
}
</script>

<template>
    <div class="blog">
        <BlogCard
            v-for="post of posts"
            :title="post.title"
            :image="post.frontmatter.image"
            :description="post.description"
            :path="post.relativePath.slice(0, -3)"
            :published-on="Utils.formatDateTime(post.frontmatter.publishedOn)"
            @click="handleClick($event)">
        </BlogCard>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/breakpoints.scss" as b;

.blog {
    margin: 24px;

    .blog-card {
        margin-bottom: 24px;
    }

    @include b.md {
        margin: 32px 10%;

        .blog-card {
            margin-bottom: 32px;
        }
    }

    @include b.lg {
        margin: 42px 14%;

        .blog-card {
            margin-bottom: 42px;
        }
    }
}
</style>
