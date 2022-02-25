const id = JSON.parse(localStorage.getItem('id'));

const initialState = id
  ? { status: { saveflag: true }, id }
  : { status: { saveflag: false }, id : null };

export const saveid = {
	namespaced: true,
	state: initialState,
	actions: {
		saveid({ commit }, id) {
			localStorage.setItem('id', JSON.stringify(id));
			return commit('saveid', id);
		},
		deleteid({ commit }) {
			localStorage.removeItem('id');
			commit('deleteid');
		},
	},
	mutations: {
		saveid(state, id) {
			state.status.saveflag = true;
			state.id = id;
		},
		deleteid(state) {
			state.status.saveflag = false;
			state.id = null;
		},
	},
}