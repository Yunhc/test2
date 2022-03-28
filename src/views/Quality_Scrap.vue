<template>

  <div class="window-main">
    <!-- Send버튼 클릭후 오더수량보다 스캔수량이 적을 경우 처리 여부 문의 팝업화면 -->
     <popupyn v-if="popupisopen"
      :title="popupTitle"
      :message="popupMsg"
      @yesClick="yesClick"
      @noClick="popupisopen=false">
    </popupyn>

    <div class="window-search-5">
      <!-- 바코드 번호 -->
      <div class="input-group mb-3" :style="{ margin:'2px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">{{titleBarNo}}
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Barcode No"
            aria-label="Barcode No" aria-describedby="basic-addon1"
            :style="{color: 'gray', 'text-align':'left'}">
            {{lblBarNo}}
        </label>
        <!-- <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 0px 0px 5px', width:'120px'}"
          @click="fullPageChange" v-if="fullPage === false">Full Screen</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 0px 0px 5px', width:'120px'}"
          @click='fullPageChange' v-if="fullPage === true">Full Screen Off</button> -->
      </div>

      <!-- 재고상태 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">{{titleStatus}}
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Status"
            aria-label="Status" aria-describedby="basic-addon1"
            :style="{color: 'gray', 'text-align':'left'}">
            {{lblStatus}}
        </label>
      </div>

      <!-- 자재코드 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">{{titleMatnr}}
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Material"
            aria-label="Material" aria-describedby="basic-addon1"
            :style="{color: 'gray', 'text-align':'left'}">
            {{lblMatnr}}
        </label>
      </div>

      <!-- 자재내역 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <label type="label" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Material Description"
            aria-label="Material Description" aria-describedby="basic-addon1"
            :style="{color: 'gray', 'text-align':'left'}">
            {{lblMaktx}}
        </label>
      </div>

      <!-- 수량 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">{{titleQty}}
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Qty"
            aria-label="Tot Prod Qty" aria-describedby="basic-addon1"
            :style="{color: 'gray', 'text-align':'left'}">
            {{lblQty}}
        </label>
      </div>
    </div>
    <div class="window-grid-2"
      :style="{
        'height': `calc(${window_height - 109 - 157 - 110}px)`
      }"
    >
      <ag-grid-vue
        id="agGrid1"
        class="ag-theme-balham"
        headerHeight='35'
        style="width: 1910px; height:100%"
        :columnDefs="columnDefs"
        :rowData="recvData.value"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
        >
      </ag-grid-vue>
    </div>

    <!-- 바코드 스캔 -->
    <div class= "window-save-2">
      <div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px'}">
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan barcode" aria-label="Scan barcode" aria-describedby="basic-addon1"
          id="scan"
          ref="scan"
          @keyup.enter='keyupenter'
          @click='scanClick'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="none"
          v-model="req_param.txtScan">
      </div>
      <div class="input-group mb-3"
        :style="{height:'30px', margin:'-14px 0px 0px 0px', background:'gainsboro'}">
        <p :style="{margin:'2px 0px 0px 0px',
                    background:'transparent',
                    'font-size':'16px',
                    'font-weight':'bold',
                    color:msg_color}">
          Msg:{{msg}}
        </p>
      </div>
      <div align="right" :style="{height:'40px', margin:'-17px 0px 0px 0px'}">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='sendClick'>{{lblSend}}</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='deleteClick'>{{lblDelete}}</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='clearClick'>{{lblClear}}</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
        @click='closeClick'>{{lblClose}}</button> 
      </div>
    </div>
  </div>
