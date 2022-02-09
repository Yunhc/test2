
import $axios from 'axios';

const API_URL = process.env.VUE_APP_SERVER_URL + '/api/auth/';
const lang = 'KR';

class AuthService {
  login(user) {
    // console.log("[auth.service] = login -- ", lang + '/' + user);
    return $axios
      .post(API_URL + 'signin', {
        lang: lang,
        userid: user.value.userid,
        password: user.value.password,
      })
      .then(response => {

        // console.log("[auth.service] = response -- ", response.data);
        // console.log("[auth.service] = response -- ", response.data[0].username);

        if (response.data[0].code == "OK") {
          // console.log("[auth.service] = response -- ", response.data[0].code);
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return $axios.post(API_URL + 'signup', {
      username: user.username,
      password: user.password
    });
  }
}

export default new AuthService();