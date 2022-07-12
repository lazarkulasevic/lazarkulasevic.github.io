<script setup>
const props = defineProps({
    height: {
        type: Number,
        default: 180
    },
    width: {
        type: Number,
        default: 260
    },
    borderWidth: {
        type: Number,
        default: 5
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

const width = `${props.width}px`
const height = `${props.height}px`
const borderWidth = `${props.borderWidth}px`

</script>

<template>
    <div class="wrapper">
        <div class="display">
            <div class="content">
                <span class="title">{{ props.title }}</span>
                <span class="description">{{ props.description }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    width: v-bind('width');
    height: v-bind('height');
    background: linear-gradient(135deg, #14ffe9, #ffeb3b, #ff00e0);
    border-radius: 10px;
    cursor: default;
    animation: animate 4s linear infinite;

    .display {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(v-bind('width') - v-bind('borderWidth'));
        height: calc(v-bind('height') - v-bind('borderWidth'));
        text-align: center;
        background: #1b1b1b;
        border-radius: 8px;
        z-index: 100;
    }

    .display .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

@keyframes animate {
    100% {
        filter: hue-rotate(360deg);
    }
}
</style>
