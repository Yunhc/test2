<template>

  <div class="good_issue">
    <!-- DO버튼 클릭시 일자별 DO조회 팝업화면 -->
<<<<<<< HEAD
    <div class="do_popup_black-bg" v-if="popupdoisopen">
      <div class="do_popup_white-bg">
        <div align="left" class="do_popup_header">
          <p :style="{ margin:'5px 10px 0 10px'}">
            {{"Find DO"}}
          </p>
        </div>

        <div class="input-group mb-3" :style="{ margin:'2px 0px 0px 0px'}">
          <!-- <span class="input-group-text btn-sm" id="basic-addon1"
            :style="{width:'80px', display:'inline-block', 'text-align':'right'}">Request date
          </span> -->
          <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="lblDate" 
              aria-label="lblDate" aria-describedby="basic-addon1"
              :style="{'text-align':'left'}">      
              {{"Request date"}}
          </label>

          <input type="date" name="startdate">

          <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 0px 0px 5px', width:'70px'}"
          @click='displayClick'>Display</button>          
        </div>


        <div class="good_issue_grid1"
          :style="{
            'height': `calc(${window_height - 109 - 120 - 123}px)`
          }"
        >
          <ag-grid-vue
            id="agGrid2"
            class="ag-theme-alpine"
            headerHeight='35'
            style="width: 1910px; height:100%"
            :rowData="recvData2.value"
            :gridOptions="gridOptions2"
            allow_unsafe_jscode="True"
            >
          </ag-grid-vue>
        </div>

        <div class="input-group mb-3"
          :style="{height:'48px', margin:'0px 0px 0px 0px', background:'gainsboro'}">
          <p :style="{margin:'2px 5px 0px 5px',
                      background:'transparent',
                      'font-size':'16px',
                      'font-weight':'bold',
                      color:msg_color}">
            Msg:{{msg_dopopup}}
          </p>
        </div>

        <div align="right" :style="{height:'40px', margin:'-5px 0px 0px 0px'}">
          <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 10px 0px 10px', width:'70px'}"
            @click='DOselectClick'>Select</button>
          <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 10px 0px 0px', width:'70px'}"
            @click='DOcloseClick'>Close</button>
        </div>
=======
    <div class="good_issue-black-bg" v-if="popupdoisopen">
      <div class="good_issue-white-bg">
        <h6>Finished Goods Receipt</h6>
        <h4>Do you want to save it?</h4>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
          @click='yesClick'>Yes</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
          @click='noClick'>No</button>
