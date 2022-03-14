<template>
	<div class="pop-up-window-main">
    <!-- Send버튼 클릭후 입력한 박스수량보다 스캔수량이 적을 경우 처리 여부 문의 팝업화면 / 초기화 및 닫기 선택시 문의 -->
     <popupyn v-if="popupisopen"
      :title="popupTitle"
      :message="popupMsg"
      @yesClick="yesClick"
      @noClick="popupisopen=false">
    </popupyn>

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
            {{lblScanCnt}}
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
          @keyup.enter='keyupenter'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="none"
          v-model="req_param.txtScan">
      </div>      
      <div class="input-group mb-3"
        :style="{height:'48px', margin:'-14px 0px 0px 0px', background:'gainsboro'}">
        <p :style="{margin:'2px 5px 0px 5px',
                    'text-align':'left',
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
  import $axios from 'axios';
  import { reactive, ref, onMounted, onUnmounted } from 'vue'
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import {AgGridVue} from 'ag-grid-vue3'
  import { useStore } from 'vuex';
  import { formatDate } from '@/helper/filter.js';
  import { PlaySound } from '@/helper/util.js';
  import popupyn from '@/views/PopupYN.vue';

export default {
  name:'popupautolabeller',
  props:['strPO', 'date_hdf', 'date_fmfm', 'date_prod', 'strBox', 'strLotno'],
  components:{
    AgGridVue,
    popupyn,
  },

  setup(props, {emit}){
    let url = ref(process.env.VUE_APP_SERVER_URL);
    let window_width = ref(window.innerWidth);
    let window_height = ref(window.innerHeight);

    const store = useStore();	//스토어호출

    let popupTitle = ref(null);
    let popupMsg = ref(null);
    let popupisopen = ref(false);

    //focus 이동을 위한 변수
    let scan = ref(null);
    // let scan = ref("1220310100001");
    let strCalltype = ref(null);

    //데이터 바인딩
    let req_param = reactive({txtScan:"1220310100001"});
    // let req_param = reactive({txtScan:""});
    let msg = ref(null);
    let msg_color = ref(null);

    let strPO = ref(props.strPO);
    let date_hdf = ref(formatDate(props.date_hdf, "YYYYMMDD"));
    let date_fmfm = ref(formatDate(props.date_fmfm, "YYYYMMDD"));
    let date_prod = ref(formatDate(props.date_prod, "YYYYMMDD"));
    let strBox = ref(props.strBox);
    let strLotno = ref(props.strLotno);
    var bakLotno = strLotno.value; 
    let lblLotno = ref(strLotno);
    let lblScanCnt = ref("0 / "+strBox.value+" Box");
    let lblGrpbarno = ref(null);
    let strScanCnt = ref(0);

    console.log("Setup - parameter  : ",strPO.value, date_hdf.value, date_fmfm.value, date_prod.value, strBox.value, strLotno.value);
    console.log("lblLotno/lblScanCnt/lblGrpbarno", lblLotno.value, lblScanCnt, lblGrpbarno.value)

    let options = reactive([]);

    let recvData = reactive([]);
    let gridApi = ref(null);
    let columnApi = ref(null);

    let columnDefs= reactive([
      {headerName: '', field: 'sel', width: 10, cellStyle: {textAlign: "center"}, hide: true,
        headerCheckboxSelection: true, checkboxSelection: true},
      //행번호
      {headerName: '번호', field: 'seq', width: 10, cellStyle: {textAlign: "center"}, sortable: true, valueGetter: (params) => { return params.node.rowIndex + 1 } },  
      {headerName: '바코드', field: 'barno', width: 20, cellStyle: {textAlign: "center"}, sortable: true},
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
      console.log("scan screen");

      scan.value.focus();
      // req_param.txtScan = "1220310100001";
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

    function keyupenter(e){
      if (e.target.id == "scan"){
        console.log("scan: ",req_param.txtScan);
        var tmpscan = document.getElementById("scan");
        tmpscan.setAttribute('inputmode','none');
        console.log(tmpscan.inputMode);

        if (strScanCnt.value >= strBox.value) {
          alert('스캔수량이 다 찼습니다.')
          return;
        }

        var strBar = req_param.txtScan;
        console.log("바코드 첫번재 숫자: ", strBar.substr(0,1))

        if (strBar.length != 13){
          alert('유효하지 않은 바코드번호입니다.')
          return;
        }

        if (strBar.substr(0,1) != "1") {
          alert('박스바코드를 스캔하세요')
          return;
        }

        var isfind = false;

        if (strScanCnt.value == 0) {
          lblGrpbarno.value = "9" + strBar.substr(1,12)
        }
        else {
          //중복 스캔 체크
          gridApi.value.forEachNode( (node) => {
            console.log("[node.getdata]", node.rowIndex, " : ", node.data.barno);
            if (node.data.barno == strBar) {
              alert('이미 스캔한 바코드입니다.')
              // return;
              isfind = true;
            }
          });
        }

        if (isfind == false) {
          //그리드에 데이터 추가
          var newData = {
            barno:req_param.txtScan,
          };
          // 맨밑에 추가
          // this.gridOptions.api.updateRowData({add: [newData]});

          // 그리드 특정위치에 추가 
          gridApi.value.updateRowData({add:[newData], addIndex:0});

          // scan.value.select();
          // req_param.txtScan = "";
          msg_color.value = "blue";
          msg.value = "스캔한 바코드가 추가되었습니다.";
          strScanCnt.value += 1;
          lblScanCnt.value = strScanCnt.value + " / " + strBox.value + " Box";
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

    function enclotnoClick(){
      var tmpLotno = Number(lblLotno.value.substr(1,lblLotno.value.length-1)) + 1;  
      // 999인 경우 처리확인 필요

      console.log("lblLono/tmpLotno ", lblLotno.value, lblLotno.value.length, tmpLotno);
      lblLotno.value = lblLotno.value.substr(0,1) + tmpLotno;
    }

    function scanClick() {
      var tmpscan = document.getElementById("scan");
      tmpscan.setAttribute('inputmode','numeric');
      console.log(tmpscan.inputMode);

      // req_param.txtScan = "";
      req_param.txtScan = "1220310100001";
      scan.value.focus();
      // scan.value.select();
    }

    function sendClick(){
      if (strScanCnt.value == 0) {    //스캔수량이 0이면 전송하지 않는다.
        alert("Please scan barcode first");
        return;
      } else if (strScanCnt.value < strBox.value) { //스캔수량이 입력한 박스수보다 작으면 전송여부 확인후 Yes선택시에만 전송      
        popupMsg.value = "스캔수량이 입력한 박스수량보다 적습니다. \n이대로 전송하시겠습니까?";
      } else {
        popupMsg.value = "전송하시겠습니까?";
      }
      popupTitle.value ="Autolabeller Production Result";
      strCalltype.value = "send";
      popupisopen.value = true;
    }
      
    function clearClick(){
      popupTitle.value ="Autolabeller Production Result";
      popupMsg.value = "모든 데이터를 초기화하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.";
      strCalltype.value = "clear";
      popupisopen.value = true;
    }

    function autocloseClick(){
      popupTitle.value ="Autolabeller Production Result";
      popupMsg.value = "종료하시겠습니까? \n전송하지 않은 데이터는 삭제됩니다.";
      strCalltype.value = "close";
      popupisopen.value = true;
    }

    function clearData(){
      console.log("strLotno: ", strLotno.value, bakLotno);
      // lblLotno.value = strLotno.value;   //동작 안된다.
      lblLotno.value = bakLotno;
      strScanCnt.value = 0;
      lblScanCnt.value = "0 / " + strBox.value + " Box";
      lblGrpbarno.value = "";
      // req_param.txtScan = "";
      req_param.txtScan = "1220310100001";
      msg.value = "";

      //grid clear
      gridApi.value.setRowData([]);

      scan.value.focus();
    }

    function selectAllClick(){
      gridApi.value.selectAll();
      // gridApi.value.deselectAll();
    }

    async function sendData() {
      var rtn = false;
      var barlist = "";
      //그리드의 마지막 row부터 전송하기 위하여 forEachNode를 사용하지 않는다.
      // gridApi.value.forEachNode( (node) => {
      for (var i = gridApi.value.getDisplayedRowCount()-1; i>=0; i--) {
        const node = gridApi.value.getDisplayedRowAtIndex(i);
        if (i==0) {  //마지막 데이터이면 구분자(콤마)를 넣지 않는다.
          barlist = barlist + node.data.barno
        } else {
          barlist = barlist + node.data.barno + ",";
        }
      }
      console.log("barlist: ", barlist);
      // console.log("Setup - parameter  : ",strPO.value, date_hdf.value, date_fmfm.value, date_prod.value, strBox.value, strLotno.value);
      // console.log("lblLotno/lblScanCnt/lblGrpbarno", lblLotno.value, lblScanCnt, lblGrpbarno.value)
      
      let urlPost = url.value + '/dw/autolabeller/pda/save';

      //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
      // $axios.post(urlPost, {
      await $axios.post(urlPost, {
          i_lang: "KR",
          // i_werks: getdata(store.state.auth.user[0].plantcd),
          i_werks: "K143",    //test를 위해 K143으로 임시고정.
          i_userid: store.state.auth.user[0].userid,
          i_ord_no: strPO.value,
          i_grpbarno: lblGrpbarno.value,
          i_date_hdf: date_hdf.value,
          i_date_fmfm: date_fmfm.value,
          i_date_prod: date_prod.value,
          i_lotno: lblLotno.value,
          i_barno: barlist,
          // i_device: "",
          // i_ipaddress: "",
          // i_model: "",
          // i_osversion: "",
      })
      .then((res) => {
        console.log("[response data]", res.data);

        if(res.data.length > 0) {
          if (res.data[0].code == "NG") {
            msg_color.value = "red";
            msg.value = res.data[0].message;
            rtn = false;
          } else if (res.data[0].code == "OK") {
            clearData();
            msg_color.value = "blue";
            msg.value = res.data[0].message;
            PlaySound("OK");
            rtn = true;
          }
        }
        scan.value.focus();
      }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
        //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
      .catch(err => {
        alert(err);
        console.error(err)
        rtn = false;
      })

      return rtn;
    }

    function noClick(){
      popupisopen.value = false;
    }

    async function yesClick() {
      popupisopen.value = false;
      if (strCalltype.value == "send"){
        //여기서는 전송후 처리할게 없으므로 async 전송이 필요없으나 그냥 async로 처리함.
        var bRtn = await sendData();
        if (bRtn){
          console.log("처리완료!!");
        }
      }
      else if (strCalltype.value == "close"){
        emit("autocloseClick");
      }
      else if (strCalltype.value == "clear"){
        clearData();
      }
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
      popupTitle,
      popupMsg,
      popupisopen,
      yesClick,
      noClick,      
      lblLotno,
      lblScanCnt,
      lblGrpbarno,
      scan,
      req_param,
      msg,
      msg_color,
      options,
      recvData,
      gridOptions,
      getSelectedRows,
      autocloseClick,
      selectAllClick,
      keyupenter,
      fn_SelectAll,
      scanClick,
      sendClick,
      clearClick,
      enclotnoClick,
    }
  },
}
</script>
<style lang="scss">
</style>
