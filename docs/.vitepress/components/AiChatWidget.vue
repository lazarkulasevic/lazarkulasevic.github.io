<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { marked } from 'marked'

// Configure marked for proper markdown rendering
marked.setOptions({
  breaks: true, // Convert \n to <br>
  gfm: true, // GitHub Flavored Markdown
  headerIds: false, // Don't add IDs to headers
  mangle: false, // Don't escape emails
})

const messages = ref([])
const userInput = ref('')
const isOpen = ref(false)
const isTyping = ref(false)
const messagesContainer = ref(null)

onMounted(() => {
  // No need to load knowledge base - backend handles it
})

onUnmounted(() => {
  // Cleanup: remove class if component is destroyed while chat is open
  document.body.classList.remove('chat-open')
})

watch(messages, async () => {
  await nextTick()
  scrollToBottom()
}, { deep: true })

watch(isTyping, async () => {
  await nextTick()
  scrollToBottom()
})

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

async function sendMessage() {
  const message = userInput.value.trim()
  if (!message) return

  messages.value.push({ role: 'user', content: message })
  userInput.value = ''
  isTyping.value = true

  try {
    // Build conversation history (last 4 messages)
    const recentMessages = messages.value.slice(-4)
    const history = recentMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }))

    // Call your backend API
    const response = await fetch('https://shared-service.vercel.app/api/deployandpray/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        history: history
      })
    })

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded')
      } else if (response.status === 400) {
        throw new Error('Bad request')
      } else {
        throw new Error('API error')
      }
    }

    const data = await response.json()
    const aiReply = data.reply?.trim() || 'Sorry, I could not generate a response.'

    messages.value.push({ role: 'assistant', content: aiReply })
  } catch (error) {
    let errorMsg = 'Sorry, something went wrong. '

    // Backend API error handling
    if (error.message?.includes('Rate limit')) {
      errorMsg = '🚫 Too many requests. The backend is rate-limiting to prevent abuse. Please wait a moment and try again, or reach out on LinkedIn: https://www.linkedin.com/in/lazarkulasevic/'
    } else if (error.message?.includes('Bad request')) {
      errorMsg = 'Invalid message format. Please try again!'
    } else if (error.message?.includes('fetch') || error.message?.includes('network') || error.message?.includes('Failed to fetch')) {
      errorMsg = 'Unable to reach the AI service. Please check your connection or try again later. For direct contact: https://www.linkedin.com/in/lazarkulasevic/'
    } else {
      errorMsg += 'Please check my portfolio at deployandpray.com or contact me on LinkedIn!'
    }

    messages.value.push({
      role: 'assistant',
      content: errorMsg
    })
  } finally {
    isTyping.value = false
  }
}

function handleKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

function parseMarkdown(content) {
  // Parse markdown to HTML
  const html = marked.parse(content)

  // Basic XSS protection - allow only safe tags
  const div = document.createElement('div')
  div.innerHTML = html

  // Remove script tags for safety
  const scripts = div.getElementsByTagName('script')
  for (let i = scripts.length - 1; i >= 0; i--) {
    scripts[i].parentNode.removeChild(scripts[i])
  }

  return div.innerHTML
}

async function toggleChat() {
  isOpen.value = !isOpen.value

  // Toggle body scroll lock class for mobile
  if (isOpen.value) {
    document.body.classList.add('chat-open')

    if (messages.value.length === 0) {
      // Add welcome message
      messages.value.push({
        role: 'assistant',
        content: 'Hi! 👋 I\'m an AI assistant here to answer questions about Lazar\'s experience, skills, and projects. What would you like to know?'
      })
    }

    // Scroll to bottom when opening chat
    await nextTick()
    setTimeout(() => scrollToBottom(), 100)
  } else {
    document.body.classList.remove('chat-open')
  }
}
</script>

