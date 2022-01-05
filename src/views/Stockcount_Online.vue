<template>
  <div class="stc">
    <div class="stc_on">
      <form class="d-flex" :style="{height:'37px'}" >
        <div class="input-group mb-3">
          <span class="input-group-text btn-sm" id="basic-addon1"
            :style="{width:'80px'}"
          >Stor Loc</span>
          <select class="form-select btn-sm" aria-label="Default select example" v-model="user_param.useflag">
            <option disabled value="">select location</option>
            <option v-for="(d, i) in options" :key="i" :value="d.id">{{ d.name }}</option>
          </select>
        </div>
      </form>
      <form class="d-flex" :style="{height:'37px', margin:'-5px 0px 0px 0px'}" >
        <div class="input-group mb-3">
          <span class="input-group-text btn-sm" id="basic-addon1"
            :style="{width:'80px'}">SC Type
          </span>
          <input type="text" class="form-control btn-sm" placeholder="SC Type" aria-label="SC Type" aria-describedby="basic-addon1" v-model="user_param.sctype">
        </div>
      </form>
      <form class="d-flex" :style="{height:'37px', margin:'-5px 0px 0px 0px'}" >
        <div class="input-group mb-3">
          <span class="input-group-text btn-sm" id="basic-addon1"
            :style="{width:'80px'}"
          >Row No</span>
          <input type="text" class="form-control btn-sm" placeholder="Row No" aria-label="Row No" aria-describedby="basic-addon1" v-model="user_param.rowno">
        </div>
      </form>
    </div>
    <div class="stc_on_grid1"
      :style="{
        'height': `calc(${window_height - 119 - 98 - 150}px)`
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
      <form class="d-flex" :style="{height:'37px', margin:'2px 0px 0px 0px'}" >
        <div class="input-group mb-3">
          <input type="text" class="form-control btn-sm" placeholder="Scan barcode" aria-label="Scan barcode" aria-describedby="basic-addon1"
            :style="{background:'Yellow'}"
            v-model="user_param.rowno">
        </div>
      </form>
      <form class="d-flex" :style="{height:'37px', margin:'-5px 0px 0px 0px'}" >
        <div class="input-group mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            {{user_param.rowno}}
          </label>
        </div>
      </form>
      <div align="right">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'2px 10px 0px 0px', width:'70px'}"
        @click='deleteClick'>Scan</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'2px 5px 0px 0px', width:'70px'}"
        @click='saveClick'>Close</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $axios from 'axios';
  import { reactive, ref, onMounted, onUnmounted} from 'vue'
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import {AgGridVue} from 'ag-grid-vue3'

  export default {
    name:'stockcount_online',
    components:{
      AgGridVue,
    },
    setup(){
      const $url_rest = process.env.VUE_APP_SERVER_URL;
      let rowData = reactive([]);
      let url = ref($url_rest);
      let gridApi = ref(null);
      let columnApi = ref(null);
      let user_param = reactive({sctype:"", rowno:"", stor_loc:""});
      let columnDefs= reactive([
          {headerName: '선택', field: 'sel', width: 50, cellStyle: {textAlign: "center"},
            headerCheckboxSelection: true, checkboxSelection: true, pinned: 'left'},
          {headerName: '사용자ID', field: 'sctype', width: 100, sortable: true, pinned: 'left'},
          {headerName: '사용자명', field: 'rowno', width: 100, pinned: 'left'},
          {headerName: '패스워드', field: 'userpwd', hide: true, cellStyle: { color: 'red', textAlign: "left", backgroundColor: "white" }},
          {headerName: '플랜드', field: 'plantcd', width: 250, sortable: true, filter: true},
          {headerName: '작업장', field: 'wccode', hide: true},
          {headerName: '창고', field: 'warehouse'},
          {headerName: '조회그룹', field: 'auth'},
          {headerName: 'Role', field: 'role'},
          {headerName: 'Use Role', field: 'use_role'},
          {headerName: '사용유무', field: 'stor_loc', cellStyle: {textAlign: "center"},
            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellRenderer: stor_locCellRenderer,
            keyCreator: (stor_loc) => {
              return stor_loc.name;
            },
            cellEditorParams: function(param){
              var selectedPlant = getdata(param.data.plantcd);
              console.log("[selectedPlant]", selectedPlant );
              if (selectedPlant == 'K143'){
                return{
                  values: ['Y', 'N']
                };
              }
              else{
                return{
                  values: ['Y', 'N']
                };
              }
            },
          },
          {headerName: '지게차 번호', field: 'forklift'},
          {headerName: '비고', field: 'etc'},
          {headerName: '수정자', field: 'upduser'},
          {headerName: '수정일', field: 'upddate', cellStyle: {textAlign: "center"},},
      ]);
      const stor_locCellRenderer = (params) => {
        console.log("stor_locCellRenderer--");
        params.value.name;
      };

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

      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      onMounted(() => {
        console.log("[UserManagement] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
      });
      onUnmounted(() =>{
        console.log("[UserManagement] = onUnmounted -- ");
      });

      function handleResize() {
        window_width.value = window.innerWidth;
        window_height.value = window.innerHeight;
      }

      const onGridReady = params => {
        gridApi = params.api;
        columnApi.value = params.columnApi;
      };
      const getSelectedRows = () => {
        const selectedNodes = gridApi.value.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
      };

      function searchClick_post() {
        let urlPost = url.value + '/dw_userList_p';

        console.log("[user_param.sctype]", user_param.sctype);
        console.log("[user_param.rowno]", user_param.rowno);
        console.log("[user_param.stor_loc]", user_param.stor_loc);

        $axios.post(urlPost, {
          sctype: user_param.sctype,
          rowno: user_param.rowno,
          stor_loc: user_param.stor_loc,
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

      function createNewRowData() {
        var newData = {
          sctype:"",
          rowno:"",
          stor_loc:""
        };
        return newData;
      }

      function addClick() {
        var newItem = createNewRowData();
        // 맨밑에 추가
        // var res = gridOptions.api.updateRowData({add: [newItem]});
        // rowData.add(res);

        // 특정위치에 추가
        var res = gridOptions.api.updateRowData({add: [newItem],addIndex:0});
        rowData.add(res).addIndex(0);
        //printResult(res);
      }

      // function saveUser2(sType) {
      //   var msg = "";
      //   var selectedData = gridOptions.api.getSelectedRows();
      //   console.log("[checked row]", selectedData);
      //   let urlPost = url.value + '/dw_usersaveList_p_j';
      //   $axios.post(urlPost, {
      //       lang:       "KR",
      //       type:       sType,
      //       upduser:    "ADMIN",
      //       data:       selectedData,
      //     },
      //   )
      //   .then((res) => {
      //     console.log(`status code: ${res.status}`);
      //     console.log("[response data]", res.data);

      //     if (res.data[0].status == "OK"){
      //       msg = res.data[0].msg;
      //       alert(msg);
      //     }
      //     else{
      //       msg = res.data[0].msg;
      //       alert(msg);
      //     }
      //   })
      //   .catch(err => {
      //     alert(err);
      //     console.error(err)
      //   });
      // }
      // 스트링 처리를 한다.
      function getdata (data){
        let rtn = "";
        if (data != null){
          var npos1 = data.indexOf("[",0);
          var npos2 = data.indexOf("]",0);
          if (npos1 > -1 && npos2 > -1){
            rtn = data.substring(npos1 + 1, npos2 )
          }
          else{
            rtn = data;
          }
        }
        return rtn;
      }
      return {
        sctype: "",
        rowno: "",
        stor_loc: "",
        scrollPostion : 0,
        defaultColGroupDef: null,
        columnTypes: null,
        rowData,
        onGridReady,
        gridOptions,
        getSelectedRows,
        searchClick_post,
        user_param,
        addClick,
        window_width,
        window_height,
      };
    },
  }
</script>
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";

	.stc {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width:100%;
    height:100%;
	}
  .stc_on {
    height : 98px;
    margin : 0px 5px 0px 5px;
  }
  .stc_on_grid1 {
    margin:0px 5px 0px 5px;
    overflow: auto;
  }
  .stc_on_save {
    height : 148px;
    margin : 0px 50px 0px 5px;
  }
</style>