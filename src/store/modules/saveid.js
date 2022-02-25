const id = JSON.parse(localStorage.getItem('id'));

const initialState = id
  ? { status: { saveflag: true }, id }
  : { status: { saveflag: false }, id : null };

export const saveid = {
	namespaced: true,
	state: initialState,
	actions: {
		saveid({ commit }, id) {
			// console.log("[actions - saveid] = ", id);
			localStorage.setItem('id', JSON.stringify(id));
			return commit('saveid', id);
		},
		deleteid({ commit }) {
			// console.log("[deleteid] = id -- ");
			localStorage.removeItem('id');
			commit('deleteid');
		},
	},
	mutations: {
		saveid(state, id) {
			// console.log("[mutations - saveid] = ", id);
			state.status.saveflag = true;
			state.id = id;
		},
		deleteid(state) {
			state.status.saveflag = false;
			state.id = null;
		},
	},
}