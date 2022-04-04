<template>
  <div class="window-main ">
		<!-- <Search>
      <template #user>
      </template>
    </Search> -->
    <div class="window-search-1">
      <form class="d-flex" :style="{height:'37px'}" >
        <div class="input-group mb-3" :style="{ margin:'5px 5px 0px 5px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">{{lblMatnr}}</span>
          <input type="text" class="form-control btn-sm" placeholder="Material Code" aria-label="Material Code" aria-describedby="basic-addon1" v-model="Material_param.matnr">
        </div>

        <div class="input-group mb-3" :style="{ margin:'5px 5px 0px 5px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">{{lblMaktx}}</span>
          <input type="text" class="form-control btn-sm" placeholder="Material Name" aria-label="Material Name" aria-describedby="basic-addon1" v-model="Material_param.maktx">
        </div>


        
        <div class="input-group mb-3" :style="{ margin:'5px 5px 0px 0px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">{{lblMtart}}</span>
          <select class="form-select btn-sm" aria-label="Default select example" v-model="Material_param.mtart">
            <option disabled value="">ALL</option>
            <option v-for="(d, i) in optionsMtart" :key="i" :value="d.id">{{ d.name }}</option>
          </select>
          </div>

        <div class="input-group mb-3" :style="{ margin:'5px 5px 0px 0px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">{{lblUseFlag}}</span>
          <select class="form-select btn-sm" aria-label="Default select example" v-model="Material_param.useflag">
            <option disabled value="">ALL</option>
            <option v-for="(d, i) in optionsUse" :key="i" :value="d.id">{{ d.name }}</option>
          </select>
        </div>

        <div>
          <button class="btn btn-outline-success btn-sm" type="button" :style="{width:'70px', margin:'6px 5px 0px 10px', height:'30px'}"
            @click='searchClick_post' >{{lblSearch}}</button>
        </div>
      </form>
    </div>
    <div class="window-grid-1"
      :style="{
        height: `calc(${window_height - 109 - 80}px)`,
        width: `calc(${window_width - 10}px)`
      }"
    >
      <ag-grid-vue
        id="agGrid1"
        class="ag-theme-alpine"
        :style="{width:'100%', height:'100%'}"
        headerHeight='35'
        :columnDefs="columnDefs"
        :rowData="recvData.value"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
      >
      </ag-grid-vue>
    </div>
  
    <div class= "window-save" align="right">
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
        @click='addClick'>{{lblAdd}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
        @click='deleteClick'>{{lblDelete}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
        @click='saveClick'>{{lblSave}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
        @click='closeClick'>{{lblClose}}</button>

    </div>



  </div>
</template>
<script>
  // import Search from '@/components/form/Search.vue'
  // import { reactive, ref, onMounted, getCurrentInstance, inject } from 'vue'
  import $axios from 'axios';
  import { reactive, ref, onMounted, onUnmounted, onBeforeMount} from 'vue'
  import { useStore } from 'vuex';
  import { AgGridVue } from 'ag-grid-vue3'
  import { getdata } from '@/helper/filter.js';
  import language from '@/assets/language.js';
  import { BoldRenderer, autoSizeAll } from '@/helper/ag-grid.js';

    export default {
    name: 'master_material',
    components: {
      AgGridVue,
    },
    setup(props, {emit}){
      
      const $url_rest = process.env.VUE_APP_SERVER_URL;

      let optionsUse = reactive([]);
      let optionsMtart = reactive([]);
      
      const store = useStore();	//스토어호출

      //화면 언어 설정==============================================================================//
      let lang = ref(language.master_material);

      let lblMatnr = ref("자재코드");
      let lblMaktx = ref("자재명");
      let lblMtart = ref("자재그룹");
      let lblUseFlag = ref("사용유무");      
      let lblSearch = ref("조회");
      let lblAdd = ref("추가");
      let lblDelete = ref("삭제");
      let lblSave = ref("저장");
      let lblClose = ref("종료");


      //============================================================================================//
      let recvData = reactive([]);
      let MaterialData = ([]);
      let url = ref($url_rest);
      let gridApi = ref(null);
      let columnApi = ref(null);
      let Material_param = reactive({matnr:"", mtart:"", maktx:"" ,useflag:""});

      let columnDefs= reactive([
          {headerName: '선택', field: 'sel', width: 50, cellStyle: {textAlign: "center"},
            headerCheckboxSelection: true, checkboxSelection: true, pinned: 'left'
          },
          {headerName: '자재코드', field: 'matnr', width: 100, sortable: true, pinned: 'left',
            cellRenderer: BoldRenderer,
          },
          {headerName: '자재유형', field: 'mtart', width: 120},
          {headerName: '자재그룹', field: 'matkl', width: 120},

          {headerName: '자재내역', field: 'maktx', width: 120},
          {headerName: '기존자재', field: 'bismt', width: 120},
          {headerName: '기본단위', field: 'meins', width: 120},
          {headerName: '등급', field: 'grade', width: 120},
          {headerName: '사용유무', field: 'useflag', cellStyle: {textAlign: "center"},
            editable: true,
            // cellEditor: 'agRichSelectCellEditor',
            cellEditor: 'agSelectCellEditor',
            cellRenderer: useflagCellRenderer,
            keyCreator: (useflag) => {
              return useflag.name;
            },              
            cellEditorParams: {
              values: ['Y', 'N'],   
            },                                                          
          },                  
          {headerName: '수정자', field: 'upduser'},
          {headerName: '수정일', field: 'upddate', cellStyle: {textAlign: "center"},},
      ]);
      const useflagCellRenderer = (params) => {
        // console.log("useflagCellRenderer--");
        params.value.name;
      };

      var gridOptions = {
        defaultColDef: {
          width: 150,
          editable: true,
          // filter: 'agTextColumnFilter',
          // floatingFilter: true,
          resizable: true,
          sortable: true,
          lockPosition: true, //컬럼 드래그로 이동 방지
          cellStyle: {textAlign: "left"},
        },
        // columnDefs: columnDefs,
        rowData: null,
        rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
        suppressRowClickSelection: true,
        // GRID READY 이벤트, 사이즈 자동조정
        onGridReady: function(event) {
          setTimeout(function () {
            event.api.setRowData(recvData);
          }, 500);
          // event.api.sizeColumnsToFit();

          gridApi.value = event.api;
          columnApi.value = event.columnApi;
        },
        getRowHeight: function() {
          // assuming 50 characters per line, working how how many lines we need
          // return 28 * (Math.floor(params.data.model.length / 60) + 1);
          return 35;
        },
        // getRowNodeId: function(event){
        // },
        // 창 크기 변경 되었을 때 이벤트
        // onGridSizeChanged: function(event) {
        //   event.api.sizeColumnsToFit();
        // },
        // onRowClicked : function (event){
        //   console.log(event.username);
        //   console.log('onRowClicked');
        // },
      };
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      onBeforeMount(()=>{
        // console.log("[UserManagement] = ", "onBeforeMount--");
        searchSelectBox_UseFlag();
        searchSelectBox_Mtart();
      });

      onMounted(() => {
        // console.log("[UserManagement] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
        setLanguage();
      });
      onUnmounted(() =>{
        // console.log("[UserManagement] = onUnmounted -- ");
        window.removeEventListener('resize', handleResize);
      });

      function handleResize() {
        window_width.value = window.innerWidth;
        window_height.value = window.innerHeight;
      }

      // const onGridReady = params => {
      //   gridApi = params.api;
      //   columnApi.value = params.columnApi;
      // };
      const getSelectedRows = () => {
        const selectedNodes = gridApi.value.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
      };

      function searchSelectBox_Mtart() {
        // options.push({id:"", name:"All"});
        // options.push({id:"Y", name:"Yes"});
        // options.push({id:"N", name:"No"});
        // console.log("[UserManagement] = userid -- ", store.state.auth.user[0].userid);
        // console.log("[UserManagement] = plat -- ", getdata(store.state.auth.user[0].plantcd));
        let urlPost = url.value + '/api/dw/selectboxList';
        $axios.post(urlPost, {
          lang: "KR",
          userid: store.state.auth.user[0].userid,
          plant: getdata(store.state.auth.user[0].plantcd),
          type1: "MTART",
          type2: "",
          type3: "",
          type4: "",
          space: "Y",
        })
        .then((res) => {
          console.log("[Master_Material_Mtart] = response data -- ", res.data);
          optionsMtart.splice(0, optionsMtart.length);
          for(var i=0; i<res.data.length; i++){
             optionsMtart.push({id:res.data[i].id, name:res.data[i].name});
          }
          // console.log("[UserManagement] = options data -- ", options);
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }

      function searchSelectBox_UseFlag() {
        // options.push({id:"", name:"All"});
        // options.push({id:"Y", name:"Yes"});
        // options.push({id:"N", name:"No"});

        // console.log("[UserManagement] = userid -- ", store.state.auth.user[0].userid);
        // console.log("[UserManagement] = plat -- ", getdata(store.state.auth.user[0].plantcd));

        let urlPost = url.value + '/api/dw/selectboxList';
        $axios.post(urlPost, {
          lang: "KR",
          userid: store.state.auth.user[0].userid,
          plant: getdata(store.state.auth.user[0].plantcd),
          type1: "Useflag",
          type2: "",
          type3: "",
          type4: "",
          space: "Y",
        })
        .then((res) => {
           console.log("[Master_Material_Use] = response data -- ", res.data);

          optionsUse.splice(0, optionsUse.length);
          for(var i=0; i<res.data.length; i++){
             optionsUse.push({id:res.data[i].id, name:res.data[i].name});
          }

          // console.log("[UserManagement] = options data -- ", options);
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }

      function searchClick_post() {

        store.commit('loading/startLoading'); //진행표시 시작

        let urlPost = url.value + '/dw/master/Material/search';

         console.log("[Material_param.matnr]", Material_param.matnr);
         console.log("[Material_param.Maktx]", Material_param.maktx);
         console.log("[Material_param.Mtart]", Material_param.mtart);
         console.log("[Material_param.useflag]", Material_param.useflag);

        $axios.post(urlPost, {
          lang: "KR",
          matnr: Material_param.matnr,
          maktx: Material_param.maktx,
          mtart: getdata(Material_param.mtart),
          useflag: Material_param.useflag,
        })
        .then((res) => {
          console.log("[response data]", res.data);
          recvData.value = res.data;
          MaterialData = res.data;

          setTimeout(function () {
						autoSizeAll(false, columnApi);
					});

          store.commit('loading/endLoading'); //진행표시 중지

          // console.log("[ received data ] ", recvData);
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
          store.commit('loading/endLoading'); //진행표시 중지
        })
      }
      function createNewRowData() {
        var newData = {
          matnr:"",
          mtart:"",
          matkl:"",
          maktx:"",
          bismt:"",
          meins:"",
          grade:"",
          useflag:"Y"

        };
        return newData;
      }
      function addClick() {
        var newItem = createNewRowData();
        // 맨밑에 추가
        // gridOptions.api.updateRowData({add: [newItem]});

        // 특정위치에 추가
        gridApi.value.updateRowData({add:[newItem], addIndex:0});
        // console.log("[node.length]", gridApi.value.getDisplayedRowCount());

        const rowNode = gridApi.value.getDisplayedRowAtIndex(0);
        rowNode.setSelected(true);
      }
      function deleteClick() {
        saveUser2("D");
      }

      function saveClick() {
        // alert("saveClick");
        saveUser2("S");
        // setLanguage();
      }

      function saveUser2(sType) {
        var msg = "";
        var selectedData = gridApi.value.getSelectedRows();

        console.log("[checked row]", selectedData);

        let urlPost = url.value + '/dw/master/material/save';
        $axios.post(urlPost, {
          lang:       "KR",
          type:       sType,
          upduser:    "ADMIN",
          data:       selectedData,
          },        
        )
        .then((res) => {
          // console.log(`status code: ${res.status}`);
          // console.log(`headers: ${res.headers}`);
          // console.log(`data: ${res.data}`);
          // console.log("[response data]", res.data);
          // rtnmsg.value = res.data;

          // if (rtnmsg.value[0].status == "OK")
          if (res.data[0].status == "OK"){
            searchClick_post();
            msg = res.data[0].msg;
            alert(msg);            
          }
          else{
            msg = res.data[0].msg;
            alert(msg);
          }
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        });
      }
      // 스트링 처리를 한다.
      // function getdata (data){
      //   let rtn = "";
      //   if (data != null){
      //     var npos1 = data.indexOf("[",0);
      //     var npos2 = data.indexOf("]",0);
      //     if (npos1 > -1 && npos2 > -1){
      //       rtn = data.substring(npos1 + 1, npos2 )
      //     }
      //     else{
      //       rtn = data;
      //     }
      //   }
      //   return rtn;
      // }
      function getPhotos () {  //getPhots함수는 메서드정의. 할때는 반드시 function 키워드쓴다
        $axios.get('https://jsonplaceholder.typicode.com/photos?_page=1&_limit=5')
        .then((res) => {
          this.photos = res.data
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => console.error(err))
      }

      function closeClick(){
        console.log("component_close = ", "master_material");
        emit("component_close", "master_material");
      }

      function setLanguage(){
        console.log("lang = ", lang.value);
        lblMatnr.value = lang.value['lblMatnr'][store.state.setup.language];
        lblMaktx.value = lang.value['lblMaktx'][store.state.setup.language];
        lblMtart.value = lang.value['lblMtart'][store.state.setup.language];
        lblUseFlag.value = lang.value['lblUseFlag'][store.state.setup.language];
        lblSearch.value = lang.value['lblSearch'][store.state.setup.language];
        lblAdd.value = lang.value['lblAdd'][store.state.setup.language];
        lblDelete.value = lang.value['lblDelete'][store.state.setup.language];
        lblSave.value = lang.value['lblSave'][store.state.setup.language];
        lblClose.value = lang.value['lblClose'][store.state.setup.language];

        // console.log("lang = ", lang.value);
        for(var i=0; i<columnDefs.length; i++){
          // console.log("lang = ", lang.value['grid1'][i]['name'][store.state.setup.language]);
          columnDefs[i].headerName = lang.value.grid1[i]['name'][store.state.setup.language];
        }
        // console.log("columnDefs = ", columnDefs);
      }

      //##########################################################################################################################//
      function importJsonFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'text/plain, .json'; // 확장자가 xxx, yyy 일때, ".xxx, .yyy" 'text/javascript'
        // input.style.opacity = 0;

        input.onchange = function () {
          const reader = new FileReader();
          reader.readAsText(input.files[0], "UTF-8");
          // console.log("reader : ", reader);
          reader.onload = (e) => {
            // var textData = file.result;
            var textData = e.target.result;
            try {
              var newArr = JSON.parse(textData);
            } catch(e) {
              alert("Sorry, your file doesn't appear to be valid JSON data.");
            }
            console.log("text file : ", newArr);
          };
        };
        input.click();
      }

      function exportJsonFile() {
        let cars = [
          {
            Name: "chevrolet chevelle malibu",
            Miles_per_Gallon: 18,
            Cylinders: 8,
            Displacement: 307,
            Horsepower: 130,
            Weight_in_lbs: 3504,
            Acceleration: 12,
            Year: "1970-01-01",
            Origin: "USA"
          },
          {
            Name: "buick skylark 320",
            Miles_per_Gallon: 15,
            Cylinders: 8,
            Displacement: 350,
            Horsepower: 165,
            Weight_in_lbs: 3693,
            Acceleration: 11.5,
            Year: "1970-01-01",
            Origin: "USA"
          }
        ];

        let data = JSON.stringify(cars);
        // fs.writeFileSync("data.json", data);

        var filename = "test1.json"
        let blob = new Blob([data], { type: 'text/plain;charset=utf-8;' })
        if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, filename)
        } else {
          let link = document.createElement('a')
          if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            let url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', filename)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }
        }
      }
     return {
        AA: "안녕하세요",
        BB: "반갑습니다.",
        photos: [],
        optionsUse,
        optionsMtart,
        columnDefs,
        MaterialData,
        searchSelectBox_UseFlag,
        searchSelectBox_Mtart,
        lblMatnr,
        lblMaktx,
        lblMtart,
        lblUseFlag,
        lblSearch,
        lblAdd,
        lblDelete,
        lblSave,
        lblClose,
        userid: "",
        username: "",
        useflag: "",
        scrollPostion : 0,
        defaultColGroupDef: null,
        columnTypes: null,
        recvData,
        gridOptions,
        getSelectedRows,      
        searchClick_post,
        Material_param,
        addClick,
        deleteClick,
        saveClick,
        getPhotos,
        window_width,
        window_height,
        closeClick,
        importJsonFile,
        exportJsonFile,
        
      };
    },
    computed: {
    },
    created () {
      // console.log("[UserManagement] = ", "created --");
    },
    methods: {
      makeData () {
        // console.log("makeData--");
        // this.recvData = [
        //   {make: 'Toyota', model: 'Celica', price: 35000},
        //   {make: 'Ford', model: 'Mondeo', price: 32000},
        //   {make: 'Porsche', model: 'Boxter', price: 72000}
        // ];
      },
      // gridSizeFit (params) {
      //   // 모니터나 브라우저 크기에 따라 반응하여 그리드 컬럼 사이즈를 조정합니다.
      //   if ( window.innerWidth > 800 ){ // 화면 가로가 800 px 이 넘을 경우
      //     params.api.sizeColumnsToFit(); // 가로 스크롤바가 생기지 않도록 컬럼 사이즈를 그리드에 꼭 맞게 조정합니다.
      //   } else {
      //     // 컬럼의 데이터값이 잘리지 않도록 조정합니다.
      //     let allColumnIds = []
      //     this.gridOptions.columnApi.getAllColumns().forEach(function (column) {
      //       allColumnIds.push(column.colId)
      //     })
      //     this.gridOptions.columnApi.autoSizeColumns(allColumnIds)
      //   }
      // },
      // onGridReady(params) {
      //   this.gridApi = params.api;
      //   this.gridColumnApi = params.columnApi;

      //   const updateData = (data) => params.api.setRowData(data);

      //   fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      //     .then((resp) => resp.json())
      //     .then((data) => updateData(data));
      // },
      // fitColumnsSize(params) {
      //   params.api.sizeColumnsToFit();
      // }, //컬럼의 데이터에 맞춰서 사이즈 조절
      // 무한 스크롤 정의
      handleNotificationListScroll(e) {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
        // 일정 한도 밑으로 내려오면 함수 실행
        if (isAtTheBottom) this.handleLoadMore();
      },
      // 내려오면 api 호출하여 아래에 더 추가, total값 최대이면 호출 안함
      handleLoadMore() {
        if (this.notifications.length < this.total) {
          const params = {
            limit: this.params.limit,
            page: this.params.page + 1
          };
          this.$store.commit(
            "notification/SET_PARAMS",
            this.filterValue ? { ...params, type: this.filterValue } : params
          );
          this.dispatchGetNotifications(false);
        }
      },
      // 스크롤을 맨위로 올리고 싶을 때
      handleClickTitle() {
        this.$refs["notification-list"].scroll({ top: 0, behavior: "smooth" });
      },
      // 새로고침
      handleClickRefresh() {
        this.$refs["notification-list"].scroll({ top: 0 });
        this.dispatchGetNotifications(true);
      },
      // 처음 렌더링시 이전 알림 불러오기 or reset=true시 새로고침, false시 이전 목록에 추가
      dispatchGetNotifications(reset) {
        this.$store.dispatch("notification/getNotifications", reset);
      },
    },
  }
</script>
<style lang="scss">
.list {
  /* height: calc(50vh - 70px); */
  width : 100%;
  height: 455px;
  overflow: auto;
}
</style>