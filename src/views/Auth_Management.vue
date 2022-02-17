<template>
	<div class="window-main">
		<div class="left-box-40">
			<div class="window-search-2">
				<div class="input-group mb-3">
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px'}">
						사용자ID
					</span>
					<input type="text" class="form-control btn-sm" placeholder="UserID"
						autocomplete="off"
						v-model="req_param.userid">
					<button class="btn btn-outline-success btn-sm" type="button"
						:style="{ width:'100px', height:'32px', margin:'0px 0px 0px 5px'}"
						@click='searchClick' >조회
					</button>
				</div>
				<div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px'}">
						사용자명
					</span>
					<input type="text" class="form-control btn-sm" placeholder="UserName"
						autocomplete="off"
						v-model="req_param.username">
					<span class="input-group-text btn-sm"
						:style="{width:'100px', margin:'0px 0px 0px 5px', background:'transparent', border:'transparent'}">
					</span>
				</div>
			</div>
			<div class="window-grid-1"
				:style="{
					'height': `calc(${window_height - 109 - 70 - 70}px)`
				}">
				<ag-grid-vue
					class="ag-theme-balham"
					headerHeight='35'
					style="width: 100%; height:100%"
					:rowData="recvData.value"
					:gridOptions="gridOptions"
					allow_unsafe_jscode="True"
					>
				</ag-grid-vue>
			</div>
		</div>
		<div class="right-box-60">
			<div class="window-search-2">
				<div class="input-group mb-3">
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px'}">
						사용자
					</span>
					<label type="text" class="form-control btn-sm">
					</label>
				</div>
			</div>
			<div class="window-grid-1"
				:style="{
					'height': `calc(${window_height - 109 - 70 - 70}px)`
				}">
				<ag-grid-vue
					class="ag-theme-balham"
					headerHeight='35'
					style="width: 100%; height:100%"
					:rowData="recvData2.value"
					:gridOptions="gridOptions2"
					allow_unsafe_jscode="True"
					>
				</ag-grid-vue>
			</div>
		</div>
		<div class= "window-save-b">
      <div class="input-group mb-3" :style="{ padding:'2px 0px 0px 0px'}">
				<label type="text" autocomplete="off" class="form-control btn-sm ellipsis"
            aria-label="Customer" aria-describedby="basic-addon1"
            :style="{'text-align':'left',
											border:'transparent',
											background:'gainsboro',
											color:msg_color}">
            Msg :&nbsp;{{msg}}
        </label>
      </div>
      <div align="right" :style="{height:'40px', margin:'-17px 0px 0px 0px'}">
        <!-- <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'3px 5px 0px 0px', width:'100px'}"
          @click='printClick_3'>라벨발행-3</button> -->
				<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'3px 5px 0px 0px', width:'100px'}"
					@click='saveClick'>
					저장
				</button>
				<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'3px 0px 0px 0px', width:'100px'}"
					@click='closeClick'>
					종료
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import $axios from 'axios';
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
// import { useStore } from 'vuex';
// import { addDate } from '@/helper/filter.js';

