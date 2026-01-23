import { defineConfig } from 'vite'

export default defineConfig({
  // Ensure environment variables are properly loaded
  envDir: '../',  // Look for .env in project root
  envPrefix: 'VITE_',  // Only expose vars with VITE_ prefix
})
