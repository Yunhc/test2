<template>
	<div class="pop-up-window-main">
    <div class="pop-up-window-header"
      align="left">
      <p :style="{padding:'2px 0px 0px 0px', 'text-align':'center'}">스캔 바코드 리스트
      </p>
    </div>

    <div class="pop-up-window-grid-1"
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
  import $axios from 'axios';
  import { reactive, ref, onMounted, onUnmounted } from 'vue'
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import {AgGridVue} from 'ag-grid-vue3'
  import { useStore } from 'vuex';
  import { getdata} from '@/helper/filter.js';
  import { PlaySound } from '@/helper/util.js';

export default {
  name:'popupbarsearch',
  props:['strPO'],
  components:{
    AgGridVue,
  },

  setup(props, {emit}){
    let url = ref(process.env.VUE_APP_SERVER_URL);
    let window_width = ref(window.innerWidth);
    let window_height = ref(window.innerHeight);

    const store = useStore();	//스토어호출

    let msg = ref(null);
    let msg_color = ref(null);

    let strPO_No = ref(props.strPO);

    let options = reactive([]);

    let recvData = reactive([]);
    let gridApi = ref(null);
    let columnApi = ref(null);

    let columnDefs= reactive([
      {headerName: '', field: 'sel', width: 10, cellStyle: {textAlign: "center"},
        headerCheckboxSelection: true, checkboxSelection: true, pinned: 'left'},
      {headerName: 'Barcode', field: 'barno', width: 15, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
      {headerName: 'Qty', field: 'qty', width: 10, cellStyle: {textAlign: "right"}, pinned: 'left'},
      {headerName: 'Unit', field: 'meins', width: 6},
      {headerName: 'Material', field: 'matnr', width: 15, cellStyle: {textAlign: "center"}},
      {headerName: 'Material Description', field: 'maktx', width: 80},
      {headerName: 'BdlQty(SO)', field: 'sobdqty', width: 10, cellStyle: {textAlign: "center"}},
    ]);
    var gridOptions = {
      defaultColDef: {
        width: 10,
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
          // event.api.setRowData(recvData);
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
      console.log("PO No", strPO_No.value);
      let urlPost = url.value + '/dw/good_receipt/bar_search';

      //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
      $axios.post(urlPost, {
          i_lang: "EN",
          i_userid: store.state.auth.user[0].userid,
          i_werks: getdata(store.state.auth.user[0].plantcd),
          i_vbeln: strPO_No.value,
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

    function selectAllClick(){
      gridApi.value.selectAll();
      // gridApi.value.deselectAll();
    }

    function deleteClick(){
      var selectedData = gridApi.value.getSelectedRows();

      console.log("[checked row]", selectedData);

      // 스캔화면에서 스캔시 호출 프로시저 사용.
      let urlPost = url.value + '/dw/good_receipt/scan';
      $axios.post(urlPost, {
            i_lang: "EN",
            i_userid: store.state.auth.user[0].userid,
            i_werks: getdata(store.state.auth.user[0].plantcd),
            i_vbeln: strPO_No.value,
            i_qty: "0",
            i_delflag: "Y",   //신규 스캔시 N, 삭제시 Y (스캔화면에서는 이미 스캔한 바코드를 다시 스캔할 경우 삭제여부 문의하고 삭제 선택시)
                              //본화면 (바코드 삭제화면)에서는 항상 Y
            i_calltype: "D",   //스캔화면 호출시 S, 바코드 삭제화면 호출시 D
            data:       selectedData,
      })
      .then((res) => {
        console.log("[response data]", res.data);
        if(res.data.length > 0){
          console.log("[response data] = res.data[0].barno -- ", res.data[0].barno);
          if (res.data[0].code == "NG"){
            msg_color.value = "red";
            msg.value = res.data[0].message;
          } else{
            msg_color.value = "blue";
            msg.value = "OK";
            recvData.value = res.data;
          }
        }
        else{
          recvData.value = res.data;
        }
      }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
        //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
      .catch(err => {
        alert(err);
        console.error(err)
      })
    }

    function autoSizeAll(skipHeader) {
      console.log("[Good Receipt Bar Search] = autoSizeAll -- ");
      const allColumnIds = [];
      columnApi.value.getAllColumns().forEach((column) => {
        if (column.colId != 'sel'){
          // console.log("[Good Receipt Bar Search] = autoSizeAll -- ", column.colId);
          allColumnIds.push(column.colId);
        }
      });

      columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
    }

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
      fn_BarcodeList,
      selectAllClick,
      deleteClick,
    }
  },
}
</script>
<style lang="scss">
</style>
