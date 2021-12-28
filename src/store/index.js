// Vue 3
// import {provide, inject} from 'vue';
// import { createStore, Store } from 'vuex';
import { createStore } from 'vuex';
import { auth } from './modules/auth';


export default createStore({
  modules: {
    auth,
  },
});