>>>>>>> 7a9650516ec782d68f7b105b463f037bd8194ca4
      </div>
    </div>

    <div class="good_issue_search">
      <div align="right" :style="{height:'40px', margin:'0px 0px 0px 0px'}">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
        @click='DetailClick'>Detail</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 0px 0px 0px', width:'70px'}"
        @click='DOClick'>DO</button>
      </div>

      <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px', 'z-index':'1'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">DO
        </span>
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Deliver Order" aria-label="Deliver Order" aria-describedby="basic-addon1"
          id="txtDO"
          ref="txtDO"
          @keyup.enter='displayClick'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="numeric"
          v-model="req_param.txtDO">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 0px 0px 5px', width:'70px'}"
        @click='displayClick'>Display</button>
      </div>

      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">Customer
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Customer"
            aria-label="Customer" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblCustomer}}
        </label>
      </div>
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">Ship No
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Shipment No"
            aria-label="Shipment No" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblShipno}}
        </label>
      </div>
    </div>
    <div class="good_issue_grid1"
      :style="{
        'height': `calc(${window_height - 109 - 140 - 123}px)`
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
    <div class= "good_issue_save">
      <div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px'}">
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan barcode" aria-label="Scan barcode" aria-describedby="basic-addon1"
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
        @click='sendClick'>Send</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='scanClick'>Scan</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='clearClick'>Clear</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
        @click='closeClick'>Close</button>
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

  export default {
    name:'good_issue',
    components:{
      AgGridVue,
    },
    setup(props,{emit}){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      let popupdoisopen = ref(false);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let recvData = reactive([]);
      let recvData2 = reactive([]);
      //focus 이동을 위한 변수
      let txtDO = ref(null);
      let lblCustomer = ref(null);
      let lblShipno = ref(null);
      let scan = ref(null);
      //데이터 바인딩
      let req_param = reactive({txtDO:"", txtScan:""});
      let msg = ref(null);
      let msg_dopopup = ref(null);
      let msg_color = ref(null);

      let gridApi = ref(null);
      let columnApi = ref(null);

      let columnDefs= reactive([
        // {headerName: 'Material', field: 'matnr', width: 20, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
        {headerName: 'Material', field: 'matnr', width: 20, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
        {headerName: 'Item No', field: 'posnr', width: 10, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
<<<<<<< HEAD
        {headerName: 'Order Qty(BDL)', field: 'orderqtybdl', width: 15, cellStyle: {textAlign: "right", color: 'red'}, pinned: 'left'},
        {headerName: 'Proc Qty', field: 'procqty', width: 15, cellStyle: {textAlign: "right", color: 'blue'}},  
        {headerName: 'Order Qty(PC)', field: 'orderqtypc', width: 15, cellStyle: {textAlign: "right"}},
=======
        {headerName: 'Order Qty', field: 'orderqtybdl', width: 15, cellStyle: {textAlign: "right"}, pinned: 'left'},
        {headerName: 'Proc Qty', field: 'procqty', width: 15, cellStyle: {textAlign: "right"}},
        {headerName: 'Order Qty', field: 'orderqtypc', width: 15, cellStyle: {textAlign: "right"}},
>>>>>>> 7a9650516ec782d68f7b105b463f037bd8194ca4
        {headerName: 'Pcs/Pkg', field: 'umrez', width: 10, cellStyle: {textAlign: "right"}},
        {headerName: 'Material Description', field: 'maktx', width: 80},
        {headerName: 'Status', field: 'ztype', width: 8, cellStyle: {textAlign: "center"}},
        {headerName: 'Sub Item', field: 'uepos', width: 10, cellStyle: {textAlign: "center"}},
        {headerName: 'R.Material', field: 'matnrc', width: 20, cellStyle: {textAlign: "center"}},
        {headerName: 'Customer', field: 'kunnr', width: 15, cellStyle: {textAlign: "center"}},
        {headerName: 'Customer Name', field: 'zkunnrnm', width: 60},
        {headerName: 'Shipment No', field: 'zshipno', width: 15, hide: true, cellStyle: {textAlign: "center"}},
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
        onGridSizeChanged: function(event) {
          event.api.sizeColumnsToFit();
        },
      };

      let columnDefs2= reactive([
        // {headerName: 'Material', field: 'matnr', width: 20, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
        {headerName: 'Material', field: 'matnr', width: 20, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
        {headerName: 'Item No', field: 'posnr', width: 10, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
        {headerName: 'Order Qty(BDL)', field: 'orderqtybdl', width: 15, cellStyle: {textAlign: "right", color: 'red'}, pinned: 'left'},
        {headerName: 'Proc Qty', field: 'procqty', width: 15, cellStyle: {textAlign: "right", color: 'blue'}},  
        {headerName: 'Shipment No', field: 'zshipno', width: 15, hide: true, cellStyle: {textAlign: "center"}},
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
        console.log("[Good Issue] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
        txtDO.value.focus();
      });

      onUnmounted(() =>{
        console.log("[Good Issue] = onUnmounted -- ");
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
        // if (e.target.id == "txtDO"){
          console.log(req_param.txtDO);
          //scan 버튼 누르는 경우만 키보드를 on 하므로 조회시는 다시 off 해 준다.
          var tmpscan = document.getElementById("scan");
          tmpscan.setAttribute('inputmode','none');
          console.log(tmpscan.inputMode);

          //DO 조회 API전송
          fn_DOSearch();
        // }
      }

      function fn_DOSearch(){
        let urlPost = url.value + '/dwt/good_issue/do_search';

        console.log("[req_param]", req_param);
        // console.log(getdata(req_param.txtScan));

        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        $axios.post(urlPost, {
            i_lang: "EN",
            i_userid: store.state.auth.user[0].userid,
            i_werks: getdata(store.state.auth.user[0].plantcd),
            i_vbeln: req_param.txtDO,
        })
        .then((res) => {
          console.log("[response data]", res.data);
          console.log("[response data] = req_param.txtDO -- ", req_param.txtDO);

          if (res.data[0].code == "NG"){
            msg_color.value = "red";
            msg.value = res.data[0].message;
            lblCustomer.value = ""
            lblShipno.value = ""

            // txtDO.value.focus();
            // txtDO.value.select();
          } else{
            msg_color.value = "blue";
            msg.value = "OK";
            PlaySound("OK");

            recvData.value = res.data;
            lblCustomer.value = "[" + res.data[0].kunnr + "] " + res.data[0].zkunnrnm;
            lblShipno.value = res.data[0].zshipno;

            scan.value.focus();
            scan.value.select();
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

        let urlPost = url.value + '/dwt/good_issue/scan';

        console.log("[req_param]", req_param);
        // console.log(getdata(req_param.txtScan));

        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        $axios.post(urlPost, {
            i_lang: "EN",
            i_userid: store.state.auth.user[0].userid,
            i_werks: getdata(store.state.auth.user[0].plantcd),
            i_vbeln: req_param.txtDO,
            i_barno: req_param.txtScan,
            i_qty: 0,
            i_delflag: "N"
        })
        .then((res) => {
          console.log("[response data]", res.data);
          console.log("[response data] = res.data[0].barno -- ", res.data[0].matnr);
          console.log("[response data] = req_param.txtScan -- ", req_param.txtScan);

          if (res.data[0].code == "NG"){
            msg_color.value = "red";
            msg.value = res.data[0].message;
          } else{
            msg_color.value = "blue";
            msg.value = "OK";
            recvData.value = res.data;
          }

          scan.value.focus();
          scan.value.select();
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })

      }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }

      function DOClick(){
        console.log(popupdoisopen.value);
        popupdoisopen.value = true;
        console.log(popupdoisopen.value);
      }

      function DOcloseClick(){
        popupdoisopen.value = false;
      }

      function sendClick() {
        let urlPost = url.value + '/dwt/good_issue/save';

        console.log("[req_param]", req_param);
        console.log("Barno : ", gridOptions.api.rowData[0].barno);
        // console.log(getdata(req_param.txtScan));

        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        $axios.post(urlPost, {
            i_lang: "EN",
            i_userid: store.state.auth.user[0].userid,
            i_werks: getdata(store.state.auth.user[0].plantcd),
            i_barno: req_param.txtScan,
        })
        .then((res) => {
          console.log("[response data]", res.data);
          console.log("[response data] = res.data[0].barno -- ", res.data[0].barno);
          console.log("[response data] = req_param.txtScan -- ", req_param.txtScan);

          if (res.data[0].barno != req_param.txtScan){
            msg.value = res.data[0].message;
          } else{
            recvData.value = res.data;
            console.log("[lblCustomer]", lblCustomer)
            msg.value = "정상 처리되었습니다."
          }

          scan.value.focus();
          scan.value.select();
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }

      function scanClick() {
        console.log(req_param.txtScan);
        var txtscan = document.getElementById("scan");
        txtscan.setAttribute('inputmode','numeric');
        console.log(txtscan.inputMode);

        scan.value.focus();
      }

      function closeClick(){
        emit("component_close", "good_issue");
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
        txtDO,
        lblCustomer,
        lblShipno,
        scan,
        req_param,
        msg,
        msg_dopopup,
        msg_color,
        scrollPostion : 0,
        defaultColGroupDef: null,
        columnTypes: null,
        options,
        recvData,
        recvData2,
        gridOptions,
        gridOptions2,
        getSelectedRows,
        popupdoisopen,
<<<<<<< HEAD
        DOcloseClick,
=======
        noClick,
>>>>>>> 7a9650516ec782d68f7b105b463f037bd8194ca4
        // DetailClick,
        DOClick,
        displayClick,
        scanEnter,
        sendClick,
        scanClick,
        // clearClick,
        closeClick,
        fn_SelectAll,
      };
    },
  }
</script>
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";

	.good_issue {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width:100%;
    height:100%;
    // select:focus {
    //   background: yellow;
    // }
    input:focus {
<<<<<<< HEAD
      background: yellow;
    }
  }
=======
        background: yellow;
    }
  }
  .good_issue-black-bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    padding: 20px;
    z-index: 20; //div를 최상위로 올린다.
  }
  .good_issue-white-bg{
    width: 100%;
    background: white;
    border-radius: 8px;
    padding: 20px;
  }
>>>>>>> 7a9650516ec782d68f7b105b463f037bd8194ca4
  .good_issue_search {
    height : 140px;
    margin : 0px 5px 0px 5px;
  }
  .good_issue_grid1 {
    margin:0px 5px 0px 5px;
    overflow: auto;
  }
  .good_issue_save {
    // background: gainsboro;
    height : 123px;
    margin : 0px 5px 0px 5px;
    overflow-x: auto;
  }
  .do_popup_black-bg{
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed; 
    // padding: 20px;
    z-index: 20; //div를 최상위로 올린다.
  }
  .do_popup_white-bg{
    width: 100%; height: 100%;
    background: white;
    position: fixed;
    // border-radius: 8px;
  }  
  .do_popup_header{
    background:rgb(47, 96, 170);
    width: 100%;
    height:30px;
    text-align:center;
    font-size:15px;
    // color:#41b883;
    color:white;
    // border-bottom:1px solid #070707;
  }

</style>