</template>
<script>
  import $axios from 'axios';
  import { reactive, ref, onBeforeMount, onMounted, onUnmounted } from 'vue'
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import {AgGridVue} from 'ag-grid-vue3'
  import { useStore } from 'vuex';
  import language from '@/assets/language.js';
  // import { getdata } from '@/helper/filter.js';
  import { PlaySound } from '@/helper/util.js';
  import popupyn from '@/views/PopupYN.vue';
  // import { BoldRenderer, autoSizeAll } from '@/helper/ag-grid.js';
  import { BoldRenderer } from '@/helper/ag-grid.js';

  export default {
    name:'quality_scrap',
    components:{
      AgGridVue,
      popupyn,
    },

    setup(props,{emit}){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      //화면 언어 설정==============================================================================//
      let lang = ref(language.quality_scrap);

      let popupTitle = ref(null);
      let popupMsg = ref(null);
      let popupisopen = ref(false);
      // let fullPage = ref(false);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let titleBarNo = ref("바코드");
      let titleStatus = ref("재고상태");
      let titleMatnr = ref("자재코드");
      let titleQty = ref("수량");
      let lblBarNo = ref(null);
      let lblStatus = ref(null);
      let lblMatnr = ref(null);
      let lblMaktx = ref(null);
      let lblQty = ref(null);
      let lblSend = ref("전송");
      let lblDelete = ref("삭제");
      let lblClear = ref("초기화");
      let lblClose = ref("닫기");

      let recvData = reactive([]);

      //focus 이동을 위한 변수
      let scan = ref(null);
      let strCalltype = ref(null);

      //데이터 바인딩
      let req_param = reactive({txtScan:"1210503100419"});
      let msg = ref(null);
      let msg_color = ref(null);

      let gridApi = ref(null);
      let columnApi = ref(null);

      let columnDefs= reactive([
				{headerName: '', field: 'sel', width: 4, cellStyle: {textAlign: "center"},
					headerCheckboxSelection: true, checkboxSelection: true, pinned: 'left'},        
        {headerName: '바코드', field: 'barno', width: 10, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left',
          cellRenderer: BoldRenderer,},
        {headerName: '재고상태', field: 'status', width: 10, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '처리유형', field: 'proctype', width: 4, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '라벨유형', field: 'lbltype', width: 4, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '수량', field: 'qty', width: 6, cellStyle: {textAlign: "right"}, valueFormatter: (params) => {return Number(params.value).toLocaleString()}, sortable: true},
        {headerName: '단위', field: 'meins', width: 4, cellStyle: {textAlign: "left"}, sortable: true},
        {headerName: '자재코드', field: 'matnr', width: 10, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '자재명', field: 'maktx', width: 20, cellStyle: {textAlign: "left"}, sortable: true},
        {headerName: '그룹바코드', field: 'grpbarno', width: 10, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '낱박스존재', field: 'subflag', width: 4, cellStyle: {textAlign: "center"}},
        {headerName: '플랜트', field: 'werks', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '작업장', field: 'arbpl', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '저장위치', field: 'lgort', width: 10, cellStyle: {textAlign: "center"}},        
        {headerName: 'S/O 번호', field: 'kdauf', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: 'S/O 품번', field: 'kdpos', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '이전바코드', field: 'prebar', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '이전자재코드', field: 'prematnr', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: 'D/O 번호', field: 'vbeln', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: 'D/O 품번', field: 'posnr', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: 'Lot 번호', field: 'lotno', width: 8, cellStyle: {textAlign: "center"}},
        {headerName: '생산일자', field: 'proddate', width: 8, cellStyle: {textAlign: "center"}},
        {headerName: 'LPM전면(내)', field: 'lpm_fo', width: 6, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: 'LPM전면(외)', field: 'lpm_fi', width: 6, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: 'LPM후면(내)', field: 'lpm_bo', width: 6, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: 'LPM후면(외)', field: 'lpm_bi', width: 6, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '경면판(전)', field: 'plate_f', width: 4, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '경면판(후)', field: 'plate_b', width: 4, hide: true, cellStyle: {textAlign: "center"}},
      ]);
      var gridOptions = {
        defaultColDef: {
          width: 100,
          editable: false,
          resizable: true,
          sortable: true,
          lockPosition: true, //컬럼 드래그로 이동 방지
          cellStyle: {textAlign: "left"},
        },

        // columnDefs: columnDefs,
        rowData: null,
        rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
        onGridReady: function(event) {
          console.log("[Quality Scrap] = ", "onGridReady");
          //timeout 설정하면 화면오픈시 그리드 비활성화됨.
          // setTimeout(function () {
            event.api.setRowData(recvData);
          // }, 500);
          //화면오픈시 그리드 칼럼명으로 칼럼폭 자동조정. timeout 설정없으면 동작안됨.
          setTimeout(function () {
            autoSizeAll(false);
          }, 500);
          event.api.sizeColumnsToFit();
          gridApi.value = event.api;
          columnApi.value = event.columnApi;
        },
        getRowHeight: function() {
          return 35;
        },
        // onGridSizeChanged: function(event) {
        //   event.api.sizeColumnsToFit();
        // },
      };

      onBeforeMount(()=>{
        console.log("[Quality Scrap] = ", "onBeforeMount--");
        // lblMaktx.value = "자재 상세내역을 표시합니다."
        lblMaktx.value = lang.value['lblMaktx'][store.state.setup.language];
      });

      onMounted(() => {
        console.log("[Quality Scrap] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
        setLanguage();
        scan.value.focus();
      });

      onUnmounted(() =>{
        console.log("[Quality Scrap] = onUnmounted -- ");
        window.removeEventListener('resize', handleResize);
      });

      function handleResize() {
        window_width.value = window.innerWidth;
        window_height.value = window.innerHeight;
      }

      const getSelectedRows = () => {
        const selectedNodes = gridApi.value.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
      };

      // function fullPageChange(){
      //   const documentElement = document.documentElement;
      //   if (document.fullscreenElement === null) { //전체화면 아닌 상태
      //     documentElement.requestFullscreen();
      //     fullPage.value = true;
      //     console.log(fullPage.value);
      //   } else { //전체화면 상태
      //     document.exitFullscreen();
      //     fullPage.value = false;
      //     console.log(fullPage.value);
      //   }
      // }

      async function fn_Search(){
        var rtn = false;
        // store.commit('loading/startLoading');
        let urlPost = url.value + '/dw/quality/pda/barcode_search';
        // console.log(store.state.setup.language.toUpperCase());
        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        await $axios.post(urlPost, {
            i_lang: store.state.setup.language.toUpperCase(),  //"KR",
            // i_werks: getdata(store.state.auth.user[0].plantcd),
            i_werks: "K143",
            i_userid: store.state.auth.user[0].userid.toUpperCase(),
            i_barno: req_param.txtScan,
            i_calltype: "", //취소시 Cancel
        })
        .then((res) => {
          console.log("[response data]", res.data);
          if(res.data.length > 0) {
            lblBarNo.value = res.data[0].barno;
            lblStatus.value = res.data[0].status;
            lblQty.value = res.data[0].qty;         
            lblMatnr.value = res.data[0].matnr;
            lblMaktx.value = res.data[0].maktx;

            var isBreak = false;
            gridApi.value.forEachNode( (node) => {
              console.log("[node.getdata]", node.rowIndex, " : ", node.data.barno);
              if (node.data.barno == res.data[0].grpbarno) {
                // alert('그룹바코드가 이미 스캔되었습니다.')
                // return;  //forEachNode 루프를 빠져나가지 못한다. 
                isBreak = true;
              }
            });
            if (!isBreak) {
              //조회데이터 그리드에 추가
              gridApi.value.updateRowData({add: [res.data[0]], addIndex:0});
              // setTimeout(function () {
                autoSizeAll(false);   //그리드 칼럼폭 재조정
              // }, 500);
              rtn = true;
              msg.value = "바코드 정보가 조회되었습니다.";
            } else {
              msg.value = "[" + res.data[0].grpbarno + "] 그룹바코드가 이미 스캔되었습니다.";
              res = false;
            }
          } else {
            msg.value = "바코드 정보가 없습니다.";
            rtn = false;
          }
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err);
          msg.value = err;
          rtn = false;
        })
        // store.commit('loading/endLoading');
        return rtn;
      }

      async function keyupenter(e){
        if (e.target.id == "scan"){
          console.log("txtScan: ",req_param.txtScan);
          //키보드 입력을 해지
          // var tmpScan = document.getElementById("scan");
          // tmpScan.setAttribute('inputmode','none');
          // console.log(tmpScan.inputMode);

          if (req_param.txtScan.length != 13) {
						alert('유효하지 않은 바코드번호입니다.')
						return;
          }
          var isBreak = false;
					gridApi.value.forEachNode( (node) => {
						console.log("[node.getdata]", node.rowIndex, " : ", node.data.barno);
						if (node.data.barno == req_param.txtScan) {
              // alert('이미 스캔한 바코드입니다.')
              msg.value = "이미 스캔한 바코드입니다."
              // return;  //forEachNode 루프를 빠져나가지 못한다. 
              isBreak = true;
						}
            if (req_param.txtScan.substr(0,1) == "9") {
              if (node.data.grpbarno == req_param.txtScan) {
                // alert('그룹에 속한 낱바코드가 이미 스캔되었습니다.') //alert가 여러번 반복될 수 있다.
                msg.value = "그룹에 속한 낱바코드가 이미 스캔되었습니다."
                isBreak = true;
              }
            }
					});
          
          console.log("에러발생: ", isBreak);
          if (!isBreak) { //에러체크 통과시만 바코드 조회 API 전송
            var bRtn = await fn_Search();
            console.log("bRtn: ", bRtn);
            if (bRtn) {
              msg_color.value = "blue";
              PlaySound("OK");
            } else {
              msg_color.value = "red";
            }
            scan.value.focus();
          } else {
            alert(msg.value);
            msg_color.value = "red";
          }

          // scan.value.select();
          // msg_color.value = "blue";
          // msg.value = "스캔한 바코드가 추가되었습니다.";
        }
      }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }

      function noClick(){
        popupisopen.value = false;
      }

      async function sendData(){
        var rtn = false;
        var barlist = "";
        //그리드의 마지막 row부터 전송하기 위하여 forEachNode를 사용하지 않는다.
        // gridApi.value.forEachNode( (node) => {
        for (var i = gridApi.value.getDisplayedRowCount()-1; i>=0; i--) {
          const node = gridApi.value.getDisplayedRowAtIndex(i);
          if (i==0) {  //마지막 데이터이면 구분자(콤마)를 넣지 않는다.
            barlist = barlist + node.data.barno
          } else {
            barlist = barlist + node.data.barno + ",";
          }
        }
        console.log("barlist: ", barlist);

        let urlPost = url.value + '/dw/quality/pda/scrap_save';

        console.log("[req_param]", req_param);
        // console.log(getdata(req_param.txtScan));

        await $axios.post(urlPost, {
          i_lang: store.state.setup.language.toUpperCase(),  //"KR",
          // i_werks: getdata(store.state.auth.user[0].plantcd),
          i_werks: "K143",
          i_userid: store.state.auth.user[0].userid.toUpperCase(),
          i_barno: barlist,
          i_calltype: "", //사용안함. 단, 반드시 지정.
        })
        .then((res) => {
          console.log("[response data]", res.data);

          if(res.data.length > 0) {
            if (res.data[0].code == "NG") {
              msg_color.value = "red";
              msg.value = res.data[0].message;
              rtn = false;
            } else {
              msg.value = "정상 처리되었습니다.";
              // gridApi.value.updateRowData({add: [res.data[0]], addIndex:0});
              rtn = true;
            }
          }
          else {
            msg.value = "에러가 발생하였습니다. 다시 시도하세요.";
            rtn = false;
          }
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err);
          rtn = false;
        })

        return rtn;
      }

      async function yesClick() {
        popupisopen.value = false;
        if (strCalltype.value == "send"){
          var bRtn = await sendData();
          console.log("bRtn: ", bRtn);
          if (bRtn){
            clearData();
            console.log("Data are cleared");
            msg_color.value = "blue";
            msg.value = "정상 처리되었습니다.";
            PlaySound("OK");
          }
          scan.value.focus();
          scan.value.select();
        }
        else if (strCalltype.value == "delete"){
          deleteData();
          msg_color.value = "blue";
          msg.value = "선택한 바코드가 삭제되었습니다.";
        }
        else if (strCalltype.value == "close"){
          emit("component_close", "quality_scrap");
        }
        else if (strCalltype.value == "clear"){
          clearData();
          // msg_color.value = "blue";  //정상적으로 처리되지 않음.
          // msg.value = "데이터가 초기화되었습니다.";
        }
      }

      function scanClick() {
        var tmpscan = document.getElementById("scan");
        tmpscan.setAttribute('inputmode','numeric');
        console.log(tmpscan.inputMode);

        // req_param.txtScan = "";
        // req_param.txtScan = "1210503100419";
        // scan.value.focus();
        // scan.value.select();
      }

      function sendClick(){
        const rowCount = gridOptions.api.getDisplayedRowCount();
        if (rowCount > 0){  //미전송 데이터가 있는 경우만 사용자 확인후 처리한다.           
          popupTitle.value ="Quality Scrap";
          popupMsg.value = "전송하시겠습니까?";
          strCalltype.value = "send";
          popupisopen.value = true;
        } else {
          alert("전송할 데이터가 없습니다. 먼저 바코드를 스캔 후 전송하세요.");
        }
      }

      function deleteClick(){
        const rowCount = gridOptions.api.getDisplayedRowCount();
        if (rowCount > 0){  //스캔한 바코드가 있는 경우만 사용자 확인후 처리한다.
          var selectedData = gridApi.value.getSelectedRows();
          if (selectedData.length > 0) {
            popupTitle.value ="Quality Scrap";
            popupMsg.value = "선택한 바코드를 삭제하시겠습니까?";
            strCalltype.value = "delete";
            popupisopen.value = true;
          } else {
            alert("삭제할 바코드를 선택하세요.");
          }
        } else {
          alert("삭제할 데이터가 없습니다.");
        }
      }

      function clearClick(){
        const rowCount = gridOptions.api.getDisplayedRowCount();
        if (rowCount > 0){  //미전송 데이터가 있는 경우만 사용자 확인후 처리한다.        
          popupTitle.value ="Quality Scrap";
          popupMsg.value = "모든 데이터를 초기화하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.";
          strCalltype.value = "clear";
          popupisopen.value = true;
        } else {
          clearData();
        }
      }

      function closeClick(){
        const rowCount = gridOptions.api.getDisplayedRowCount();
        if (rowCount > 0){  //미전송 데이터가 있는 경우만 사용자 확인후 처리한다.
          popupTitle.value ="Quality Scrap";
          popupMsg.value = "종료하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.";
          strCalltype.value = "close";
          popupisopen.value = true;
        } else {
          emit("component_close", "quality_scrap");
        }
      }

      function deleteData(){
        var selectedData = gridApi.value.getSelectedRows();
        console.log("[selected row]", selectedData);

        var removedRows = [];
        selectedData.forEach( function(selectedRow){
          removedRows.push(selectedRow);
          gridApi.value.updateRowData({remove: [selectedRow]});
          console.log("삭제대상 바코드: ", selectedRow.barno);
        });
        console.log("[removed row]", removedRows);
        scan.value.focus();
      }

      function clearData(){
        lblBarNo.value = "";
        lblStatus.value = "";
        lblMatnr.value = "";
        // lblMaktx.value = "자재 상세내역을 표시합니다.";
        lblMaktx.value = lang.value['lblMaktx'][store.state.setup.language];
        lblQty.value = "";
        req_param.txtScan = "1210503100419";
        // msg_color = "";
        // msg.value = "";
        msg_color.value = "blue";
        msg.value = "데이터가 초기화되었습니다.";

        recvData = "";
        // recvData = reactive([]);
        
        gridApi.value.setRowData([]);

        setTimeout(function () {
          autoSizeAll(false);
        }, 500);

        scan.value.focus();
      }

      function autoSizeAll(skipHeader) {
        const allColumnIds = [];
        columnApi.value.getAllColumns().forEach((column) => {
          allColumnIds.push(column.colId);
        });

        columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
      }

      function setLanguage(){
        titleBarNo.value = lang.value['titleBarNo'][store.state.setup.language];
        titleStatus.value = lang.value['titleStatus'][store.state.setup.language];
        titleMatnr.value = lang.value['titleMatnr'][store.state.setup.language];
        lblMaktx.value = lang.value['lblMaktx'][store.state.setup.language];
        titleQty.value = lang.value['titleQty'][store.state.setup.language];

        lblSend.value = lang.value['lblSend'][store.state.setup.language];
        lblDelete.value = lang.value['lblDelete'][store.state.setup.language];
        lblClear.value = lang.value['lblClear'][store.state.setup.language];
        lblClose.value = lang.value['lblClose'][store.state.setup.language];

        for(var i=0; i<columnDefs.length; i++){
          columnDefs[i].headerName = lang.value.grid1[i]['name'][store.state.setup.language];
        }
      }

      return {
        window_width,
        window_height,
        popupTitle,
        popupMsg,
        popupisopen,
        yesClick,
        noClick,
        columnDefs,
        // fullPage,
        // fullPageChange,
        titleBarNo,
        titleStatus,
        titleMatnr,
        titleQty,
        lblBarNo,
        lblStatus,
        lblMatnr,
        lblMaktx,
        lblQty,
        lblSend,
        lblDelete,
        lblClear,
        lblClose,
        scan,   //scan.value.focus() 처리
        req_param,
        msg,
        msg_color,
        scrollPostion : 0,
        defaultColGroupDef: null,
        columnTypes: null,
        options,
        recvData,
        gridOptions,
        getSelectedRows,
        keyupenter,
        scanClick,
        sendClick,
        deleteClick,
        clearClick,
        closeClick,
        fn_SelectAll,
      };
    },
  }
</script>
// <style lang="scss">
// .list {
//   /* height: calc(50vh - 70px); */
//   width : 100%;
//   height: 455px;
//   overflow: auto;
// }
// </style>