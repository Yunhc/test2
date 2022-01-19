<template>
  <div class="fg_receipt">
    <div class="black-bg" v-if="popupisopen">
      <div class="white-bg">
        <h6>Finished Goods Receipt</h6>
        <h4>Do you want to save it?</h4>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
          @click='yesClick'>Yes</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
          @click='noClick'>No</button>
      </div>
    </div>

    <div class="fg_receipt_search">
      <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">
          Status</span>
        <label readonly type="text" class="form-control btn-sm" placeholder="Storage Location" aria-label="Storage Location" aria-describedby="basic-addon1"
          align="left">
          {{lblstatus}}
        </label>
      </div>
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">S/L
        </span>
        <label readonly type="text" class="form-control btn-sm" placeholder="Storage Location" aria-label="Storage Location" aria-describedby="basic-addon1"
          align="left">
          {{lblstorloc}}
        </label>
      </div>
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">
          Prod. Date</span>
        <label readonly type="text" class="form-control btn-sm" placeholder="Storage Location" aria-label="Storage Location" aria-describedby="basic-addon1"
          align="left">
          {{lblproddate}}
        </label>
      </div>
    </div>
    <div class="fg_receipt_grid1"
      :style="{
        'height': `calc(${window_height - 109 - 98 - 123}px)`
      }"
    >
      <ag-grid-vue
        id="agGrid1"
        class="ag-theme-alpine"
        headerHeight='35'
        style="width: 1910px; height:100%"
        :rowData="recvData.value"
        :gridOptions="gridOptions"
        :enableRangeSelection="true"
        allow_unsafe_jscode="True"
        >
      </ag-grid-vue>
    </div>
    <div class= "fg_receipt_save">
      <div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px'}">
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan barcode" aria-label="Scan barcode" aria-describedby="basic-addon1"
          id="scan"
          ref="scan"
          @keyup.enter='keyupenter'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="none"
          v-model="req_param.scan">
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
          @click='saveClick'>Save</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
          @click='scanClick'>Scan</button>
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
  // import EventBus from "@/eventBus";

  export default {
    name:'fg_receipt',
    components:{
      AgGridVue,
    },
    setup(props,{emit}){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);
      // const emit = defineEmits(['component_close']);

      let popupisopen = ref(false);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let recvData = reactive([]);

      let lblstatus = ref(null);
      let lblstorloc = ref(null);
      let lblproddate = ref(null);

      //focus 이동을 위한 변수
      let scan = ref(null);
      //데이터 바인딩
      let req_param = reactive({scan:""});

      let msg = ref(null);
      let msg_color = ref(null);


      let gridApi = ref(null);
      let columnApi = ref(null);

      let columnDefs= reactive([
        {headerName: 'Barcode', field: 'barno', width: 30, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
        {headerName: 'Qty', field: 'qty', width: 30, cellStyle: {textAlign: "right"}, sortable: true, pinned: 'left'},
        {headerName: 'Unit', field: 'meins', width: 30, cellStyle: {textAlign: "center"}, pinned: 'left'},
        {headerName: 'Material', field: 'matnr', width: 50, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left', filter: true},
        {headerName: 'Material Description', field: 'maktx', width: 120, sortable: true, filter: true},
        {headerName: 'Storage Location', field: 'lgort', width: 80, filter: true},
        {headerName: 'Prod Date', field: 'proddate', width: 50, cellStyle: {textAlign: "center"}},
        {headerName: 'Status', field: 'status', width: 70},
      ]);

      // let columnDefs= reactive([
      //   {headerName: 'Barcode', field: 'barno', cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
      //   {headerName: 'Qty', field: 'qty', sortable: true, pinned: 'left'},
      //   {headerName: 'Unit', field: 'meins', pinned: 'left'},
      //   {headerName: 'Material', field: 'matnr', sortable: true, pinned: 'left', filter: true},
      //   {headerName: 'Material Description', field: 'maktx', sortable: true, filter: true},
      //   {headerName: 'Storage Location', field: 'lgort', filter: true},
      //   {headerName: 'Prod Date', field: 'proddate'},
      //   {headerName: 'Status', field: 'status'},
      // ]);
      var gridOptions = {
        defaultColDef: {
          width: 150,
          editable: false,
          resizable: true,
          sortable: true,
          lockPosition: true, //컬럼 드래그로 이동 방지
          cellStyle: {textAlign: "left", headers :"right"},
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
        // getRowNodeId: function(event){
        //   return event.id;
        // },
        // onGridSizeChanged: function(event) {
        //   event.api.sizeColumnsToFit();
        // },
        onRowClicked : function(event){
          var selectedRow = event.node.data;
          // console.log('onRowClicked = selectedRow -- ', selectedRow);
          lblstatus.value = selectedRow.status;
          lblstorloc.value = selectedRow.lgort;
          lblproddate.value = selectedRow.proddate;
          // scan.value.focus();
          // scan.value.select();
        },
        // onPasteStart : function(params){
        //   console.log('Callback onPasteStart:', params);
        // },
        // onPasteEnd(params) {
        //   console.log('Callback onPasteEnd:', params);
        // },
        // onPasteOff : function(event){
        //   event.api.setSuppressClipboardPaste(true);
        // },
        // onPasteOn : function(event){
        //   event.api.setSuppressClipboardPaste(false);
        // },
      };

      onMounted(() => {
        console.log("[Finished Goods Receipt] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
      });

      onUnmounted(() =>{
        console.log("[Finished Goods Receipt] = onUnmounted -- ");
        window.removeEventListener('resize', handleResize);
      });

      function handleResize() {
        window_width.value = window.innerWidth;
        window_height.value = window.innerHeight;
      }

      // const getSelectedRows = () => {
      //   const selectedNodes = gridApi.value.getSelectedNodes();
      //   const selectedData = selectedNodes.map( node => node.data );
      //   const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ');
      //   alert(`Selected nodes: ${selectedDataStringPresentation}`);
      // };

      function keyupenter(e){
        if (e.target.id == "scan"){
          console.log(req_param.scan);
          var txtscan = document.getElementById("scan");
          txtscan.setAttribute('inputmode','none');
          console.log(txtscan.inputMode);

          //API전송
          fn_SendAPI();
        }
      }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }


      function fn_SendAPI(){
        let urlPost = url.value + '/dwt/fg_receipt/scan';
        console.log("[req_param]", req_param);

        gridOptions.api.setRowData([]);
        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        $axios.post(urlPost, {
            i_lang: "EN",
            i_userid: store.state.auth.user[0].userid,
            i_werks: getdata(store.state.auth.user[0].plantcd),
            i_barno: req_param.scan,
        })
        .then((res) => {
          console.log("[response data]", res.data);
          console.log("[response data] = res.data[0].barno -- ", res.data[0].barno);
          console.log("[response data] = req_param.scan -- ", req_param.scan);

          if (res.data[0].barno != req_param.scan){
            msg_color.value = "red";
            msg.value = res.data[0].message;

            lblstatus.value = "";
            lblstorloc.value = "";
            lblproddate.value = "";
          } else{
            msg_color.value = "blue";
            msg.value = "OK";

            recvData.value = res.data;

            lblstatus.value = res.data[0].status;
            lblstorloc.value = res.data[0].lgort;
            lblproddate.value = res.data[0].proddate;
          }

          req_param.scan = "";
          scan.value.focus();
          scan.value.select();

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

      function saveClick(){
        popupisopen.value = true;
      }

      function noClick(){
        popupisopen.value = false;
      }

      function yesClick() {
        popupisopen.value = false;

        // const rowCount = gridOptions.api.getLastDisplayedRow();
        const rowCount = gridOptions.api.getDisplayedRowCount();
        console.log("grid count : ", rowCount);

        if (rowCount > 0){
          //  const rowNode = gridOptions.api.getRowNode();
          const rowNode = gridOptions.api.getDisplayedRowAtIndex(0);
          //  console.log("Barno : ", rowNode);
          console.log("Barno : ", rowNode.data);
          //  console.log("Barno : ", rowNode.data.barno);

          // gridOptions.api.forEachNode((rowNode, index) => {
          //   console.log('rowNode.data ', rowNode.data);
          //   console.log('rowNode.data.barno ' + rowNode.data.barno + ' is in the grid -- ' + index);
          // });

          let urlPost = url.value + '/dwt/fg_receipt/save';

          //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
          $axios.post(urlPost, {
              i_lang: "EN",
              i_userid: store.state.auth.user[0].userid,
              i_werks: getdata(store.state.auth.user[0].plantcd),
              i_barno: rowNode.data.barno,
          })
          .then((res) => {
            console.log("[response data]", res.data);
            console.log("[response data] = res.data[0].barno -- ", res.data[0].barno);
            console.log("[response data] = req_param.scan -- ", req_param.scan);

            if (res.data[0].barno != req_param.scan){
              msg_color.value = "red";
              msg.value = res.data[0].message;
            } else{
              recvData.value = res.data;
              document.getElementById("lblstatus").innerHTML = res.data[0].status;
              console.log("[lblstatus]", lblstatus)

              msg_color.value = "blue";
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
      }

      function scanClick() {
        console.log(req_param.scan);
        var txtscan = document.getElementById("scan");
        txtscan.setAttribute('inputmode','numeric');
        console.log(txtscan.inputMode);

        scan.value.focus();
      }

      function closeClick(){
        emit("component_close", "fg_receipt");
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
        popupisopen,
        yesClick,
        noClick,
        lblstatus,
        lblstorloc,
        lblproddate,
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
        keyupenter,
        saveClick,
        scanClick,
        fn_SelectAll,
        closeClick,
      };
    },
  }
</script>
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";

  .ag-header-cell-label {
    justify-content: center;
  }

	.fg_receipt {
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
      background: yellow;
    }
  }
  .black-bg{
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed; padding: 20px;
    z-index: 1; //div를 최상위로 올린다.
  }
  .white-bg{
    width: 100%;
    background: white;
    border-radius: 8px;
    padding: 20px;
  }
  .fg_receipt_search {
    height : 98px;
    margin : 0px 5px 0px 5px;
  }
  .fg_receipt_grid1 {
    margin:0px 5px 0px 5px;
    overflow: auto;
  }
  .fg_receipt_save {
    // background: gainsboro;
    height : 123px;
    margin : 0px 5px 0px 5px;
    overflow-x: auto;
  }
</style>