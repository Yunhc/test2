<template>
	<div class="pop-up-window-main">
    <div class="pop-up-window-header"
      align="left">
      <p :style="{padding:'2px 0px 0px 0px', 'text-align':'center'}">DO Select (There are multiful Good Issue history.)
      </p>
    </div>

    <div class="pop-up-window-search-5">
      <div class="input-group mb-3" :style="{ margin:'3px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">Ship No
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Shipment No"
            aria-label="Shipment No" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblShipno}}
        </label>
      </div>

      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">DO No
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="DO No"
            aria-label="DO No" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblDONo}}
        </label>
      </div>

      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">Plan Date
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Plan Date"
            aria-label="Plan Date" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblPlandate}}
        </label>
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
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">Issue Qty
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Issue Qty"
            aria-label="Customer" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblQty}}
        </label>
      </div>
    </div>

    <div class="pop-up-window-grid-1"
      :style="{
        'height': `calc(${window_height - 109 - 28 - 160 - 95}px)`
      }"
    >
      <ag-grid-vue
        id="agGrid1"
        class="ag-theme-alpine"
        headerHeight='35'
        style="width: 1000px; height:100%"
        :rowData="recvData.value"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
        >
      </ag-grid-vue>
    </div>

    <div class= "pop-up-window-save">
      <div class="input-group mb-3"
        :style="{height:'48px', margin:'2px 0px 0px 0px', background:'gainsboro'}">
        <p :style="{margin:'2px 5px 0px 5px',
                    background:'transparent',
                    'font-size':'16px',
                    'font-weight':'bold',
                    color:msg_color}">
          Msg:{{msg}}
        </p>
      </div>

      <div align="right" :style="{height:'40px', margin:'-17px 0px 0px 0px'}">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
          @click='DOselectClick'>Select</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 0px 0px 0px', width:'70px'}"
          @click='DOcloseClick'>Close</button>
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
  import { getdata} from '@/helper/filter.js';  
  import { PlaySound } from '@/helper/util.js';

