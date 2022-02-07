<template>
	<div class="window-main">
		<div class="window-search-div-3">
			<div class="window-div-left">
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{width:'80px', margin:'0px 0px 0px 5px'}">
							플랜트
						</span>
						<select class="form-select btn-sm" aria-label="Default select example"
							id="cboPlant"
							ref="cboPlant"
							@change ='keyupenter'
							v-model="req_param.cboPlant">
							<option disabled value="">Select plant</option>
							<option v-for="(d, i) in optionPlant" :key="i" :value="d.id">{{ d.id }}</option>
						</select>
					</div>
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{margin:'5px 0px 0px 0px'}">
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
									<div class="input-group mb-3" :style="{height:'15px'}">
										<span class="input-group-text btn-sm" id="basic-addon1"
											:style="{width:'80px', margin:'0px 0px 0px 5px'}">
											발행일자
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
									<span class="input-group-text btn-sm" id="basic-addon1"
										:style="{width:'80px', margin:'0px 0px 0px 5px'}">
										발행일자
									</span>
									<input class="form-control btn-sm"
										:style="{'text-align':'center'}"
										data-ref="InputContent" inputmode="none"
										:value="inputValue"
										v-on="inputEvents"/>
								</template>
							</template>
						</v-date-picker>
					</div>
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{width:'80px', margin:'0px 0px 0px 5px'}">
							자재코드
						</span>
						<input type="text" class="form-control btn-sm" placeholder="Material" aria-label="UserID" aria-describedby="basic-addon1"
							v-model="req_param.matnr"
						>
					</div>
				</form>
			</div>
			<div class="window-div-left">
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
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
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{ margin:'0px 0px 0px 5px'}">
							바코드NO
						</span>
						<input type="text" class="form-control btn-sm" placeholder="barcode No" aria-label="UserID" aria-describedby="basic-addon1"
							id="barno"
							ref="barno"
							v-model="req_param.barno"
						>
					</div>
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{width:'80px', margin:'0px 0px 0px 5px'}">
							자재내역
						</span>
						<input type="text" class="form-control btn-sm" placeholder="Description" aria-label="UserID" aria-describedby="basic-addon1"
							v-model="req_param.maktx"
						>
					</div>
				</form>
			</div>
			<div class="window-div-left">
				<form class="d-flex" :style="{height:'37px'}" >
					<div align="left">
						<input class="form-check-input" type="checkbox" id="defaultCheck1"
							:style="{width:'20px', height:'20px', margin:'10px 0px 0px 5px'}"
							v-model="chkStock">
						<label class="form-check-label" for="defaultCheck1"
							:style="{ margin:'10px 0px 0px 5px', color:'rgb(34, 33, 33)', 'font-size':'14px'}"
						>
							재고유무
						</label>
					</div>
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{width:'80px', margin:'0px 0px 0px 5px'}">
							오더번호
						</span>
						<input type="text" class="form-control btn-sm" placeholder="Order No" aria-label="UserID" aria-describedby="basic-addon1"
							v-model="req_param.orderno"
						>
					</div>
				</form>
			</div>
			<div class="window-div-right">
				<form class="d-flex" :style="{height:'37px'}" >
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
				</form>
				<div :style="{ margin:'5px 0px 0px 0px'}"
					div align="right">
					<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 5px 0px 10px', height:'32px'}"
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
        style="width: 1910px; height:100%"
        :rowData="recvData.value"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
        >
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
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'3px 0px 0px 0px', width:'80px'}"
          @click='printClick'>라벨발행</button>
      </div>
    </div>

	</div>
	<div id='print_me'>
	</div>
</template>
<script>
import $axios from 'axios';
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { useStore } from 'vuex';
import { getdata, formatDate } from '@/helper/filter.js';
import { searchSelectBox } from '@/helper/sql.js';


