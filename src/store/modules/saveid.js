const id = JSON.parse(localStorage.getItem('id'));

const initialState = id
  ? { status: { saveflag: true }, id }
  : { status: { saveflag: false }, id : null };

export const saveid = {
	namespaced: true,
	state: initialState,
	actions: {
		saveid({ commit }, id) {
			// console.log("[saveid] = id -- ", id);
			localStorage.setItem('id', JSON.stringify(id));

			return id => {
				commit('saveid', id);
				return Promise.resolve(id);
			}
		},
		deleteid({ commit }) {
			// console.log("[deleteid] = id -- ");
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