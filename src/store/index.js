// Vue 3
// import {provide, inject} from 'vue';
// import { createStore, Store } from 'vuex';
import { createStore } from 'vuex';
import { auth } from './modules/auth';
import { saveid } from './modules/saveid';
import { loading } from './modules/loading';


export default createStore({
  modules: {
    auth,
    saveid,
    loading
  },
});