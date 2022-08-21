<script setup>
defineProps({
    title: String,
    publishedOn: String,
    updatedOn: String,
    image: String
})
</script>

<template>
    <h1 class="title">{{ title }}</h1>
    <p class="date">
        <span>Published: {{ Utils.formatDateTime(publishedOn) }}</span>
        <span v-if="updatedOn">
            / {{ Utils.formatDateTime(updatedOn) }}
        </span>
    </p>
    <img :src="image" :alt="title" />
</template>

<style lang="scss" scoped>
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
</style>
