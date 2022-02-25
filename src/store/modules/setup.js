//환경변수 설정을 위한 전역 변수를 선언

const lang = localStorage.getItem('language');
const language = lang ? lang : 'KR';

const port = localStorage.getItem('commport');
const commport = port ? port : 'COM1';

export const setup =  {
	namespaced: true,
	state: {
		language,
		commport,
	},
	actions: {
		setLanguage({ commit }, lang) {
			localStorage.setItem('language', lang);
			return commit('setLanguage', lang);
		},
		setCommport({ commit }, port) {
			localStorage.setItem('commport', port);
			return commit('setCommport', port);
		},
	},
	mutations: {
		setLanguage(state, lang){
			state.language= lang;
		},
		setCommport(state, port){
			state.commport= port;
		},
	}
}