<template>
  <!-- Chat button -->
  <Transition name="fade">
    <button v-if="!isOpen" class="chat-button" @click="toggleChat" aria-label="Open chat">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  </Transition>

  <!-- Chat window -->
  <Transition name="fade">
    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <div class="header-content">
          <div class="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 8V4H8"></path>
              <rect width="16" height="12" x="4" y="8" rx="2"></rect>
              <path d="M2 14h2"></path>
              <path d="M20 14h2"></path>
              <path d="M15 13v2"></path>
              <path d="M9 13v2"></path>
            </svg>
            <span class="online-dot"></span>
          </div>
          <div class="header-text">
            <h3>AI Assistant</h3>
            <p>Usually replies instantly</p>
          </div>
        </div>
        <button class="close-btn" @click="toggleChat" aria-label="Close chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(msg, index) in messages" :key="index" :class="['message-wrapper', msg.role]">
          <div class="message" :class="msg.role" v-html="parseMarkdown(msg.content)"></div>
        </div>
        <div v-if="isTyping" class="message-wrapper assistant">
          <div class="message assistant typing">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <div class="chat-input-wrapper">
        <div class="chat-input">
          <input v-model="userInput" @keypress="handleKeyPress" placeholder="Ask about experience, skills, projects..."
            :disabled="isTyping" />
          <button @click="sendMessage" :disabled="!userInput.trim() || isTyping" class="send-btn"
            aria-label="Send message">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <div class="chat-footer">
          <span class="disclaimer">AI-generated answers may occasionally be inaccurate</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Simple fade in/out */
.fade-enter-active {
  transition: opacity 0.2s ease-in;
}

.fade-leave-active {
  transition: opacity 0.15s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Chat button */
.chat-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--vp-c-brand-3);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
}

.chat-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  background: var(--vp-c-brand-2);
}

.chat-button:active {
  transform: scale(1.05);
}

/* Chat window */
.chat-window {
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 400px;
  height: 600px;
  max-height: calc(100vh - 120px);
  background: var(--vp-c-bg);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  overscroll-behavior: contain;
}

/* Chat header */
.chat-header {
  padding: 16px 20px;
  background: var(--vp-c-brand-3);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  user-select: none;
  /* Prevent text selection during swipe */
  -webkit-user-select: none;
  touch-action: pan-y;
  /* Allow vertical pan gesture */
}


.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.online-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid var(--vp-c-brand-3);
}

.avatar svg {
  width: 22px;
  height: 22px;
  stroke-width: 2;
}

.header-text h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.header-text p {
  font-size: 12px;
  opacity: 0.9;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Messages area */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--vp-c-bg-soft);
  overscroll-behavior: contain;
  /* Prevent scroll chaining to page behind */
  -webkit-overflow-scrolling: touch;
  /* Smooth scrolling on iOS */
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-3);
}

.message-wrapper {
  display: flex;
  width: 100%;
}

.message-wrapper.user {
  justify-content: flex-end;
}

.message-wrapper.assistant {
  justify-content: flex-start;
}

.message {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 16px;
  word-wrap: break-word;
  line-height: 1.5;
  font-size: 14px;
}

