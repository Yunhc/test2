<template>
	<div class="window-main">
		<div class="window-search-div-3">
			<div class="window-div-left" :style="{height:'152px'}">
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
						<option disabled value="">Select plant</option>
						<option v-for="(d, i) in optionPlant" :key="i" :value="d.id">{{ d.id }}</option>
					</select>
				</div>
				<div class="input-group mb-3 window-div-left-center">
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
						자재코드
					</span>
					<input type="text" class="form-control btn-sm" placeholder="Material" aria-label="UserID" aria-describedby="basic-addon1"
						autocomplete="off"
						v-model="req_param.matnr"
					>
				</div>        

        <div class="input-group mb-3 window-div-left-center">
          <span class="input-group-text btn-sm" id="basic-addon1"
            :style="{width:'80px', margin:'0px 0px 0px 5px'}">
            오더번호
          </span>
          <input type="text" class="form-control btn-sm" placeholder="Order No" aria-label="UserID" aria-describedby="basic-addon1"
            autocomplete="off"
            v-model="req_param.orderno"
          >
        </div>
			</div>

			<div class="window-div-left_22" :style="{height:'152px'}">
      <!-- <div class="window-div-left-top" :style="{height:'152px'}">         -->
        <div align="left"  class= "window-div-left"> 
          <span> 확정여부 </span>   
        
          <div align="left" style="margin:5px 0px 0px 10px; color:black;">
            <div class="form-check form-check-inline">
              <input type="radio" id="en" name="ConfirmRadios" value=false
                v-model="rdoLang"
                @change="radioChangeConfirm">
              <label class="form-check-label" for="false">
                &nbsp;미확정
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input type="radio" id="kr" name="ConfirmRadios" value=true
                v-model="rdoLang"
                @change="radioChangeConfirm">
              <label class="form-check-label" for="true">
                &nbsp;확정
              </label>
            </div>
          </div>            
        </div>

        <div id="dateficker" class="input-group mb-3 window-div-left-top">
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
										오더일자
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
										오더일자
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
      <!-- </div>         -->
			</div>

        <div class="window-div-right" :style="{height:'154px'}">
				<div class= "input-group mb-3 window-div-left-top">
				</div>
				<div class= "input-group mb-3 window-div-left-center">
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
        height: `calc(${window_height - 109 - 155 - 75}px)`,
				width: `calc(${window_width - 10}px)`
      }"
    >
      <ag-grid-vue
        class="ag-theme-alpine"
        headerHeight='35'
        :style="{width:'100%', height:'100%'}"
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
        <!-- <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'3px 5px 0px 0px', width:'150px'}"
        @click='printClick_3'>라벨발행-TEST</button> -->
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'3px 5px 0px 0px', width:'100px'}"
          @click='printClick'
          v-print="printObj">
          라벨발행
        </button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'3px 0px 0px 0px', width:'100px'}"
          @click='closeClick'>
          종료
        </button>
      </div>
    </div>

		<!--라벨 발행 포맷 -->
		<div class="print" id="print_me" v-if="print_yn_1">
			<div v-for="(item, index) in printData" :key="index"
				:id="'print_me' + index">
				<!-- style="page-break-after:always;"> -->
					<div>
						<AutoLabeller1
						:barno="item.barno"
						:ptdesc="item.ptdesc"
						:ptcode="item.ptcode"
						:lotno="item.lotno"
						:date="item.date"
						:matnr="item.matnr"
						:maktx="item.maktx"
						:qty="item.qty"
						:meins="item.meins"/>
					</div>
					<div>
						<AutoLabeller2
						:barno="item.barno"
						:ptdesc="item.ptdesc"
						:ptcode="item.ptcode"
						:lotno="item.lotno"
						:date="item.date"
						:matnr="item.matnr"
						:maktx="item.maktx"
						:qty="item.qty"
						:meins="item.meins"/>
					</div>
			</div>
		</div>
	</div>
</template>
<script>
import $axios from 'axios';
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { useStore } from 'vuex';
import { getdata, formatDate } from '@/helper/filter.js';
// import { getdata, formatDate, addDate } from '@/helper/filter.js';
import { searchSelectBox } from '@/helper/sql.js';
import AutoLabeller1 from "@/components/label/AutoLabeller1.vue";
import AutoLabeller2 from "@/components/label/AutoLabeller2.vue";

