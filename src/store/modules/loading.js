//loading 화면을 표시하기 위해 전역 변수를 선언
const state = {
	LoadingStatus: false
}

export const loading =  {
	namespaced: true,
	state: state,
	mutations: {
		startLoading(state){
			state.LoadingStatus = true;
		},
		endLoading(state){
			state.LoadingStatus = false;
		}
	}
}