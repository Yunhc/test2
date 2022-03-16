<template>
	<div class="window-main">
		<div class="window-search-div-3">
			<div class="window-div-left" :style="{height:'114px'}">
				<div class="input-group mb-3 window-div-left-top" >
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px', margin:'0px 0px 0px 5px'}">
						플랜트
					</span>
					<select class="form-select btn-sm" aria-label="Default select example"
						id="cboPlant"
						ref="cboPlant"
						@change ='keyupenter'
						v-model="req_param.cboPlant">
						<!-- <option disabled value="">Select plant</option> -->
						<option v-for="(d, i) in optionPlant" :key="i" :value="d.id">{{ d.id }}</option>
					</select>
				</div>
				<div class="input-group mb-3 window-div-left-center">
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px', margin:'0px 0px 0px 5px'}">
						자재코드
					</span>
					<input type="text" class="form-control btn-sm" placeholder="Material" aria-label="UserID" aria-describedby="basic-addon1"
						autocomplete="off"
						id="txtMatnr"
						ref="txtMatnr"
						@keyup.enter='keyupenter'
						v-model="req_param.matnr"
					>
				</div>
				<div class="input-group mb-3 window-div-left-center">
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{ width:'80px', margin:'0px 0px 0px 5px'}">
						고객사
					</span>
					<input type="text" class="form-control btn-sm" placeholder="Customer" aria-label="UserID" aria-describedby="basic-addon1"
						autocomplete="off"
						id="txtCustomer"
						ref="txtCustomer"
						@keyup.enter='keyupenter'
						v-model="req_param.customer"
					>
				</div>
			</div>
			<div class="window-div-left" :style="{height:'114px'}">
				<div class="input-group mb-3 window-div-left-top">
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px', margin:'0px 0px 0px 5px'}">
						저장위치
					</span>
					<select class="form-select btn-sm" aria-label="Default select example"
						id="cboLgort"
						ref="cboLgort"
						@change ='keyupenter'
						v-model="req_param.cboLgort">
						<option disabled value="">Select location</option>
						<option v-for="(d, i) in optionLgort" :key="i" :value="d.id">{{ d.id }}</option>
					</select>
				</div>
				<div class="input-group mb-3 window-div-left-center">
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px', margin:'0px 0px 0px 5px'}">
						자재내역
					</span>
					<input type="text" class="form-control btn-sm" placeholder="Description" aria-label="UserID" aria-describedby="basic-addon1"
						autocomplete="off"
						id="txtMaktx"
						ref="txtMaktx"
						@keyup.enter='keyupenter'
						v-model="req_param.maktx"
					>
				</div>
				<div class="input-group mb-3 window-div-left-center">
					<v-date-picker
						mode="date"
						v-model="date"
						locale="en"
						title-position="center"
						color="green"
						:style="{margin:'0px 0px 0px 0px'}"
						:is-dark="isDark"
						:is-range="isRange"
						:masks="{ input: ['YYYY-MM-DD', 'L'] }"
					>
						<template #default="{ inputValue, inputEvents }">
							<template v-if="isRange">
								<div class="input-group mb-3" :style="{height:'36px'}">
									<span class="input-group-text btn-sm" id="basic-addon1"
										:style="{width:'80px', margin:'0px 0px 0px 5px'}">
										재고일자
									</span>
									<input class="form-control btn-sm"
										:style="{'text-align':'center'}"
										data-ref="InputContent" inputmode="none"
										:value="inputValue.start"
										v-on="inputEvents.start"/>
									<span class="input-group-text btn-sm" :style="{background:'transparent', border:'transparent'}">~</span>
									<input class="form-control btn-sm"
										:style="{'text-align':'center'}"
										data-ref="InputContent" inputmode="none"
										:value="inputValue.end"
										v-on="inputEvents.end"/>
								</div>
							</template>
							<template v-else>
								<div class="input-group mb-3" :style="{height:'36px'}">
									<span class="input-group-text btn-sm" id="basic-addon1"
										:style="{width:'80px', margin:'0px 0px 0px 5px'}">
										재고일자
									</span>
									<input class="form-control btn-sm"
										:style="{'text-align':'center'}"
										data-ref="InputContent" inputmode="none"
										:value="inputValue"
										v-on="inputEvents"/>
								</div>
							</template>
						</template>
					</v-date-picker>
				</div>
			</div>
			<div class="window-div-left" :style="{height:'114px'}">
				<div class="input-group mb-3 window-div-left-top" >
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px', margin:'0px 0px 0px 5px'}">
						상태
					</span>
					<select class="form-select btn-sm" aria-label="Default select example"
						id="cboStatus"
						ref="cboStatus"
						@change ='keyupenter'
						v-model="req_param.cboStatus">
						<option disabled value="[A] Select Status">[A] Select Status</option>
						<option v-for="(d, i) in optionStatus" :key="i" :value="d.id">{{ d.id }}</option>
					</select>
				</div>
				<div class="input-group mb-3 window-div-left-center">
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px', margin:'0px 0px 0px 5px'}">
						자재유형
					</span>
					<select class="form-select btn-sm" aria-label="Default select example"
						id="cboMatType"
						ref="cboMatType"
						@change ='keyupenter'
						v-model="req_param.cboMatType">
						<option disabled value="">Select Material Type</option>
						<option v-for="(d, i) in optionMatType" :key="i" :value="d.id">{{ d.id }}</option>
					</select>
				</div>
				<div class="input-group mb-3 window-div-left-center">
				</div>
			</div>
			<div class="window-div-right" :style="{height:'114px'}">
				<div class= "input-group mb-3 window-div-left-top">
				</div>
				<div class= "input-group mb-3 window-div-left-center">
				</div>
				<div class= "window-div-left-center"
					align="right">
					<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'2px 5px 0px 0px', height:'32px'}"
						@click='searchClick' >Search</button>
				</div>
			</div>
		</div>

		<div class="window-grid-1"
      :style="{
        'height': `calc(${window_height - 109 - 115 - 75}px)`
      }"
    >
      <ag-grid-vue
        class="ag-theme-balham"
        headerHeight='35'
				:style="{width: `calc(${window_width - 10}px)`, height:'100%'}"
        :rowData="recvData.value"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
      >
			<!-- :autoGroupColumnDef="autoGroupColumnDef" -->
      </ag-grid-vue>
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
        <!-- <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'3px 5px 0px 0px', width:'150px'}"
          @click='testClick'>TEST</button> -->
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
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
// import { AgGridVue } from 'ag-grid-community';
// import { AgGridVue } from 'ag-grid-enterprise';
// import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { useStore } from 'vuex';
import { getdata, formatDate } from '@/helper/filter.js';
import { searchSelectBox } from '@/helper/sql.js';
import { inputNumberFormat, BoldRenderer, autoSizeAll, refreshAll } from '@/helper/ag-grid.js';

