<template>
  <div class="mng">
		<!-- <Search>
      <template #user>
      </template>
    </Search> -->
    <div class="usersearch1">
      <form class="d-flex" :style="{height:'37px'}" >
        <div class="input-group mb-3" :style="{ margin:'5px 5px 0px 5px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">{{lblUserID}}</span>
          <input type="text" class="form-control btn-sm" placeholder="UserID" aria-label="UserID" aria-describedby="basic-addon1" v-model="user_param.userid">
        </div>
        <div class="input-group mb-3" :style="{ margin:'5px 5px 0px 0px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">{{lblUserName}}</span>
          <input type="text" class="form-control btn-sm" placeholder="UserName" aria-label="UserID" aria-describedby="basic-addon1" v-model="user_param.username">
        </div>
        <div class="input-group mb-3" :style="{ margin:'5px 5px 0px 0px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">{{lblUseFlag}}</span>
          <select class="form-select btn-sm" aria-label="Default select example" v-model="user_param.useflag">
            <option disabled value="">ALL</option>
            <option v-for="(d, i) in options" :key="i" :value="d.id">{{ d.name }}</option>
            <!-- <option value="">All</option>
            <option value="Y">Yes</option>
            <option value="N">No</option> -->
          </select>
        </div>
        <!-- <input class="form-control me-2" type="search" placeholder="사용자Id" aria-label="Search" v-model="user_param.userid">
        <input class="form-control me-2" type="search" placeholder="사용자명" aria-label="Search" v-model="user_param.username">
        <select class="form-select btn-sm" aria-label="Default select example" v-model="user_param.useflag">
          <option disabled value="">사용유무</option>
          <option value="">ALL</option>
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select> -->
        <div>
          <button class="btn btn-outline-success btn-sm" type="button" :style="{width:'70px', margin:'6px 5px 0px 10px', height:'30px'}"
            @click='searchClick_post' >{{lblSearch}}</button>
          <!-- <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 10px', height:'32px'}"
            @click='searchSelectBox' >Test</button> -->
          <!-- <button class="btn btn-outline-success" type="button" :style="{ margin:'0px 5px 0px 10px'}"
            @click='searchClick' >Search</button> -->
        </div>
      </form>
    </div>
    <div class="usergrid1"
      :style="{
        'height': `calc(${window_height - 109 - 80}px)`
      }"
    >
      <ag-grid-vue
        id="agGrid1"
        class="ag-theme-alpine"
        :style="{width: `calc(${window_width - 10}px)`, height:'100%'}"
        headerHeight='35'
        :columnDefs="columnDefs"
        :rowData="recvData.value"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
      >
        <!--
        style="width: 100%; height:100%"
        :defaultColDef="defaultColDef"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        rowSelection="multiple"
        :gridOptions="gridOptions"
        :gridReady="gridSizeFit"
        :gridSizeChanged="gridSizeFit"
        @rowDataChanged="fitColumnsSize($event)"
        -->
      </ag-grid-vue>
    </div>

    <!-- <div class= "usersave1" align="right">
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'100px'}"
        @click='selectIndexedDB'>{{"Select"}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'100px'}"
        @click='selectAllIndexedDB'>{{"SelectAll"}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'120px'}"
        @click='selectBoundIndexedDB'>{{"Select Bound"}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'100px'}"
        @click='writeIndexedDB'>{{"Data Add"}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'100px'}"
        @click='updateIndexedDB'>{{"Update"}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'100px'}"
        @click='deleteIndexedDB'>{{"Delete"}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'100px'}"
        @click='deleteAllIndexedDB'>{{"Delete All"}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 5px 0px 0px', width:'100px'}"
        @click='createIndexedDB'>{{"Create DB"}}</button>
    </div> -->

    <div class= "usersave1" align="right">
      <!-- <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
        @click='saveLocalStorage'>{{"Save"}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
        @click='loadLocalStorage'>{{"Load"}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
        @click='deleteLocalStorage'>{{"Delete"}}</button>

      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'150px'}"
        @click='exportJsonFile'>{{"Export JsonFile"}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'150px'}"
        @click='importJsonFile'>{{"Import JsonFile"}}</button> -->

      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
        @click='addClick'>{{lblAdd}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
        @click='deleteClick'>{{lblDelete}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
        @click='saveClick'>{{lblSave}}</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 5px 0px 0px', width:'70px'}"
        @click='closeClick'>{{lblClose}}</button>
    </div>

    <!-- <div class="container">
      <div class="row align-items-start">
        <div class="col">
          <p1>아이디</p1>
        </div>
        <div class="col">
          <p1>사용자이름</p1>
        </div>
        <div class="col">
          <p1>사용자암호</p1>
        </div>
      </div>
    </div> -->
    <!-- <ul
      ref="notification-list"
      class="list"
      @scroll="handleNotificationListScroll"
    > -->
      <!-- <div> -->
        <!-- <h1>{{state.getMsg}}</h1>
        <h1>{{state.postMsg}}</h1> -->

        <!-- <div v-for="(user, i) in users" :key="i">
          <div class="container">
            <div class="row align-items-start">
              <div class="col">
                <p1>{{user.userid}}</p1>
              </div>
              <div class="col">
                <p1>{{user.username}}</p1>
              </div>
              <div class="col">
                <p1>{{user.userpwd}}</p1>
              </div>
            </div>
          </div>
        </div> -->
      <!-- </div> -->
      <!-- <div id="app">
          <button @click='getPhotos'>GET PHOTOS</button>
          <div v-for="(photo, i) in photos" :key="i">
            <h5>{{ photo.title }}</h5>
            <img :src="photo.thumbnailUrl" :alt="photo.title">
          </div>
      </div> -->
    <!-- </ul> -->

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
    name: 'usermanagement',
    components: {
      AgGridVue,
      // Search,
    },
    // data: function() {
    //   console.log("data--");
    //   return {
    //     AA: "안녕하세요",
    //     BB: "반갑습니다.",
    //     photos: [],
    //     userid: '',
    //     username: '',
    //     useflag: '',
    //     scrollPostion : 0,
    //     recvData: [],
    //     defaultColGroupDef: null,
    //     columnTypes: null,
    //   }
    // },
    setup(props, {emit}){
      // console.log("[UserManagement] = ", "setup --");
      // const global = inject('global');
      // console.log("[global.server.url] --", global.server.url);

      // const app = getCurrentInstance();
      // const $axios = app.appContext.config.globalProperties.$axios;
      // const $url_rest = app.appContext.config.globalProperties.$url_rest;

      // const $axios = global.axios;
      // const $url_rest = global.server.url;

      const $url_rest = process.env.VUE_APP_SERVER_URL;

      // let options = reactive([{id:"", name:"All"},
      //   {id:"Y", name:"Yes"},
      //   {id:"N", name:"No"},
      // ]);
      let options = reactive([]);
      const store = useStore();	//스토어호출

      //화면 언어 설정==============================================================================//
      let lang = ref(language.usermanagement);

      let lblUserID = ref("사용자ID");
      let lblUserName = ref("사용자명");
      let lblUseFlag = ref("사용유무");
      let lblSearch = ref("조회");
      let lblAdd = ref("추가");
      let lblDelete = ref("삭제");
      let lblSave = ref("저장");
      let lblClose = ref("종료");


      //============================================================================================//
      let recvData = reactive([]);
      let userData = ([]);
      // let rtnmsg = reactive([]);
      // let selData = reactive({userid:"", username:"", plant:"", workcenter:"", warehoue:""
      //                       , auth:"", role:"", use_role:"", uesflag:"", forklift:""
      //                       , etc:"", upduser:"", upddate:""});
      let url = ref($url_rest);
      let gridApi = ref(null);
      let columnApi = ref(null);
      let user_param = reactive({userid:"", username:"", useflag:""});

      let columnDefs= reactive([
          {headerName: '선택', field: 'sel', width: 50, cellStyle: {textAlign: "center"},
            headerCheckboxSelection: true, checkboxSelection: true, pinned: 'left'
          },
          {headerName: '사용자ID', field: 'userid', width: 100, sortable: true, pinned: 'left',
            cellRenderer: BoldRenderer,
          },
          {headerName: '사용자명', field: 'username', width: 120, pinned: 'left'},
          {headerName: '패스워드', field: 'userpwd', hide: true, cellStyle: { color: 'red', textAlign: "left", backgroundColor: "white" }},
          {headerName: '플랜트', field: 'plantcd', width: 250, sortable: true, filter: true},
          {headerName: '작업장', field: 'wccode', hide: true},
          {headerName: '창고', field: 'warehouse'},
          {headerName: '조회그룹', field: 'auth'},
          {headerName: 'Role', field: 'role'},
          {headerName: 'Use Role', field: 'use_role'},
          {headerName: '사용유무', field: 'useflag', cellStyle: {textAlign: "center"},
            editable: true,
            // cellEditor: 'agRichSelectCellEditor',
            cellEditor: 'agSelectCellEditor',
            cellRenderer: useflagCellRenderer,
            keyCreator: (useflag) => {
              return useflag.name;
            },
            // cellEditorParams: {
            //   values: ['Y', 'N'],
            // },
            cellEditorParams: function(param){
              var selectedPlant = getdata(param.data.plantcd);
              // console.log("[selectedPlant]", selectedPlant );
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
            // cellEditorParams: {
            //   cellRenderer: useflagCellRenderer,
            //   values: [
            //     { name: 'Yes', code: 'Y' },
            //     { name: 'No', code: 'N' },
            //   ],
            // },
          },
          {headerName: '지게차 번호', field: 'forklift'},
          {headerName: '비고', field: 'etc'},
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
        searchSelectBox();
      });

      onMounted(() => {
        // console.log("[UserManagement] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
        // fetch('https://www.ag-grid.com/example-assets/small-row-data.json')
        //         .then(result => result.json())
        //         .then(remoteRowData => recvData.value = remoteRowData)
        //         .then(remoteRowData => console.log("[ init recvData ] ", remoteRowData));

        // searchClick_post();
        // recvData.value = null;
        // console.log("[ init recvData ] ", recvData);
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

      function searchSelectBox() {
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
          // console.log("[UserManagement] = response data -- ", res.data);

          options.splice(0, options.length);
          for(var i=0; i<res.data.length; i++){
             options.push({id:res.data[i].id, name:res.data[i].name});
          }

          // console.log("[UserManagement] = options data -- ", options);
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }

      function searchClick() {  //getPhots함수는 메서드정의. 할때는 반드시 function 키워드쓴다
        let sendData = url.value
                     + "/dw_userList?"
                     + "userid=" + user_param.userid
                     + "&username=" + user_param.username
                     + "&useflag=" + user_param.useflag;

        // console.log("[sendData", sendData);
        $axios.get(sendData)
        //   headers: {
        //     'Content-Type': 'application/json; charset = utf-8'
        //   }
        // })
        .then((res) => {
          // console.log(res.data);
          recvData.value = res.data;
          autoSizeAll(false, columnApi);
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }
      function searchClick_post() {
        let urlPost = url.value + '/dw_userList_p';

        // console.log("[user_param.userid]", user_param.userid);
        // console.log("[user_param.username]", user_param.username);
        // console.log("[user_param.useflag]", user_param.useflag);

        $axios.post(urlPost, {
          userid: user_param.userid,
          username: user_param.username,
          useflag: user_param.useflag,
        })
        .then((res) => {
          console.log("[response data]", res.data);
          recvData.value = res.data;
          userData = res.data;

          setTimeout(function () {
						autoSizeAll(false, columnApi);
					});
          // console.log("[ received data ] ", recvData);
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }
      function createNewRowData() {
        var newData = {
          userid:"",
          username:"",
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

        // gridApi.value.forEachNode( (node) => {
        //     if (node.rowIndex === 0) {
        //         node.setSelected(true);
        //     }

        //     // var rowdata = gridApi.value.getdata()
        //     console.log("[node.getdata]", node.data.userid );
        // });

        // gridApi.value.forEachNodeAfterFilter( function(node) {
        //   console.log("[node.rowIndex]", node.rowIndex);
        //   if (node.rowIndex === 0){
        //     node.setSelected(true);
        //   }
        // });
        //printResult(res);
      }
      function deleteClick() {
        // alert("deleteClick");
        // var selectedData = gridOptions.api.getSelectedRows();
        // console.log("[checked row]", selectedData);
        //alert(selectedData[0].userid + "    " + selectedData.length);

        saveUser2("D");
        // var res = gridOptions.api.updateRowData({remove: selectedData});
        // recvData.remove(res);
      }
      function saveClick() {
        // alert("saveClick");
        saveUser2("S");
        // setLanguage();
      }
      // function saveUser(sType) {
      //   var status = "NG";
      //   var msg = "";
      //   var selectedData = gridOptions.api.getSelectedRows();
      //   console.log("[checked row]", selectedData);

      //   for(var i=0; i<selectedData.length; i++ ){
      //     console.log("[checked row]", selectedData[i].userid);

      //     let urlPost = url.value + '/dw_usersaveList_p';

      //     $axios.post(urlPost, {
      //       lang:       "KR",
      //       type:       sType,
      //       userid:     selectedData[i].userid,
      //       username:   selectedData[i].username,
      //       plantcd:    getdata(selectedData[i].plant),
      //       wccode:     getdata(selectedData[i].wccode),
      //       warehouse:  getdata(selectedData[i].warehouse),
      //       auth:       getdata(selectedData[i].auth),
      //       role:       getdata(selectedData[i].role),
      //       use_role:   getdata(selectedData[i].use_role),
      //       useflag:    getdata(selectedData[i].useflag),
      //       forklift:   getdata(selectedData[i].forklift),
      //       etc:        getdata(selectedData[i].etc),
      //       upduser:    "ADMIN"
      //     })
      //     .then((res) => {
      //       console.log(`status code: ${res.status}`);
      //       // console.log(`headers: ${res.headers}`);
      //       // console.log(`data: ${res.data}`);

      //       console.log("[response data]", res.data);
      //       // rtnmsg.value = res.data;

      //       // if (rtnmsg.value[0].status == "OK")
      //       if (res.data[0].status == "OK"){
      //         status = "OK";
      //       }
      //       else{
      //         status = "NG";
      //         msg = res.data[0].msg;
      //         alert(msg);
      //         return;
      //       }
      //     }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
      //       //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
      //     .catch(err => {
      //       alert(err);
      //       console.error(err)
      //     });
      //   }

      //   console.log("[response data - status]", status);
      //   if (status == "OK")
      //   {
      //     console.log("[response data - msg]", msg);
      //     alert(msg);
      //   }
      // }
      function saveUser2(sType) {
        var msg = "";
        var selectedData = gridApi.value.getSelectedRows();

        // console.log("[checked row]", selectedData);

        let urlPost = url.value + '/dw_usersaveList_p_j';
        $axios.post(urlPost, {
          lang:       "KR",
          type:       sType,
          upduser:    "ADMIN",
          data:       selectedData,
        },
        // {contentType: 'application/json'}
        )
        .then((res) => {
          // console.log(`status code: ${res.status}`);
          // console.log(`headers: ${res.headers}`);
          // console.log(`data: ${res.data}`);
          // console.log("[response data]", res.data);
          // rtnmsg.value = res.data;

          // if (rtnmsg.value[0].status == "OK")
          if (res.data[0].status == "OK"){
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
        emit("component_close", "usermanagement");
      }

      function setLanguage(){
        lblUserID.value = lang.value['lblUserID'][store.state.setup.language];
        lblUserName.value = lang.value['lblUserName'][store.state.setup.language];
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
      //##########################################################################################################################//
      //LocalStorage 테스트
      let silsaFileName = ref("sila_test");
      var silsaCount = 0;
      function saveLocalStorage() {
        try{
          silsaFileName.value = "sila_test" + "_" + String(silsaCount++);
          localStorage.setItem(silsaFileName.value, JSON.stringify(recvData.value));
        }
        catch(e) {
          alert(e);
        }
      }

      function loadLocalStorage() {
        recvData.value = JSON.parse(localStorage.getItem(silsaFileName.value));
      }

      function deleteLocalStorage() {
        var keys = Object.keys(localStorage);
        // console.log("key = ", keys);

        for(var i=0; i<keys.length; i++){
          if(keys[i].length > 9){
            if(keys[i].substr(0, 9) == "sila_test")
              localStorage.removeItem(keys[i]);
          }
        }
        // localStorage.removeItem(silsaFileName.value);
      }

      //##########################################################################################################################//
      //IndexedDB 테스트

      // const customerData = [
      //   { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
      //   { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
      // ];

      // function createIndexedDB(){
      //   const dbName = "the_name";
      //   var request = indexedDB.open(dbName, 2);

      //   request.onerror = function() {
      //     // Handle errors.
      //   };
      //   request.onupgradeneeded = function(event) {
      //     var db = event.target.result;

      //     // Create an objectStore to hold information about our customers. We're
      //     // going to use "ssn" as our key path because it's guaranteed to be
      //     // unique - or at least that's what I was told during the kickoff meeting.
      //     var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

      //     // Create an index to search customers by name. We may have duplicates
      //     // so we can't use a unique index.
      //     objectStore.createIndex("name", "name", { unique: false });

      //     // Create an index to search customers by email. We want to ensure that
      //     // no two customers have the same email, so use a unique index.
      //     objectStore.createIndex("email", "email", { unique: true });

      //     // Use transaction oncomplete to make sure the objectStore creation is
      //     // finished before adding data into it.
      //     objectStore.transaction.oncomplete = function() {
      //       // Store values in the newly created objectStore.
      //       var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
      //       customerData.forEach(function(customer) {
      //         customerObjectStore.add(customer);
      //       });
      //     };
      //   };
      // }



      function createIndexedDB(){
        if(!window.indexedDB){
          alert("browser doesn't support IndexedDB");
        }
        else{
          var request = indexedDB.open('silsaDB', 1);

          request.onupgradeneeded = function(event){
            var db = event.target.result;
            // db.createObjectStore('silsa', {keyPath:'userid'});
            // db.createObjectStore('silsa', {keyPath:'key', autoIncrement: true});
            // var objectStore = db.createObjectStore('silsa', {keyPath:'key', autoIncrement: true});
            // objectStore.put({key: 11, value: 33});  // OK, key generator set to 11
            // objectStore.put({value: 66});           // OK, will have auto-generated key 12

            var objectStore = db.createObjectStore('silsa', {keyPath:'userid'});
            objectStore.createIndex("username", "username", { unique: false });
            objectStore.createIndex("plantcd", "plantcd", { unique: false });
            // objectStore.transaction.oncomplete = function() {
            //   // Store values in the newly created objectStore.
            //   var silsaObjectStore = db.transaction("silsa", "readwrite").objectStore("silsa");
            //   userData.forEach(function(user) {
            //     silsaObjectStore.add(user);
            //   });
            // };
          }
          request.onerror = function(event){
            alert(event);
          }
          request.onsuccess = function(event){
            console.log("success = ", event);
          }
        }
      }

      function writeIndexedDB(){
        var request = indexedDB.open('silsaDB');

        request.onerror = function(event){
          alert('Database error: ' + event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['silsa'], 'readwrite');

          transaction.oncomplete = function(){
            console.log("transaction done");
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }

          var objectStore = transaction.objectStore('silsa');
          // console.log("userData: ", userData);
          for( var  user of userData){
            // var request = objectStore.put({userid:bar.userid, value: strData});
            console.log("user: ", user);
            var request = objectStore.add(user);
            request.onsuccess = function(){
              console.log("add success");
              // console.log(event.target.result);
            }
            request.onerror = function(){
              console.log("add fail");
              // console.log(event.target.result);
            }
          }
        }
      }

      function selectAllIndexedDB(){
        var request = indexedDB.open('silsaDB');

        request.onerror = function(event){
          alert( event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['silsa']);

          transaction.oncomplete = function(){
            console.log("transaction done");
            gridApi.value.setRowData(recvData);
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }

          //변수Clear
          recvData.splice(0, recvData.length);

          var objectStore = transaction.objectStore('silsa');
          var request = objectStore.openCursor();
          request.onsuccess = function(event){
            var cursor = event.target.result;
            if (cursor){
              request = objectStore.get(cursor.key);
              request.onsuccess = function(event){
                recvData.push(event.target.result)
                // console.log(event.target.result);
              }
              cursor.continue();
            }
          }

          request.onerror = function(){
            console.log("select all fail");
          }
        }
      }

      function selectBoundIndexedDB(){
        var request = indexedDB.open('silsaDB');

        request.onerror = function(event){
          alert( event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['silsa']);

          transaction.oncomplete = function(){
            console.log("transaction done");
            gridApi.value.setRowData(recvData);
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }

          //변수Clear
          recvData.splice(0, recvData.length);

          var objectStore = transaction.objectStore('silsa');
          var singleKeyRange = IDBKeyRange.only("[K113] 동화기업 표면재공장");

          // // Match anything past "Bill", including "Bill"
          // var lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");
          // // Match anything past "Bill", but don't include "Bill"
          // var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);
          // // Match anything up to, but not including, "Donna"
          // var upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);
          // // Match anything between "Bill" and "Donna", but not including "Donna"
          // var boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);

          var index = objectStore.index("plantcd");
          var request = index.openCursor(singleKeyRange);
          request.onsuccess = function(event){
            var cursor = event.target.result;
            if (cursor){
              recvData.push(cursor.value);
              cursor.continue();
            }
          }

          request.onerror = function(){
            console.log("select all fail");
          }
        }
      }

      function selectIndexedDB(){
        var request = indexedDB.open('silsaDB');

        request.onerror = function(event){
          alert( event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['silsa']);

          transaction.oncomplete = function(){
            console.log("transaction done");
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }
          var objectStore = transaction.objectStore('silsa');

          var request = objectStore.get(user_param.userid);
          request.onerror = function(){
            console.log("select all fail");
          }

          request.onsuccess = function(event){
            if(event.target.result == undefined){
              alert("Not Exists");
            }
            else{
              alert(JSON.stringify(event.target.result));
            }
          }

          // //index를 조회한다.
          // var index = objectStore.index("username");
          // index.get(user_param.username).onsuccess = function(event){
          //   if(event.target.result == undefined){
          //     alert("Not Exists");
          //   }
          //   else{
          //     alert(JSON.stringify(event.target.result));
          //   }
          // }
        }
      }

      function updateIndexedDB() {
        var request = indexedDB.open('silsaDB');

        request.onerror = function(event){
          alert('Database error: ' + event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['silsa'], 'readwrite');

          transaction.oncomplete = function(){
            console.log("transaction done");
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }

          var objectStore = transaction.objectStore('silsa');
          var request = objectStore.get(user_param.userid);
          request.onerror = function(){
            console.log("select all fail");
          }

          request.onsuccess = function(event){
            if(event.target.result == undefined){
              alert("Not Exists");
            }
            else{
              var data = event.target.result;
              data.username = "K143";

              var requestUpdate = objectStore.put(data);
              requestUpdate.onerror = function(event) {
                alert(event.target.error);
              };
              requestUpdate.onsuccess = function() {
                // console.log(event.target.result);
                alert("Success Update");
              };
            }
          }
        }
      }

      function deleteIndexedDB(){
        var request = indexedDB.open('silsaDB');

        request.onerror = function(event){
          alert( event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['silsa'], "readwrite");

          transaction.oncomplete = function(){
            console.log("transaction done");
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }

          var objectStore = transaction.objectStore('silsa');
          var request = objectStore.delete(user_param.userid);
          request.onsuccess = function(event){
            console.log(event.target.result);
          }

          // var request = db.transaction(["silsa"], "readwrite")
          //                 .objectStore("silsa")
          //                 .delete("143");
          // request.onsuccess = function(event) {
          //   // It's gone!
          // };
        }
      }

      function deleteAllIndexedDB(){
        var request = indexedDB.open('silsaDB');

        request.onerror = function(event){
          alert( event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['silsa'], "readwrite");

          transaction.oncomplete = function(){
            console.log("transaction done");
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }

          var objectStore = transaction.objectStore('silsa');
          var request = objectStore.clear();
          request.onsuccess = function(){
            alert("Success Delete All");
          }
        }
      }




      //##########################################################################################################################//
      return {
        AA: "안녕하세요",
        BB: "반갑습니다.",
        photos: [],
        options,
        columnDefs,
        searchSelectBox,
        lblUserID,
        lblUserName,
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
        searchClick,
        searchClick_post,
        user_param,
        addClick,
        deleteClick,
        saveClick,
        getPhotos,
        window_width,
        window_height,
        closeClick,
        importJsonFile,
        exportJsonFile,
        saveLocalStorage,
        loadLocalStorage,
        deleteLocalStorage,
        createIndexedDB,
        writeIndexedDB,
        selectAllIndexedDB,
        selectBoundIndexedDB,
        selectIndexedDB,
        updateIndexedDB,
        deleteIndexedDB,
        deleteAllIndexedDB,

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
  .mng {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width:100%;
    // height:799px;
    height:100%;
    // border-top:1px solid #070707;
    // border-bottom:1px solid #070707;
		/* margin-top: 60px; */
	}
  .list {
    /* height: calc(50vh - 70px); */
    width : 100%;
    height: 455px;
    overflow: auto;
  }
  .usersearch1 {
    height : 40px;
    // border-bottom:1px solid #070707;
    margin : -5px 0px 0px 0px;
  }
  .usergrid1 {
    // width : 100%;
    margin:0px 5px 0px 5px;
    // height: 733px;
    overflow: auto;
  }
  .usersave1 {
    width : 100%;
    height : 40px;
  }
</style>