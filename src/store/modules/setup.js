//환경변수 설정을 위한 전역 변수를 선언

const lng = localStorage.getItem('language');
const language = lng ? {language: lng} : {language: 'KR'};

const port = localStorage.getItem('commport');
const comm = port ? {commport: port} : {commport: 'COM1'};

export const setup =  {
	namespaced: true,
	language: language,
	comm: comm,
	actions: {
		setLanguage({ commit }, lng) {
			localStorage.setItem('language', lng);
			return commit('setLanguage', lng);
		},
		setCommport({ commit }, port) {
			localStorage.setItem('commport', port);
			return commit('setCommport', port);
		},
	},
	mutations: {
		setLanguage(language, lng){
			language.language= lng;
		},
		setCommport(comm, port){
			comm.commport= port;
		},
	}
}