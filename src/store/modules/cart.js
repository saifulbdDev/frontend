import axios from "axios";
import Config from "@/config.json";
let state = {
  carts: [],
  product_by_category: [],
};
let mutations = {
  CART_DATA(state, carts) {
    state.carts = carts;
  },
  DATA_SEARCH(state, carts) {
    state.product_by_category = carts;
  },
  // eslint-disable-next-line no-unused-vars
  SHOW(state, cart) {
    state.cart = cart;
  },
  // eslint-disable-next-line no-unused-vars
  CREATED(state) {},
  // eslint-disable-next-line no-unused-vars
  UPDATE(state) {},
};
let actions = {
  CartData({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(Config.BASE_URL + "/api/cart")
        .then((result) => {
          console.log(result.data.cart, "dd");
          resolve(result);
          commit("CART_DATA", result.data.cart);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  Created({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(Config.BASE_URL + "/api/cart", data)
        .then((result) => {
          resolve(result);
          commit("CREATED");
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  DataSearch({ commit }, search_params) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          Config.BASE_URL +
            "/api/cart/search-carts?page=1&category_id=" +
            (search_params ? search_params : "")
        )
        .then((result) => {
          console.log(result.data.carts.data);
          resolve(result);
          commit("DATA_SEARCH", result.data.carts.data);
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
        .get(Config.BASE_URL + "/api/cart/" + id)
        .then((result) => {
          resolve(result);
          commit("SHOW", result.data.cart);
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
        .delete(Config.BASE_URL + "/api/cart/" + id)
        .then((result) => {
          resolve(result);
          commit("SHOW", result.data.cart);
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
        .post(`${Config.BASE_URL}/api/cart/${data.id}`, data.data, {
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
