<script setup>
const props = defineProps({
    height: {
        type: Number,
        default: 240
    }
})
const height = `${props.height}px`
</script>

<template>
    <div class="card">
        <div class="bg-light">
            <span style="--glass-card-bg-color: 0;"></span>
            <span style="--glass-card-bg-color: 1;"></span>
            <span style="--glass-card-bg-color: 2;"></span>
            <span style="--glass-card-bg-color: 3;"></span>
        </div>
        <div class="glass">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    position: relative;
    width: calc(v-bind('height') * 1.4);
    height: v-bind('height');
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
        width: v-bind('height');
        height: v-bind('height');
        display: block;
        border-radius: 50%;
        transform-origin: calc(v-bind('height') / 1.94) 0;
        transform: rotate(calc(90deg * var(--glass-card-bg-color)));
        filter: blur(calc(v-bind('height') / 4.75));
        opacity: 0.75;
    }

    span:nth-of-type(1) {
        background: #33ca7f;
    }

    span:nth-of-type(2) {
        background: #fdca40;
    }

    span:nth-of-type(3) {
        background: #3772ff;
    }

    span:nth-of-type(4) {
        background: #ff1654;
    }
}

.glass {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    border: 2px solid var(--vp-c-white);
    overflow: hidden;
    justify-content: flex-start;
    align-items: flex-end;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -50%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        pointer-events: none;
        transform: skewX(345deg);
    }
}
</style>
