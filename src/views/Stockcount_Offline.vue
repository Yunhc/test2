<template>
  <div class="pop-up-window-main">
    <!-- Send, Delete버튼 클릭후 처리 여부 문의 팝업화면 -->
     <popupyn v-if="popupisopen"
      :title="popupTitle"
      :message="popupMsg"
      @yesClick="yesClick"
      @noClick="popupisopen=false">
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
					'height': `calc(${window_height - 109 - 98 - 30 - 123}px)`
				}"
			>
				<ag-grid-vue
					id="agGrid1"
					class="ag-theme-balham"
					headerHeight='35'
					style="width: 450px; height:100%"
					:rowData="recvData.value"
					:gridOptions="gridOptions"
					allow_unsafe_jscode="True"
					>
				</ag-grid-vue>
			</div>

			<!-- radio 버튼 -->
			<div v-if="plant" class="input-group mb-0" :style="{ margin:'10px 0px 0px 10px'}">
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
				<div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px'}">
					<input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan barcode" aria-label="Scan barcode" aria-describedby="basic-addon1"
						id="scan"
						ref="scan"
						@keyup.enter='keyupenter'
						@focus='fn_SelectAll'
						data-ref="InputContent" inputmode="none"
						v-model="req_param.scan">
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

      // let popupTitle = ref(null);
      // let popupMsg = ref(null);
      // let popupisopen = ref(false);

			let plant = ref(false);
      const store = useStore();	//스토어호출
      let options = reactive([]);

      let recvData = reactive([]);
      let gridApi = ref(null);
      //focus 이동을 위한 변수
      let rowno = ref(null);
      let stor_loc = ref(null);
      let scan = ref(null);

			let lblSCType = ref(null);
			let radioValues = ref("bundle");
      //데이터 바인딩
      let req_param = reactive({stor_loc:"", rowno:"", scan:""});
      let msg = ref(null);
			let msg_color = ref(null);

      let columnDefs= reactive([
				{headerName: '', field: 'sel', width: 4, cellStyle: {textAlign: "center"},
					headerCheckboxSelection: true, checkboxSelection: true, pinned: 'left'},				
        {headerName: 'Barcode', field: 'barno', width: 100, cellStyle: {textAlign: "center"}, sortable: true, filter: true, pinned: 'left'},
        {headerName: 'S/L', field: 'lgort', width: 60, cellStyle: {textAlign: "center"}, sortable: true, filter: true},
        {headerName: 'Row No', field: 'rowno', width: 80, cellStyle: {textAlign: "center"}, sortable: true, filter: true},
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
				console.log("plant.substr(0,3) : ", plantcd)
				// if (plantcd == "K14" || plantcd == "K15"){
				if (plantcd != "K14" && plantcd != "K15"){
					plant = true;
				} else {
					plant = false;
				}
				console.log("건장재 플랜트?", plant)
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
				console.log("건장재 프랜트?? : ", plant);
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

              // recvData.value = res.data;
              // console.log("[PO_Search] -> recvData.length/recvData : ", recvData.value.length, "/", recvData);
              lblSCType.value = res.data[0].silsatype;

              // scan.value.focus();
              // scan.value.select();
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

						// 특정위치에 추가
						gridApi.value.updateRowData({add:[newData], addIndex:0});

						scan.value.select();
						msg_color.value = "blue";
						msg.value = "스캔한 바코드가 추가되었습니다.";
					}
        }

        // if(e.which == 13){
        //   console.log(text)
        // }
      }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }

      function scanClick() {
        console.log(req_param.scan);
        var txtscan = document.getElementById("scan");
        txtscan.setAttribute('inputmode','numeric');
        console.log(txtscan.inputMode);

        scan.value.focus();
      }

      function closeClick(){
        emit("component_close", "stockcount_offline");
      }

    function deleteClick(){
      var selectedData = gridApi.value.getSelectedRows();
      console.log("[selected row]", selectedData);

      var removedRows = [];
      selectedData.forEach( function(selectedRow){
        removedRows.push(selectedRow);
        gridApi.value.updateRowData({remove: [selectedRow]});
      });
      console.log("[removed row]", removedRows);      
    }

      return {
        window_width,
        window_height,
        stor_loc,
        rowno,
        scan,
        req_param,
        msg,
        msg_color,
        lblSCType,
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
        scanClick,
				deleteClick,
        fn_SelectAll,
        closeClick,
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
</style>