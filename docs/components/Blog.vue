<script setup>
import BlogCard from './BlogCard.vue'

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
// TODO: Sort by date

const posts = rawPosts
    .map(post => post.__pageData.frontmatter)
    .sort((a, b) => {
        console.log(a, b)
    })

</script>

<template>
    <div class="blog">
        <BlogCard
            v-for="post of posts"
            :title="post.title"
            :image="post.image"
            :description="post.description">
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
