export const state = {
  drawer: true,
};
export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
};
export const actions = {
  TOGGLE_DRAWER({ commit }) {
    commit("toggleDrawer");
  },
};
export const getters = {
  DRAWER_STATE(state) {
    return state.drawer;
  },
};