export default {
	name:'label_print_hist',
	components:{
    AgGridVue,
	},
	setup() {
		// let url = ref(process.env.VUE_APP_SERVER_URL);
		let window_width = ref(window.innerWidth);
		let window_height = ref(window.innerHeight);
		const store = useStore();	//스토어호출
		const $url_rest = process.env.VUE_APP_SERVER_URL;
    let url = ref($url_rest);

		//달력
    let isDark = ref(false);
    let isRange = ref(true);
    let date = ref({start:new Date(), end:new Date()});

		//check box
		let chkStock = ref(false);

		//조회조건 데이터 바인딩
		let req_param = reactive({cboPlant:"",
															cboLgort:"",
															f_date:"",
															t_date:"",
															barno:"",
															matnr:"",
															maktx:"",
															stock:"N",
															order:""});

		let optionPlant = reactive([]);
		let optionLgort = reactive([]);

		//focus 이동을 위한 변수
		let cboPlant = ref(null);
		let cboLgort = ref(null);
		let barno = ref(null);


		// ag-grid 데이터 변수
		let recvData = reactive([]);
		let gridApi = ref(null);
    let columnApi = ref(null);
		let columnDefs= reactive([
			{headerName: '플랜트', field: 'werks', width: 80, cellStyle: {textAlign: "center"}, pinned: 'left'},
			{headerName: '플랜트명', field: 'plant', width: 80, cellStyle: {textAlign: "left"}, pinned: 'left'},
			{headerName: '', field: 'sel', width: 35, cellStyle: {textAlign: "center"}, pinned: 'left',
				headerCheckboxSelection: true, checkboxSelection: true},
			{headerName: '바코드', field: 'barno', width: 80, cellStyle: {textAlign: "center"}, pinned: 'left'},
			{headerName: '저장위치', field: 'lgort', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '저장위치명', field: 'slname', width: 80, cellStyle: {textAlign: "left"}},
			{headerName: '자재코드', field: 'matnr', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '자재내역', field: 'maktx', width: 80, cellStyle: {textAlign: "left"}},
			{headerName: '기본단위', field: 'meins', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '수량', field: 'qty', width: 80, cellStyle: {textAlign: "right"}},
			{headerName: '발행횟수', field: 'prtcnt', width: 80, cellStyle: {textAlign: "right"}},
			{headerName: '구매오더', field: 'ebeln', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '구매품번', field: 'ebelp', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '예정오더', field: 'rsnum', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '예정품번', field: 'rspos', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '생산오더', field: 'aufnr', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '계획오더', field: 'plnum', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: 'S/O', field: 'kdauf', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: 'S/O품번', field: 'kdpos', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '발행일자', field: 'prodate', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '갱신일자', field: 'upddate1', width: 80, cellStyle: {textAlign: "center"}},
		]);
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
			rowData:null,
			rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
			suppressRowClickSelection:true,
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

		// const printObj = {
    //     // url: 'http://localhost:8080/',
    //     id:'printMe',
    //     preview: false,
    //     previewPrintBtnLabel:'인쇄',
    //     previewTitle: '인쇄 미리 보기', // The title of the preview window. The default is 打印预览
    //     popTitle: 'Print Test',
    //     previewBeforeOpenCallback () {
    //       console.log('previewBeforeOpenCallback')
    //     },
    //     previewOpenCallback () {
    //       console.log('previewOpenCallback')
    //     },
    //     beforeOpenCallback () {
    //       console.log('beforeOpenCallback')
    //     },
    //     openCallback () {
    //       console.log('openCallback')
    //     },
    //     closeCallback () {
    //       console.log('closeCallback')
    //     }
    //   };

		onMounted(() => {
			console.log("[label_print_hist] = ", "onMounted--");
			window.addEventListener('resize', handleResize);

			if (isRange.value == true){
        console.log("[label_print_hist] = onMounted -- start --", date.value.start);
        console.log("[label_print_hist] = onMounted -- end --", date.value.end);
      }
      else{
        date.value = new Date();
        console.log("[label_print_hist] = onMounted -- date --", date.value);
      }

			initSelectBox();
		});

		onUnmounted(() =>{
			console.log("[label_print_hist] = onUnmounted -- ");
			window.removeEventListener('resize', handleResize);
		});

		function handleResize() {
			window_width.value = window.innerWidth;
			window_height.value = window.innerHeight;
		}

		function initSelectBox(){
			initSelectBox_plant();
			initSelectBox_lgort();
		}

		async function initSelectBox_plant() {
			let send_param = reactive(
				{	lang:"KR",
					userid:store.state.auth.user[0].userid,
					plantcd:getdata(store.state.auth.user[0].plantcd),
					type1:"PLANT_MWMS_2",
					type2:"",
					type3:"",
					type4:"",
					space:"Y",
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
		}

		async function initSelectBox_lgort() {
			// console.log("[req_param] = ", req_param);
			let send_param = reactive(
				{	lang:"KR",
					userid:store.state.auth.user[0].userid,
					plantcd:getdata(req_param.cboPlant),
					type1:"LGORT_MWMS",
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
		}

		function keyupenter(e){
			if (e.target.id == "cboPlant"){
				// console.log("[req_param.cboPlant] =  -- ", req_param.cboPlant);
				initSelectBox_lgort();
				cboLgort.value.focus();
			}
			else if (e.target.id == "cboLgort"){
				barno.value.focus();
			}
		}

		function searchClick(){
			let urlPost = url.value + '/dw_labelhistsearch_p_j';

			req_param.f_date = formatDate(date.value.start, "YYYYMMDD");
			req_param.t_date = formatDate(date.value.end, "YYYYMMDD");
			if (chkStock.value == true)
				req_param.stock = "Y";
			else
				req_param.stock = "N";

			console.log("[req_param] = ", req_param);

			$axios.post(urlPost, {
				lang:"KR",
				userid:store.state.auth.user[0].userid,
				werks: req_param.cboPlant,
				lgort: req_param.cboLgort,
				matnr: req_param.matnr,
				maktx: req_param.maktx,
				barno: req_param.barno,
				order: req_param.order,
				stock: req_param.stock,
				f_date: req_param.f_date,
				t_date: req_param.t_date
			})
			.then((res) => {
				console.log("[response data]", res.data);
				recvData.value = res.data;

				setTimeout(function () {
            autoSizeAll(false);
          }, 500);
			}) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
				//.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
			.catch(err => {
				alert(err);
				console.error(err)
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

		function printClick(){
			var selectedData = gridApi.value.getSelectedRows();
			// console.log("[checked row]", selectedData);

			var newWin = window.open("");// 새로운 빈 창을 엽니 다

			for(var i=0; i<selectedData.length; i++ ){
				console.log("[checked barno]", selectedData[i].barno);

				// var imageToPrint = document.getElementById("print_me"); // 인쇄하는 데 필요한 콘텐츠를
        newWin.document.write("test print");							// 컨텐츠를 추가하면 새 창에 인쇄해야
			}


      // for (var i = 0; i < this.items.length; i++) {
      //   var imageToPrint = document.getElementById("printDiv" + i); // 인쇄하는 데 필요한 콘텐츠를
      //   newWin.document.write(imageToPrint.outerHTML);// 컨텐츠를 추가하면 새 창에 인쇄해야
      // }
      const styleSheet = '<style>li{list-style==none; border: 1px solid #e8e8e8;}</style>';
      newWin.document.head.innerHTML = styleSheet;
      newWin.document.close();
      newWin.focus();
      setTimeout(function() {
        newWin.print();//인쇄
        newWin.close();//창을 닫습니다
      }, 100);
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
			barno,
			keyupenter,
			searchClick,
			printClick
		}
	},
}
</script>

<style lang="scss">
</style>