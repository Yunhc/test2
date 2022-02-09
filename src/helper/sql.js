import $axios from 'axios';
import { ref } from 'vue';

//콤보박스를 조회한다.
export async function searchSelectBox_1(req_param) {
	console.log("[searchSelectBox] = req_param -- ", req_param);

	let url = ref(process.env.VUE_APP_SERVER_URL);
	let urlPost = url.value + '/api/dw/selectboxList';
	// let res_param = reactive([]);

	await $axios.post(urlPost, {
		lang: req_param.lang,
		userid: req_param.userid,
		plant: req_param.plantcd,
		type1: req_param.type1, //"Useflag",
		type2: req_param.type2,
		type3: req_param.type3,
		type4: req_param.type4,
		space: req_param.space, //"Y",
	})
	.then((res) => {
		console.log("[searchSelectBox] = response data -- ", res.data);
		return res.data;
	})
	.catch(err => {
		alert(err);
		console.error(err)
		return null;
	})
}

export async function searchSelectBox(req_param) {
	// console.log("[searchSelectBox] = req_param -- ", req_param);
	let url = ref(process.env.VUE_APP_SERVER_URL);
	let urlPost = url.value + '/api/dw/selectboxList';
	// let res_param = reactive([]);

	const res = await $axios.post(urlPost, {
		lang: req_param.lang,
		userid: req_param.userid,
		plant: req_param.plantcd,
		type1: req_param.type1, //"Useflag",
		type2: req_param.type2,
		type3: req_param.type3,
		type4: req_param.type4,
		space: req_param.space, //"Y",
	})
	return res;
}