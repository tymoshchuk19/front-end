import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import Vuex from "vuex";
import router from "./router";
import store from "./store";

axios.defaults.withCredentials = true;

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
