<template>
  <div class="pop-up-window-main">
    <!-- Send, Delete버튼 클릭후 처리 여부 문의 팝업화면 -->
     <popupyn v-if="popupisopen"
      :title="popupTitle"
      :message="popupMsg"
      @yesClick="yesClick"
      @noClick="noClick">
    </popupyn>

		<div class="stc_off">
			<div class="stc_off_search">
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
						<option v-for="(d, i) in options" :key="i" :value="d.id">{{ d.id }}</option>
					</select>
				</div>
				<div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px', display:'inline-block', 'text-align':'right'}">SC Type
					</span>
					<label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="SC Type" aria-label="SC Type" aria-describedby="basic-addon1"
							:style="{'text-align':'left'}">
							{{lblSCType}}
					</label>
				</div>
				<div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
					<span class="input-group-text btn-sm" id="basic-addon1"
						:style="{width:'80px'}"
					>Row No</span>
					<input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Row No" aria-label="Row No" aria-describedby="basic-addon1"
						id="rowno"
						ref="rowno"
						@keyup.enter ='keyupenter'
						v-model="req_param.rowno">
				</div>
			</div>
			<div class="stc_off_grid1"
				:style="{
					'height': `calc(${window_height - 109 - 98 - 30 - 123 + hoffset}px)`
          //'height': `300px`
				}"
			>
				<ag-grid-vue
					id="agGrid1"
					class="ag-theme-balham"
					headerHeight='35'
					style="width: 600px; height:100%"
					:rowData="recvData.value"
					:gridOptions="gridOptions"
					allow_unsafe_jscode="True"
					>
				</ag-grid-vue>
			</div>

			<!-- 전송 현황 -->
      <div v-if="isTransfer" class='stc-send-box'>
        <div class='stc-send-box-1'>
          <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
            <span class="input-group-text btn-sm" id="basic-addon1"
              :style="{width:'70px', display:'inline-block', 'text-align':'right'}">전체건수
            </span>
            <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Total Count"
                aria-label="Total Count" aria-describedby="basic-addon1"
                :style="{'text-align':'left'}">
                {{lblTotCnt}}
            </label>
            <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 0px 0px 5px', width:'70px', height:'36px'}"
            @click='sendcloseClick'>닫기</button>
          </div>
          <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
            <span class="input-group-text btn-sm" id="basic-addon1"
              :style="{width:'70px', display:'inline-block', 'text-align':'right'}">전송건수
            </span>
            <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Transfer Count"
                aria-label="Transfer Count" aria-describedby="basic-addon1"
                :style="{'text-align':'left'}">
                {{lblSendCnt}}
            </label>
            <span class="input-group-text btn-sm" id="basic-addon1"
              :style="{width:'70px', display:'inline-block', 'text-align':'right'}">에러건수
            </span>
            <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Error Count"
                aria-label="Error Count" aria-describedby="basic-addon1"
                :style="{'text-align':'left'}">
                {{lblErrCnt}}
            </label>
          </div>
        </div>
      </div>

			<!-- radio 버튼 -->
			<div v-if="isPlant" class="input-group mb-0" :style="{ margin:'10px 0px 0px 10px'}">
				<input type="radio" id="box" value="box" v-model="radioValues" @change="radioChange">
				<label class="form-check-label" for="box"
					:style="{ margin:'-2px 0px 0px 5px', color:'rgb(34, 33, 33)', 'font-size':'14px'}">
					박스바코드 스캔
				</label>
				<input type="radio" id="bundle" value="bundle" v-model="radioValues" @change="radioChange" :style="{ margin:'0px 0px 0px 10px'}">
				<label class="form-check-label" for="bundle"
					:style="{ margin:'-2px 0px 0px 5px', color:'rgb(34, 33, 33)', 'font-size':'14px'}">
					{{"밴들바코드 스캔"}}
				</label>
			</div>

			<div class= "stc_off_save">
				<div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px', 'z-index':'1'}">
					<input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan barcode" aria-label="Scan barcode" aria-describedby="basic-addon1"
						id="scan"
						ref="scan"
						@keyup.enter='keyupenter'
						@focus='fn_SelectAll'
						data-ref="InputContent" inputmode="none"
						v-model="req_param.scan">
          <span class="input-group-text btn-sm" id="basic-addon1"
            :style="{width:'75px', display:'inline-block', 'text-align':'right'}">스캔건수
          </span>
          <span autocomplete="off" class="input-group-text btn-sm ellipsis" placeholder="Scan Count"
              aria-label="Scan Count" aria-describedby="basic-addon1"
              style="width:100px; text-align:left; background:white;">
              {{lblScanCnt}}
          </span>
        </div>

				<div class="input-group mb-3"
					:style="{height:'48px', margin:'-14px 0px 0px 0px', background:'gainsboro'}">
					<p :style="{margin:'2px 0px 0px 0px',
											background:'transparent',
											'font-size':'16px',
											'font-weight':'bold',
											color:msg_color}">
						Msg:{{msg}}
					</p>
				</div>
				<div align="right" :style="{height:'40px', margin:'-17px 0px 0px 0px'}">
					<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
					@click='sendClick'>Send</button>
					<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
					@click='deleteClick'>Delete</button>
					<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
					@click='scanClick'>Scan</button>
					<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 0px 0px 0px', width:'70px'}"
					@click='closeClick'>Close</button>
				</div>
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
  import { PlaySound } from '@/helper/util.js';
	import popupyn from '@/views/PopupYN.vue';
  import { searchSelectBox } from '@/helper/sql.js';

  export default {
    name:'stockcount_offline',
    components:{
      AgGridVue,
			popupyn,
    },
    setup(props, {emit}){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      let popupTitle = ref(null);
      let popupMsg = ref(null);
      let popupisopen = ref(false);

			let isPlant = ref(true);
      let isTransfer = ref(false);
      let hoffset = ref(0);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let recvData = reactive([]);
      let gridApi = ref(null);
      //focus 이동을 위한 변수
      let rowno = ref(null);
      let stor_loc = ref(null);
      let scan = ref(null);
      let strCalltype = ref(null);

      let strSilsano = ref(null);
			let lblSCType = ref(null);
      let lblScanCnt = ref(0);
      let lblTotCnt = ref(0);
      let lblSendCnt = ref(0);
      let lblErrCnt = ref(0);
			let radioValues = ref("bundle");
      //데이터 바인딩
      let req_param = reactive({stor_loc:"", rowno:"1", scan:"1220315100001"});
      let msg = ref(null);
			let msg_color = ref(null);
      let stcData = ([]);
      var dbname = "";

      let columnDefs= reactive([
				{headerName: '', field: 'sel', width: 4, cellStyle: {textAlign: "center"},
					headerCheckboxSelection: true, checkboxSelection: true, pinned: 'left'},
        {headerName: 'Barcode', field: 'barno', width: 100, cellStyle: {textAlign: "center"}, sortable: true, filter: true, pinned: 'left'},
        {headerName: 'S/L', field: 'lgort', width: 60, cellStyle: {textAlign: "center"}, sortable: true, filter: true},
        {headerName: 'Row No', field: 'rowno', width: 80, cellStyle: {textAlign: "center"}, sortable: true, filter: true},
        {headerName: 'Error Message', field: 'errmsg', width: 200, sortable: true},
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
            event.api.setRowData(recvData);
          }, 1000);
          event.api.sizeColumnsToFit();
          gridApi.value = event.api;
        },
        getRowHeight: function() {
          return 35;
        },
        onGridSizeChanged: function(event) {
          event.api.sizeColumnsToFit();
        },
      };

      onBeforeMount(()=>{
        console.log("[Stockcount_offline] = ", "onBeforeMount--");
        initSelectBox();
      });

      onMounted(() => {
        console.log("[Stockcount_offline] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
				var plantcd = getdata(store.state.auth.user[0].plantcd).substr(0,3);
				console.log("플랜트 3자리 : ", plantcd)
				if (plantcd == "K14" || plantcd == "K15"){
					isPlant.value = false;
          hoffset.value = 30; //true:0, false:30
          radioValues.value = 'bundle';
				} else {
					isPlant.value = true;
          hoffset.value = 0;  //true:0, false:30
          radioValues.value = 'box';
				}
				console.log("건장재 플랜트?", isPlant.value)
      });

      onUnmounted(() =>{
        console.log("[Stockcount_offline] = onUnmounted -- ");
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

      async function search_SCInfo() {
        let urlPost = url.value + '/dw/stc/pda/search';

        console.log("[req_param]", req_param);
        console.log("[stor_loc]", getdata(req_param.stor_loc));

        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        await $axios.post(urlPost, {
            i_lang: "KR",
            i_werks: getdata(store.state.auth.user[0].plantcd),
            i_userid: store.state.auth.user[0].userid,
            i_lgort:getdata(req_param.stor_loc),
        })
        .then((res) => {
          console.log("[response data]", res.data);

          if(res.data.length > 0) {
            if (res.data[0].code == "NG") {
              msg_color.value = "red";
              msg.value = res.data[0].message;
              lblSCType.value = "";
              req_param.rowno = "";
              stor_loc.value.focus();
            } else {
              msg_color.value = "blue";
              msg.value = "실사가 진행중입니다.";
              PlaySound("OK");

              strSilsano.value = res.data[0].stc_no;
              lblSCType.value = res.data[0].silsatype;
              console.log("실사번호 : ", strSilsano.value);

              createIndexedDB().then((bRtn) =>{
                console.log("응답:", bRtn);
                if(bRtn){
                  console.log("#################################");
                  console.log("bRtn = ", bRtn);
                  if(bRtn){

                    dbRowCount().then((rowCnt)=>{
                      console.log("rowCnt: -------------------- ", rowCnt);
                      if (rowCnt > 0) {
                        console.log("이전에 전송하지 않은 바코드 Data가 존재합니다.");
                        popupTitle.value ="Stock Count (Offline)";
                        popupMsg.value = "이전에 전송하지 않은 바코드 Data가 존재합니다. 데이터를 가져오시겠습니까? \n아니오를 선택하면 데이터는 삭제됩니다.";
                        strCalltype.value = "dbload";
                        popupisopen.value = true;
                      }
                      else{
                        console.log("Data가 존재하지 않습니다.");
                      }
                    });
                  }
                  console.log("#################################");
                }
              });


              // selectAllIndexedDB(); //모든 데이터를 조회한다.

            }
          }
          else {
            msg_color.value = "red";
            msg.value = "진행중인 실사가 없습니다.";
            lblSCType.value = "";
            req_param.rowno = "";
            stor_loc.value.focus();
          }
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }

			function radioChange(){
				scan.value.focus();
				scan.value.select();
			}

      function keyupenter(e){
        if (e.target.id == "stor_loc"){
          console.log("stor_loc : ", req_param.stor_loc)
          if (req_param.stor_loc != ""){
            // var bRtn1 = await search_SCInfo();
            search_SCInfo();
            rowno.value.focus();
            rowno.value.select();
          }
        }
        else if (e.target.id == "rowno"){
          // console.log("[Stockcount_offline/keyupenter] = rowno -- ");
          scan.value.focus();
					console.log("radioValues : ", radioValues.value)
        }
        else if (e.target.id == "scan"){
          console.log("scan: ",req_param.scan);
					console.log("radioValues: ",radioValues.value);
          var txtscan = document.getElementById("scan");
          txtscan.setAttribute('inputmode','none');
          console.log(txtscan.inputMode);

					var strBar = req_param.scan;
					console.log("바코드 첫번재 숫자: ", strBar.substr(0,1))

					if (req_param.stor_loc == ""){
						alert('저장위치를 먼저 선택하세요.')
						return;
					}

					if (strBar.length != 13){
						alert('유효하지 않은 바코드번호입니다.')
						return;
					}

					if (strBar.substr(0,1) == "9") {
						if (radioValues.value != "bundle"){
							alert('밴들바코드를 스캔하려면 "밴들바코드 스캔"을 선택하세요')
							return;
						}
					} else if (strBar.substr(0,1) == "1") {
						if (radioValues.value != "box"){
							alert('박스바코드를 스캔하려면 "박스바코드 스캔"을 선택하세요')
							return;
						}
					}

					var isfind = false;
					gridApi.value.forEachNode( (node) => {
						console.log("[node.getdata]", node.rowIndex, " : ", node.data.barno);
						if (node.data.barno == strBar) {
							if (node.data.rowno == req_param.rowno) {
								alert('이미 스캔한 바코드입니다.')
								// return;
								isfind = true;
							}
						}
					});

					if (isfind == false) {
						//그리드에 데이터 추가
						var newData = {
							barno:req_param.scan,
							lgort:getdata(req_param.stor_loc),
							rowno:req_param.rowno
						};
						// 맨밑에 추가
						// this.gridOptions.api.updateRowData({add: [newData]});

						// 그리드 특정위치에 추가
						gridApi.value.updateRowData({add:[newData], addIndex:0});

            // exportTextFile();  //텍스트 파일로 저장
            writeIndexedDB();

						scan.value.select();
						msg_color.value = "blue";
						msg.value = "스캔한 바코드가 추가되었습니다.";
            lblScanCnt.value += 1;
					}
        }

        // if(e.which == 13){
        //   console.log(text)
        // }
      }

      function selectBoundIndexedDB(){
        var request = indexedDB.open(dbname);

        request.onerror = function(event){
          alert( event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['stc']);

          transaction.oncomplete = function(){
            console.log("transaction done");
            gridApi.value.setRowData(recvData);
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }

          //변수Clear
          recvData.splice(0, recvData.length);

          var objectStore = transaction.objectStore('stc');
          var singleKeyRange = IDBKeyRange.only("2202001");

          // // Match anything past "Bill", including "Bill"
          // var lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");
          // // Match anything past "Bill", but don't include "Bill"
          // var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);
          // // Match anything up to, but not including, "Donna"
          // var upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);
          // // Match anything between "Bill" and "Donna", but not including "Donna"
          // var boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);

          var index = objectStore.index("stcno");
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
        var request = indexedDB.open(dbname);

        request.onerror = function(event){
          alert( event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['stc']);

          transaction.oncomplete = function(){
            console.log("transaction done");
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }
          var objectStore = transaction.objectStore('stc');

          // var request = objectStore.get(strSilsano.value);
          var request = objectStore.get("2202001");
          request.onerror = function(){
            console.log("select all fail");
          }

          request.onsuccess = function(event){
            if(event.target.result == undefined){
              alert("Not Exists");
            }
            else{
              // alert(JSON.stringify(event.target.result));
              alert("test")
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

      function dbRowCount(){
        return new Promise((bRtn) => {
          var request = indexedDB.open(dbname);

          request.onerror = function(event){
            alert( event.traget.errorCode);
            bRtn(0);
          }
          request.onsuccess = function(event){
            var db = event.target.result;
            var transaction = db.transaction(['stc'], "readonly");
            var objectStore = transaction.objectStore('stc');
            var countRequest = objectStore.count();

            countRequest.onsuccess = function() {
              console.log("rowCount:", countRequest.result);
              if (countRequest.result >= 0){
                console.log("111");
                bRtn(countRequest.result);
              }
            }
            countRequest.onerror = function() {
              console.log("rowCount: bb=", countRequest.result);
              bRtn(0);
            }
          }
        });
      }

      function selectAllIndexedDB(){
        var request = indexedDB.open(dbname);

        request.onerror = function(event){
          alert( event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['stc']);

          transaction.oncomplete = function(){
            console.log("transaction done");
            gridApi.value.setRowData(recvData);
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }

          //변수Clear
          recvData.splice(0, recvData.length);

          var objectStore = transaction.objectStore('stc');
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

      function writeIndexedDB(){
        var request = indexedDB.open(dbname);
        stcData.splice(0,stcData.length);
        request.onerror = function(event){
          alert('Database error: ' + event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['stc'], 'readwrite');

          transaction.oncomplete = function(){
            console.log("transaction done");
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }

          var objectStore = transaction.objectStore('stc');

          stcData.push({stcno:strSilsano.value,
                       werks:getdata(store.state.auth.user[0].plantcd),
                       lgort:getdata(req_param.stor_loc),
                       rowno:req_param.rowno,
                       barno:req_param.scan,
                       userid:store.state.auth.user[0].userid});
          console.log("stcData: ", stcData);

          for( var  stc_off of stcData){
            // var request = objectStore.put({userid:bar.userid, value: strData});
            var request = objectStore.add(stc_off);
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

      async function createIndexedDB(){
        return new Promise((bRtn) => {
          if(!window.indexedDB){
            alert("browser doesn't support IndexedDB");
            bRtn(false);
          }
          else{
            dbname = 'stcDB_' + strSilsano.value;
            console.log("dbname: ", dbname, strSilsano.value);
            let version = 1;
            // var request = await fetch(indexedDB.open(dbname, version));
            let request = indexedDB.open(dbname, version);

            console.log("request start", request);
            request.onupgradeneeded = function(event){
              let db = event.target.result;
              let objectStore = db.createObjectStore('stc', {keyPath:['stcno','rowno','barno']});
              objectStore.createIndex("werks", "werks", { unique: false });
              objectStore.createIndex("lgort", "lgort", { unique: false });
              objectStore.createIndex("userid", "userid", { unique: false });
            }

            request.onerror = function(event){
              alert(event);
              bRtn(false);
            }
            request.onsuccess = function(event){
              console.log("success == ", event);
              bRtn(true);
            }
          }
        });
      }

      async function deleteAllIndexedDB(){
        return new Promise((bRtn) => {
          var request = indexedDB.open(dbname);

          request.onerror = function(event){
            alert( event.traget.errorCode);
            bRtn(false);
          }

          request.onsuccess = function(event){
            var db = event.target.result;
            var transaction = db.transaction(['stc'], "readwrite");

            transaction.oncomplete = function(){
              console.log("deleteAllIndexedDB transaction done");
            }
            transaction.onerror = function(){
              console.log("deleteAllIndexedDB transaction fail");
              bRtn(false);
            }

            var objectStore = transaction.objectStore('stc');
            var request = objectStore.clear();
            request.onsuccess = function(){
              console.log("Success Delete All");
              bRtn(true);
            }
          }
        });
      }

      function deleteIndexedDB(delstcno, delrowno, delbarno){
        console.log("delete: ", delstcno, delrowno, delbarno);
        var request = indexedDB.open(dbname);

        request.onerror = function(event){
          alert( event.traget.errorCode);
        }

        request.onsuccess = function(event){
          var db = event.target.result;
          var transaction = db.transaction(['stc'], "readwrite");

          transaction.oncomplete = function(){
            console.log("transaction done");
          }
          transaction.onerror = function(){
            console.log("transaction fail");
          }

          var objectStore = transaction.objectStore('stc');
          var request = objectStore.delete([delstcno, delrowno, delbarno]);
          request.onsuccess = function(event){
            console.log(event.target.result);
          }
        }
      }

      // function exportTextFile() {
      //   // const text = document.getElementById('text-data').value;
      //   const text = "텍스트 저장 테스트입니다.\n2번째 줄입니다.";
      //   // 저장하고자하는 파일명
      //   const filename = '텍스트파일명';
      //   const element = document.createElement('a');
      //   element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      //   element.setAttribute('download', filename);
      //   document.body.appendChild(element);
      //   element.click();
      // }

      // function importTextFile() {
      //   const input = document.createElement('input');
      //   input.type = 'file';
      //   input.accept = 'text/plain'; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
      //   // this 접근을 위해 선언 필요
      //   // const self = this;
      //   input.onchange = function () {
      //     const file = new FileReader();
      //     file.onload = () => {
      //       // document.getElementById('text-data').textContent = file.result;
      //       // self.$data.textData = file.result;
      //       var textData = file.result;
      //       console.log("text file : ",textData)
      //     };
      //     file.readAsText(this.files[0]);
      //     // console.log("text file : ",self.$data.textData)
      //   };
      //   input.click();
      //   // console.log("text file : ",self.$data.textData)
      // }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }

      function sendcloseClick(){
        hoffset.value += 85;
        isTransfer.value = false;
      }

      function scanClick() {
        console.log(req_param.scan);
        var txtscan = document.getElementById("scan");
        txtscan.setAttribute('inputmode','numeric');
        console.log(txtscan.inputMode);

        scan.value.focus();
      }

      function sendClick(){
        popupTitle.value ="Stock Count (Offline)";
        popupMsg.value = "전송하시겠습니까?";
        strCalltype.value = "send";
        popupisopen.value = true;
      }

      function closeClick(){
        popupTitle.value ="Stock Count (Offline)";
        // popupMsg.value = "종료하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.";
        popupMsg.value = "종료하시겠습니까?";
        strCalltype.value = "close";
        popupisopen.value = true;
      }

      function deleteClick(){
        popupTitle.value ="Stock Count (Offline)";
        popupMsg.value = "선택한 바코드를 삭제하시겠습니까?";
        strCalltype.value = "delete";
        popupisopen.value = true;
      }

      async function sendData() {
        var rowCnt = gridApi.value.getDisplayedRowCount();
        console.log("전송 popup: ", isTransfer.value);
        if (!isTransfer.value) {  //전송결과 조회 box를 처음 화면에 불러올때만 그리드 높이 조정. 
          hoffset.value -= 85;
        }
        isTransfer.value = true;
        // lblTotCnt.value = lblScanCnt.value;
        lblTotCnt.value = rowCnt;
        lblErrCnt.value = 0;
        lblSendCnt.value = 0;

        // gridApi.value.forEachNode( (node) => {
        for (var i = gridApi.value.getDisplayedRowCount()-1; i>=0; i--) {
          const node = gridApi.value.getDisplayedRowAtIndex(i);
          console.log("[node.getdata]", node.rowIndex, " : ", node.data.barno, node.data.lgort, node.data.rowno);

          let urlPost = url.value + '/dw/stc/pda/save';

          //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
           await $axios.post(urlPost, {
          // $axios.post(urlPost, {
              i_lang: "KR",
              i_werks: getdata(store.state.auth.user[0].plantcd),
              i_userid: store.state.auth.user[0].userid,
              i_lgort: node.data.lgort,
              i_barno: node.data.barno,
              i_qty: "0",
              i_loc: node.data.rowno,
              i_packtype: "",
              i_area: "",
          })
          .then((res) => {
            console.log("[response data]", res.data);

            if(res.data.length > 0) {
              if (res.data[0].code == "NG") {
                node.setDataValue('errmsg', res.data[0].message);
                lblErrCnt.value += 1;
              } else if (res.data[0].code == "OK") {
                //그리드에서 삭제
                node.setDataValue('errmsg', res.data[0].message);
                // const rowNode = gridApi.value.getDisplayedRowAtIndex(0);
                node.setSelected(true);
                gridApi.value.updateRowData({remove: [node.data]});
                // deleteIndexedDB(node.data.barno);
                console.log(strSilsano.value, node.data.rowno, node.data.barno);
                deleteIndexedDB(strSilsano.value, node.data.rowno, node.data.barno);
              }
            }
            else {
              msg_color.value = "red";
              msg.value = "전송중 오류가 발생하였습니다.";
            }
            lblSendCnt.value += 1;
          }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
            //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
          .catch(err => {
            alert(err);
            console.error(err)
          })
        }

        return true;
      }

      async function yesClick() {
        popupisopen.value = false;
        if (strCalltype.value == "send"){
          var bRtn = await sendData();
          if (bRtn){
              msg_color.value = "blue";
              msg.value = "전송이 완료되었습니다. 처리결과를 확인하시기 바랍니다.";
          }
        }
        else if (strCalltype.value == "close"){
          dbRowCount().then((rowCnt)=>{
            console.log("rowCnt: -------------------- ", rowCnt);
            if (rowCnt > 0) {
              popupTitle.value ="Stock Count (Offline)";
              popupMsg.value = "전송하지 않은 데이터가 있습니다. 삭제하시겠습니까?";
              strCalltype.value = "close_delete";
              popupisopen.value = true;
              return;
            } else {
              emit("component_close", "stockcount_offline");
            }
          });
        }
        else if (strCalltype.value == "delete"){
          var selectedData = gridApi.value.getSelectedRows();
          console.log("[selected row]", selectedData);

          var removedRows = [];
          selectedData.forEach( function(selectedRow){
            removedRows.push(selectedRow);
            gridApi.value.updateRowData({remove: [selectedRow]});
            console.log("삭제대상 바코드: ", selectedRow.barno);
            deleteIndexedDB(strSilsano.value, selectedRow.rowno, selectedRow.barno);

            lblScanCnt.value -= 1;
          });
          console.log("[removed row]", removedRows);
        } else if (strCalltype.value == "dbload"){
          selectAllIndexedDB(); //로컬DB 모든 데이터를 조회하여 Grid에 불러온다.
          rowno.value.focus();
        } else if (strCalltype.value == "close_delete"){
          deleteAllIndexedDB().then(function(res){
          // deleteAllIndexedDB()..then(res => {
            console.log("rtn_close: ", res);
            emit("component_close", "stockcount_offline");
            rowno.value.focus();
          })
          // .catch(err => {
          .catch(function(err){
            alert(err);
            console.error(err)
          })
        }
      }

      function noClick(){
        popupisopen.value = false;
        console.log("noclick -> strCalltype", strCalltype.value);
        if (strCalltype.value == "close_delete"){
          console.log("close_delete -> delete no 선택");
          emit("component_close", "stockcount_offline");
        } else if (strCalltype.value == "dbload"){
          deleteAllIndexedDB().then(function(res){
          // deleteAllIndexedDB()..then(res => {
            console.log("rtn_close: ", res);
            gridApi.value.setRowData([]);
            rowno.value.focus();
          })
          // .catch(err => {
          .catch(function(err){
            alert(err);
            console.error(err)
          })         
        }
      }

      return {
        window_width,
        window_height,
        popupTitle,
        popupMsg,
        popupisopen,
        yesClick,
        noClick,
        isPlant,
        isTransfer,
        hoffset,
        stor_loc,
        rowno,
        scan,
        req_param,
        msg,
        msg_color,
        lblSCType,
        lblScanCnt,
        lblTotCnt,
        lblSendCnt,
        lblErrCnt,
				radioValues,
        scrollPostion : 0,
        defaultColGroupDef: null,
        columnTypes: null,
        options,
        recvData,
        gridOptions,
        getSelectedRows,
				radioChange,
        keyupenter,
        sendClick,
        scanClick,
				deleteClick,
        fn_SelectAll,
        closeClick,
        sendcloseClick,
        selectAllIndexedDB,
        selectIndexedDB,
        selectBoundIndexedDB,
      };
    },
  }
</script>
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";

	.stc_off {
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
  .stc_off_search {
    height : 98px;
    margin : 0px 5px 0px 5px;
  }
  .stc_off_grid1 {
    margin:0px 5px 0px 5px;
    overflow: auto;
  }
  .stc_off_save {
    // background: gainsboro;
    height : 123px;
    margin : 0px 5px 0px 5px;
    overflow-x: auto;
  }

  .stc-send-box {
    margin: 2px 2px 0px 2px;
    border: 2px solid $color-dw-green;
    border-radius: 6px;
  }
  .stc-send-box-1 {
    border: 1px solid gainsboro;
    border-radius: 6px;
    height: 75px;
    // border: 1px solid $color-dw-green;
    margin: 2px 2px 2px 2px;
    padding: 2px 2px 2px 2px;
  }
</style>