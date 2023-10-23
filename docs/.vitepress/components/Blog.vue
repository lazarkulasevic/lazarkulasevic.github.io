<script setup>
import { ref } from 'vue'
import { useRouter } from 'vitepress'
import BlogCard from './BlogCard.vue'
import Tag from './Tag.vue'
import Utils from '../utils/Utils'

/**
 * @todo Use content feature when stable https://vitepress.dev/guide/data-loading#createcontentloader and refactor component
 */

const allTagsValue = 'All Posts'

const router = useRouter()
const posts = ref([])
const selectedTags = ref([allTagsValue])

const getPosts = async () => {
  const modules = import.meta.glob('../../blog/**/*.md')
  const promises = []
  for (const path in modules) {
    if (!path.match('../../blog/index.md')) {
      promises.push(modules[path]())
    }
  }
  return Promise.all(promises)
}

const rawPosts = await getPosts()

const allPosts = rawPosts
  .map((post) => post.__pageData)
  .sort((a, b) => (new Date(a.frontmatter.publishedOn) > new Date(b.frontmatter.publishedOn) ? -1 : 1))

posts.value = allPosts

const tags = posts.value
  .flatMap((post) => post.frontmatter?.tags)
  .filter((value, index, array) => value && array.indexOf(value) === index)
tags.unshift(allTagsValue)

const handleClickPost = (event) => {
  router.go(event)
}

const handleClickTag = (tag) => {
  if (tag === allTagsValue) {
    selectedTags.value = [allTagsValue]
  } else {
    selectedTags.value = selectedTags.value.filter((selectedTag) => selectedTag !== allTagsValue)

    if (selectedTags.value.includes(tag)) {
      selectedTags.value = selectedTags.value.filter((selectedTag) => selectedTag !== tag)
      if (selectedTags.value.length === 0) {
        selectedTags.value = [allTagsValue]
      }
    } else {
      selectedTags.value.push(tag)
    }
  }

  if (selectedTags.value.includes(allTagsValue)) {
    posts.value = allPosts
  } else {
    posts.value = allPosts.filter((post) => {
      if (post.frontmatter?.tags) {
        return selectedTags.value.some((selectedTag) => post.frontmatter?.tags.includes(selectedTag))
      }
    })
  }
}
</script>

<template>
  <div class="blog-container">
    <div class="blog">
      <h2 class="blog-title">{{ $frontmatter.title }}</h2>
      <p class="blog-description">{{ $frontmatter.description }}</p>
      <div class="blog-tags">
        <Tag v-for="tag of tags" :is-active="selectedTags.includes(tag)" :text="tag" @click="handleClickTag" />
      </div>
      <ul>
        <li v-for="post of posts" class="card">
          <BlogCard :title="post.title" :image="post.frontmatter.image" :description="post.description"
            :path="post.relativePath.slice(0, -3)" :published-on="Utils.formatDateTime(post.frontmatter.publishedOn)"
            @click="handleClickPost">
          </BlogCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../style/breakpoints' as b;

.blog-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.blog {
  margin: 24px;
  max-width: 1374px;

  .blog-title {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: 20px;
  }

  .blog-description {
    margin-bottom: 20px;
  }

  .blog-tags {
    display: flex;
    flex-flow: wrap;
    gap: 4px;
    margin-bottom: 20px;
  }

  @include b.md {
    margin: 32px;

    .blog-card {
      margin-bottom: 32px;
    }
  }

  @include b.lg {
    margin: 42px;

    .blog-card {
      margin-bottom: 42px;
    }
  }
}

.card {
  margin-bottom: 24px;

  @include b.md {
    margin-bottom: 32px;
  }

  @include b.lg {
    margin-bottom: 42px;
  }
}
</style>