import printJs from 'print-js';
import * as print_css from 'print-js/dist/print.css';

import { inputNumberFormat, BoldRenderer, autoSizeAll } from '@/helper/ag-grid.js';

export default {
	name:'management_purchase_order',
	components:{
    AgGridVue,
		AutoLabeller1,
		AutoLabeller2
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
    let isRange = ref(true);
		let date = ref({start:new Date(), end:new Date()});
    // let date = ref({start:new Date(addDate("-6")), end:new Date()});

		//조회조건 데이터 바인딩
		let req_param = reactive({cboPlant:"",
															cboLgort:"",
															f_date:"",
															t_date:"",
															matnr:"",
															stock:"N",
															order:""});

		let optionPlant = reactive([]);
		let optionLgort = reactive([]);

  

		//focus 이동을 위한 변수
		let cboPlant = ref(null);
		let cboLgort = ref(null);
		let barno = ref(null);

		let msg = ref(null);
    let msg_color = ref(null);


		// ag-grid 데이터 변수
		let recvData = reactive([]);
		let gridApi = ref(null);
    let columnApi = ref(null);
		let columnDefs= reactive([
			{headerName: '플랜트', field: 'werks', width: 80, cellStyle: {textAlign: "center"}, pinned: 'left'},
			{headerName: '플랜트명', field: 'plant', width: 80, cellStyle: {textAlign: "left"}, pinned: 'left'},
			{headerName: '', field: 'sel', width: 60, cellStyle: {textAlign: "center"}, pinned: 'left',
				headerCheckboxSelection: true, checkboxSelection: true
			},
			{headerName: '바코드', field: 'barno', width: 80, cellStyle: {textAlign: "center"},
				cellRenderer: BoldRenderer,
				pinned: 'left'
			},
			{headerName: '저장위치', field: 'lgort', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '저장위치명', field: 'slname', width: 80, cellStyle: {textAlign: "left"}},
			{headerName: '자재코드', field: 'matnr', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '자재내역', field: 'maktx', width: 80, cellStyle: {textAlign: "left"}},
			{headerName: '기본단위', field: 'meins', width: 80, cellStyle: {textAlign: "center"}},
			{headerName: '수량', field: 'qty', width: 80, cellStyle: {textAlign: "right"},
				cellRenderer: inputNumberFormat,
			},
			{headerName: '발행횟수', field: 'prtcnt', width: 80, cellStyle: {textAlign: "right"},
				cellRenderer: inputNumberFormat,
			},
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
			{headerName: '패턴명', field: 'ptdesc', width: 80, cellStyle: {textAlign: "left"}},
			{headerName: '패턴코드', field: 'ptcode', width: 80, cellStyle: {textAlign: "left"}},
			{headerName: 'Lot No', field: 'lotno', width: 80, cellStyle: {textAlign: "left"}},
		]);
		let columnsum= ([{
			werks:'합계',
			qty:0,
			prtcnt:0,
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
			rowData:null,
			rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
			suppressRowClickSelection:false,
			onGridReady: function(event) {
				setTimeout(function () {
					event.api.setRowData(recvData);
					autoSizeAll(false, columnApi);
				}, 1000);
				gridApi.value = event.api;
				columnApi.value = event.columnApi;
				event.api.sizeColumnsToFit();
			},
			getRowHeight: function() {
				return 35;
			},
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
			}
		}
  
		let print_yn_1 = ref(false);
		let printData = reactive([]);
		const printObj = {
        // url: 'http://localhost:8080/',
        id:'print_me',
        preview: false,
        previewPrintBtnLabel:'인쇄',
        previewTitle: '인쇄 미리 보기', // The title of the preview window. The default is 打印预览
        popTitle: 'Print Label',
        previewBeforeOpenCallback () {
          // console.log('previewBeforeOpenCallback');
        },
        previewOpenCallback () {
					print_yn_1.value = false;
					printData.splice(0, printData.length); //프린터 미리보기 창 종료시 선택한 데이터를 삭제한다.
					gridApi.value.deselectAll();
          // console.log('previewOpenCallback');
        },
        beforeOpenCallback () {
          // console.log('beforeOpenCallback');
        },
        openCallback () {
          // console.log('openCallback');
        },
        closeCallback () {
					print_yn_1.value = false;
					printData.splice(0, printData.length); //프린터 미리보기 창 종료시 선택한 데이터를 삭제한다.
					gridApi.value.deselectAll();
          // console.log('closeCallback');
        }
      };

		onMounted(() => {
			// console.log("[management_purchase_order] = ", "onMounted--");
			window.addEventListener('resize', handleResize);

			if (isRange.value == true){
        // console.log("[management_purchase_order] = onMounted -- start --", date.value.start);
        // console.log("[management_purchase_order] = onMounted -- end --", date.value.end);
      }
      else{
        date.value = new Date();
        // console.log("[management_purchase_order] = onMounted -- date --", date.value);
      }

			initSelectBox();
		});

		onUnmounted(() =>{
			// console.log("[management_purchase_order] = onUnmounted -- ");
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
					type1:"PLANT_MWMS_3",
					type2:"",
					type3:"",
					type4:"",
					space:"Y",
				}
			);

			// console.log("[management_purchase_order/initSelectBox_plant] = req_param -- ", req_param);
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
			store.commit('loading/startLoading'); //진행표시 시작

			let urlPost = url.value + '/dw_labelhistsearch_p_j';

			req_param.f_date = formatDate(date.value.start, "YYYYMMDD");
			req_param.t_date = formatDate(date.value.end, "YYYYMMDD");

			// console.log("[req_param] = ", req_param);

			$axios.post(urlPost, {
				lang:"KR",
				userid:store.state.auth.user[0].userid,
				werks: req_param.cboPlant,
				lgort: req_param.cboLgort,
				matnr: req_param.matnr,
				order: req_param.order,
				f_date: req_param.f_date,
				t_date: req_param.t_date
			})
			.then((res) => {
				recvData.value = res.data;
				columnsum[0].qty = 0;
				columnsum[0].prtcnt = 0;
				if(res.data.length > 0){
					// columnsum[0].qty = recvData.value.reduce((prev, next) => {prev + next.qty});
					// var nRtn = recvData.value.reduce(function(previousValue, currentValue, currentIndex, array1){
					// 	var sum = 0;
					// 	console.log("previousValue ", previousValue);
					// 	console.log("currentValue ", currentValue);
					// 	console.log("currentIndex ", currentIndex);
					// 	console.log("array1 ", array1);
					// 	sum = parseInt(previousValue.qty) + parseInt(currentValue.qty);
					// 	return ({qty:sum});
					// });

					var nRtn = recvData.value.reduce(function(previousValue, currentValue){
						var sumqty = 0;
						var sumprtcnt = 0;
						sumqty = parseFloat(previousValue.qty) + parseFloat(currentValue.qty);
						sumprtcnt = parseFloat(previousValue.prtcnt) + parseFloat(currentValue.prtcnt);
						return ({qty:sumqty, prtcnt:sumprtcnt});
					});
					columnsum[0].qty = nRtn.qty;
					columnsum[0].prtcnt = nRtn.prtcnt;
					// console.log("[columnsum data]", columnsum);

					setTimeout(function () {
						autoSizeAll(false, columnApi);
					});
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

		function printClick(){
			print_yn_1.value = true;
			var selectedData = gridApi.value.getSelectedRows();
			if(selectedData.length>0){
				// print_yn_1.value = true;
				printData.splice(0, printData.length);
				for(var j=0; j<selectedData.length; j++ ){
					printData.push({barno:selectedData[j].barno,
													ptdesc:selectedData[j].ptdesc,
													ptcode:selectedData[j].ptcode,
													lotno:selectedData[j].lotno,
													date:selectedData[j].prodate,
													matnr:selectedData[j].matnr,
													maktx:selectedData[j].maktx,
													qty:selectedData[j].qty,
													meins:selectedData[j].meins});
				}
				// console.log("[printData]", printData);
			}
		}

		function printClick_1(){
			printClick();

			if(printData.length>0){
				var newWin = window.open("");// 새로운 빈 창을 엽니 다
				// var newWin = window.open('', "PrintWindow",
				// 	"toolbars=no, scrollbars=no, status=no, resizable=no, location=no");// 새로운 빈 창을 엽니 다

				for(var i=0; i<printData.length; i++ ){

					var imageToPrint = document.getElementById("print_me" + i); // 인쇄하는 데 필요한 콘텐츠를
					newWin.document.write(imageToPrint.outerHTML);					// 컨텐츠를 추가하면 새 창에 인쇄해야
				}
				const styleSheet = '<style>li{list-style==none; border: 1px solid #e8e8e8;}</style>';
				newWin.document.head.innerHTML = styleSheet;
				newWin.document.close();

				newWin.focus();
				setTimeout(function() {
					newWin.print();//인쇄
					newWin.close();//창을 닫습니다
				}, 500);
			}
		}

		function printClick_2(){
			var selectedData = gridApi.value.getSelectedRows();
			// console.log("[checked row]", selectedData);

			// var newWin = window.open('', "PrintWindow",
			// 						"width=5, height=5, toolbars=no, scrollbars=no, status=no, resizeable=no, location=no");// 새로운 빈 창을 엽니 다
			var newWin = window.open('', "PrintWindow",
									"toolbars=no, scrollbars=no, status=no, resizable=no, location=no");// 새로운 빈 창을 엽니 다

			for(var i=0; i<selectedData.length; i++ ){
				// console.log("[checked barno]", selectedData[i].barno);

				// var imageToPrint = document.getElementById("print_me"); // 인쇄하는 데 필요한 콘텐츠를
        // newWin.document.write(imageToPrint.outerHTML);					// 컨텐츠를 추가하면 새 창에 인쇄해야

				newWin.document.write('<html>');
				newWin.document.write('<head><title>PrintWindow</title>');
				// newWin.document.write('<link rel="stylesheet" type="text/scss" href="${ctx }/assets/style/print.scss"/>');
				newWin.document.write('</head>');
				newWin.document.write('<body class="print-body">');

				newWin.document.write('<div class="print-mdf-1" style="page-break-after: always">'); //인쇄시 다음 페이지로 넘긴다.
				newWin.document.write('<div class="input-group mb-3">');
				newWin.document.write('	<input type="text" class="form-control btn-sm" aria-label="UserID" aria-describedby="basic-addon1"');
				newWin.document.write('		value="Dongwha Label Test">');
				newWin.document.write('</div>');
				newWin.document.write('<p>' + "Barcode " + selectedData[i].barno + '</p>');
				newWin.document.write('<h1>' + "수량 " + selectedData[i].qty + '</h1>');
				newWin.document.write('</div>');
				newWin.document.write('</body></html>');
			}

			newWin.document.write('<style lang="scss">');

			newWin.document.write('.print-body {');
			newWin.document.write('	margin: 1px 0px 0px 1px;');
			newWin.document.write('}');

			newWin.document.write('.print-mdf-1 {');
			newWin.document.write('	background:white;');
			newWin.document.write('	height: 380px;');
			newWin.document.write('	width: 390px;');
			newWin.document.write('	padding: 2px;');
			newWin.document.write('	margin: 0px 0px 0px 0px;');
			newWin.document.write('	border: 1px solid black;');
			newWin.document.write('}');

			newWin.document.write('</style>');

			// const styleSheet = '<style>li{list-style==none; border: 1px solid #e8e8e8;}</style>';
			// newWin.document.head.innerHTML = styleSheet;
			newWin.document.close();

      newWin.focus();
      setTimeout(function() {
        newWin.print();//인쇄
        newWin.close();//창을 닫습니다
      }, 500);
		}

		function printClick_3(){
			printClick();

			printJs({
        printable: "print_me",       //Id to print content
        type: "html",             //You can print html, img details can be found in the official document https://printjs.crabbly.com/
        style: print_css.printcss,  	//The printed content does not have css style, here need string type css style
      });

		}

		function closeClick(){
			emit("component_close", "management_purchase_order");
		}

		return {
			window_width,
			window_height,
			recvData,
			gridOptions,
			isDark,
			isRange,
			date,
			req_param,
			cboPlant,
			optionPlant,
			cboLgort,
			optionLgort,
			keyupenter,
			searchClick,
			msg,
			msg_color,
			print_yn_1,
			printClick,
			printClick_1,
			printClick_2,
			printClick_3,
			printData,
			printObj,
			closeClick,
      
		}
	},
}
</script>

<style lang="scss">
</style>