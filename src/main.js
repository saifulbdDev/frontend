import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";

import VueMoment from "vue-moment";
import moment from "moment-timezone";

Vue.use(VueMoment, {
  moment,
});
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
const accessToken = localStorage.getItem("auth_token");
if (accessToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
