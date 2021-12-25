import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//Element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

//Vuetify
import vuetify from "./plugins/vuetify";

//Firebase
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDmNC81bkx0xoHUpAbNal2R5ocuC63b2_w",
  authDomain: "crud-desafio-52893.firebaseapp.com",
  projectId: "crud-desafio-52893",
  storageBucket: "crud-desafio-52893.appspot.com",
  messagingSenderId: "385487255675",
  appId: "1:385487255675:web:d09504ea3da218371f0ade",
  measurementId: "G-SZKE75KQNF"
};
initializeApp(firebaseConfig);

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
