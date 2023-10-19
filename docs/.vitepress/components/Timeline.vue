<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()

const isValidDate = (date) => new Date(date) && !isNaN(new Date(date))
const formatMonthYear = (date) => new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(date)
</script>

<template>
  <ul class="timeline">
    <li v-for="log of  frontmatter.worklog " :key="log.date">
      <div class="circle-container">
        <div class="circle"></div>
      </div>
      <div class="text-container">
        <h3 class="title">{{ log.title }}</h3>
        <h4 class="company">{{ log.company }}</h4>
        <div class="date">
          <span v-if="isValidDate(log.date.start)">{{ formatMonthYear(new Date(log.date.start)) }}</span>
          <span v-if="isValidDate(log.date.end)"> – {{ formatMonthYear(new Date(log.date.end)) }} ({{
            Utils.getRoundedAge(log.date.start, log.date.end)
          }})</span>
          <span v-else> – Present ({{
            Utils.getRoundedAge(log.date.start, new Date())
          }})</span>
        </div>
        <p class="summary">{{ log.summary }}</p>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
h3,
ul,
li,
p {
  margin: 0;
  padding: 0;
}

.timeline {
  list-style: none;
  margin: 16px 0;

  li {
    display: grid;
    grid-template-columns: 40px auto;
    margin: 16px 0;

    &:last-of-type {
      .circle-container::after {
        height: calc(100% - 16px);
      }
    }
  }

  .text-container {
    margin-left: 16px;
  }
}

.text-container {
  .title {
    margin-top: 6px;
  }

  .date {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--vp-c-text-2);
  }
}

.circle-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .circle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--vp-c-default-2);
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      background-color: var(--vp-c-bg);
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      border-radius: inherit;
    }
  }

  &::after {
    content: "";
    position: absolute;
    background-color: var(--vp-c-default-2);
    width: 4px;
    height: calc(100% + 16px);
    border-radius: inherit;
  }
}
</style>