<script setup>
import { ref } from 'vue'
import { useRouter } from 'vitepress'
import lunr from 'lunr'
import BlogCard from './BlogCard.vue'
import Tag from './Tag.vue'
import Utils from '../utils/Utils'
import Button from './Button.vue'

const allTagsValue = 'All Posts'
const lunrSearchScoreThreshold = 0.8

const router = useRouter()
const posts = ref([])
const selectedTags = ref([allTagsValue])
const searchTerm = ref('')

const getPosts = async () => {
  const modules = import.meta.glob('../../blog/\*.md')
  const promises = []
  for (const path in modules) {
    if (!path.match('../../blog/index.md')) {
      promises.push(modules[path]())
    }
  }
  return Promise.all(promises)
}
const rawPosts = await getPosts()
const searchIndexFile = await import('../../public/search-index.json')
const idx = lunr.Index.load(searchIndexFile.default)

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
  searchTerm.value = ''

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

const searchPosts = () => {
  selectedTags.value = [allTagsValue]

  if (searchTerm.value) {
    const searchResults = idx.search(searchTerm.value).filter((result) => result.score > lunrSearchScoreThreshold)
    const newPosts = searchResults.flatMap((result) => allPosts.find((post) => post.filePath.includes(result.ref)))
    posts.value = newPosts
  } else {
    posts.value = allPosts
  }
}

const resetFilters = () => {
  searchTerm.value = ''
  posts.value = allPosts
}
</script>

<template>
  <div class="blog-container">
    <div class="blog">
      <h2 class="blog-title">{{ $frontmatter.title }}</h2>
      <p class="blog-description">{{ $frontmatter.description }}</p>
      <div class="blog-search-bar">
        <input type="text" v-model="searchTerm" @input="searchPosts" placeholder="Search posts" />
      </div>
      <div class="blog-tags">
        <Tag v-for="tag of tags" :is-active="selectedTags.includes(tag)" :text="tag" @click="handleClickTag" />
      </div>
      <ul v-if="posts.length">
        <li v-for="post of posts" class="card">
          <BlogCard :title="post.title" :image="post.frontmatter.image" :description="post.description"
            :path="post.relativePath.slice(0, -3)" :published-on="Utils.formatDateTime(post.frontmatter.publishedOn)"
            :tags="post.frontmatter?.tags || []" @click="handleClickPost">
          </BlogCard>
        </li>
      </ul>
      <div v-else class="blog-no-results">
        <p class="emoji">&#129402;</p>
        <p class="message">Bummer! No results.</p>
        <Button class="main-button" @click="resetFilters">Reset Filters</Button>
      </div>
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

  .blog-title {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: 20px;
  }

  .blog-description {
    margin-bottom: 20px;

    @media (min-width: 768px) {
      max-width: 65%;
    }
  }

  .blog-tags {
    display: flex;
    flex-flow: wrap;
    gap: 4px;
    margin-bottom: 20px;
  }

  .blog-no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin-top: 54px;

    .emoji {
      font-size: 64px;
    }
  }

  @include b.md {
    margin: 32px;

    .blog-card {
      margin-bottom: 32px;
    }
  }

  @include b.lg {
    margin: 42px;
    width: 1374px;

    .blog-card {
      margin-bottom: 42px;
    }
  }
}

.blog-search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: var(--vp-c-default-3);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-default-1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;

  &::before {
    content: '🔍';
  }

  input {
    flex: 1;
    height: 30px;
    border: none;
    outline: none;
    padding-left: 10px;
  }

  &:has(input:focus) {
    border-color: var(--vp-c-indigo-2);
  }

  @include b.sm {
    width: 400px;
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
