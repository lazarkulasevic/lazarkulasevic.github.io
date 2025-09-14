<script setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  height: {
    type: Number,
    default: 400
  },
  autoStart: {
    type: Boolean,
    default: true
  },
  speed: {
    type: Number,
    default: 100
  }
})

const terminalHeight = `${props.height}px`
const isRunning = ref(false)
const currentLineIndex = ref(0)
const visibleLines = ref([])
const isTyping = ref(false)
const terminalContent = ref(null)

const deploymentCommands = [
  { text: '$ git add .', type: 'command', delay: 0 },
  { text: '$ git commit -m "feat: deploy awesome feature"', type: 'command', delay: 600 },
  { text: '$ git push origin main', type: 'command', delay: 600 },
  { text: 'Enumerating objects: 15, done.', type: 'output', delay: 300 },
  { text: 'Counting objects: 100% (15/15), done.', type: 'output', delay: 300 },
  { text: 'Compressing objects: 100% (8/8), done.', type: 'output', delay: 300 },
  { text: 'Writing objects: 100% (10/10), 2.3 KiB | 2.3 MiB/s, done.', type: 'output', delay: 300 },
  { text: 'Total 10 (delta 3), reused 0 (delta 0), pack-reused 0', type: 'output', delay: 600 },
  { text: 'remote: Resolving deltas: 100% (3/3), completed with 3 local objects.', type: 'output', delay: 300 },
  { text: 'To github.com:lazarkulasevic/lazarkulasevic.github.io.git', type: 'output', delay: 400 },
  { text: '   a1b2c3d..e4f5g6h  main -> main', type: 'output', delay: 300 },
  { text: '', type: 'spacer', delay: 1000 },
  { text: '$ npm run build', type: 'command', delay: 200 },
  { text: '> vitepress build', type: 'output', delay: 300 },
  { text: '✓ building client + server bundles...', type: 'output', delay: 400 },
  { text: '✓ rendering pages...', type: 'output', delay: 500 },
  { text: '✓ generating search index...', type: 'output', delay: 400 },
  { text: '✓ building finished in 2.3s', type: 'output', delay: 2000 },
  { text: '', type: 'spacer', delay: 1000 },
  { text: '$ npm run deploy', type: 'command', delay: 300 },
  { text: '> gh-pages -d dist', type: 'output', delay: 320 },
  { text: 'Published', type: 'output', delay: 800 },
  { text: '✨ Deployment successful!', type: 'success', delay: 1200 },
  { text: '🚀 Your site is now live at https://deployandpray.com', type: 'success', delay: 1000 }
]

const startAnimation = async () => {
  if (isRunning.value) return

  isRunning.value = true
  visibleLines.value = []
  currentLineIndex.value = 0

  for (let i = 0; i < deploymentCommands.length; i++) {
    const command = deploymentCommands[i]

    // Wait for the command's delay
    await new Promise(resolve => setTimeout(resolve, command.delay))

    // Add the line to visible lines
    visibleLines.value.push({
      ...command,
      id: i,
      isVisible: true
    })

    // Auto-scroll to bottom
    await nextTick()
    if (terminalContent.value) {
      terminalContent.value.scrollTop = terminalContent.value.scrollHeight
    }

    // Trigger typing animation for commands
    if (command.type === 'command') {
      isTyping.value = true
      await new Promise(resolve => setTimeout(resolve, props.speed))
      isTyping.value = false
    }

    currentLineIndex.value = i

    // Small delay between lines
    await new Promise(resolve => setTimeout(resolve, props.speed / 2))
  }

  // Final scroll to bottom to ensure last lines are visible
  await nextTick()
  if (terminalContent.value) {
    terminalContent.value.scrollTop = terminalContent.value.scrollHeight
  }

  // Restart animation after a delay
  setTimeout(() => {
    if (isRunning.value) {
      startAnimation()
    }
  }, 1000)
}

const stopAnimation = () => {
  isRunning.value = false
}

onMounted(() => {
  if (props.autoStart) {
    startAnimation()
  }
})

// Expose methods for parent components
defineExpose({
  startAnimation,
  stopAnimation
})
</script>

<template>
  <div class="terminal-window" :style="{ height: terminalHeight }">
    <!-- Terminal Header -->
    <div class="terminal-header">
      <div class="terminal-controls">
        <div class="control close"></div>
        <div class="control minimize"></div>
        <div class="control maximize"></div>
      </div>
      <div class="terminal-title">Terminal</div>
    </div>

    <!-- Terminal Body -->
    <div class="terminal-body">
      <div class="terminal-content" ref="terminalContent">
        <TransitionGroup name="line" tag="div" class="terminal-lines">
          <div v-for="line in visibleLines" :key="line.id" :class="['terminal-line', `line-${line.type}`]">
            <span v-if="line.type === 'command'" class="prompt">$</span>
            <span class="line-content">{{ line.text }}</span>
            <span v-if="line.type === 'command' && line.id === currentLineIndex && isTyping" class="cursor">|</span>
          </div>
        </TransitionGroup>

        <!-- Blinking cursor at the end -->
        <div v-if="!isRunning || currentLineIndex === deploymentCommands.length - 1" class="terminal-cursor">
          <span class="prompt">$</span>
          <span class="cursor">|</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../style/variables' as v;
@use '../style/breakpoints.scss' as b;

.terminal-window {
  width: 100%;
  max-width: 600px;
  background: #1a1a1a;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  font-family: var(--vp-font-family-mono);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #2d2d2d;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.terminal-controls {
  display: flex;
  gap: 8px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;

  &.close {
    background: #ff5f57;
  }

  &.minimize {
    background: #ffbd2e;
  }

  &.maximize {
    background: #28ca42;
  }
}

.terminal-title {
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  opacity: 0.8;
}

.terminal-body {
  height: calc(100% - 45px);
  background: #1a1a1a;
  overflow: hidden;
}

.terminal-content {
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
}

.terminal-lines {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.terminal-line {
  display: flex;
  align-items: center;
  min-height: 20px;
  font-size: 14px;
  line-height: 1.4;

  &.line-command {
    color: #ffffff;

    .prompt {
      color: #00ff88;
      margin-right: 8px;
      font-weight: 600;
    }
  }

  &.line-output {
    color: #cccccc;
    margin-left: 20px;
  }

  &.line-success {
    color: #00ff88;
    font-weight: 600;
    margin-left: 20px;
  }

  &.line-spacer {
    height: 8px;
  }
}

.line-content {
  flex: 1;
}

.cursor {
  color: #00ff88;
  animation: blink 1s infinite;
  margin-left: 2px;
}

.terminal-cursor {
  display: flex;
  align-items: center;
  margin-top: 4px;

  .prompt {
    color: #00ff88;
    margin-right: 8px;
    font-weight: 600;
  }
}

// Vue Transitions
.line-enter-active {
  transition: all 0.3s ease-out;
}

.line-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.line-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.line-leave-active {
  transition: all 0.3s ease-in;
}

.line-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.line-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.line-move {
  transition: transform 0.3s ease;
}

// Cursor blink animation
@keyframes blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

// Responsive design
@include b.md {
  .terminal-window {
    max-width: 600px;
  }

  .terminal-line {
    font-size: 14px;
  }
}

@include b.lg {
  .terminal-window {
    max-width: 600px;
  }

  .terminal-line {
    font-size: 14px;
  }
}
</style>
