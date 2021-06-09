import axios from "axios";
import Config from "@/config.json";
let state = {
  brands: [],
  brand: [],
};
let mutations = {
  BRAND_DATA(state, brands) {
    state.brands = brands;
  },
  // eslint-disable-next-line no-unused-vars
  SHOW(state, brand) {
    state.brand = brand;
  },
  // eslint-disable-next-line no-unused-vars
  CREATED(state) {},
  // eslint-disable-next-line no-unused-vars
  UPDATE(state) {},
};
let actions = {
  BrandData({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(Config.BASE_URL + "/api/brand")
        .then((result) => {
          console.log(result.data.brands.data);
          resolve(result);
          commit("BRAND_DATA", result.data.brands.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  Created({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(Config.BASE_URL + "/api/brand", data)
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
        .get(Config.BASE_URL + "/api/brand/" + id)
        .then((result) => {
          resolve(result);
          commit("SHOW", result.data.brand);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  Update({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${Config.BASE_URL}/api/brand/${data.id}`, data.data)
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
  brands(state) {
    return state.brands;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
