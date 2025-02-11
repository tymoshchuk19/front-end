/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import user from "../api/user";

Vue.use(Vuex);

/**
 * Initial State
 *
 * Shape:
 *  user: { _id, nome, email, password, bDate, about, image, [friends]}
 */
const state = {
  user: {
    nome: null
  }
};

/**
 * Getters
 */
const getters = {
  getAllFriends(state) {
    return state.user.friends;
  },
  getId(state) {
    return state.user._id;
  }
};

/**
 * Mutations
 */
const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  }
};

/**
 * Actions
 */
const actions = {
  async setUser({ commit }, { email, password }) {
    const currentUser = await user.login(email, password);
    commit("setUser", { user: currentUser });
  },
  async getUser({ commit }) {
    const currentUser = await user.getUser();
    console.log(currentUser);

    commit("setUser", { user: currentUser });
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
export default store;

setInterval(() => store.dispatch("getUser"), 5000);
