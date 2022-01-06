<template>
	<div class="stc_off">
		<div class="stc_off_search1">
        <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">Stor Loc</span>
          <select class="form-select btn-sm" aria-label="Default select example"
						v-model="stor_loc">
            <option disabled value="">Select location</option>
            <option v-for="(d, i) in options" :key="i" :value="d.id">{{ d.name }}</option>
          </select>
        </div>
        <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">SC Type</span>
          <input type="text" class="form-control btn-sm" placeholder="UserID" aria-label="UserID" aria-describedby="basic-addon1"
						v-model="rowno">
        </div>
        <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">Row No</span>
          <input type="text" class="form-control btn-sm" placeholder="UserName" aria-label="UserID" aria-describedby="basic-addon1"
						v-model="barno">
        </div>
    </div>
	</div>
</template>
<script>
// import $axios from 'axios';
import { useStore } from 'vuex';
import { ref, reactive, onBeforeMount } from 'vue';
import { searchSelectBox } from '@/helper/sql.js';
import { getdata } from '@/helper/filter.js';

export default ({
	name:'stockcount_offline',
	setup() {
		let stor_loc = ref("");
		let rowno = ref("");
		let barno = ref("");

		const store = useStore();	//스토어호출
		let options = reactive([]);

		onBeforeMount(()=>{
        console.log("[Stockcount_Offline] = ", "onBeforeMount--");
        initSelectBox();
    });

		async function initSelectBox() {
			let req_param = reactive(
				{	lang:"KR",
					userid:store.state.auth.user[0].userid,
					plantcd:getdata(store.state.auth.user[0].plantcd),
					type1:"Useflag",
					type2:"",
					type3:"",
					type4:"",
					space:"Y",
				}
			);
			let res = reactive([]);
			res = await searchSelectBox(req_param);
			// console.log("[Stockcount_offline/initSelectBox] = res -- ", res);

			if(res.data.length > 0){
				options.splice(0, options.length);
				for(var i=0; i<res.data.length; i++){
						options.push({id:res.data[i].id, name:res.data[i].name});
				}
			}
			console.log("[Stockcount_offline/initSelectBox] = options data -- ", options);
		}
		return{
			stor_loc,
			rowno,
			barno,
			options,
		};
	},
})
</script>
<style lang="scss">
	.stc_off {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width:100%;
    height:100%;
	}
	.stc_off_search1 {
    height : 40px;
		margin : 0px 5px 0px 5px;
  }
</style>
