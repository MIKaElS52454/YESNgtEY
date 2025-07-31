// 代码生成时间: 2025-08-01 05:21:56
// Import necessary modules
const { defineNuxtModule } = require('@nuxt/kit')

// Define the module
export default defineNuxtModule({
  meta: {
    name: 'theme-toggle',
    compatibility: {
      // List of Nuxt.js versions the module is compatible with
      ssr: true, // Server-side rendering compatibility
      vite: false // Vite compatibility
    },
    hooks: {
      'modules:done': async (moduleContainer) => {
        // Initialize theme settings
        const defaultTheme = 'light'
        const currentTheme = localStorage.getItem('theme') || defaultTheme
        // Set theme on client and server side
        await setTheme(currentTheme)
      }
    }
  },
  // Define module runtime
  runtime: {},
  // Define module defaults
  defaults: {
    theme: 'light'
  },
  // Define module actions
  actions: {
    // Action to toggle theme
    toggleTheme({ $theme }) {
      try {
        const currentTheme = $theme.value
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        // Set new theme in theme store
        $theme.value = newTheme
        // Update local storage
        localStorage.setItem('theme', newTheme)
        console.log(`Theme switched to ${newTheme}`)
      } catch (error) {
        // Handle errors
        console.error('Error toggling theme:', error)
      }
    }
  },
  // Define module plugins
  plugins: [
    '~/plugins/themePlugin.js'
  ]
})

// Function to set theme
async function setTheme(theme) {
  // This function is called when the module is initialized
  // It sets the theme for both client and server side
  try {
    // Set theme in store
    this.$theme.value = theme
    // Update local storage
    localStorage.setItem('theme', theme)
  } catch (error) {
    // Handle errors
    console.error('Error setting theme:', error)
  }
}

// Define plugin for theme
export async function themePlugin(nuxtApp) {
  // Create a reactive theme property
  nuxtApp.provide('theme', {
    get: () => {
      const theme = localStorage.getItem('theme') || nuxtApp.$options.theme
      return theme
    },
    set: (value) => {
      // Handle theme change
      nuxtApp.$theme.value = value
    }
  })
}
