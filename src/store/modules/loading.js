//loading 화면을 표시하기 위해 전역 변수를 선언
const state = {
	LoadingStatus: false
}

export const loading =  {
	namespaced: true,
	state: state,
	actions: {
		startLoading({ commit }, LoadingStatus) {
			localStorage.setItem('LoadingStatus', true);
			console.log("[LoadingStatus] = ", LoadingStatus);
			return LoadingStatus => {
				commit('loading', LoadingStatus);
				return Promise.resolve(LoadingStatus);
			}
		},
		endLoading({ commit }, LoadingStatus) {
			localStorage.setItem('LoadingStatus', false);
			console.log("[LoadingStatus] = ", LoadingStatus);
			return LoadingStatus => {
				commit('loading', LoadingStatus);
				return Promise.resolve(LoadingStatus);
			}
		},
	},
	mutations: {
		startLoading(state){
			state.LoadingStatus = true;
		},
		endLoading(state){
				state.LoadingStatus = false;
		}
	}
}