export default {
	name:'auth_management',
	components:{
    AgGridVue,
	},
	setup(props, {emit}) {
		// let url = ref(process.env.VUE_APP_SERVER_URL);
		let window_width = ref(window.innerWidth);
		let window_height = ref(window.innerHeight);
		// const store = useStore();	//스토어호출

		const $url_rest = process.env.VUE_APP_SERVER_URL;
    let url = ref($url_rest);

		//조회조건 데이터 바인딩
		let req_param = reactive({userid:"",
															username:""});
		//리턴값 표시
		let msg = ref(null);
    let msg_color = ref(null);

		// ag-grid 데이터 변수
		let recvData = reactive([]);
		let gridApi = ref(null);
    let columnApi = ref(null);
		let columnDefs= reactive([
			{headerName: '선택', field: 'sel', hide:true, pinned: 'left'},
			{headerName: '사용자ID', field: 'userid', width: 80, cellStyle: {textAlign: "center"}, pinned: 'left'},
			{headerName: '사용자명', field: 'username', width: 80, cellStyle: {textAlign: "left"}, pinned: 'left'},
			{headerName: '패스워드', field: 'userpwd', hide: true},
			{headerName: '플랜드', field: 'plant', width: 250, sortable: true, filter: true},
			{headerName: '작업장', field: 'wc', width: 250, sortable: true, filter: true},
			{headerName: '권한', field: 'auth', hide: true},
			{headerName: '사용유무', field: 'useflag', hide: true},
			{headerName: '수정자', field: 'upduser', hide: true},
			{headerName: '수정일', field: 'upddate', hide: true},
		]);
		var gridOptions = {
			defaultColDef: {
				width: 150,
				editable: false,
				resizable: true,
				sortable: true,
				lockPosition: true, //컬럼 드래그로 이동 방지
				cellStyle: {textAlign: "left"},
			},
			columnDefs: columnDefs,
			rowData: null,
			rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
			onGridReady: function(event) {
				setTimeout(function () {
					event.api.setRowData(recvData);
				}, 1000);
				gridApi.value = event.api;
				columnApi.value = event.columnApi;
				event.api.sizeColumnsToFit();
			},
			getRowHeight: function() {
				return 35;
			},
		};

		// ag-grid 데이터 변수
		let recvData2 = reactive([]);
		let gridApi2 = ref(null);
    let columnApi2 = ref(null);
		let columnDefs2= reactive([
			{headerName: '선택', field: 'sel', hide:true, pinned: 'left'},
			{headerName: '사용자ID', field: 'userid', width: 80, cellStyle: {textAlign: "center"}, pinned: 'left'},
			{headerName: '사용자명', field: 'username', width: 80, cellStyle: {textAlign: "left"}, pinned: 'left'},
			{headerName: '패스워드', field: 'userpwd', hide: true},
			{headerName: '플랜드', field: 'plant', width: 250, sortable: true, filter: true},
			{headerName: '작업장', field: 'wc', width: 250, sortable: true, filter: true},
			{headerName: '권한', field: 'auth', hide: true},
			{headerName: '사용유무', field: 'useflag', hide: true},
			{headerName: '수정자', field: 'upduser', hide: true},
			{headerName: '수정일', field: 'upddate', hide: true},
		]);
		var gridOptions2 = {
			defaultColDef: {
				width: 150,
				editable: false,
				resizable: true,
				sortable: true,
				lockPosition: true, //컬럼 드래그로 이동 방지
				cellStyle: {textAlign: "left"},
			},
			columnDefs: columnDefs2,
			rowData: null,
			rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
			onGridReady: function(event) {
				setTimeout(function () {
					event.api.setRowData(recvData2);
				}, 1000);
				gridApi2.value = event.api;
				columnApi2.value = event.columnApi;
				event.api.sizeColumnsToFit();
			},
			getRowHeight: function() {
				return 35;
			},
		};

		onMounted(() => {
			// console.log("[auth_management] = ", "onMounted--");
			window.addEventListener('resize', handleResize);
		});

		onUnmounted(() =>{
			// console.log("[auth_management] = onUnmounted -- ");
			window.removeEventListener('resize', handleResize);
		});

		function handleResize() {
			window_width.value = window.innerWidth;
			window_height.value = window.innerHeight;
		}

		function searchClick(){
			let urlPost = url.value + '/dw_auth_mng_user_search_p_j';
			$axios.post(urlPost, {
				lang:"KR",
				userid:req_param.userid,
				username: req_param.username
			})
			.then((res) => {
				recvData.value = res.data;
				if(res.data.length > 0){
					setTimeout(function () {
						autoSizeAll(false);
					});
				}
				msg_color.value = "blue";
				msg.value = "Total Count : " + recvData.value.length ;
			}) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
				//.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
			.catch(err => {
				alert(err);
				console.error(err)

				msg_color.value = "red";
        msg.value = err;
			})
		}

		function autoSizeAll(skipHeader) {
			const allColumnIds = [];
			columnApi.value.getAllColumns().forEach((column) => {
				if (column.colId != 'sel'){
          allColumnIds.push(column.colId);
        }
			});
			columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
		}

		function saveClick(){
			emit("component_close", "auth_management");
		}

		function closeClick(){
			emit("component_close", "auth_management");
		}

		return {
			window_width,
			window_height,
			recvData,
			gridOptions,
			recvData2,
			gridOptions2,
			searchClick,
			req_param,
			msg,
			msg_color,
			saveClick,
			closeClick,
		}
	},
}
</script>

<style lang="scss">
</style>