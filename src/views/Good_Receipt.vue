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
      @BarcloseClick="BarcloseClick">
    </popupbarsearch>

    <!-- DO버튼 클릭시 일자별 DO조회 팝업화면 -->
    <popupposearch v-if="popuppoisopen"
      @POselectClick="POselectClick"
      @POcloseClick="POcloseClick">
    </popupposearch>


    <div class="window-search-5">
      <div align="right" :style="{height:'40px', margin:'0px 0px 0px 0px'}">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
        @click='DetailClick'>상세</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 0px 0px 0px', width:'70px'}"
        @click='DOClick'>PO</button>
      </div>

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
        'height': `calc(${window_height - 109 - 170 - 123}px)`
      }"
    >
      <ag-grid-vue
        id="agGrid1"
        class="ag-theme-alpine"
        headerHeight='35'
        style="width: 1910px; height:100%"
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
  import popupposearch from '@/views/Good_Receipt_PO_Search.vue';
  import popupbarsearch from '@/views/Good_Receipt_Bar_Search.vue';

  export default {
    name:'good_receipt',
    components:{
      AgGridVue,
      popupyn,
      popupposearch,
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

      //focus 이동을 위한 변수

      let txtPO = ref(null);
      let txtPOitem = ref(null);
      let lblPOdate = ref(null);
      let lblVendor = ref(null);
      let lblSL = ref(null);
      let scan = ref(null);
      //데이터 바인딩
      let req_param = reactive({txtPO:"", txtPOitem:"", txtScan:""});
      let msg = ref(null);
      let msg_color = ref(null);

      let gridApi = ref(null);
      let columnApi = ref(null);

      let columnDefs= reactive([
        // {headerName: '오더번호', field: 'ebeln', width: 10, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
        // {headerName: 'Item No', field: 'ebelp', width: 8, hide: true, cellStyle: {textAlign: "center"}},
        // {headerName: 'PO 유형', field: 'bsart', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        // {headerName: 'PO 일자', field: 'bedat', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        // {headerName: '공급업체', field: 'lifnr', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        // {headerName: '공급업체명', field: 'name1', width: 20, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
        // {headerName: '회사코드', field: 'bukrs', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        // {headerName: '구매그룹', field: 'ekgrp', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        // {headerName: '아이템유형', field: 'bstyp', width: 10, hide: true, cellStyle: {textAlign: "center"}},
        // {headerName: '자재코드', field: 'ematn', width: 12, cellStyle: {textAlign: "center"}, sortable: true},
        // {headerName: '자재명', field: 'txz01', width: 20, hide: true, cellStyle: {textAlign: "center"}},
        // {headerName: '플랜트', field: 'werks', width: 10, cellStyle: {textAlign: "center"}},
        // {headerName: '저장위치', field: 'lgort', width: 10, cellStyle: {textAlign: "center"}, sortable: true},
        // {headerName: '오더수량', field: 'menge', width: 8, cellStyle: {textAlign: "right"}, sortable: true},
        // {headerName: '단위', field: 'meins', width: 8, cellStyle: {textAlign: "left"}, sortable: true},
        // {headerName: '실적수량', field: 'procqty', width: 8, cellStyle: {textAlign: "right"}, sortable: true},
        // {headerName: '처리여부', field: 'procflag', width: 8, hide: true, cellStyle: {textAlign: "center"}, sortable: true},

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
        {headerName: '스캔수량', field: 'scanqty', width: 6, cellStyle: {textAlign: "right"}, valueFormatter: (params) => {return Number(params.value).toLocaleString()}, sortable: true},
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
      var gridOptions = {
        defaultColDef: {
          width: 100,
          editable: false,
          resizable: true,
          sortable: true,
          lockPosition: true, //컬럼 드래그로 이동 방지
          cellStyle: {textAlign: "left"},
        },
        // pinnedBottomRowData: [
        pinnedTopRowData: [
          {ebelp: '합계', menge: null, menge2: null, procqty: null, scanqty: null}
        ],
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
        onGridSizeChanged: function(event) {
          event.api.sizeColumnsToFit();
        },
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
            if (res.data[0].code == "NG"){
              msg_color.value = "red";
              msg.value = res.data[0].message;
              lblPOdate.value = "";
              lblVendor.value = "";
              lblSL.value = "";

              // txtPO.value.focus();
              // txtPO.value.select();
            } else{
              msg_color.value = "blue";
              msg.value = "OK";
              PlaySound("OK");

              recvData.value = res.data;
              lblPOdate.value = res.data[0].bedat;
              lblVendor.value = res.data[0].name1;
              lblSL.value = res.data[0].lgort;

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

        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }


      function scanEnter(e) {
        if (e.target.id == "scan"){
          console.log(req_param.txtScan);
        }

        if (lblVendor.value) {  //오더가 조회된 경우만 스캔을 허용 한다.
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
              // let addQty = 0;

              gridApi.value.forEachNode( (node) => {
                console.log("[node.getdata]", node.rowIndex, " : ", node.data.ematn);
                if (isBreak == false) {
                  if (node.data.ematn === res.data[0].matnr) {
                    console.log("scanqty : ", node.data.scanqty);
                    console.log("procqty : ", node.data.procqty);
                    // node.data.scanqty += res.data[0].qty;
                    // addQty = Number(res.data[0].qty) + 7;
                    // addQty = addQty + Number(node.data.scanqty) + 3;
                    node.setDataValue('procqty', Number(node.data.procqty)+Number(res.data[0].qty));
                    node.setDataValue('scanqty', Number(node.data.scanqty)+Number(res.data[0].qty));

                    isBreak = true;
                  }
                }
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
        popupbarisopen.value = true;
        console.log("txtPO => ", req_param.txtPO);
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
        fn_POSearch();
      }

      function sendClick(procflag) {
        console.log("[ProcFlag] : ", procflag);
        console.log("[P/O No] : ", req_param.txtPO);
        if ((!req_param.txtPO) || (!lblVendor.value)) {    //DO가 조회된 경우만 처리. 
          alert("Please search P/O information first");
        }
        else {
          let urlPost = url.value + '/dw/good_receipt/save';

          //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
          $axios.post(urlPost, {
              i_lang: "EN",
              i_userid: store.state.auth.user[0].userid,
              i_werks: getdata(store.state.auth.user[0].plantcd),
              i_vbeln: req_param.txtPO,
              i_procflag: procflag
          })
          .then((res) => {
            console.log("[response data]", res.data);

            if(res.data.length > 0) {
              if (res.data[0].code == "NG") {
                if (res.data[0].subcode == "Confirm") {
                  popupTitle.value ="Good Receipt";
                  popupMsg.value = res.data[0].message + "\n" + "Do you want to process? ";
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
        sendClick("Y");
      }

      function scanClick() {
        console.log(req_param.txtScan);
        var txtscan = document.getElementById("scan");
        txtscan.setAttribute('inputmode','numeric');
        console.log(txtscan.inputMode);

        scan.value.focus();
      }

      function clearClick(){
        // txtPO.value = "";
        req_param.txtPO = "";
        lblVendor.value = "";
        lblSL.value = "";
        // scan.value = "";
        req_param.txtScan = "";
        msg.value = "";

        //grid clear
        gridApi.value.setRowData([]);

        txtPO.value.focus();
      }

      function closeClick(){
        emit("component_close", "good_receipt");
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

    method: {
      makeData (){
        let sum = [{
          make: '합계',
          menge: this.rowData.reduce((prev, next) => {prev + next.qty}),
          menge2: this.rowData.reduce((next, prev) => {next + prev.qty}),
        }]
        this.gridOptions.api.setPinnedTopRowData(sum)
      },
    },
  }
</script>
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>