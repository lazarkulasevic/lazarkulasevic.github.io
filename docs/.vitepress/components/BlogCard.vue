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
  },
  tags: {
    type: Array,
    default: () => []
  },
  author: {
    type: String,
    default: 'Lazar Kulasevic'
  },
  authorAvatar: {
    type: String,
    default: ''
  }
})

const handleClick = () => {
  emit('click', props.path)
}
</script>

<template>
  <article class="blog-card" tabindex="0" @click="handleClick">
    <!-- Layer 1: Featured Image (base) -->
    <div class="image-section">
      <div class="date-overlay">
        <svg class="calendar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M16 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{{ props.publishedOn }}</span>
      </div>
      <img :src="props.image" :alt="props.title" />
    </div>

    <!-- Layer 2: Glassmorphism Stripe (on top of image) -->
    <div class="glassmorphism-stripe">
      <div class="metadata">
        <div class="tag" v-for="(tag, index) in (props.tags || []).slice(0, 3)" :key="index">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              fill="none" />
          </svg>
          <span>{{ tag }}</span>
        </div>
      </div>
      <button class="read-more-btn" @click.stop="handleClick">
        <span>→ Read More</span>
      </button>
      <div class="read-more-text" @click.stop="handleClick">→ Read More</div>
      <div class="read-more-text-mobile">→ Read More</div>
    </div>

    <!-- Layer 3: Text Section (on top of glass layer) -->
    <div class="text-section">
      <div class="author-info">
        <div class="avatar">
          <svg v-if="!authorAvatar" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
              fill="currentColor" />
            <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor" />
          </svg>
          <img v-else :src="authorAvatar" :alt="author" />
        </div>
        <span class="author-text">by {{ props.author }}</span>
      </div>
      <h2 class="title">{{ props.title }}</h2>
      <p class="description">{{ props.description }}</p>
    </div>

    <div class="read-more-guidance">→ Read More</div>
  </article>
</template>

<style lang="scss" scoped>
@use '../style/breakpoints' as b;