export default {
	name:'stock_search',
	components:{
    'ag-grid-vue': AgGridVue,
		// CustomPinnedRowRenderer,
		// RowGroupingModule,
	},
	setup(props, {emit}) {
		// let url = ref(process.env.VUE_APP_SERVER_URL);
		let window_width = ref(window.innerWidth);
		let window_height = ref(window.innerHeight);
		const store = useStore();	//스토어호출
		const $url_rest = process.env.VUE_APP_SERVER_URL;
    let url = ref($url_rest);

		//달력
    let isDark = ref(false);
    let isRange = ref(false);
		// let date = ref({start:new Date(), end:new Date()});
    let date = ref({start:new Date(), end:new Date()});

		//check box
		let chkStock = ref(false);

		//조회조건 데이터 바인딩
		let req_param = reactive({cboPlant:"",
															cboLgort:"",
															cboStatus:"",
															matnr:"",
															maktx:"",
															cboMatType:"",
															customer:"",
															date:""});

		let optionPlant = reactive([]);
		let optionLgort = reactive([]);
		let optionStatus = reactive([]);
		let optionMatType = reactive([]);

		//focus 이동을 위한 변수
		let cboPlant = ref(null);
		let cboLgort = ref(null);
		let cboStatus = ref(null);
		let cboMatType = ref(null);
		let txtMatnr = ref(null);
		let txtMaktx = ref(null);
		let txtCustomer = ref(null);

		let msg = ref(null);
    let msg_color = ref(null);

		let arrSpan = reactive([]);

		function rowSpan(param) {
			var index = arrSpan.findIndex(v=>v.start===param.node.rowIndex);
			if(index > -1){
				// console.log(arrSpan);
				return arrSpan[index].cnt;
			}
			else{
				return 1;
			}
		}

		// const ShowCellRenderer = function (param) {
		// 	var sData = param.data.status2;
		// 	if(sData=="합계"){
		// 		return '<div class="show-name">' + param.value + '</div>';
		// 	}
		// 	else{
		// 		var index = arrSpan.findIndex(v=>v.status===sData);
		// 		if(index > -1){
		// 			if(param.node.rowIndex == arrSpan[index].start){
		// 				return '<div class="show-name">' + param.value + '</div>';
		// 			}else{
		// 				return;
		// 			}
		// 		}
		// 	}
		// };

		function onPaginationChanged(){
			if(gridApi.value){
				autoSizeAll(false, columnApi);
			}
		}

		// ag-grid 데이터 변수
		let recvData = reactive([]);
		let gridApi = ref(null);
    let columnApi = ref(null);
		let columnDefs= reactive([
			{headerName: '',	headerClass: 'header-row-span-2-pinned',
				children:[
					{headerName: '선택', 					field: 'sel', 		width: 60, 	hide: true, 	cellStyle: {textAlign: "center"},
						headerCheckboxSelection: true, 		checkboxSelection: true,
						headerClass: 'header-row-span-2-pinned',
						pinned: 'left'
					},
				],
			},
			{headerName: '',	headerClass: 'header-row-span-2-pinned',
				children:[
					{headerName: '플랜트', 			field: 'werks', 		width: 80, 	hide: true, 	cellStyle: {textAlign: "center"},
						headerClass: 'header-row-span-2-pinned',
						pinned: 'left'
					},
				],
			},
			{headerName: '',	headerClass: 'header-row-span-2-pinned',
				children:[
					{headerName: '플랜트명', 		field: 'werksnm', 	width: 80, 	hide: true, 	cellStyle: {textAlign: "left"},
						headerClass: 'header-row-span-2-pinned',
						pinned: 'left'
					},
				],
			},
			{headerName: '',		headerClass: 'header-row-span-2-pinned',
				children:[
					{headerName: '상태', 				field: 'status2', 	width: 80, 	hide: false,	cellStyle: {textAlign: "left"},
						// cellRenderer: ShowCellRenderer,
						rowSpan: rowSpan, //params => params.data.status2==='QI보류 - 시생산'?2:1,
						cellClassRules: {
							// 'cell-span-1': "value==='QI보류'",
							'cell-span-1': "value!==''",
							// 'cell-span-1': 'value!=undefined',
							// 'cell-span-1':'true',
						},
						headerClass: 'header-row-span-2-pinned',
						pinned: 'left',
					},
				],
			},
			{headerName: '',		headerClass: 'header-row-span-2-pinned',
				children:[
					{headerName: '저장위치', 		field: 'lgort', width: 80, 	hide: false, 	cellStyle: {textAlign: "center"},
						headerClass: 'header-row-span-2-pinned',
						pinned: 'left',
					},
				],
			},
			{headerName: '',		headerClass: 'header-row-span-2-pinned',
				children:[
					{headerName: '저장위치명',	field: 'lgortnm', width: 80, 	hide: false, 	cellStyle: {textAlign: "left"},
						headerClass: 'header-row-span-2-pinned',
						pinned: 'left',
					},
				],
			},
			{headerName: '',		headerClass: 'header-row-span-2-pinned',
				children:[
					{headerName: '고객사', 			field: 'customer', width: 80, 	hide: false, 	cellStyle: {textAlign: "left"},
						headerClass: 'header-row-span-2-pinned',
						pinned: 'left',
					},
				],
			},
			{headerName: '',		headerClass: 'header-row-span-2-pinned',
				children:[
					{headerName: '자재코드', 		field: 'matnr', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "center"},
						headerClass: 'header-row-span-2-pinned',
						cellRenderer: BoldRenderer,
						pinned: 'left'
					},
				],
			},
			{headerName: '', headerClass: 'header-row-span-2',
				children:[
					{headerName: '자재내역', 		field: 'maktx',			width: 80, 	hide: false, 	cellStyle: {textAlign: "left"},
						headerClass: 'header-row-span-2',
					},
				],
			},
			{headerName: '', headerClass: 'header-row-span-2',
				children:[
					{headerName: '물분사', 			field: 'wtschk', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "center"},
						headerClass: 'header-row-span-2',
						cellClassRules: {'cell-span':'true'},
					},
				],
			},
			{headerName:'전체수량',
				children:[
					{headerName: '수량', 				field: 'qty', 			width: 80, 	hide: false, 	cellStyle: {textAlign: "right"},
						cellRenderer: inputNumberFormat,
					},
					{headerName: '단위', 				field: 'meins', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "center"}},
					{headerName: '환산수량', 		field: 'uqty', 			width: 80, 	hide: false, 	cellStyle: {textAlign: "right"},
						cellRenderer: inputNumberFormat,
					},
					{headerName: '환산단위', 		field: 'umeins', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "center"},
						cellClassRules: {'cell-span':'true'},
					},
				]},
			{headerName:'예탁재고수량',
				children:[
					{headerName: '수량', 				field: 'preqty', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "right"},
						cellRenderer: inputNumberFormat,
					},
					{headerName: '단위', 				field: 'premeins', 	width: 80, 	hide: false, 	cellStyle: {textAlign: "center"}},
					{headerName: '환산수량', 		field: 'preuqty', 	width: 80, 	hide: false, 	cellStyle: {textAlign: "right"},
						cellRenderer: inputNumberFormat,
					},
					{headerName: '환산단위', 		field: 'preumeins', width: 80, 	hide: false, 	cellStyle: {textAlign: "center"},
						cellClassRules: {'cell-span':'true'},
					},
				]},
			{headerName:'정상수량',
				children:[
					{headerName: '수량', 				field: 'qty_n', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "right"},
						cellRenderer: inputNumberFormat,
					},
					{headerName: '단위', 				field: 'meins_n', 	width: 80, 	hide: false, 	cellStyle: {textAlign: "center"}},
					{headerName: '환산수량', 		field: 'uqty_n', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "right"},
						cellRenderer: inputNumberFormat,
					},
					{headerName: '환산단위', 		field: 'umeins_n', 	width: 80, 	hide: false, 	cellStyle: {textAlign: "center"},
						cellClassRules: {'cell-span':'true'},
					},
				]},
			{headerName:'체화수량',
				children:[
					{headerName: '수량', 				field: 'qty_c', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "right"},
						cellRenderer: inputNumberFormat,
					},
					{headerName: '단위', 				field: 'meins_c', 	width: 80, 	hide: false, 	cellStyle: {textAlign: "center"}},
					{headerName: '환산수량', 		field: 'uqty_c',		width: 80, 	hide: false, 	cellStyle: {textAlign: "right"},
						cellRenderer: inputNumberFormat,
					},
					{headerName: '환산단위', 		field: 'umeins_c', 	width: 80, 	hide: false, 	cellStyle: {textAlign: "center"},
						cellClassRules: {'cell-span':'true'},
					},
				]},
			{headerName:'자재특성',
				children:[
					{headerName: '상태코드', 		field: 'status', 		width: 80, 	hide: true, 	cellStyle: {textAlign: "left"}},
					{headerName: 'LPM전면(외)', field: 'lpm_fo', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "left"}},
					{headerName: 'LPM전면(내)', field: 'lpm_fi', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "left"}},
					{headerName: 'LPM후면(외)', field: 'lpm_bo', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "left"}},
					{headerName: 'LPM후면(내)', field: 'lpm_bi', 		width: 80, 	hide: false, 	cellStyle: {textAlign: "left"}},
					{headerName: '경면판(전)', 	field: 'plate_f', 	width: 80, 	hide: false, 	cellStyle: {textAlign: "left"}},
					{headerName: '경면판(후)', 	field: 'plate_b', 	width: 80, 	hide: false, 	cellStyle: {textAlign: "left"}},
				]},
		]);
		let columnsum= ([{
			status2:'합계',
			qty:0,
			uqty:0,
			preqty:0,
			preuqty:0,
			qty_n:0,
			uqty_n:0,
			qty_c:0,
			uqty_c:0
		}]);

		var gridOptions = {
			defaultColDef: {
				width:150,
				editable:false,
				resizable:true,
				sortable:true,
				lockPosition:true, //컬럼 드래그로 이동 방지
				cellStyle: {textAlign: "left"},
			},
			columnDefs:columnDefs,
			// groupIncludeFooter: true,
			// groupIncludeTotalFooter: true,
			// autoGroupColumnDef: {
			// 	headerName: '상태',
			// 	field: 'status2',
			// 	cellRenderer: 'agGroupCellRenderer',
			// 	cellRendererParams: {
			// 		checkbox: true
			// 	}
			// },
			rowData:null,
			rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
			// suppressRowClickSelection:false,
			suppressRowTransform:true,
			pagination: true,
			paginationPageSize: 17,
			// paginationAutoPageSize: true,
			onGridReady: function(event) {
				setTimeout(function () {
					event.api.setRowData(recvData);
					autoSizeAll(false, columnApi);
				}, 1000);
				gridApi.value = event.api;
				columnApi.value = event.columnApi;
				// event.api.sizeColumnsToFit();
			},
			// getRowHeight: function(){
			// 	return 35;
			// },
			// pinnedBottomRowData:[{
			// 	werks:'합계',
			// 	qty:0,
			// 	prtcnt:0,
			// }],
			pinnedBottomRowData:columnsum,
			getRowStyle: function(params){
				if (params.node.rowPinned === 'bottom') {
					return { "background-color": "white", "color":"red", "font-weight":"bold" };
				}
			},
			onPaginationChanged :onPaginationChanged,
		};

		onMounted(() => {
			// console.log("[label_print_hist] = ", "onMounted--");
			window.addEventListener('resize', handleResize);

			if (isRange.value == true){
        // console.log("[label_print_hist] = onMounted -- start --", date.value.start);
        // console.log("[label_print_hist] = onMounted -- end --", date.value.end);
      }
      else{
        date.value = new Date();
        // console.log("[label_print_hist] = onMounted -- date --", date.value);
      }

			initSelectBox_Plant();
		});

		onUnmounted(() =>{
			// console.log("[label_print_hist] = onUnmounted -- ");
			window.removeEventListener('resize', handleResize);
		});

		function handleResize() {
			window_width.value = window.innerWidth;
			window_height.value = window.innerHeight;
		}

		// 순차적으로 호출 하지 않으면 응답값이 중복 처리되는 경우 있음.
		// function initSelectBox(){
		// 	initSelectBox_Plant();
		// 	initSelectBox_Status();
		// 	initSelectBox_MatType();
		// }

		async function initSelectBox_Plant() {
			let send_param = reactive(
				{	lang:"KR",
					userid:store.state.auth.user[0].userid,
					plantcd:getdata(store.state.auth.user[0].plantcd),
					type1:"PLANT_MWMS_3",
					type2:"",
					type3:"",
					type4:"",
					space:"N",
				}
			);

			// console.log("[label_print_hist/initSelectBox_plant] = req_param -- ", req_param);
			let res = reactive([]);
			res = await searchSelectBox(send_param);
			// console.log("[res] = ", res);

			if(res.data.length > 0){
				optionPlant.splice(0, optionPlant.length);
				for(var i=0; i<res.data.length; i++){
						optionPlant.push({id:res.data[i].id, name:res.data[i].name});
				}
			}
			// console.log("[optionPlant data]= ", optionPlant);
			req_param.cboPlant = store.state.auth.user[0].plantcd;
			initSelectBox_Lgort();
		}

		async function initSelectBox_Lgort() {
			// console.log("[req_param] = ", req_param);
			let send_param = reactive(
				{	lang:"KR",
					userid:store.state.auth.user[0].userid,
					plantcd:getdata(req_param.cboPlant),
					type1:"STORE_LOC",
					type2:"",
					type3:"",
					type4:"",
					space:"Y",
				}
			);
			let res = reactive([]);
			res = await searchSelectBox(send_param);

			if(res.data.length > 0){
				optionLgort.splice(0, optionLgort.length);
				for(var i=0; i<res.data.length; i++){
						optionLgort.push({id:res.data[i].id, name:res.data[i].name});
				}
			}
			// console.log("[optionLgort data] = ", optionLgort);

			initSelectBox_Status();
		}

		async function initSelectBox_Status() {
			let send_param = reactive(
				{	lang: store.state.setup.language,
					userid: store.state.auth.user[0].userid,
					plantcd: getdata(store.state.auth.user[0].plantcd),
					type1: "STATUS",
					type2: "",
					type3: "",
					type4: "",
					space: "N",
				}
			);

			// console.log("[label_print_hist/initSelectBox_plant] = req_param -- ", req_param);
			let res = reactive([]);
			res = await searchSelectBox(send_param);
			// console.log("[res] = ", res);

			if(res.data.length > 0){
				optionStatus.splice(0, optionStatus.length);
				for(var i=0; i<res.data.length; i++){
						optionStatus.push({id:res.data[i].id, name:res.data[i].name});
				}
			}
			// console.log("[optionStatus data]= ", optionStatus);
			req_param.cboStatus = "[A] Select Status";

			initSelectBox_MatType();
		}

		async function initSelectBox_MatType() {
			let send_param = reactive(
				{	lang: store.state.setup.language,
					userid: store.state.auth.user[0].userid,
					plantcd: getdata(store.state.auth.user[0].plantcd),
					type1: "MATTYPE",
					type2: "",
					type3: "",
					type4: "",
					space: "Y",
				}
			);

			// console.log("[label_print_hist/initSelectBox_plant] = req_param -- ", req_param);
			let res = reactive([]);
			res = await searchSelectBox(send_param);
			// console.log("[res] = ", res);

			if(res.data.length > 0){
				optionMatType.splice(0, optionMatType.length);
				for(var i=0; i<res.data.length; i++){
						optionMatType.push({id:res.data[i].id, name:res.data[i].name});
				}
			}
			// console.log("[optionMatType data]= ", optionMatType);
		}

		function keyupenter(e){
			if (e.target.id == "cboPlant"){
				// console.log("[req_param.cboPlant] =  -- ", req_param.cboPlant);
				initSelectBox_Lgort();
				cboLgort.value.focus();
			}
			else if (e.target.id == "cboLgort"){
				cboStatus.value.focus();
			}
			else if (e.target.id == "cboStatus"){
				txtMatnr.value.focus();
			}
			else if (e.target.id == "txtMatnr"){
				txtMaktx.value.focus();
			}
			else if (e.target.id == "txtMaktx"){
				cboMatType.value.focus();
			}
			else if (e.target.id == "cboMatType"){
				txtCustomer.value.focus();
			}
		}

		function searchClick(){
			store.commit('loading/startLoading'); //진행표시 시작

			let urlPost = url.value + '/dw_stock_search_p_j';
			req_param.date = formatDate(date.value, "YYYYMMDD");

			// console.log("[req_param] = ", req_param);

			$axios.post(urlPost, {
				lang:"KR",
				userid:store.state.auth.user[0].userid,
				werks: req_param.cboPlant,
				lgort: req_param.cboLgort,
				status: req_param.cboStatus,
				matnr: req_param.matnr,
				maktx: req_param.maktx,
				mattype: req_param.cboMatType,
				customer: req_param.customer,
				date: req_param.date
			})
			.then((res) => {
				if(res.data.length > 0){
					//==== rowSapn 처리를 위해 데이터 정보를 수집한다. ======================
					// arrSpan.splice(0, arrSpan.length);
					// for(var i=0; i<res.data.length; i++){
					// 	var sData = res.data[i].status2;
					// 	if(i==0){
					// 		arrSpan.push({status:sData, cnt:1, start:i});
					// 	}
					// 	else{
					// 		var index = arrSpan.findIndex(v=>v.status===sData);
					// 		console.log("index = ", index);
					// 		if(index > -1){
					// 			arrSpan[index].cnt = arrSpan[index].cnt + 1;
					// 		}
					// 		else{
					// 			arrSpan.push({status:sData, cnt:1, start:i});
					// 		}
					// 	}
					// }
					//==== paging처리시 rowSapn 처리를 위해 데이터 정보를 수집한다.==========
					arrSpan.splice(0, arrSpan.length);
					for(var i=0; i<res.data.length; i=i+17){
						for(var j=0; j<17; j++){
							if(i+j >= res.data.length) break;
							var sData = res.data[i+j].status2;
							if(j==0){
								arrSpan.push({status:sData, cnt:1, start:i+j});
							}
							else{
								var index = -1;
								if(arrSpan[arrSpan.length-1].status === sData) {
									index = arrSpan.length-1;
								}
								// console.log("index = ", index);
								if(index > -1){
									if(arrSpan[index].cnt>=17){
										arrSpan.push({status:sData, cnt:1, start:i+j});
									}
									else{
										arrSpan[index].cnt = arrSpan[index].cnt + 1;
									}
								}
								else{
									arrSpan.push({status:sData, cnt:1, start:i+j});
								}
							}
						}
					}
					//======================================================================

					recvData.value = res.data;
					columnsum[0].qty = 0;
					columnsum[0].uqty = 0;
					columnsum[0].preqty = 0;
					columnsum[0].preuqty = 0;
					columnsum[0].qty_n = 0;
					columnsum[0].uqty_n = 0;
					columnsum[0].qty_c = 0;
					columnsum[0].uqty_c = 0;

					var nRtn = recvData.value.reduce(function(previousValue, currentValue){
						var sum_qty = 0;
						var sum_uqty = 0;
						var sum_preqty = 0;
						var sum_preuqty = 0;
						var sum_qty_n = 0;
						var sum_uqty_n = 0;
						var sum_qty_c = 0;
						var sum_uqty_c = 0;

						sum_qty = Number(isNaN(previousValue.qty)?"0":previousValue.qty) + Number(isNaN(currentValue.qty)?"0":currentValue.qty);
						sum_uqty = Number(isNaN(previousValue.uqty)?"0":previousValue.uqty) + Number(isNaN(currentValue.uqty)?"0":currentValue.uqty);
						sum_preqty = Number(isNaN(previousValue.preqty)?"0":previousValue.preqty) + Number(isNaN(currentValue.preqty)?"0":currentValue.preqty);
						sum_preuqty = Number(isNaN(previousValue.preuqty)?"0":previousValue.preuqty) + Number(isNaN(currentValue.preuqty)?"0":currentValue.preuqty);
						sum_qty_n = Number(isNaN(previousValue.qty_n)?"0":previousValue.qty_n) + Number(isNaN(currentValue.qty_n)?"0":currentValue.qty_n);
						sum_uqty_n = Number(isNaN(previousValue.uqty_n)?"0":previousValue.uqty_n) + Number(isNaN(currentValue.uqty_n)?"0":currentValue.uqty_n);
						sum_qty_c = Number(isNaN(previousValue.qty_c)?"0":previousValue.qty_c) + Number(isNaN(currentValue.qty_c)?"0":currentValue.qty_c);
						sum_uqty_c = Number(isNaN(previousValue.uqty_c)?"0":previousValue.uqty_c) + Number(isNaN(currentValue.uqty_c)?"0":currentValue.uqty_c);

						return ({
							qty:sum_qty,
							uqty:sum_uqty,
							preqty:sum_preqty,
							preuqty:sum_preuqty,
							qty_n:sum_qty_n,
							uqty_n:sum_uqty_n,
							qty_c:sum_qty_c,
							uqty_c:sum_uqty_c,
						});
					});
					columnsum[0].qty = Math.round(nRtn.qty*1000)/1000.0;
					columnsum[0].uqty = Math.round(nRtn.uqty*1000)/1000.0;
					columnsum[0].preqty = Math.round(nRtn.preqty*1000)/1000.0;
					columnsum[0].preuqty = Math.round(nRtn.preuqty*1000)/1000.0;
					columnsum[0].qty_n = Math.round(nRtn.qty_n*1000)/1000.0;
					columnsum[0].uqty_n = Math.round(nRtn.uqty_n*1000)/1000.0;
					columnsum[0].qty_c = Math.round(nRtn.qty_c*1000)/1000.0;
					columnsum[0].uqty_c = Math.round(nRtn.uqty_c*1000)/1000.0;
					// console.log("[columnsum data]", columnsum);

					setTimeout(function () {
						autoSizeAll(false, columnApi);
					});
				}
				else{
					recvData.value = res.data;
				}

				gridApi.value.setPinnedBottomRowData(columnsum);
				msg_color.value = "blue";
				msg.value = "Total Count : " + recvData.value.length ;

				store.commit('loading/endLoading'); //진행표시 중지
			}) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
				//.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
			.catch(err => {
				alert(err);
				console.error(err)

				msg_color.value = "red";
        msg.value = err;

				store.commit('loading/endLoading'); //진행표시 중지
			})
		}

		function closeClick(){
			emit("component_close", "stock_search");
		}

		function testClick(){
			refreshAll(gridApi);
			autoSizeAll(false, columnApi);
		}

		return {
			window_width,
			window_height,
			recvData,
			gridOptions,
			isDark,
			isRange,
			date,
			chkStock,
			req_param,
			cboPlant,
			optionPlant,
			cboLgort,
			optionLgort,
			cboStatus,
			optionStatus,
			cboMatType,
			optionMatType,
			txtMatnr,
			txtMaktx,
			txtCustomer,
			keyupenter,
			searchClick,
			msg,
			msg_color,
			closeClick,
			testClick,
		}
	},
}
</script>

<style lang="scss">
// .header-row-span-2-pinned-top {
// 	top: -43px;
// 	height: 120px;
// 	padding-top : 35px;
// }

// .header-row-span-2-pinned-bottom {
// 	top: -43px;
// 	height: 120px;
// 	padding-bottom : 35px;
// }

.header-row-span-2-pinned {
	position: fixed;
	top: 227px;
	margin-left: 5.5px;
	height: 70px;
	// border: 1px solid red;
}

.header-row-span-2 {
	position: fixed;
	top: -90px;
	height: 250px;
	// border: 1px solid red;
}

// .header-row-span-2 {
// 	position: fixed;
// 	top: -1px;
// 	height: 70px;
// 	// border: 1px solid red;
// }
.cell-span {
	// background-color: white;
	// border-left: 1px solid lightgrey !important;
  border-right: 1px solid lightgrey !important;
  // border-bottom: 1px solid lightgrey !important;
}
.cell-span-1 {
	background-color: white;
	// border-left: 1px solid lightgrey !important;
  border-right: 1px solid lightgrey !important;
  border-bottom: 1px solid lightgrey !important;
	// border:5x solid red;
}
.show-name{
	font-weight:bold;
}
</style>