import axios from "axios";
import Config from "@/config.json";
let state = {
  categories: [],
  category: [],
};
let mutations = {
  CATEGORY_DATA(state, categories) {
    state.categories = categories;
  },
  // eslint-disable-next-line no-unused-vars
  SHOW(state, category) {
    state.category = category;
  },
  // eslint-disable-next-line no-unused-vars
  CREATED(state) {},
  // eslint-disable-next-line no-unused-vars
  UPDATE(state) {},
};
let actions = {
  Data({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(Config.BASE_URL + "/api/category")
        .then((result) => {
          console.log(result.data.categories.data);
          resolve(result);
          commit("CATEGORY_DATA", result.data.categories.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  Created({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(Config.BASE_URL + "/api/category", data)
        .then((result) => {
          resolve(result);
          commit("CREATED");
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  Show({ commit }, id) {
    return new Promise((resolve, reject) => {
      console.log(id);
      axios
        .get(Config.BASE_URL + "/api/category/" + id)
        .then((result) => {
          resolve(result);
          commit("SHOW", result.data.category);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  Delete({ commit }, id) {
    return new Promise((resolve, reject) => {
      console.log(id);
      axios
        .delete(Config.BASE_URL + "/api/category/" + id)
        .then((result) => {
          resolve(result);
          commit("SHOW", result.data.category);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  Update({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${Config.BASE_URL}/api/category/${data.id}`, data.data)
        .then((result) => {
          resolve(result);
          commit("UPDATE");
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
let getters = {
  posts(state) {
    return state.posts;
  },
  categories(state) {
    return state.categories;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
