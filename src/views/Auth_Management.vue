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
					class="ag-theme-alpine"
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
					<label type="text" class="form-control btn-sm"
						:style="{'text-align':'left'}">
						{{lblUserName}}
					</label>
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px', margin:'0px 0px 0px 5px'}">
						변경이력
					</span>
					<select class="form-select btn-sm" aria-label="Default select example"
						@change ='changeSelectBox'
						v-model="cboAuthHist">
						<option disabled value=""></option>
						<option v-for="(d, i) in optionAuthHist" :key="i" :value="d.id">{{ d.id }}</option>
					</select>
				</div>
				<div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
					<input type="checkbox" :style="{ margin:'8px 0px 0px 5px'}"
						v-model="chkFind"
						@click='chkFindClick'>
					<label class="form-check-label" for="defaultCheck1"
						:style="{ margin:'6px 0px 0px 5px', color:'rgb(34, 33, 33)', 'font-size':'14px'}">
						조회
					</label>
					<input type="checkbox" :style="{ margin:'8px 0px 0px 25px'}"
						v-model="chkNew"
						@click='chkNewClick'>
					<label class="form-check-label" for="defaultCheck1"
						:style="{ margin:'6px 0px 0px 5px', color:'rgb(34, 33, 33)', 'font-size':'14px'}">
						신규
					</label>
					<input type="checkbox" :style="{ margin:'8px 0px 0px 25px'}"
						v-model="chkSave"
						@click='chkSaveClick'>
					<label class="form-check-label" for="defaultCheck1"
						:style="{ margin:'6px 0px 0px 5px', color:'rgb(34, 33, 33)', 'font-size':'14px'}">
						저장
					</label>
					<input type="checkbox" :style="{ margin:'8px 0px 0px 25px'}"
						v-model="chkExp"
						@click='chkExpClick'>
					<label class="form-check-label" for="defaultCheck1"
						:style="{ margin:'6px 0px 0px 5px', color:'rgb(34, 33, 33)', 'font-size':'14px'}">
						엑셀
					</label>
				</div>
			</div>
			<div class="window-grid-1"
				:style="{
					'height': `calc(${window_height - 109 - 70 - 70}px)`
				}">
				<ag-grid-vue
					class="ag-theme-alpine"
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
          @click='testClick'>테스트</button> -->
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
import { useStore } from 'vuex';
import { searchSelectBox } from '@/helper/sql.js';
import { getdata } from '@/helper/filter.js';
import { BoldRenderer, autoSizeAll, refreshAll } from '@/helper/ag-grid.js';

