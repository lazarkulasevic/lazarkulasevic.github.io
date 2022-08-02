<script setup>
const emit = defineEmits(['click'])

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishedOn: {
        type: String,
        required: true
    }
})

</script>

<template>
    <div class="blog-card" tabindex="0" @click="emit('click', props.path)">
        <div class="image">
            <img :src="props.image" :alt="props.title" />
        </div>
        <div class="text">
            <h2 class="title">{{ props.title }}</h2>
            <p class="published-on">{{ props.publishedOn }}</p>
            <p class="description">
                {{ props.description }}
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/breakpoints.scss" as b;

.blog-card {
    cursor: pointer;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
    min-height: 220px;
    border-radius: 14px;
    border: 1px solid transparent;
    transition: border-color 0.2s ease-in-out;
    background-color: var(--vp-c-bg);

    .text {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 2;
        height: calc(100% - 14px);
        overflow: hidden;
        padding: 12px 12px 0 12px;
    }

    .title {
        font-family: Helvetica, sans-serif;
        font-size: 24px;
        font-weight: bold;
        font-style: italic;
        line-height: 1.1;
        color: var(--vp-c-brand-dark);
        transition: color 0.2s ease-in-out;
    }

    .published-on {
        display: none;
    }

    .description {
        color: var(--vp-c-text-1);
        font-weight: 400;
    }

    .image {
        position: relative;

        img {
            object-fit: cover;
            height: 100%;
            border-radius: 14px;
            pointer-events: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }

        &::after {
            content: "";
            border-radius: 14px;
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: var(--vp-c-bg);
            opacity: 0.7;
        }
    }

    &::after {
        content: "";
        border-radius: 14px;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: transparent;
        opacity: 1;
        z-index: 1;
        box-shadow: inset 0 0 0 1px var(--vp-c-brand-lighter);
    }

    &:focus,
    &:hover {
        border-color: var(--vp-c-brand-lighter);

        .title {
            color: var(--vp-c-brand);
        }
    }

    @include b.sm {
        .title {
            font-size: 28px;
        }
    }

    @include b.md {
        grid-template-columns: 1fr 2fr;

        .text {
            position: relative;
        }

        .title {
            font-size: 32px;
        }

        .published-on {
            display: block;
            font-size: 11px;
            font-weight: 500;
        }

        .image {
            img {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }

            &::after {
                display: none;
            }
        }
    }
}

</style>
