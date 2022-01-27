<template>
  <div align="left" class="bar_popup_header">
    <p :style="{padding:'2px 0px 0px 0px', 'text-align':'center'}">Scanned Barcode List
    </p>
  </div>

  <div class="good_issue_grid_bar"
    :style="{
      //109:헤더(위 3줄 메뉴까지) - 28(팝업화면 헤더) - 48(하단 메시지) - 40 (하단버튼) - 4 (행간여백)
      'height': `calc(${window_height - 109 - 28 - 48 - 40 - 4}px)`
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

  <div class="input-group mb-3"
    :style="{height:'48px', margin:'2px 10px 0px 5px', background:'gainsboro'}">
    <p :style="{margin:'2px 5px 0px 5px',
                background:'transparent',
                'font-size':'16px',
                'font-weight':'bold',
                color:msg_color}">
      Msg:{{msg}}
    </p>
  </div>

  <div align="right" :style="{height:'40px', margin:'-17px 0px 0px 0px'}">
    <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 5px', width:'80px'}"
      @click='selectAllClick'>Select All</button>
    <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 5px', width:'90px'}"
      @click='deleteClick'>Delete Item</button>      
    <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 5px', width:'70px'}"
      @click='BarcloseClick'>Close</button>
  </div>

</template>
<script>
  // import $axios from 'axios';
  import { reactive, ref, onMounted, onUnmounted } from 'vue'
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import {AgGridVue} from 'ag-grid-vue3'
  // import { useStore } from 'vuex';
  // import { PlaySound } from '@/helper/util.js';

export default {
  name:'popupbarsearch',
  components:{
    AgGridVue,
  },

  setup(props, {emit}){
    // let url = ref(process.env.VUE_APP_SERVER_URL);
    let window_width = ref(window.innerWidth);
    let window_height = ref(window.innerHeight);

    // const store = useStore();	//스토어호출

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
      {headerName: 'GI Date', field: 'bldat', width: 10, hide: true, cellStyle: {textAlign: "center"}, pinned: 'left'},
      {headerName: 'Material', field: 'matnr', width: 15, cellStyle: {textAlign: "right"}, sortable: true, pinned: 'left'},
      {headerName: 'Qty(BDL)', field: 'lfimg', width: 10, cellStyle: {textAlign: "right"}, pinned: 'left'},
      {headerName: 'Unit', field: 'vrkme', width: 6, cellStyle: {textAlign: "left"}, pinned: 'left'},
      {headerName: 'Qty(PC)', field: 'lgmng', width: 10, cellStyle: {textAlign: "right"}},
      {headerName: 'Unit', field: 'meins', width: 6, cellStyle: {textAlign: "left"},},
      {headerName: 'Plant', field: 'werks', width: 8, hide: true},
      {headerName: 'S/L', field: 'lgort', width: 8, hide: true},
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
    };

    onMounted(() => {
      console.log("[Good Issue Bar Search] = ", "onMounted--");
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() =>{
      console.log("[Good Issue Bar Search] = onUnmounted -- ");
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


    function BarcloseClick(){
      emit("BarcloseClick");
    }

    // function autoSizeAll(skipHeader) {
    //   const allColumnIds = [];
    //   columnApi.value.getAllColumns().forEach((column) => {
    //     allColumnIds.push(column.colId);
    //   });

    //   columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
    // }

    return{
      window_width,
      window_height,
      msg,
      msg_color,
      options,
      recvData,
      gridOptions,
      getSelectedRows,
      BarcloseClick,
    }
  },
}
</script>
<style lang="scss">
  //화면마다 이름을 다르게 주자. 아니면 css파일에 넣고 공통사용.
  .good_issue_bar_search {
    height : 160px;
    margin : 0px 5px 0px 5px;
  }
  .good_issue_grid_bar {
    margin:0px 5px 0px 5px;
    overflow: auto;
  }
  .bar_popup_header{
    background:rgb(47, 96, 170);
    width: 100%;
    height:28px;
    text-align:center;
    font-size:16px;
    // color:#41b883;
    color:white;
    // border-bottom:1px solid #070707;
  }
</style>