.blog-card {
  cursor: pointer;
  position: relative;
  width: 100%;
  min-height: 400px;
  border-radius: 14px;
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 4px 20px -12px rgba(0, 0, 0, 0.25);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.2s ease-in-out;
    pointer-events: none;
    z-index: 5;
  }

  // Layer 1: Featured Image (base layer - fills entire card)
  .image-section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }

    .date-overlay {
      position: absolute;
      top: 18px;
      right: 18px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 9px 14px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 7px;
      z-index: 4;
      font-size: 12px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      letter-spacing: 0.01em;

      .calendar-icon {
        width: 15px;
        height: 15px;
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }

  // Layer 2: Glassmorphism Stripe (on top of image)
  .glassmorphism-stripe {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    z-index: 11;
    gap: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

    .metadata {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      flex: 1;

      .tag {
        display: flex;
        align-items: center;
        gap: 6px;
        color: rgba(255, 255, 255, 0.85);
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.01em;
        white-space: nowrap;

        .icon {
          width: 14px;
          height: 14px;
          color: rgba(255, 255, 255, 0.75);
          flex-shrink: 0;
        }
      }
    }

    .read-more-text-mobile {
      display: none;
    }
  }

  // Layer 3: Text Section (on top of glass layer)
  .text-section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 0%, rgba(45, 62, 79, 0.3) 40%, rgba(45, 62, 79, 0.85) 70%, #2d3e4f 100%);
    padding: 24px 28px 120px 28px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 10;
    pointer-events: none;

    >* {
      pointer-events: auto;
    }

    .author-info {
      position: absolute;
      top: 16px;
      left: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0;
      z-index: 11;

      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-shrink: 0;

        svg {
          width: 22px;
          height: 22px;
          color: rgba(255, 255, 255, 0.65);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .author-text {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.65);
        font-weight: 400;
        letter-spacing: 0.01em;
      }
    }

    .title {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      font-size: 28px;
      font-weight: 700;
      line-height: 1.15;
      color: #ffffff;
      margin: 0 0 18px 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      letter-spacing: -0.02em;
    }

    .description {
      color: rgba(255, 255, 255, 0.85);
      font-size: 14px;
      line-height: 1.65;
      font-weight: 400;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      letter-spacing: 0.01em;
    }
  }

  .glassmorphism-stripe .read-more-btn {
    display: none;
  }

  .glassmorphism-stripe .read-more-text {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.15) 30%, rgba(59, 130, 246, 0.4) 60%, rgba(59, 130, 246, 0.7) 85%, rgba(59, 130, 246, 1) 100%);
    backdrop-filter: blur(10px) saturate(150%);
    -webkit-backdrop-filter: blur(10px) saturate(150%);
    color: white;
    padding: 12px 22px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 10px;
    font-family: inherit;
    white-space: nowrap;
    flex-shrink: 0;
    letter-spacing: 0.01em;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease-in-out;

    &:hover {
      background: linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.45) 60%, rgba(59, 130, 246, 0.75) 85%, rgba(59, 130, 246, 1) 100%);
    }

    &:active {
      transform: translateY(1px);
      box-shadow: 0 1px 4px rgba(59, 130, 246, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.2);
      background: linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.1) 30%, rgba(59, 130, 246, 0.35) 60%, rgba(59, 130, 246, 0.65) 85%, rgba(59, 130, 246, 0.95) 100%);
    }
  }

  &:hover {
    box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.4);

    &::after {
      background: rgba(0, 0, 0, 0.25);
    }
  }

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  .read-more-guidance {
    display: none;
  }

  // Mobile optimizations (below 480px)
  @media (max-width: 479px) {
    min-height: 350px;

    .image-section {
      .date-overlay {
        top: 16px;
        right: 16px;
        padding: 6px 10px;
        font-size: 10px;
        border-radius: 8px;
        z-index: 12;
      }
    }

    .glassmorphism-stripe {
      bottom: 16px;
      left: 16px;
      right: 16px;
      padding: 12px 16px;
      flex-wrap: nowrap;
      justify-content: space-between;
      z-index: 11;

      .metadata {
        gap: 8px;
        flex: 0 0 auto;

        .tag {
          font-size: 9px;
          gap: 4px;
          padding: 0;
          background: none;
          border-radius: 0;

          .icon {
            width: 10px;
            height: 10px;
          }

          // Hide all tags after the first one on mobile
          &:nth-child(n+2) {
            display: none;
          }
        }
      }

      .read-more-btn {
        display: none;
      }

      .read-more-text {
        display: none;
      }

      .read-more-text-mobile {
        display: block;
        font-size: 11px;
        font-weight: 600;
        color: white;
        letter-spacing: 0.04em;
        pointer-events: none;
        white-space: nowrap;
        flex-shrink: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      }
    }

    .text-section {
      padding: 50px 20px 100px 20px;
      background: linear-gradient(to bottom, transparent 0%, rgba(45, 62, 79, 0.4) 50%, rgba(45, 62, 79, 0.9) 75%, #2d3e4f 100%);
      z-index: 10;
      justify-content: flex-end;

      .author-info {
        top: 16px;
        left: 16px;
        margin-bottom: 0;

        .avatar {
          width: 28px;
          height: 28px;

          svg {
            width: 16px;
            height: 16px;
          }
        }

        .author-text {
          font-size: 10px;
        }
      }

      .title {
        font-size: 24px;
        margin-bottom: 12px;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        line-height: 1.2;
      }

      .description {
        font-size: 14px;
        line-height: 1.6;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        margin-bottom: 0;
      }
    }

    .read-more-guidance {
      display: none;
    }
  }

  @include b.sm {
    min-height: 420px;

    .text-section {
      padding: 28px 32px 130px 32px;

      .author-info {
        margin-bottom: 22px;
      }

      .title {
        font-size: 34px;
        margin-bottom: 20px;
        -webkit-line-clamp: 2;
        line-clamp: 2;
      }

      .description {
        font-size: 15px;
        line-height: 1.7;
        -webkit-line-clamp: 3;
        line-clamp: 3;
      }
    }

    .glassmorphism-stripe {
      bottom: 24px;
      left: 24px;
      right: 24px;
      padding: 16px 22px;
    }

    .glassmorphism-stripe .read-more-btn {
      padding: 13px 26px;
      font-size: 15px;
    }
  }

  @include b.md {
    min-height: 480px;

    .text-section {
      padding: 32px 36px 140px 36px;

      .author-info {
        margin-bottom: 24px;
      }

      .title {
        font-size: 38px;
        margin-bottom: 22px;
      }

      .description {
        font-size: 16px;
        line-height: 1.7;
      }
    }

    .glassmorphism-stripe {
      bottom: 28px;
      left: 28px;
      right: 28px;
      padding: 18px 24px;
    }

    .glassmorphism-stripe .read-more-btn {
      padding: 14px 28px;
      font-size: 15px;
    }
  }
}
</style>
