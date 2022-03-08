<template>
	<div class="pop-up-window-main">
    <div class="pop-up-window-header"
      align="left">
      <p :style="{padding:'2px 0px 0px 0px', 'text-align':'center'}">박스 바코드 스캔
      </p>
    </div>

    <div class="pop-up-window-grid-1"
      align="left"
      :style="{ margin:'2px',
        //109:헤더(위 3줄 메뉴까지) - 28(팝업화면 헤더) - 115(하단박스) - 34(바코드스캔) - 48(하단 메시지) - 40 (하단버튼) - 7 (행간여백)
        'height': `calc(${window_height - 109 - 28 - 115 - 34 - 48 - 40 - 7}px)`
      }"
    >
      <ag-grid-vue
        id="agGrid1"
        class="ag-theme-alpine"
        headerHeight='35'
        style="width: 400px; height:100%"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
        >
      </ag-grid-vue>
    </div>

		<div class="window-box-2px-green"
      :style="{height:'115px'}"
    >
      <!-- Lot No 출력-->
      <div class="input-group mb-3" :style="{ margin:'5px 0px 0px 5px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">LOT No
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="LOT No."
            aria-label="LOT No." aria-describedby="basic-addon1"
            :style="{margin:'0px 0px 0px 0px', 'text-align':'left'}">
            {{lblLotno}}
        </label>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 10px 0px 5px', width:'70px'}"
        @click='enclotnoClick'>LOT + 1</button>
      </div>

      <!-- 스캔수량 출력-->
      <div class="input-group mb-1" :style="{ margin:'-12px 0px 0px 5px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">스캔건수
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan Count"
            aria-label="Scan Count" aria-describedby="basic-addon1"
            :style="{margin:'0px 10px 0px 0px', 'text-align':'left'}">
            {{lblScancnt}}
        </label>
      </div>

      <!-- 밴들바코드 출력-->
      <div class="input-group mb-1" :style="{ margin:'0px 0px 0px 5px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">밴들바코드
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Bundle Barcode"
            aria-label="Bundle Barcode" aria-describedby="basic-addon1"
            :style="{margin:'0px 10px 0px 0px', 'text-align':'left'}">
            {{lblGrpbarno}}
        </label>
      </div>
    </div>

    <div class= "window-save-1">
      <div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px'}">
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan barcode" aria-label="바코드 스캔" aria-describedby="basic-addon1"
          id="scan"
          ref="scan"
          @keyup.enter='scanEnter'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="none"
          v-model="txtScan">
      </div>      
      <div class="input-group mb-3"
        :style="{height:'48px', margin:'-14px 0px 0px 0px', background:'gainsboro'}">
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
          @click='sendClick'>전송</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
          @click='scanClick'>스캔</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
          @click='clearClick'>초기화</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
          @click='autocloseClick'>닫기</button>
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
  import { formatDate } from '@/helper/filter.js';
  // import { PlaySound } from '@/helper/util.js';

export default {
  name:'popupautolabeller',
  props:['strPO', 'date_hdf', 'date_fmfm', 'date_prod', 'strBox', 'strLotno'],
  components:{
    AgGridVue,
  },

  setup(props, {emit}){
    let window_width = ref(window.innerWidth);
    let window_height = ref(window.innerHeight);

    // const store = useStore();	//스토어호출

    let msg = ref(null);
    let msg_color = ref(null);

    let strPO = ref(props.strPO);
    let date_hdf = ref(formatDate(props.date_hdf, "YYYYMMDD"));
    let date_fmfm = ref(formatDate(props.date_fmfm, "YYYYMMDD"));
    let date_prod = ref(formatDate(props.date_prod, "YYYYMMDD"));
    let strBox = ref(props.strBox);
    let strLotno = ref(props.strLotno);

    let lblLotno = ref(strLotno);
    var lblScancnt = 0;
    let lblGrpbarno = ref(null);

    console.log("Setup - parameter  : ",strPO.value, date_hdf.value, date_fmfm.value, date_prod.value, strBox.value, strLotno.value);
    console.log("lblLotno/lblScancnt/lblGrpbarno", lblLotno.value, lblScancnt, lblGrpbarno.value)

    let options = reactive([]);

    let recvData = reactive([]);
    let gridApi = ref(null);
    let columnApi = ref(null);

    let columnDefs= reactive([
      {headerName: '', field: 'sel', width: 10, cellStyle: {textAlign: "center"},
        headerCheckboxSelection: true, checkboxSelection: true, pinned: 'left'},
      {headerName: '바코드', field: 'barno', width: 20, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
    ]);
    var gridOptions = {
      defaultColDef: {
        width: 10,
        editable: false,
        resizable: true,
        sortable: true,
        lockPosition: true, //컬럼 드래그로 이동 방지
        cellStyle: {textAlign: "left"},
        filter: true,
      },
      columnDefs: columnDefs,
      rowData: null,
      rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
      onGridReady: function(event) {
        console.log("[Autolabeller Production Result Barcode Scan] = ", "onGridReady");
        setTimeout(function () {
          event.api.setRowData(recvData);
        }, 500);
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
      console.log("[Autolabeller Production Result Barcode Scan] = ", "onMounted--");
      window.addEventListener('resize', handleResize);
      console.log("scan screen")

    });

    onUnmounted(() =>{
      console.log("[Autolabeller Production Result Barcode Scan] = onUnmounted -- ");
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


    function autocloseClick(){
      emit("autocloseClick");
    }

    function fn_BarcodeList(){
      console.log("PO No / Item No : ", strPO.value);
    
    }

    function selectAllClick(){
      gridApi.value.selectAll();
      // gridApi.value.deselectAll();
    }

    function deleteClick(){
      var selectedData = gridApi.value.getSelectedRows();
      //var selectedData = this.gridOptions.api.getSelectedRows();
      console.log("[selected row]", selectedData);

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
      lblLotno,
      lblScancnt,
      lblGrpbarno,
      msg,
      msg_color,
      options,
      recvData,
      gridOptions,
      getSelectedRows,
      autocloseClick,
      fn_BarcodeList,
      selectAllClick,
      deleteClick,
    }
  },
}
</script>
<style lang="scss">
</style>