.message.user {
  background: var(--vp-c-brand-3);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-bottom-left-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

/* Markdown formatting inside messages */
.message :deep(p) {
  margin: 0 0 8px 0;
  line-height: 1.6;
}

.message :deep(p:first-child) {
  margin-top: 0;
}

.message :deep(p:last-child) {
  margin-bottom: 0;
}

.message :deep(p:only-child) {
  margin: 0;
}

.message :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.message :deep(em) {
  font-style: italic;
}

.message :deep(code) {
  background: var(--vp-c-bg-soft);
  padding: 3px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 0.9em;
  border: 1px solid var(--vp-c-divider);
}

.message.user :deep(code) {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.message :deep(pre) {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
  border: 1px solid var(--vp-c-divider);
}

.message :deep(pre:first-child) {
  margin-top: 0;
}

.message :deep(pre:last-child) {
  margin-bottom: 0;
}

.message :deep(pre code) {
  background: none;
  padding: 0;
  border: none;
  font-size: 13px;
  line-height: 1.5;
}

.message :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  word-break: break-word;
  border-bottom: 1px solid var(--vp-c-brand-1);
  transition: opacity 0.2s;
}

.message :deep(a:hover) {
  opacity: 0.8;
}

.message.user :deep(a) {
  color: white;
  border-bottom-color: rgba(255, 255, 255, 0.6);
}

.message :deep(ul),
.message :deep(ol) {
  margin: 8px 0;
  padding-left: 24px;
  list-style-position: outside;
}

.message :deep(ul) {
  list-style-type: disc;
}

.message :deep(ol) {
  list-style-type: decimal;
}

.message :deep(li) {
  margin: 6px 0;
  line-height: 1.6;
  display: list-item;
}

.message :deep(li):first-child {
  margin-top: 0;
}

.message :deep(li):last-child {
  margin-bottom: 0;
}

.message :deep(ul ul),
.message :deep(ol ul) {
  list-style-type: circle;
  margin-top: 4px;
}

.message :deep(ul ol),
.message :deep(ol ol) {
  list-style-type: lower-alpha;
  margin-top: 4px;
}

.message :deep(blockquote) {
  border-left: 3px solid var(--vp-c-brand-1);
  padding: 8px 0 8px 16px;
  margin: 12px 0;
  background: var(--vp-c-bg-soft);
  border-radius: 0 4px 4px 0;
}

.message :deep(blockquote p) {
  margin: 4px 0;
}

.message :deep(h1),
.message :deep(h2),
.message :deep(h3),
.message :deep(h4) {
  margin: 16px 0 8px 0;
  font-weight: 600;
  line-height: 1.4;
}

.message :deep(h1:first-child),
.message :deep(h2:first-child),
.message :deep(h3:first-child),
.message :deep(h4:first-child) {
  margin-top: 0;
}

.message :deep(h1) {
  font-size: 1.25em;
}

.message :deep(h2) {
  font-size: 1.15em;
}

.message :deep(h3) {
  font-size: 1.1em;
}

.message :deep(h4) {
  font-size: 1.05em;
}

.message :deep(hr) {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 16px 0;
}

.message :deep(table) {
  border-collapse: collapse;
  margin: 12px 0;
  width: 100%;
  font-size: 0.9em;
}

.message :deep(th),
.message :deep(td) {
  border: 1px solid var(--vp-c-divider);
  padding: 6px 12px;
  text-align: left;
}

.message :deep(th) {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

/* Typing indicator */
.message.typing {
  display: flex;
  gap: 4px;
  padding: 16px;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-text-2);
  animation: typing 1.4s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {

  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }

  30% {
    opacity: 1;
    transform: translateY(-4px);
  }
}

/* Input area */
.chat-input-wrapper {
  flex-shrink: 0;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

.chat-input {
  display: flex;
  gap: 8px;
  padding: 16px 16px 0;
  align-items: center;
}

.chat-input input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 24px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.chat-input input:focus {
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-bg);
}

.chat-input input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-brand-3);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.chat-footer {
  padding: 8px 16px 12px;
  text-align: center;
  font-size: 11px;
  color: var(--vp-c-text-3);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.chat-footer .disclaimer {
  font-size: 10px;
  opacity: 0.7;
  font-style: italic;
  line-height: 1.2;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .chat-window {
    position: fixed;
    inset: 0;
    /* top: 0, right: 0, bottom: 0, left: 0 */
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    /* Use dynamic viewport height on mobile (avoids address bar issues) */
    border-radius: 0;
    max-width: 100%;
    max-height: 100%;
    z-index: 9999;
    /* Ensure it's above everything */
  }

  .chat-header {
    padding-top: max(16px, env(safe-area-inset-top));
    /* iOS notch */
  }

  .chat-button {
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    z-index: 1000;
  }

  .message {
    max-width: 90%;
  }

  .chat-messages {
    padding: 16px;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    /* Smooth scrolling on iOS */
  }

  .chat-input-wrapper {
    background: var(--vp-c-bg);
    padding-bottom: max(16px, env(safe-area-inset-bottom));
    /* iOS home indicator */
  }
}

@media (max-width: 480px) {
  .chat-header {
    padding: 12px 16px;
  }

  .header-text h3 {
    font-size: 14px;
  }

  .header-text p {
    font-size: 11px;
  }

  .chat-messages {
    padding: 16px;
  }

  .chat-input {
    padding: 12px;
  }

  .chat-input input {
    font-size: 16px;
    /* Prevents zoom on iOS */
  }
}
</style>

<style>
/* Global styles - body scroll lock for mobile chat */
@media (max-width: 768px) {
  body.chat-open {
    overflow: hidden !important;
    position: fixed;
    width: 100%;
    height: 100%;
  }
}
</style>
