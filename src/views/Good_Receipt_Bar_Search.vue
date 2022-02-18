<template>
	<div class="pop-up-window-main">
    <div class="pop-up-window-header"
      align="left">
      <p :style="{padding:'2px 0px 0px 0px', 'text-align':'center'}">스캔 바코드 리스트
      </p>
    </div>
    <input type="text" class="form-control btn-sm" placeholder="UserID"
      autocomplete="off"
      v-model="strFilter">

    <div class="pop-up-window-grid-1"
      :style="{
        //109:헤더(위 3줄 메뉴까지) - 28(팝업화면 헤더) - 48(하단 메시지) - 40 (하단버튼) - 4 (행간여백)
        'height': `calc(${window_height - 109 - 28 - 48 -40 - 4 -40}px)`
      }"
    >
      <ag-grid-vue
        id="agGrid1"
        class="ag-theme-alpine"
        headerHeight='35'
        style="width: 1000px; height:100%"
        :rowData="barcodeData.value"
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
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'90px'}"
          @click='onQuickFilterChanged'>filter</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'80px'}"
          @click='selectAllClick'>Select All</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'90px'}"
          @click='deleteClick'>Delete Item</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 0px 0px 0px', width:'70px'}"
          @click='BarcloseClick'>Close</button>
      </div>
    </div>
	</div>

</template>
<script>
  import { reactive, ref, onMounted, onUnmounted } from 'vue'
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import {AgGridVue} from 'ag-grid-vue3'
  // import { useStore } from 'vuex';
  // import { PlaySound } from '@/helper/util.js';

export default {
  name:'popupbarsearch',
  props:['strPO', 'barData'],
  components:{
    AgGridVue,
  },

  setup(props, {emit}){
    let window_width = ref(window.innerWidth);
    let window_height = ref(window.innerHeight);

    // const store = useStore();	//스토어호출

    let msg = ref(null);
    let msg_color = ref(null);


    console.log("Setup - barData  : ",props.barData);
    let strPO_No = ref(props.strPO);
    let barcodeData = reactive(props.barData);

    let strFilter = ref(null);

    let options = reactive([]);

    let recvData = reactive([]);
    let gridApi = ref(null);
    let columnApi = ref(null);

    // const BoldRenderer = function (params) {
    //   return '<b>' + params.value + '</b>';
    // };

    let columnDefs= reactive([
      {headerName: '', field: 'sel', width: 10, cellStyle: {textAlign: "center"},
        headerCheckboxSelection: true, checkboxSelection: true, pinned: 'left'},
      {headerName: 'Barcode', field: 'barno', width: 15, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left',
        // getQuickFilterText: function(params) {
        //   // return params.colDef.hide ? '' : params.value;
        //   // return params.value;
        //   console.log("[params] : ", params);
        //   return params.colDef.field!='barno' ? '' : params.value;
        // }
      },
      {headerName: 'Qty', field: 'qty', width: 10, cellStyle: {textAlign: "right"}, pinned: 'left'},
      {headerName: 'Unit', field: 'meins', width: 6},
      {headerName: 'Material', field: 'matnr', width: 15, cellStyle: {textAlign: "center"},
        getQuickFilterText: function(params) {
          // return params.value;
          console.log("[params] : ", params);
          return "";
        }
      },
      {headerName: 'Material Description', field: 'maktx', width: 80},
      {headerName: 'BdlQty(SO)', field: 'sobdqty', width: 10, cellStyle: {textAlign: "center"}},
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
      cacheQuickFilter:true,
      rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
      onGridReady: function(event) {
        setTimeout(function () {
          event.api.setRowData(barcodeData);
          autoSizeAll();
          fn_BarcodeList();
        }, 100);
        gridApi.value = event.api;
        columnApi.value = event.columnApi;
        // event.api.sizeColumnsToFit();
      },
      getRowHeight: function() {
        return 35;
      },
      // onGridSizeChanged: function(event) {
      //   event.api.sizeColumnsToFit();
      // },
    };

    onMounted(() => {
      console.log("[Good Receipt Bar Search] = ", "onMounted--");
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() =>{
      console.log("[Good Receipt Bar Search] = onUnmounted -- ");
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

    function fn_BarcodeList(){
      console.log("PO No : ", strPO_No.value);
      console.log("barcodeData : ", barcodeData);
    }

    function selectAllClick(){
      gridApi.value.selectAll();
      // gridApi.value.deselectAll();
    }

    function deleteClick(){
      var selectedData = gridApi.value.getSelectedRows();

      console.log("[checked row]", selectedData);

    }

    function autoSizeAll(skipHeader) {
      const allColumnIds = [];
      columnApi.value.getAllColumns().forEach((column) => {
        allColumnIds.push(column.colId);
      });

      columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
    }

    // function autoSizeAll(skipHeader) {
    //   console.log("[Good Receipt Bar Search] = autoSizeAll -- ");
    //   const allColumnIds = [];
    //   columnApi.value.getAllColumns().forEach((column) => {
    //     if (column.colId != 'sel'){
    //       // console.log("[Good Receipt Bar Search] = autoSizeAll -- ", column.colId);
    //       allColumnIds.push(column.colId);
    //     }
    //   });

    //   columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
    // }

    function onQuickFilterChanged() {
      console.log("[strFilter]", strFilter.value);
      gridApi.value.setQuickFilter(strFilter.value);

    }

    return{
      window_width,
      window_height,
      msg,
      msg_color,
      options,
      barcodeData,
      recvData,
      gridOptions,
      getSelectedRows,
      BarcloseClick,
      fn_BarcodeList,
      selectAllClick,
      deleteClick,
      onQuickFilterChanged,
      strFilter,
    }
  },
}
</script>
<style lang="scss">
</style>
