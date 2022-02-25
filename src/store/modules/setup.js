//환경변수 설정을 위한 전역 변수를 선언

const lang = localStorage.getItem('language');
const state = lang ? {language: lang} : {language: 'KR'};

const port = localStorage.getItem('commport');
const comm = port ? {commport: port} : {commport: 'COM1'};

export const setup =  {
	namespaced: true,
	state: state,
	comm: comm,
	actions: {
		setLanguage({ commit }, lang) {
			localStorage.setItem('language', lang);
			// console.log("[actions - language] = ", lang);
			return commit('setLanguage', lang);
		},
		setCommport({ commit }, port) {
			localStorage.setItem('commport', port);
			// console.log("[actions - commport] = ", port);
			return commit('setCommport', port);
		},
	},
	mutations: {
		setLanguage(state, lang){
			// console.log("[mutations - language] = ", lang);
			state.language= lang;
		},
		setCommport(comm, port){
			// console.log("[mutations - commport] = ", port);
			comm.commport= port;
		},
	}
}