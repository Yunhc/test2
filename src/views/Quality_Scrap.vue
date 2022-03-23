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
      <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">바코드
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Barcode No"
            aria-label="Barcode No" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
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
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">재고상태
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Status"
            aria-label="Status" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblStatus}}
        </label>
      </div>

      <!-- 자재코드 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">자재코드
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Material"
            aria-label="Material" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblMatnr}}
        </label>
      </div>

      <!-- 자재내역 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <label type="label" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Material Description"
            aria-label="Material Description" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblMaktx}}
        </label>
      </div>

      <!-- 수량 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">수량
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Qty"
            aria-label="Tot Prod Qty" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
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
        @click='sendClick'>전송</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='deleteClick'>삭제</button>
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
  import { reactive, ref, onBeforeMount, onMounted, onUnmounted } from 'vue'
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import {AgGridVue} from 'ag-grid-vue3'
  import { useStore } from 'vuex';
  import { getdata } from '@/helper/filter.js';
  import { PlaySound } from '@/helper/util.js';
  import popupyn from '@/views/PopupYN.vue';

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

      let popupTitle = ref(null);
      let popupMsg = ref(null);
      let popupisopen = ref(false);
      // let fullPage = ref(false);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let lblBarNo = ref(null);
      let lblStatus = ref(null);
      let lblMatnr = ref(null);
      let lblMaktx = ref(null);
      let lblQty = ref(null);

      let recvData = reactive([]);

      //focus 이동을 위한 변수
      let scan = ref(null);
      let strCalltype = ref(null);

      //데이터 바인딩
      let req_param = reactive({txtScan:"1210503100419"});
      let msg = ref(null);
      let msg_color = ref(null);

      let gridApi = ref(null);
      // let columnApi = ref(null);

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

        columnDefs: columnDefs,
        rowData: null,
        rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
        onGridReady: function(event) {
          console.log("[Quality Scrap] = ", "onGridReady");
          setTimeout(function () {
            event.api.setRowData(recvData);
          }, 1000);
          event.api.sizeColumnsToFit();
          gridApi.value = event.api;
      // columnApi.value = event.columnApi;
        },
        getRowHeight: function() {
          return 35;
        },
        onGridSizeChanged: function(event) {
          event.api.sizeColumnsToFit();
        },
      };

      onBeforeMount(()=>{
        console.log("[Quality Scrap] = ", "onBeforeMount--");
        lblMaktx.value = "자재 상세내역을 표시합니다."
      });

      onMounted(() => {
        console.log("[Quality Scrap] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
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


      function scanEnter(e) {
        if (e.target.id == "scan"){
          console.log(req_param.txtScan);
        }

        if (lblBarNo.value) {  //오더가 조회된 경우만 스캔을 허용 한다.
          //이미 스캔한 바코드인지 체크한다.
          // for (var i=0; i<scanData.length; i++){
          //   if (scanData[i].barno == req_param.txtScan){
          //     msg_color.value = "red";
          //     msg.value = "이미 스캔한 바코드입니다.";
          //     scan.value.focus();
          //     scan.value.select();
          //     return;
          //   }
          // }

          //데이터 전송
          let urlPost = url.value + '/dw/good_receipt/scan';

          console.log("[req_param]", req_param);
          // console.log(getdata(req_param.txtScan));

          //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
          $axios.post(urlPost, {
              i_lang: "KR",
              i_werks: getdata(store.state.auth.user[0].plantcd),
              i_userid: store.state.auth.user[0].userid,
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
              PlaySound("OK");
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
            
            scan.value.focus();
        }
      }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }

      function noClick(){
        popupisopen.value = false;
      }

      async function yesClick() {
        popupisopen.value = false;
        if (strCalltype.value == "send"){
          // var bRtn = await sendData();
          console.log("a");
        }
        else if (strCalltype.value == "close"){
            emit("component_close", "good_receipt");  //구매입고 메뉴화면에서 호출한 경우의 화면종료
        }
        else if (strCalltype.value == "clear"){
          clearData();
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
        popupTitle.value ="Good Receipt";
        popupMsg.value = "전송하시겠습니까?";
        strCalltype.value = "send";
        popupisopen.value = true;
      }

      function deleteClick(){
        popupTitle.value ="Good Receipt";
        popupMsg.value = "모든 데이터를 초기화하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.";
        strCalltype.value = "clear";
        popupisopen.value = true;
      }

      function clearClick(){
        popupTitle.value ="Good Receipt";
        popupMsg.value = "모든 데이터를 초기화하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.";
        strCalltype.value = "clear";
        popupisopen.value = true;
      }

      function closeClick(){
        popupTitle.value ="Good Receipt";
        popupMsg.value = "종료하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.";
        strCalltype.value = "close";
        popupisopen.value = true;
        // emit("component_close", "good_receipt");
      }

      function clearData(){
        lblBarNo.value = "";
        lblStatus.value = "";
        lblMatnr.value = "";
        lblMaktx.value = "자재 상세내역을 표시합니다.";
        lblQty.value = "";
        req_param.txtScan = "1210503100419";
        msg.value = "";
        recvData.value = "";
        gridApi.value.setRowData([]);

        scan.value.focus();
      }

      // function autoSizeAll(skipHeader) {
      //   const allColumnIds = [];
      //   columnApi.value.getAllColumns().forEach((column) => {
      //     allColumnIds.push(column.colId);
      //   });

      //   columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
      // }


      return {
        window_width,
        window_height,
        popupTitle,
        popupMsg,
        popupisopen,
        yesClick,
        noClick,
        // fullPage,
        // fullPageChange,
        lblBarNo,
        lblStatus,
        lblMatnr,
        lblMaktx,
        lblQty,
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
        scanEnter,
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
