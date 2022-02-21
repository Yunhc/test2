<template>

  <div class="window-main">
    <!-- Send버튼 클릭후 오더수량보다 스캔수량이 적을 경우 처리 여부 문의 팝업화면 -->
     <popupyn v-if="popupisopen"
      :title="popupTitle"
      :message="popupMsg"
      @yesClick="yesClick"
      @noClick="popupisopen=false">
    </popupyn>

    <!-- Detail버튼 클릭시 스캔한 바코드 리스트 조회(삭제) 팝업화면 -->
    <popupbarsearch v-if="popupbarisopen"
      :strPO="req_param.txtPO"
      :strItem="strPOItem"
      :barData="scanData"
      @BarcloseClick="BarcloseClick">
    </popupbarsearch>


    <div class="window-search-4-1">
      <!-- <div align="right" :style="{height:'40px', margin:'0px 0px 0px 0px'}">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
        @click='DetailClick'>상세</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 0px 0px 0px', width:'70px'}"
        @click='DOClick'>PO</button>
      </div> -->

      <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px', 'z-index':'1'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">PO 번호
        </span>
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Purchase Order" aria-label="Purchase Order" aria-describedby="basic-addon1"
          id="txtPO"
          ref="txtPO"
          @keyup.enter='displayClick'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="numeric"
          v-model="req_param.txtPO">
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Item No" aria-label="Item No" aria-describedby="basic-addon1"
          id="txtPOitem"
          ref="txtPOitem"
          @keyup.enter='displayClick'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="numeric"
          v-model="req_param.txtPOitem">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 0px 0px 5px', width:'70px'}"
          @click='displayClick'>조회</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 0px 0px 5px', width:'70px'}"
          @click='DetailClick'>상세</button>        
      </div>

      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">PO 날짜
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="PO Date"
            aria-label="PO Date" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblPOdate}}
        </label>
      </div>
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">Vendor
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Vendor"
            aria-label="Vendor" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblVendor}}
        </label>
      </div>
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">저장위치
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="저장위치"
            aria-label="저장위치" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblSL}}
        </label>
      </div>
    </div>
    <div class="window-grid-1"
      :style="{
        'height': `calc(${window_height - 109 - 130 - 123}px)`
      }"
    >
      <ag-grid-vue
        id="agGrid1"
        class="ag-theme-alpine"
        headerHeight='35'
        style="width:1910px; height:100%"
        :rowData="recvData.value"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
        >
      </ag-grid-vue>
    </div>
    <div class= "window-save-1">
      <div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px'}">
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan barcode" aria-label="바코드 스캔" aria-describedby="basic-addon1"
          id="scan"
          ref="scan"
          @keyup.enter='scanEnter'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="none"
          v-model="req_param.txtScan">
      </div>
      <div class="input-group mb-3"
        :style="{height:'48px', margin:'-14px 0px 0px 0px', background:'gainsboro'}">
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
        @click='sendClick("N")'>입고</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='scanClick'>Scan</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='clearClick'>초기화</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
        @click='closeClick'>닫기</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $axios from 'axios';
  import { reactive, ref, onMounted, onUnmounted } from 'vue'
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import {AgGridVue} from 'ag-grid-vue3'
  import { useStore } from 'vuex';
  import { getdata } from '@/helper/filter.js';
  import { PlaySound } from '@/helper/util.js';
  import popupyn from '@/views/PopupYN.vue';
  // import popupposearch from '@/views/Good_Receipt_PO_Search.vue';
  import popupbarsearch from '@/views/Good_Receipt_Bar_Search.vue';

  export default {
    name:'good_receipt',
    components:{
      AgGridVue,
      popupyn,
      // popupposearch,
      popupbarsearch,
    },

    setup(props,{emit}){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      let popupTitle = ref(null);
      let popupMsg = ref(null);
      let popupisopen = ref(false);

      let popupbarisopen = ref(false);
      let popuppoisopen = ref(false);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let recvData = reactive([]);
      let strPONo = ref(null);
      let strPOItem = ref(null);

      let scanData = reactive([]);  //스캔한 바코드 데이터 저장

      //focus 이동을 위한 변수

      let txtPO = ref(null);
      let txtPOitem = ref(null);
      let lblPOdate = ref(null);
      let lblVendor = ref(null);
      let lblSL = ref(null);
      let scan = ref(null);
      let strCalltype = ref(null);
      //데이터 바인딩
      let req_param = reactive({txtPO:"", txtPOitem:"", txtScan:""});
      let msg = ref(null);
      let msg_color = ref(null);

      let gridApi = ref(null);
      let columnApi = ref(null);

      let columnDefs= reactive([
        {headerName: '오더번호', field: 'ebeln', width: 10, hide: true, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
        {headerName: '품번', field: 'ebelp', width: 6, cellStyle: {textAlign: "center"}},
        {headerName: '오더유형', field: 'bsart', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '오더일자', field: 'bedat', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '공급업체', field: 'lifnr', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '공급업체명', field: 'name1', width: 20, hide: true, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
        {headerName: '공급플랜트', field: 'reswk', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '회사코드', field: 'bukrs', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '구매그룹', field: 'ekgrp', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '아이템유형', field: 'bstyp', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '자재코드', field: 'ematn', width: 10, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '자재명', field: 'txz01', width: 20, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '플랜트', field: 'werks', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        {headerName: '저장위치', field: 'lgort', width: 10, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '오더수량', field: 'menge', width: 6, cellStyle: {textAlign: "right"}, valueFormatter: (params) => {return Number(params.value).toLocaleString()}, sortable: true},
        {headerName: '단위', field: 'meins', width: 4, cellStyle: {textAlign: "left"}, sortable: true},
        {headerName: '환산수량', field: 'menge2', width: 6, cellStyle: {textAlign: "right"}, valueFormatter: (params) => {return Number(params.value).toLocaleString()}, sortable: true},
        {headerName: '누적수량', field: 'procqty', width: 6, cellStyle: {textAlign: "right"}, valueFormatter: (params) => {return Number(params.value).toLocaleString()}, sortable: true},
        // {headerName: '스캔수량', field: 'scanqty', width: 6, cellStyle: {textAlign: "right"}, valueFormatter: (params) => {return Number(params.value).toLocaleString()}, sortable: true},
        {headerName: '스캔수량', field: 'scanqty', width: 6,
          cellStyle: function(params){
            if (params.value != "0") {
              return {textAlign: 'right', color: 'blue', backgroundColor: 'yellow',
                      fontSize: '15px', 'font-weight': 'bold'};
            } else {
              // return null;
              return {textAlign: 'right'};
            }
          }
          , valueFormatter: (params) => {return Number(params.value).toLocaleString()}, sortable: true},
        {headerName: '환산단위', field: 'meins2', width: 4, cellStyle: {textAlign: "left"}, sortable: true},
        {headerName: '처리여부', field: 'procflag', width: 8, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '마감여부', field: 'elikz', width: 8, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '수량초과허용', field: 'uebtk', width: 8, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '수량초과범위', field: 'uebto', width: 8, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '최대가능수량', field: 'maxqty', width: 10, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: 'LPMFO', field: 'var1', width: 10, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: 'LPMFI', field: 'var2', width: 10, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: 'LPMBO', field: 'var3', width: 10, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: 'LPMBI', field: 'var4', width: 10, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: 'Plate F', field: 'var5', width: 8, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: 'Plate B', field: 'var6', width: 8, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '외자여부', field: 'kalsk', width: 8, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: 'S/O 번호', field: 'kdauf', width: 10, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: 'S/O 품번', field: 'kdpos', width: 10, hide: true, cellStyle: {textAlign: "center"}, sortable: true},
        {headerName: '재고유형', field: 'insmk', width: 8, cellStyle: {textAlign: "center"}, sortable: true},
      ]);

      let columnsum= ([{
        ebelp:'합계',
        menge:0,
        menge2:0,
        procqty:0,
        scanqty:0,
      }]);

      var gridOptions = {
        defaultColDef: {
          width: 100,
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
        // onGridSizeChanged: function(event) {
        //   event.api.sizeColumnsToFit();
        // },

        onCellClicked : function(event){
          var selectedRow = event.node.data;
          var focusedCell = gridApi.value.getFocusedCell()
          var colId = focusedCell.column.colId
          var rowNum = focusedCell.rowIndex

          console.log("colId/rowNum : ", colId, "/", rowNum);
          console.log("selectedRow/ebelp : ", selectedRow, "/", selectedRow.ebelp);

          console.log("scanData : ", scanData);
          //합계행도 rowNum이 0임
          if (colId == "scanqty" && Number(selectedRow.scanqty) > 0){
            strPOItem.value = selectedRow.ebelp;  //합계행의 경우 "합계"가 들어간다.
            console.log("strPOItem : ", strPOItem.value);
            popupbarisopen.value = true;
          }
        },

        // pinnedBottomRowData:columnsum,
        pinnedTopRowData:columnsum,
      };

      onMounted(() => {
        console.log("[Good Receipt] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
        txtPO.value.focus();
      });

      onUnmounted(() =>{
        console.log("[Good Receipt] = onUnmounted -- ");
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


      function displayClick(){
        // if (e.target.id == "txtPO"){
          console.log(req_param.txtPO);

          if (req_param.txtPO) {  //DO가 입력된 경우만 조회를 한다.
            //scan 버튼 누르는 경우만 키보드를 on 하므로 조회시는 다시 off 해 준다.
            var tmpscan = document.getElementById("scan");
            tmpscan.setAttribute('inputmode','none');
            console.log(tmpscan.inputMode);

            //DO 조회 API전송
            fn_POSearch();
          }
          else {
            // alert("Please input P/O number first.")
            msg_color.value = "red";
            msg.value = "Please input P/O number first.";
            // PlaySound("OK");
            txtPO.value.focus();
          }
        // }
      }

      function fn_POSearch(){
        let urlPost = url.value + '/dw/good_receipt/detail_search';

        console.log("[req_param]", req_param);
        // console.log(getdata(req_param.txtScan));

        gridApi.value.setRowData([]);

        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        $axios.post(urlPost, {
            i_lang: "KR",
            i_werks: getdata(store.state.auth.user[0].plantcd),
            i_userid: store.state.auth.user[0].userid,
            i_ord_no: req_param.txtPO,
            i_ord_item_no: req_param.txtPOitem,
            // i_date_from: "",
            // i_date_to: "",
        })
        .then((res) => {
          console.log("[response data]", res.data);
          console.log("[response data] = req_param.txtPO / txtPOitem -- ", req_param.txtPO, "/", req_param.txtPOitem);

          if(res.data.length > 0) {
            if (res.data[0].code == "NG") {
              msg_color.value = "red";
              msg.value = res.data[0].message;
              lblPOdate.value = "";
              lblVendor.value = "";
              lblSL.value = "";

              // txtPO.value.focus();
              // txtPO.value.select();
            } else {
              msg_color.value = "blue";
              msg.value = "OK";
              PlaySound("OK");

              recvData.value = res.data;
              console.log("[PO_Search] -> recvData.length/recvData : ", recvData.value.length, "/", recvData);
              lblPOdate.value = res.data[0].bedat;
              lblVendor.value = res.data[0].name1;
              lblSL.value = res.data[0].lgort;

              fn_sumscanqty();
              fn_sumgrid("PO_Search");

              scan.value.focus();
              scan.value.select();
            }
          }
          else {
            msg_color.value = "red";
            msg.value = "No Data";
            lblPOdate.value = "";
            lblVendor.value = "";
            lblSL.value = "";
          }

          setTimeout(function () {
            autoSizeAll(false);
          }, 500);

          // gridApi.value.setPinnedBottomRowData(columnsum);
          // gridApi.value.setPinnedTopRowData(columnsum);
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }

      function fn_sumscanqty(){
        console.log("start fn_sumscanqty");
        //스캔수량 다시 계산 (바코드 삭제후 변경사항 반영위해서)
        // if (recvData.value.length > 0) {  //조회된 데이터가 그리드에 있을 경우만 합계 계산.
        //   console.log("[recvData]", recvData.length, recvData.value.length, recvData);
        //   console.log("[scanData] : ", scanData.length, scanData.value.length, scanData);

        //   for (var i=0; i<scanData.length; i++) {
        //     for (var j=0; j<recvData.length; j++) {
        //       if (recvData[j].ematn == scanData[i].matnr && recvData[j].ebelp == scanData[i].ebelp) {
        //           node.setDataValue('procqty', Number(node.data.procqty)+Number(scanData[0].qty));
        //           node.setDataValue('scanqty', Number(node.data.scanqty)+Number(scanData[0].qty));
        //       }
        //     }
        //   }
        // }

        gridApi.value.forEachNode( (node) => {
          console.log("[node.getdata]", node.rowIndex, " : ", node.data.ematn);
          console.log("[scanData] : ", scanData.length, scanData.value.length, scanData);
          for (var i=0; i<scanData.length; i++) {
            if (node.data.ematn == scanData[i].matnr && node.data.ebelp == scanData[i].ebelp) {
                node.setDataValue('procqty', Number(node.data.procqty)+Number(scanData[0].qty));
                node.setDataValue('scanqty', Number(node.data.scanqty)+Number(scanData[0].qty));
            }
          }
        });
      }

      function fn_sumgrid(calltype){
        columnsum[0].menge = 0;
        columnsum[0].menge2 = 0;
        columnsum[0].procqty = 0;
        columnsum[0].scanqty = 0;
        console.log("start fn_sumgrid from ", calltype);
        console.log("fn_sumgrid->recvData.length/recvData : ", recvData.value.length, "/", recvData);

        if (recvData.value.length > 0) {  //조회된 데이터가 그리드에 있을 경우만 합계 계산.
          var nRtn = recvData.value.reduce(function(previousValue, currentValue){
            var summenge = 0;
            var summenge2 = 0;
            var sumprocqty = 0;
            var sumscanqty = 0;

            summenge = Number(previousValue.menge) + Number(currentValue.menge);
            summenge2 = Number(previousValue.menge2) + Number(currentValue.menge2);
            sumprocqty = Number(previousValue.procqty) + Number(currentValue.procqty);
            sumscanqty = Number(previousValue.scanqty) + Number(currentValue.scanqty);
            return ({menge:summenge, menge2:summenge2, procqty:sumprocqty, scanqty:sumscanqty});
          });

          columnsum[0].menge = nRtn.menge;
          columnsum[0].menge2 = nRtn.menge2;
          columnsum[0].procqty = nRtn.procqty;
          columnsum[0].scanqty = nRtn.scanqty;
        }
        // gridApi.value.setPinnedBottomRowData(columnsum);
        gridApi.value.setPinnedTopRowData(columnsum);
      }

      function scanEnter(e) {
        if (e.target.id == "scan"){
          console.log(req_param.txtScan);
        }

        if (lblVendor.value) {  //오더가 조회된 경우만 스캔을 허용 한다.
          //이미 스캔한 바코드인지 체크한다.
          for (var i=0; i<scanData.length; i++){
            if (scanData[i].barno == req_param.txtScan){
              msg_color.value = "red";
              msg.value = "이미 스캔한 바코드입니다.";
              scan.value.focus();
              scan.value.select();
              return;
            }
          }

          //데이터 전송
          let urlPost = url.value + '/dw/good_receipt/scan';

          console.log("[req_param]", req_param);
          // console.log(getdata(req_param.txtScan));

          //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
          $axios.post(urlPost, {
              i_lang: "EN",
              i_werks: getdata(store.state.auth.user[0].plantcd),
              i_userid: store.state.auth.user[0].userid,
              i_ord_no: req_param.txtPO,
              i_ord_item_no: req_param.txtPOitem,
              i_barno: req_param.txtScan,
          })
          .then((res) => {
            console.log("[response data]", res.data);
            console.log("[response data] = res.data[0].barno -- ", res.data[0].barno);
            console.log("[response data] = req_param.txtScan -- ", req_param.txtScan);

            if (res.data[0].code == "NG"){
              msg_color.value = "red";
              msg.value = res.data[0].message;
            } else{
              msg_color.value = "blue";
              msg.value = "OK";

              let isBreak = false;

              gridApi.value.forEachNode( (node) => {
                console.log("[node.getdata]", node.rowIndex, " : ", node.data.ematn);
                if (isBreak == false) {
                  if (node.data.ematn === res.data[0].matnr) {
                    //추후 K124, K125 플랜트이면서 자재코드 4번째 자리가 9인경우는 패턴 6가지 비교추가 필요
                    if (node.data.uebtk == "X" || (Number(node.data.maxqty) >= (Number(node.data.procqty)+Number(res.data[0].qty)))){
                      // console.log("scanqty : ", node.data.scanqty);
                      // console.log("procqty : ", node.data.procqty);

                      node.setDataValue('procqty', Number(node.data.procqty)+Number(res.data[0].qty));
                      node.setDataValue('scanqty', Number(node.data.scanqty)+Number(res.data[0].qty));

                      // scanData.push(res.data[0]);
                      scanData.push({barno:res.data[0].barno, qty:res.data[0].qty, meins:res.data[0].meins, matnr:res.data[0].matnr, ebeln:node.data.ebeln, ebelp:node.data.ebelp});
                      
                      console.log("scanData : ", scanData);
                      isBreak = true;
                    }
                    else {
                      msg_color.value = "red";
                      msg.value = "구매가능 수량을 초과하였습니다.";
                    }
                  }
                }
                fn_sumgrid("Scan");
                // console.log("isBreak : ", isBreak);
              });
            }
            req_param.txtScan = "";
            scan.value.focus();
            // scan.value.select();
          }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
            //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
          .catch(err => {
            alert(err);
            console.error(err)
          })
        }
        else {
            msg_color.value = "red";
            msg.value = "Please search P/O information first.";
            // PlaySound("OK");
            txtPO.value.focus();
        }
      }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }

      function DetailClick(){
        // popupbarisopen.value = true;
        // console.log("txtPO => ", req_param.txtPO);
        // onCellClicked();
          strPOItem.value = "합계";  //합계행의 경우 "합계"가 들어간다.
          console.log("strPOItem : ", strPOItem.value);
          popupbarisopen.value = true;
      }

      function DOClick(){
        popuppoisopen.value = true;
      }

      function POselectClick(strPONo){
        console.log(strPONo);
        popuppoisopen.value = false;
        req_param.txtPO = strPONo;

        fn_POSearch();
      }

      function POcloseClick(){
        popuppoisopen.value = false;
        console.log("[Vendor] : ", lblVendor.value);
        if (lblVendor.value) {
          scan.value.focus();
          // scan.value.select();
        }
        else {
          txtPO.value.focus();
          // txtPO.value.select();
        }
      }

      function BarcloseClick(){
        popupbarisopen.value = false;
        console.log("BarcloseClick -- ", req_param.txtPO);

        // fn_POSearch();

        console.log("scanData.length/scanData => ", scanData.length, "/", scanData);

        //누적수량과 스캔수량 초기화 위해 오더를 다시 조회.
        fn_POSearch();

        // fn_sumgrid("Barclose");
      }

      function sendClick(procflag) {
        console.log("[ProcFlag] : ", procflag);
        console.log("[P/O No] : ", req_param.txtPO);
        if ((!req_param.txtPO) || (!lblVendor.value)) {    //PO가 조회된 경우만 처리.
          alert("Please search P/O information first");
        }
        else {
          let urlPost = url.value + '/dw/good_receipt/save';

          //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
          $axios.post(urlPost, {
              i_lang: "EN",
              i_werks: getdata(store.state.auth.user[0].plantcd),
              i_userid: store.state.auth.user[0].userid,
              i_ord_no: req_param.txtPO,
              i_ord_seq: req_param.txtPOitem,
              i_barno: req_param.txtScan,
              i_procflag: procflag
          })
          .then((res) => {
            console.log("[response data]", res.data);

            if(res.data.length > 0) {
              if (res.data[0].code == "NG") {
                if (res.data[0].subcode == "Confirm") {
                  popupTitle.value ="Good Receipt";
                  popupMsg.value = res.data[0].message + "\n" + "Do you want to process? ";
                  strCalltype = "send";
                  popupisopen.value = true;
                } else {
                  msg_color.value = "red";
                  msg.value = res.data[0].message;
                }
              } else if (res.data[0].code == "OK") {
                clearClick();
                msg_color.value = "blue";
                msg.value = res.data[0].message;
                PlaySound("OK");
              }
            }
            txtPO.value.focus();
          }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
            //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
          .catch(err => {
            alert(err);
            console.error(err)
          })
        }
      }

      function noClick(){
        popupisopen.value = false;
      }

      function yesClick() {
        popupisopen.value = false;
        if (strCalltype.value == "send"){
          sendClick("Y");
        }
        else if (strCalltype.value == "close"){
          emit("component_close", "good_receipt");
        }
      }

      function scanClick() {
        console.log(req_param.txtScan);
        var txtscan = document.getElementById("scan");
        txtscan.setAttribute('inputmode','numeric');
        console.log(txtscan.inputMode);

        scan.value.focus();
      }

      function clearClick(){
        req_param.txtPO = "";
        req_param.txtPOitem = "";
        lblPOdate.value = "";
        lblVendor.value = "";
        lblSL.value = "";
        req_param.txtScan = "";
        msg.value = "";

        //grid clear
        recvData.splice(0, recvData.length);
        console.log("clearClick->length/receData => ", recvData.length, "/", recvData);

        scanData.splice(0, scanData.length);
        console.log("clearClick->length/scanData => ", scanData.length, "/", scanData);
        fn_sumgrid("clear");
        gridApi.value.setRowData([]);

        txtPO.value.focus();
      }

      function closeClick(){
        popupTitle.value ="Good Receipt";
        popupMsg.value = "종료하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.";
        strCalltype.value = "close";
        popupisopen.value = true;
        // emit("component_close", "good_receipt");

      }

      function autoSizeAll(skipHeader) {
        const allColumnIds = [];
        columnApi.value.getAllColumns().forEach((column) => {
          allColumnIds.push(column.colId);
        });

        columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
      }


      return {
        window_width,
        window_height,
        popupTitle,
        popupMsg,
        popupisopen,
        yesClick,
        noClick,
        txtPO,
        txtPOitem,
        lblPOdate,
        lblVendor,
        lblSL,
        scan,
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
        popupbarisopen,
        popuppoisopen,
        strPONo,
        strPOItem,
        scanData,
        POselectClick,
        POcloseClick,
        BarcloseClick,
        DetailClick,
        DOClick,
        displayClick,
        scanEnter,
        sendClick,
        scanClick,
        clearClick,
        closeClick,
        fn_SelectAll,
      };
    },
  }
</script>
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>