import axios from "axios";
import Config from "@/config.json";
let state = {
  products: [],
  product: [],
};
let mutations = {
  PRODUCT_DATA(state, products) {
    state.products = products;
  },
  // eslint-disable-next-line no-unused-vars
  SHOW(state, product) {
    state.product = product;
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
        .get(Config.BASE_URL + "/api/product")
        .then((result) => {
          console.log(result.data.products.data);
          resolve(result);
          commit("PRODUCT_DATA", result.data.products.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  Created({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(Config.BASE_URL + "/api/product", data)
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
        .get(Config.BASE_URL + "/api/product/" + id)
        .then((result) => {
          resolve(result);
          commit("SHOW", result.data.product);
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
        .delete(Config.BASE_URL + "/api/product/" + id)
        .then((result) => {
          resolve(result);
          commit("SHOW", result.data.product);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  Update({ commit }, data) {
    data.data.append("_method", "put");
    return new Promise((resolve, reject) => {
      axios
        .post(`${Config.BASE_URL}/api/product/${data.id}`, data.data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
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
