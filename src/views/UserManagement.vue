<template>
  <div class="mng">
		<!-- <Search>
      <template #user>
      </template>
    </Search> -->
    <div class="usersearch1">
      <form class="d-flex" :style="{height:'37px'}" >
        <div class="input-group mb-3" :style="{ margin:'2px 5px 0px 0px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">사용자ID</span>
          <input type="text" class="form-control btn-sm" placeholder="UserID" aria-label="UserID" aria-describedby="basic-addon1" v-model="user_param.userid">
        </div>
        <div class="input-group mb-3" :style="{ margin:'2px 5px 0px 0px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">사용자명</span>
          <input type="text" class="form-control btn-sm" placeholder="UserName" aria-label="UserID" aria-describedby="basic-addon1" v-model="user_param.username">
        </div>
        <div class="input-group mb-3" :style="{ margin:'2px 5px 0px 0px'}">
          <span class="input-group-text btn-sm" id="basic-addon1">사용유무</span>
          <select class="form-select btn-sm" aria-label="Default select example" v-model="user_param.useflag">
            <option disabled value="">사용유무</option>
            <option value="">All</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
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
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 5px 0px 10px', height:'32px'}"
          @click='searchClick_post' >Search</button>
        <!-- <button class="btn btn-outline-success" type="button" :style="{ margin:'0px 5px 0px 10px'}"
          @click='searchClick' >Search</button> -->
      </form>
    </div>
    <div class="usergrid1">
      <ag-grid-vue
        id="agGrid1"
        style="width: 100%; height:100%"
        class="ag-theme-alpine"
        :rowData="rowData.value"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
        >
        <!--
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

    <div align="right">
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
       @click='addClick'>추가</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
      @click='deleteClick'>삭제</button>
      <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 5px 0px 0px', width:'70px'}"
      @click='saveClick'>저장</button>
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
  import { reactive, ref, onMounted } from 'vue'
  import axios from 'axios'

  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

  import {AgGridVue} from 'ag-grid-vue3'

  export default {
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
    //     rowData: [],
    //     defaultColGroupDef: null,
    //     columnTypes: null,
    //   }
    // },
    setup(){
      console.log("setup--");

      let rowData = reactive([]);
      // let rtnmsg = reactive([]);
      // let selData = reactive({userid:"", username:"", plant:"", workcenter:"", warehoue:""
      //                       , auth:"", role:"", use_role:"", uesflag:"", forklift:""
      //                       , etc:"", upduser:"", upddate:""});

      // let url = ref("http://localhost:8090");
      let url = ref("http://192.168.134.15:8090");

      let gridApi = ref(null);
      let columnApi = ref(null);

      let user_param = reactive({userid:"", username:"", useflag:""});

      let columnDefs= reactive([
          {headerName: '선택', field: 'sel', width: 50, cellStyle: {textAlign: "center"},
            headerCheckboxSelection: true, checkboxSelection: true, pinned: 'left'},
          {headerName: '사용자ID', field: 'userid', sortable: true, pinned: 'left'},
          {headerName: '사용자명', field: 'username', pinned: 'left'},
          {headerName: '패스워드', field: 'userpwd', hide: true, cellStyle: { color: 'red', textAlign: "left", backgroundColor: "white" }},
          {headerName: '플랜드', field: 'plantcd', sortable: true, filter: true},
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
              console.log("[selectedPlant]", selectedPlant );
              if (selectedPlant == 'K143'){
                return{
                  values: ['Yes', 'No']
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
        console.log("useflagCellRenderer--");
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
        columnDefs: columnDefs,
        rowData: null,
        rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
        // GRID READY 이벤트, 사이즈 자동조정
        onGridReady: function(event) {
          setTimeout(function () {
            event.api.setRowData(rowData);
          }, 1000);
          event.api.sizeColumnsToFit();
        },
        // 창 크기 변경 되었을 때 이벤트
        onGridSizeChanged: function(event) {
          event.api.sizeColumnsToFit();
        },
        // onRowClicked : function (event){
        //   console.log(event.username);
        //   console.log('onRowClicked');
        // },
      };

      onMounted(() => {
        console.log("onMounted--");
        // fetch('https://www.ag-grid.com/example-assets/small-row-data.json')
        //         .then(result => result.json())
        //         .then(remoteRowData => rowData.value = remoteRowData)
        //         .then(remoteRowData => console.log("[ init rowData ] ", remoteRowData));

        // searchClick_post();
        // rowData.value = null;
        // console.log("[ init rowData ] ", rowData);
      });
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
      function searchClick() {  //getPhots함수는 메서드정의. 할때는 반드시 function 키워드쓴다
        let sendData = url.value
                     + "/dw_userList?"
                     + "userid=" + user_param.userid
                     + "&username=" + user_param.username
                     + "&useflag=" + user_param.useflag;

        console.log("[sendData", sendData);
        axios.get(sendData)
        //   headers: {
        //     'Content-Type': 'application/json; charset = utf-8'
        //   }
        // })
        .then((res) => {
          console.log(res.data);
          rowData.value = res.data;
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }
      function searchClick_post() {
        let urlPost = url.value + '/dw_userList_p';

        console.log("[user_param.userid]", user_param.userid);
        console.log("[user_param.username]", user_param.username);
        console.log("[user_param.useflag]", user_param.useflag);

        axios.post(urlPost, {
          userid: user_param.userid,
          username: user_param.username,
          useflag: user_param.useflag,
        })
        .then((res) => {
          console.log("[response data]", res.data);
          rowData.value = res.data;
          console.log("[ received data ] ", rowData);
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
        // var res = gridOptions.api.updateRowData({add: [newItem]});
        // rowData.add(res);

        // 특정위치에 추가
        var res = gridOptions.api.updateRowData({add: [newItem],addIndex:0});
        rowData.add(res).addIndex(0);
        //printResult(res);
      }
      function deleteClick() {
        // alert("deleteClick");
        // var selectedData = gridOptions.api.getSelectedRows();
        // console.log("[checked row]", selectedData);
        //alert(selectedData[0].userid + "    " + selectedData.length);

        saveUser2("D");
        // var res = gridOptions.api.updateRowData({remove: selectedData});
        // rowData.remove(res);
      }
      function saveClick() {
        // alert("saveClick");
        saveUser2("S");
      }
      // function saveUser(sType) {
      //   var status = "NG";
      //   var msg = "";
      //   var selectedData = gridOptions.api.getSelectedRows();
      //   console.log("[checked row]", selectedData);

      //   for(var i=0; i<selectedData.length; i++ ){
      //     console.log("[checked row]", selectedData[i].userid);

      //     let urlPost = url.value + '/dw_usersaveList_p';

      //     axios.post(urlPost, {
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
        var selectedData = gridOptions.api.getSelectedRows();

        console.log("[checked row]", selectedData);

        let urlPost = url.value + '/dw_usersaveList_p_j';
        axios.post(urlPost, {
          lang:       "KR",
          type:       sType,
          upduser:    "ADMIN",
          data:       selectedData,
        },
        // {contentType: 'application/json'}
        )
        .then((res) => {
          console.log(`status code: ${res.status}`);
          // console.log(`headers: ${res.headers}`);
          // console.log(`data: ${res.data}`);

          console.log("[response data]", res.data);
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
        AA: "안녕하세요",
        BB: "반갑습니다.",
        photos: [],
        userid: "",
        username: "",
        useflag: "",
        scrollPostion : 0,
        defaultColGroupDef: null,
        columnTypes: null,
        // defaultColDef: {
        //   width: 150,
        //   editable: true,
        //   // filter: 'agTextColumnFilter',
        //   // floatingFilter: true,
        //   resizable: true,
        //   lockPosition: true, //컬럼 드래그로 이동 방지
        //   cellStyle: {textAlign: "left"},
        // },
        rowData,
        onGridReady,
        gridOptions,
        getSelectedRows,
        searchClick,
        searchClick_post,
        user_param,
        addClick,
        deleteClick,
        saveClick,
      };
    },
    components: {
      AgGridVue,
      // Search,
    },
    computed: {

    },
    created () {
      console.log("created--");
    },
    mounted(){
      console.log("mounted--");
    },
    methods: {
      getPhotos: function () {  //getPhots함수는 메서드정의. 할때는 반드시 function 키워드쓴다
        axios.get('https://jsonplaceholder.typicode.com/photos?_page=1&_limit=5')
        .then((res) => {
          this.photos = res.data
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => console.error(err))
      },
      makeData () {
        console.log("makeData--");
        // this.rowData = [
        //   {make: 'Toyota', model: 'Celica', price: 35000},
        //   {make: 'Ford', model: 'Mondeo', price: 32000},
        //   {make: 'Porsche', model: 'Boxter', price: 72000}
        // ];
      },
      gridSizeFit (params) {
        // 모니터나 브라우저 크기에 따라 반응하여 그리드 컬럼 사이즈를 조정합니다.
        if ( window.innerWidth > 800 ){ // 화면 가로가 800 px 이 넘을 경우
          params.api.sizeColumnsToFit(); // 가로 스크롤바가 생기지 않도록 컬럼 사이즈를 그리드에 꼭 맞게 조정합니다.
        } else {
          // 컬럼의 데이터값이 잘리지 않도록 조정합니다.
          let allColumnIds = []
          this.gridOptions.columnApi.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.colId)
          })
          this.gridOptions.columnApi.autoSizeColumns(allColumnIds)
        }
      },
      // onGridReady(params) {
      //   this.gridApi = params.api;
      //   this.gridColumnApi = params.columnApi;

      //   const updateData = (data) => params.api.setRowData(data);

      //   fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      //     .then((resp) => resp.json())
      //     .then((data) => updateData(data));
      // },
      fitColumnsSize(params) {
          params.api.sizeColumnsToFit();
      }, //컬럼의 데이터에 맞춰서 사이즈 조절



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
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";

	.mng {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width:100%;
    height:799px;
    // border-top:1px solid #070707;
    // border-bottom:1px solid #070707;
		/* margin-top: 60px; */
	}
  .list {
    /* height: calc(50vh - 70px); */
    height: 455px;
    overflow: auto;
  }
  .usersearch1 {
    margin:0px 5px 0px 5px;
    // border-bottom:1px solid #070707;
  }
  .usergrid1 {
    margin:0px 5px 0px 5px;
    height: 733px;
    overflow: auto;
  }
</style>