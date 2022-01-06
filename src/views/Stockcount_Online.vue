<template>
  <div class="stc_on">
    <div class="stc_on_search">
      <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px'}"
        >Stor Loc</span>
        <select class="form-select btn-sm" aria-label="Default select example"
          id="stor_loc"
          ref="stor_loc"
          @change ='keyupenter'
          v-model="req_param.stor_loc">
          <option disabled value="">Select location</option>
          <option v-for="(d, i) in options" :key="i" :value="d.id">{{ d.name }}</option>
        </select>
      </div>
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px'}">SC Type
        </span>
        <input type="text" class="form-control btn-sm" placeholder="SC Type" aria-label="SC Type" aria-describedby="basic-addon1"
          id="sctype"
          ref="sctype"
          @keyup.enter ='keyupenter'
          v-model="req_param.sctype">
      </div>
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px'}"
        >Row No</span>
        <input type="text" class="form-control btn-sm" placeholder="Row No" aria-label="Row No" aria-describedby="basic-addon1"
          id="rowno"
          ref="rowno"
          @keyup.enter ='keyupenter'
          v-model="req_param.rowno">
      </div>
    </div>
    <div class="stc_on_grid1"
      :style="{
        'height': `calc(${window_height - 119 - 98 - 123}px)`
      }"
    >
      <ag-grid-vue
        id="agGrid1"
        class="ag-theme-alpine"
        headerHeight='35'
        style="width: 1910px; height:100%"
        :rowData="rowData.value"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
        >
      </ag-grid-vue>
    </div>
    <div class= "stc_on_save">
      <div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px'}">
        <input type="text" class="form-control btn-sm" placeholder="Scan barcode" aria-label="Scan barcode" aria-describedby="basic-addon1"
          id="scan"
          ref="scan"
          @keyup.enter ='keyupenter'
          data-ref="InputContent" inputmode="none"
          v-model="req_param.scan">
      </div>
      <div class="input-group mb-3"
        :style="{height:'50px', margin:'-16px 0px 0px 0px', background:'gainsboro'}">
        <p :style="{margin:'2px 0px 0px 0px', background:'transparent'}">
          Msg:{{msg}}
        </p>
      </div>
      <div align="right" :style="{height:'40px', margin:'-17px 0px 0px 0px'}">
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
  import { reactive, ref, onBeforeMount, onMounted, onUnmounted } from 'vue'
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import {AgGridVue} from 'ag-grid-vue3'
  import { useStore } from 'vuex';
  import { getdata } from '@/helper/filter.js';
  import { searchSelectBox } from '@/helper/sql.js';

  export default {
    name:'stockcount_online',
    components:{
      AgGridVue,
    },
    setup(){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let rowData = reactive([]);
      let gridApi = ref(null);
      //focus 이동을 위한 변수
      let sctype = ref(null);
      let rowno = ref(null);
      let stoc_loc = ref(null);
      let scan = ref(null);
      //데이터 바인딩
      let req_param = reactive({stor_loc:"", sctype:"", rowno:"", scan:""});
      let msg = ref(null);

      let columnDefs= reactive([
        {headerName: 'Barcode', field: 'barno', width: 80, sortable: true, pinned: 'left'},
        {headerName: 'Material', field: 'matnr', width: 100, sortable: true, pinned: 'left'},
        {headerName: 'Quantity', field: 'qty', width: 100, pinned: 'left'},
        {headerName: 'Plant', field: 'werks', width: 100, cellStyle: { color: 'red', textAlign: "left", backgroundColor: "white" }},
        {headerName: 'S/L', field: 'lgort', width: 250, sortable: true, filter: true},
        {headerName: 'Row NO', field: 'rowno', width: 250},
        {headerName: 'Material Description', field: 'desc'},
      ]);
      var gridOptions = {
        defaultColDef: {
          width: 150,
          editable: true,
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
            event.api.setRowData(rowData);
          }, 1000);
          event.api.sizeColumnsToFit();
        },
        getRowHeight: function() {
          return 35;
        },
        onGridSizeChanged: function(event) {
          event.api.sizeColumnsToFit();
        },
      };

      onBeforeMount(()=>{
        console.log("[Stockcount_Online] = ", "onBeforeMount--");
        initSelectBox();
      });

      onMounted(() => {
        console.log("[Stockcount_Online] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
      });

      onUnmounted(() =>{
        console.log("[Stockcount_Online] = onUnmounted -- ");
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

      function searchClick_post() {
        let urlPost = url.value + '/dw_userList_p';

        console.log("[req_param.sctype]", req_param.sctype);
        console.log("[req_param.rowno]", req_param.rowno);
        console.log("[req_param.stor_loc]", req_param.stor_loc);

        $axios.post(urlPost, {
          sctype: req_param.sctype,
          rowno: req_param.rowno,
          stor_loc: req_param.stor_loc,
        })
        .then((res) => {
          console.log("[response data]", res.data);
          rowData.value = res.data;
          console.log("[ received data ] ", rowData);
        })
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }

      async function initSelectBox() {
        let req_param = reactive(
          {	lang:"KR",
            userid:store.state.auth.user[0].userid,
            plantcd:getdata(store.state.auth.user[0].plantcd),
            type1:"LGORT_MWMS",
            type2:"",
            type3:"",
            type4:"",
            space:"Y",
          }
        );
        let res = reactive([]);
        res = await searchSelectBox(req_param);
        // console.log("[Stockcount_offline/initSelectBox] = res -- ", res);

        if(res.data.length > 0){
          options.splice(0, options.length);
          for(var i=0; i<res.data.length; i++){
              options.push({id:res.data[i].id, name:res.data[i].name});
          }
        }
        console.log("[Stockcount_offline/initSelectBox] = options data -- ", options);
      }

      function keyupenter(e){
        if (e.target.id == "stor_loc"){
          sctype.value.focus();
        }
        else if (e.target.id == "sctype"){
          rowno.value.focus();
        }
        else if (e.target.id == "rowno"){
          // console.log("[Stockcount_Online/keyupenter] = rowno -- ");
          scan.value.focus();
        }
        else if (e.target.id == "scan"){
          console.log(req_param.scan);
          var txtscan = document.getElementById("scan");
          txtscan.setAttribute('inputmode','none');
          console.log(txtscan.inputMode);
        }
        // if(e.which == 13){
        //   console.log(text)
        // }
      }

      function scanClick() {
        console.log(req_param.scan);
        var txtscan = document.getElementById("scan");
        txtscan.setAttribute('inputmode','numeric');
        console.log(txtscan.inputMode);

        scan.value.focus();
      }

      return {
        window_width,
        window_height,
        stoc_loc,
        sctype,
        rowno,
        scan,
        req_param,
        msg,
        scrollPostion : 0,
        defaultColGroupDef: null,
        columnTypes: null,
        options,
        rowData,
        gridOptions,
        getSelectedRows,
        searchClick_post,
        keyupenter,
        scanClick,
      };
    },
  }
</script>
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";

	.stc_on {
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
  .stc_on_search {
    height : 98px;
    margin : 0px 5px 0px 5px;
  }
  .stc_on_grid1 {
    margin:0px 5px 0px 5px;
    overflow: auto;
  }
  .stc_on_save {
    // background: gainsboro;
    height : 123px;
    margin : 0px 5px 0px 5px;
    overflow-x: auto;
  }
</style>