export default {
  name:'popupdosearch',
  props:['tmpBarno'],
  components:{
    AgGridVue,
  },

  setup(props, {emit}){
    let tmpBarno = ref(props.tmpBarno);
    let url = ref(process.env.VUE_APP_SERVER_URL);
    let window_width = ref(window.innerWidth);
    let window_height = ref(window.innerHeight);

    const store = useStore();	//스토어호출

    let lblShipno = ref(null);
    let lblDONo = ref(null);
    let lblPlandate = ref(null);
    let lblCustomer = ref(null);

    let msg = ref(null);
    let msg_color = ref(null);

    let options = reactive([]);

    let recvData = reactive([]);
    let gridApi = ref(null);
    let columnApi = ref(null);

    let columnDefs= reactive([
      // {headerName: 'Material', field: 'matnr', width: 20, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
      {headerName: 'Shipment No', field: 'zshipno', width: 20, hide: true, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
      {headerName: 'DO No', field: 'vbeln', width: 15, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
      {headerName: 'Item No', field: 'posnr', width: 6, hide: true, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
      {headerName: 'AUART', field: 'auart', width: 6, hide: true, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
      {headerName: 'Plan Date', field: 'wadat', width: 10, hide: true, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
      {headerName: 'GI Date', field: 'bldat', width: 10, hide: true, cellStyle: {textAlign: "center"}, pinned: 'left'},
      {headerName: 'Material', field: 'matnr', width: 15, cellStyle: {textAlign: "right"}, sortable: true, pinned: 'left'},
      {headerName: 'Qty(BDL)', field: 'lfimg', width: 10, cellStyle: {textAlign: "right"}, pinned: 'left'},
      {headerName: 'Unit', field: 'vrkme', width: 6, cellStyle: {textAlign: "left"}, pinned: 'left'},
      {headerName: 'Qty(PC)', field: 'lgmng', width: 10, cellStyle: {textAlign: "right"}},
      {headerName: 'Unit', field: 'meins', width: 6, cellStyle: {textAlign: "left"},},
      {headerName: 'Plant', field: 'werks', width: 8, hide: true},
      {headerName: 'S/L', field: 'lgort', width: 8, hide: true},
      {headerName: 'Customer', field: 'kunnr', width: 8, hide: true},
      {headerName: 'Customer Name', field: 'zkunnrnm', width: 8, hide: true},
      {headerName: 'KUNAG', field: 'kunag', width: 8, hide: true},
      {headerName: 'ZKUNAGNM', field: 'zkunagnm', width: 8, hide: true},
      {headerName: 'Del Flag', field: 'zstatus', width: 8, hide: true},
      {headerName: 'Ztype', field: 'ztype', width: 8, hide: true},
      {headerName: 'VGBEL', field: 'vgbel', width: 8, hide: true},
      {headerName: 'VGPOS', field: 'vgpos', width: 8, hide: true},
      {headerName: 'Return Qty', field: 'rtnqty', width: 8, hide: true},
      {headerName: 'Return Bad Qty', field: 'rtnqmqty', width: 8, hide: true},
      {headerName: 'Proc Qty', field: 'procqty', width: 8, cellStyle: {textAlign: "right"}},
      {headerName: 'Proc Flag', field: 'procflag', width: 8, hide: true},
      {headerName: 'Doc Edit Date', field: 'upddate', width: 8, hide: true},
    ]);
    var gridOptions = {
      defaultColDef: {
        width: 80,
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
      onRowClicked : function(event){
          var selectedRow = event.node.data;
          // console.log('onRowClicked = selectedRow -- ', selectedRow);

          lblShipno.value = selectedRow.zshipno;
          lblDONo.value = selectedRow.vbeln;
          lblPlandate.value = selectedRow.wadat;
          lblCustomer.value = "[" + selectedRow.kunnr + "] " + selectedRow.zkunnrnm;
        },
    };

    onMounted(() => {
      console.log("[Good Issue Do Search] = ", "onMounted--");
      window.addEventListener('resize', handleResize);
      displayClick();
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
      let urlPost = url.value + '/dwt/good_issue_cancel/scan';

      //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
      $axios.post(urlPost, {
          i_lang: "EN",
          i_userid: store.state.auth.user[0].userid,
          i_werks: getdata(store.state.auth.user[0].plantcd),
          i_barno: tmpBarno,
          i_vbeln: "",
          i_matnr: "",
          i_proctype: "D",  //S:바코드출고이력 조회, D:바코드 출고 DO조회
          i_calltype: "S"   //S:스캔시, D:DO선택시          
      })
      .then((res) => {
        console.log("[response data]", res.data);
        if(res.data.length > 0){
          console.log(res.data[0].code);
          if (res.data[0].code == "NG"){
            msg_color.value = "red";
            msg.value = res.data[0].message;
          } else{
            msg_color.value = "blue";
            msg.value = "OK";
            PlaySound("OK");

            recvData.value = res.data;
            // lblShipno.value = res.data[0].zshipno;
            // lblDONo.value = res.data[0].vbeln;
            // lblPlandate.value = res.data[0].wadat;
            // lblCustomer.value = "[" + res.data[0].kunnr + "] " + res.data[0].zkunnrnm;
          }
        } else{
          recvData.value = res.data;
          msg_color.value = "red";
          msg.value = "There is no data.";
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

    function DOselectClick(){
      if (lblDONo.value){
        emit("DOselectClick", lblDONo.value);
      }
      else {
        alert("Please search DO information and select one DO with tapping a row first")
      }
      // emit("DOselectClick");
    }
    function DOcloseClick(){
      emit("DOcloseClick");
    }

    function autoSizeAll(skipHeader) {
      const allColumnIds = [];
      columnApi.value.getAllColumns().forEach((column) => {
        allColumnIds.push(column.colId);
      });

      columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
    }

    return{
      window_width,
      window_height,
      lblShipno,
      lblDONo,
      lblPlandate,
      lblCustomer,
      msg,
      msg_color,
      options,
      recvData,
      gridOptions,
      getSelectedRows,
      DOselectClick,
      DOcloseClick,
      displayClick,
    }
  },
}
</script>
<style lang="scss">
</style>