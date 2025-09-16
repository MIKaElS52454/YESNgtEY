// 代码生成时间: 2025-09-16 12:41:14
// Import necessary modules
const { defineNuxtPlugin } = require('@nuxt/kit')
const { createStore } = require('vuex')

// Define the Vuex store
const store = createStore({
  // State
  state: () => ({
    notifications: []
  }),
  // Mutations
  mutations: {
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification)
    },
    REMOVE_NOTIFICATION(state, index) {
      state.notifications.splice(index, 1)
    },
  },
  // Actions
  actions: {
    addNotification({ commit }, notification) {
      commit('ADD_NOTIFICATION', notification)
    },
    removeNotification({ commit }, index) {
      commit('REMOVE_NOTIFICATION', index)
    },
  },
  // Getters
  getters: {
    notifications(state) {
      return state.notifications
    },
  }
})

// Define the Nuxt.js plugin
export default defineNuxtPlugin((nuxtApp) => {
  // Provide the store to the Nuxt.js app
  nuxtApp.provide('notification', {
    add: nuxtApp.$store.dispatch('addNotification'),
    remove: nuxtApp.$store.dispatch('removeNotification'),
    list: nuxtApp.$store.getters['notifications']
  })

  // Register the store with Nuxt.js
  nuxtApp.vueApp.use(store)
})

/*
 * Usage:
 * To add a notification, call `this.$notification.add({ message: 'Hello, World!' })`
 * To remove a notification, call `this.$notification.remove(0)`
 * To get the list of notifications, call `this.$notification.list`
 */