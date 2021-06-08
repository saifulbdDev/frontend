import axios from "axios";
let state = {
  
  category: [],
  
};
let mutations = {

   CATEGORY_DATA(state, category) {
    state.category = category;
  },
  // eslint-disable-next-line no-unused-vars
   CREATED(state, ) {
    
  },
  // eslint-disable-next-line no-unused-vars
   CATEGORY(state, ) {
    
  },
  
};
let actions = {
  Data({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/640/posts")
        .then((result) => {
          resolve(result);
          commit("CATEGORY_DATA", result.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  Created({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/640/posts", data)
        .then((result) => {
          resolve(result);
          commit("POST_CREATED",);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

 Update({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/category", data)
        .then((result) => {
          resolve(result);
          commit("POST_CATEGORY",);
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
  category(state) {
    return state.category;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};