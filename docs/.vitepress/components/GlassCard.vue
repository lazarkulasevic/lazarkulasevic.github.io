<script setup>
const props = defineProps({
  height: {
    type: Number,
    default: 240
  },
})
const height = `${props.height}px`
</script>

<template>
  <div class="card">
    <div class="bg-light"></div>
    <div class="glass">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../style/variables' as v;
@use '../style/breakpoints.scss' as b;

.card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(v-bind('height') * 1.4);
  height: v-bind('height');
}

.bg-light {
  position: absolute;
  width: 120%;
  height: 120%;
  background-color: v.$base-blue;
  background-image: linear-gradient(-45deg, v.$light-purple 50%, v.$light-blue 50%);
  filter: blur(64px);
  border-radius: 50%;

  @include b.md {
    width: 130%;
    height: 130%;
    filter: blur(80px);
  }
}

.glass {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  border: 2px solid var(--vp-c-white);
  box-shadow: inset 0 0 3px var(--vp-c-white);
  overflow: hidden;

  &::before {
    content: '';
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