export default {
	name:'auth_management',
	components:{
    AgGridVue,
	},
	setup(props, {emit}) {
		// let url = ref(process.env.VUE_APP_SERVER_URL);
		let window_width = ref(window.innerWidth);
		let window_height = ref(window.innerHeight);
		const store = useStore();	//스토어호출

		const $url_rest = process.env.VUE_APP_SERVER_URL;
    let url = ref($url_rest);

		//조회조건 데이터 바인딩
		let req_param = reactive({
			userid:"",
			username:""
		});
		let lblUserName = ref(null);
		let lblUserID = ref(null);
		let cboAuthHist = ref(null);
		let optionAuthHist = reactive([]);

		//체크박스
		let chkFind = ref(false);
		let chkNew = ref(false);
		let chkSave = ref(false);
		let chkExp = ref(false);

		//리턴값 표시
		let msg = ref(null);
    let msg_color = ref(null);

		const CheckboxRenderer = function (params) {
			// return `<input type='checkbox' ${params.value=='4' ? 'checked' : ''} />`;

			// if(params.value =='-1'){
			// 	return `<input type='checkbox' ${'checked'} />`;
			// }
			// else if(params.value =='0'){
			// 	return `<input type='checkbox' ${''}} />`;
			// }
			// else{
			// 	return `<input type='checkbox' ${'disabled'} />`;
			// }

			// console.log("[params.value] = ", params.value);
			const input = document.createElement('input');
			input.type = 'checkbox';
			if(params.value =='-1'){
				input.checked = true;
			}
			else if(params.value =='0'){
				input.checked = false;
			}
			else{
				input.checked = false;
				input.disabled = true;
			}

			input.addEventListener('click', () => {
				// params.value = !params.value;
				// params.node.data[params.coldDef.field] = params.value;

				// you can add here code
				// console.log("[params] = ", params);
				if(params.node.data[params.colDef.field] == "-1"){
					params.node.data[params.colDef.field] = "0"
				}
				else{
					params.node.data[params.colDef.field] = "-1"
				}
				params.node.data['sel'] = "-1";

				refreshAll(gridApi2);
			});
      return input;
		};

		// ag-grid 데이터 변수
		let recvData = reactive([]);
		let gridApi = ref(null);
    let columnApi = ref(null);
		let columnDefs= reactive([
			{headerName: '선택', 			field: 'sel', 			hide:true,
				pinned: 'left'
			},
			{headerName: '사용자ID', 	field: 'userid', 		hide:false,		width: 80, cellStyle: {textAlign: "center"},
				cellRenderer: BoldRenderer,
				pinned: 'left',
			},
			{headerName: '사용자명', 	field: 'username', 	hide:false,		width: 80, cellStyle: {textAlign: "left"},
				pinned: 'left'
			},
			{headerName: '패스워드', 	field: 'userpwd', 	hide: true},
			{headerName: '플랜드', 		field: 'plant', 		hide:false,		width: 250, sortable: true, filter: true},
			{headerName: '작업장', 		field: 'wc', 				hide:false,		width: 250, sortable: true, filter: true},
			{headerName: '권한', 			field: 'auth', 			hide: true},
			{headerName: '사용유무', 	field: 'useflag', 	hide: true},
			{headerName: '수정자', 		field: 'upduser', 	hide: true},
			{headerName: '수정일', 		field: 'upddate', 	hide: true},
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
			rowSelection: 'single',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
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
			onRowClicked : function(event){
				var selectedRow = event.node.data;
				lblUserName.value = selectedRow.username;
				lblUserID.value = selectedRow.userid;
				searchAuth();
				initSelectBox_AuthHist();
			},
		};

		// ag-grid 데이터 변수
		let recvData2 = reactive([]);
		let gridApi2 = ref(null);
    let columnApi2 = ref(null);
		let columnDefs2= reactive([
			{headerName: '메뉴ID', 	field: 'menuid', 		hide:true, 		width: 60, 	pinned: 'left'},
			{headerName: '메뉴명', 	field: 'menuname', 	hide:false, 	width: 80, 	cellStyle: {textAlign: "left"}, pinned: 'left'},
			{headerName: '선택', 		field: 'sel',			 	hide:true, 		width: 60, 	pinned: 'left'},
			{headerName: '화면ID', 	field: 'progid', 		hide:false, 	width: 250, cellStyle: {textAlign: "center"}, pinned: 'left'},
			{headerName: '화면명', 	field: 'progname', 	hide:false, 	width: 250, cellStyle: {textAlign: "left"}, pinned: 'left',
				cellRenderer: BoldRenderer},
			{headerName: '조회', 		field: 'findflag', 	hide:false, 	width: 60, 	cellStyle: {textAlign: "center"},
				cellRenderer: CheckboxRenderer},
			{headerName: '신규',	 	field: 'newflag', 	hide:false, 	width: 60, 	cellStyle: {textAlign: "center"},
				cellRenderer: CheckboxRenderer},
			{headerName: '저장', 		field: 'saveflag', 	hide:false, 	width: 60, 	cellStyle: {textAlign: "center"},
				cellRenderer: CheckboxRenderer},
			{headerName: '삭제', 		field: 'delflag', 	hide:true, 		width: 60, 	cellStyle: {textAlign: "center"}},
			{headerName: '엑셀', 		field: 'expflag', 	hide:false, 	width: 60, 	cellStyle: {textAlign: "center"},
				cellRenderer: CheckboxRenderer},
			{headerName: '인쇄', 		field: 'prtflag', 	hide:true, 		width: 60, 	cellStyle: {textAlign: "center"}},
			{headerName: '수정자', 	field: 'upduser', 	hide:false, 	width: 60},
			{headerName: '수정일', 	field: 'upddate', 	hide:false, 	width: 60},
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
			suppressRowClickSelection:true,
			rowSelection: 'single',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
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
						autoSizeAll(false, columnApi);
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

		function searchAuth(){
			let urlPost = url.value + '/dw_auth_mng_auth_search_p_j';
			$axios.post(urlPost, {
				lang:"KR",
				userid:lblUserID.value,
				procdate:getdata(cboAuthHist.value)
			})
			.then((res) => {
				recvData2.value = res.data;
				if(res.data.length > 0){
					setTimeout(function () {
						autoSizeAll(false, columnApi2);
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


		async function initSelectBox_AuthHist() {
			let send_param = reactive(
				{	lang:"KR",
					userid:lblUserID.value,
					plantcd:getdata(store.state.auth.user[0].plantcd),
					type1:"AUTH_HIST",
					type2:"",
					type3:"",
					type4:"",
					space:"Y",
				}
			);
			// console.log(send_param);
			let res = reactive([]);
			res = await searchSelectBox(send_param);

			if(res.data.length > 0){
				optionAuthHist.splice(0, optionAuthHist.length);
				for(var i=0; i<res.data.length; i++){
					optionAuthHist.push({id:res.data[i].id, name:res.data[i].name});
				}
			}
		}

		function changeSelectBox(){
			searchAuth();
		}

		async function saveClick(){
			var bRtn = await saveAuth();
			console.log("bRtn = ", bRtn);
			if (bRtn){
				gridApi2.value.forEachNode((node)=>{
					if(node.data['sel'] == "-1") {
						node.data['sel'] = ""
						// console.log(node.data['sel']);
					}
				});
				refreshAll(gridApi2);
				initSelectBox_AuthHist();
			}
		}

		async function saveAuth(){
			let urlPost = url.value + '/dw_auth_mng_auth_save_p_j';

			// var selectedData = gridApi2.value.getSelectedRows();
			// console.log("[checked row] = ", selectedData);
			// console.log("[login id] = ", store.state.auth.user[0].userid);

			var selectedData = reactive([])
			gridApi2.value.forEachNode((node)=>{
				if(node.data['sel'] == "-1"){
					selectedData.push({
						progid:node.data['progid'],
						findflag:node.data['findflag'],
						newflag:node.data['newflag'],
						saveflag:node.data['saveflag'],
						delflag:node.data['delflag'],
						expflag:node.data['expflag'],
						prtflag:node.data['prtflag']
					})
				}
			});

			var bRtn = false;
			await $axios.post(urlPost, {
				lang:"KR",
				userid:lblUserID.value,
				upduser:store.state.auth.user[0].userid,
				data: selectedData
			})
			.then((res) => {
				if(res.data.length > 0){
					if (res.data[0].status == "OK"){
						msg_color.value = "blue";
						bRtn = true;
          }
          else{
						msg_color.value = "red";
						bRtn = false;
          }
					msg.value = res.data[0].msg;
          alert(msg.value);
					console.log("통신완료");
				}
			}) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
				//.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
			.catch(err => {
				alert(err);
				console.error(err)

				msg_color.value = "red";
        msg.value = err;
				bRtn = false;
			})
			return bRtn;
		}

		function closeClick(){
			emit("component_close", "auth_management");
		}

		function testClick(){
			// console.log("testClick");
			// gridApi2.value.deselectAll();
			// gridApi.value.exportDataAsExcel();
			gridApi.value.exportDataAsCsv(getParams());
		}

		function getParams() {
			return {
				fileName: "test.csv"
			};
		}

		function chkFindClick(){
			if(chkFind.value)chkFind.value =false;
			else chkFind.value=true;
			// console.log("chkFindClick", chkFind.value);
			gridApi2.value.forEachNode((node)=> {
				// console.log("node.data = ", node.data['findflag']);
				if (chkFind.value){
					if(node.data['findflag'] != "4") {
						node.data['findflag'] = -1;
						node.data['sel'] = "-1";
					}
				}
				else{
					if(node.data['findflag'] != "4") {
						node.data['findflag'] = 0;
						node.data['sel'] = "-1";
					}
				}
			});
			refreshAll(gridApi2);
		}

		function chkNewClick(){
			if(chkNew.value)chkNew.value =false;
			else chkNew.value=true;
			// console.log("chkNewClick", chkNew.value);
			gridApi2.value.forEachNode((node)=> {
				if (chkNew.value){
					if(node.data['newflag'] != "4") {
						node.data['newflag'] = -1;
						node.data['sel'] = "-1";
					}
				}
				else{
					if(node.data['newflag'] != "4") {
						node.data['newflag'] = 0;
						node.data['sel'] = "-1";
					}
				}
			});
			refreshAll(gridApi2);
		}

		function chkSaveClick(){
			if(chkSave.value)chkSave.value =false;
			else chkSave.value=true;

			gridApi2.value.forEachNode((node)=> {
				if (chkSave.value){
					if(node.data['saveflag'] != "4") {
						node.data['saveflag'] = -1;
						node.data['sel'] = "-1";
					}
				}
				else{
					if(node.data['saveflag'] != "4") {
						node.data['saveflag'] = 0;
						node.data['sel'] = "-1";
					}
				}
			});
			refreshAll(gridApi2);
		}

		function chkExpClick(){
			if(chkExp.value)chkExp.value =false;
			else chkExp.value=true;

			gridApi2.value.forEachNode((node)=> {
				if (chkExp.value){
					if(node.data['expflag'] != "4") {
						node.data['expflag'] = -1;
						node.data['sel'] = "-1";
					}
				}
				else{
					if(node.data['expflag'] != "4") {
						node.data['expflag'] = 0;
						node.data['sel'] = "-1";
					}
				}
			});
			refreshAll(gridApi2);
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
			lblUserName,
			cboAuthHist,
			optionAuthHist,
			changeSelectBox,
			chkFindClick,
			chkNewClick,
			chkSaveClick,
			chkExpClick,
			chkFind,
			chkNew,
			chkSave,
			chkExp,
			msg,
			msg_color,
			testClick,
			saveClick,
			closeClick,
		}
	},
}
</script>

<style lang="scss">
</style>