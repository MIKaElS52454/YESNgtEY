// 代码生成时间: 2025-09-05 06:39:55
const { createStore } = require('@nuxtjs/redux-module')

// Define the initial state of the shopping cart
const initialState = {
  items: [],
  total: 0,
}

// Define actions that can be dispatched
const actions = {
  // Add an item to the cart
  addToCart({ commit }, product) {
    if (product.stock <= 0) {
      throw new Error('Product is out of stock')
    }
    commit('addItem', product)
  },
  // Remove an item from the cart
  removeFromCart({ commit }, product) {
    commit('removeItem', product)
  },
}

// Define mutations that modify the state
const mutations = {
  addItem(state, product) {
    const existingItem = state.items.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      state.items.push({ ...product, quantity: 1 })
    }
    state.total += product.price
  },
  removeItem(state, product) {
    const existingItem = state.items.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity -= 1
      if (existingItem.quantity <= 0) {
        state.items = state.items.filter(item => item.id !== product.id)
      }
      state.total -= product.price
    }
  },
}

// Create the shopping cart store
const store = createStore('shoppingCart', {
  state: initialState,
  actions,
  mutations,
})

module.exports = store

// Note: This is a basic implementation and does not handle
// persisting the cart across sessions or complex scenarios
// such as cart item limits, promotions, or asynchronous
// operations. These would need to be added for a complete solution.
