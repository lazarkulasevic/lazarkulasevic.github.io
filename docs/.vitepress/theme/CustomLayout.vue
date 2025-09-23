<script setup>
import { ref, watch, nextTick, provide } from 'vue'
import { useData, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import TerminalWindow from '../components/TerminalWindow.vue'
import BlogComments from '../components/BlogComments.vue'
import PostHeader from '../components/PostHeader.vue'

const { Layout } = DefaultTheme
const { page, isDark } = useData()
const router = useRouter()
const isBlogPost = ref(false)

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

watch(
  () => router.route.data.relativePath,
  () => {
    isBlogPost.value = page.value.frontmatter.type === 'article'
  },
  { immediate: true }
)

provide('toggle-appearance', async ({ clientX: x, clientY: y }) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <div class="hero-animation">
        <TerminalWindow :height="400" :auto-start="true" :speed="30" />
      </div>
    </template>
    <template #doc-before>
      <PostHeader v-if="isBlogPost" :title="page.frontmatter.title" :published-on="page.frontmatter.publishedOn"
        :updated-on="page.frontmatter.updatedOn" :image="page.frontmatter.image" :tags="page.frontmatter?.tags">
      </PostHeader>
    </template>
    <template #doc-after>
      <ClientOnly>
        <BlogComments v-if="isBlogPost" />
      </ClientOnly>
    </template>
  </Layout>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as v;
@use '../style/breakpoints.scss' as b;

.Layout::v-deep(.VPHome) {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  .clip {
    background-color: var(--vp-c-brand-3);
    background: -webkit-linear-gradient(120deg, v.$light-purple 30%, v.$light-blue);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @include b.lg {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-top: calc(var(--vp-nav-height) + 40px);

    .card {
      padding-right: 120px;
    }
  }
}

.Layout::v-deep(.VPHomeHero) {
  @include b.xl {
    padding-left: 140px
  }
}


.hero-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 720px;
  padding: 0 20px;

  @include b.lg {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 60px;
    padding-top: 40px;
  }
}

.Layout::v-deep(.VPDocOutlineDropdown) {
  margin: 20px 0;
}

.Layout::v-deep(.vp-doc.container) {
  display: none;
}
</style>
