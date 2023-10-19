<script setup>
const emit = defineEmits(['click'])
const props = defineProps({
  text: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: false
  },
  enableHover: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <span
    class="tag"
    :class="{ active: props.isActive, enableHover: props.enableHover }"
    @click="emit('click', props.text)"
    >{{ props.text }}</span
  >
</template>

<style lang="scss" scoped>
@use '../style/variables' as v;

.tag {
  display: inline-flex;
  border-radius: 8px;
  padding: 2px 8px;
  background-color: var(--vp-c-default-3);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-default-1);
  transition: background-color 0.1s ease;
  text-wrap: nowrap;

  &.enableHover {
    cursor: pointer;

    &:hover {
      background-color: var(--vp-c-gray-2);
    }
  }

  &.active {
    color: var(--vp-c-gray-3);
    background-color: var(--vp-c-indigo-1);

    &:hover {
      background-color: var(--vp-c-indigo-1);
    }
  }
}
</style>
