

// const id = JSON.parse(localStorage.getItem('id'));
const id = localStorage.getItem('id');
const chk = localStorage.getItem('chk');
const initialState = id
  ? { status: { saveflag: true }, id, chk }
  : { status: { saveflag: false }, id : null, chk:false };

export const saveid = {
	namespaced: true,
	state: initialState,
	actions: {
		saveid({ commit }, id) {
			console.log("[saveid] = id -- ", id);
			// localStorage.setItem('id', "[{\"chk\":" + id.value.chk + ",\"id\":" + id.value.id + "}]" );
			// localStorage.setItem('id', JSON.stringify("{chk:'" + id.value.chk + "', id:'" + id.value.id + "'}"));

			localStorage.setItem('chk', id.value.chk );
			localStorage.setItem('id', id.value.id);

			return id => {
				commit('saveid', id);
				return Promise.resolve(id);
			}
		},
		deleteid({ commit }) {
			console.log("[deleteid] = id -- ");
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