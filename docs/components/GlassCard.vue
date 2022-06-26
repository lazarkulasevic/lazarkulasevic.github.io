<script setup>
const props = defineProps({
    height: {
        type: Number,
        default: 240
    },
    startLight: {
        type: Number,
        default: 0
    }
})
const height = `${props.height}px`

const handleOrder = (startLight) => {
    const lights = [0, 1, 2, 3]
    return [...lights.slice(startLight, 4), ...lights.slice(0, startLight)]
}
const lightOrder = handleOrder(props.startLight)
</script>

<template>
    <div class="card">
        <div class="bg-light">
            <span v-for="i of lightOrder" :key="i" :style="`--glass-card-bg-color: ${i};`"></span>
        </div>
        <div class="glass">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/variables.scss" as v;

.card {
    position: relative;
    width: calc(v-bind("height") * 1.4);
    height: v-bind("height");
}

.bg-light {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    span {
        position: absolute;
        top: 50%;
        width: v-bind("height");
        height: v-bind("height");
        display: block;
        border-radius: 50%;
        transform-origin: calc(v-bind("height") / 1.94) 0;
        transform: rotate(calc(90deg * var(--glass-card-bg-color)));
        filter: blur(calc(v-bind("height") / 4.75));
        opacity: 0.75;
        z-index: -1;
    }

    span:nth-of-type(1) {
        background: v.$base-green;
    }

    span:nth-of-type(2) {
        background: v.$base-yellow;
    }

    span:nth-of-type(3) {
        background: v.$base-blue;
    }

    span:nth-of-type(4) {
        background: v.$base-red;
    }
}

.glass {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    border: 2px solid var(--vp-c-white);
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -50%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        pointer-events: none;
        transform: skewX(345deg);
    }
}
</style>
