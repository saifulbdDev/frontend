let state = {
  drawer: true,
  cart: false
}
let mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  toggleCart(state) {
    state.cart = !state.cart;
  }
}
let actions = {
  TOGGLE_DRAWER({ commit }) {
    commit('toggleDrawer');
  },
  TOGGLE_CART({ commit }) {
    commit('toggleCart');
  }
}
let getters = {
  DRAWER_STATE(state) {
    return state.drawer;
  },
  CART_STATE(state) {
    return state.cart;
  }
}

export default {
  namespaced: true,  
  state,
  getters,
  actions, 
  mutations
}