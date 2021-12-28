
import { getCurrentInstance } from 'vue'
import authHeader from './auth-header';

const app = getCurrentInstance();
const $axios = app.appContext.config.globalProperties.$axios;
const $url_rest = app.appContext.config.globalProperties.$url_rest;


const API_URL = $url_rest + '/api/test/';

class UserService {
  getPublicContent() {
    return $axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return $axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return $axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return $axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();