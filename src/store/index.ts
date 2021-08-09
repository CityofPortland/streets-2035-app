import { createStore } from 'vuex';

export default createStore({
  state: {
    header: {
      color: 'transparent',
    },
  },
  mutations: {
    setHeaderOptions(state, payload) {
      state.header = payload;
    },
  },
  actions: {
    setHeader({ state, commit }, header) {
      header = { ...state.header, ...header };
      commit('setHeaderOptions', header);
    },
  },
  modules: {},
});
