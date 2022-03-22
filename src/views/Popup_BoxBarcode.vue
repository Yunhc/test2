<template>
	<div class="popup-black-bg">
		<div class="popup-white-bg">

      <div class="pop-up-window-header"
        align="center">
        <p :style="{padding:'4px 0px 0px 0px', 'text-align':'center'}">박스 바코드 리스트
        </p>
      </div>

      <div class="window-box-2px-green"
        :style="{
            //109:헤더(위 3줄 메뉴까지) - 28(팝업화면 헤더) - 40 (하단버튼) - 150 (기타여백)
            height: `calc(${window_height - 109 - 28 - 40 - 150}px)`}"
      >
        <div class="pop-up-window-grid-1"
          align="left"
          :style="{ margin:'2px',
            //109:헤더(위 3줄 메뉴까지) - 28(팝업화면 헤더) - 40 (하단버튼) - 160 (기타여백)
            height: `calc(${window_height - 109 - 28 - 40 - 160}px)`
          }"
        >
          <ag-grid-vue
            id="agGrid1"
            class="ag-theme-alpine"
            headerHeight='35'
            style="width: 540px; height:100%"
            :rowData="recvData.value"
            :gridOptions="gridOptions"
            allow_unsafe_jscode="True"
            >
          </ag-grid-vue>
        </div>
      </div>

			<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 0px 0px 0px', width:'70px'}"
				@click='closeClick'>닫기</button>
		</div>
	</div>
</template>
<script>
import $axios from 'axios';
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex';
import { getdata } from '@/helper/filter.js';
import { PlaySound } from '@/helper/util.js';
import {AgGridVue} from 'ag-grid-vue3'

export default {
  name:'popupBarcode',
  props:['sBarno'],
  components:{
    AgGridVue,
  },
  setup(props,{emit}){
    let url = ref(process.env.VUE_APP_SERVER_URL);
    let strBarno = ref(props.sBarno);

    let window_width = ref(window.innerWidth);
    let window_height = ref(window.innerHeight);

    const store = useStore();	//스토어호출

    // let msg = ref(null);
    // let msg_color = ref(null);

    let recvData = reactive([]);
    let gridApi = ref(null);
    let columnApi = ref(null);

    let columnDefs= reactive([
      {headerName: '번호', field: 'seq', width: 10, pinned: 'left', cellStyle: {textAlign: "center"}, sortable: true},  
      {headerName: '바코드', field: 'barno', width: 60, pinned: 'left', cellStyle: {textAlign: "center"}, sortable: true},
      {headerName: '수량', field: 'qty', width: 20, pinned: 'left', cellStyle: {textAlign: "center"}, sortable: true},
      {headerName: '생산일', field: 'incldate', width: 50, cellStyle: {textAlign: "center"}, sortable: true},
      {headerName: 'Lot번호', field: 'lotno', width: 50, cellStyle: {textAlign: "center"}, sortable: true},
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
        console.log("[Autolabeller Popup Box Barcode] = ", "onGridReady");
        // setTimeout(function () {
        //   event.api.setRowData(recvData);
        // }, 500);
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
      fn_POSearch();  
    });

    onUnmounted(() =>{
      console.log("[Autolabeller Production Result Barcode Scan] = onUnmounted -- ");
      window.removeEventListener('resize', handleResize);
    });

    function handleResize() {
      window_width.value = window.innerWidth;
      window_height.value = window.innerHeight;
      console.log("window_height: ", window_height.value);
    }

    function fn_POSearch(){
      let urlPost = url.value + '/dw/autolabeller/pda/barcode_search';

      console.log("barno: ", strBarno.value, props.sBarno);
      //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
      $axios.post(urlPost, {
          i_lang: "KR",
          i_werks: getdata(store.state.auth.user[0].plantcd),
          i_userid: store.state.auth.user[0].userid,
          // i_barno: "9210505100114",
          i_barno: strBarno.value,
          i_calltype: "BOX",
      })
      .then((res) => {
        console.log("[response data]", res.data);
        if(res.data.length > 0) {
          if (res.data[0].code == "NG") {
            alert("에러가 발생하였습니다. 다시 조회하여 주세요.");
          } else {
            PlaySound("OK");
            recvData.value = res.data;
            // console.log("recvData: ", recvData.value);
          }
        }
        else {
          alert("조회된 데이터가 없습니다.");
        }
      }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
        //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
      .catch(err => {
        alert(err);
        console.error(err)
      })
    }

    function closeClick(){
      emit("closeClick", "popupBarcode");
    }

    return{
      window_width,
      window_height,
      // options,
      recvData,
      gridOptions,
      closeClick
    }
  },
}
</script>
<style lang="scss">
  .popup-black-bg{
    width: 100%;
		height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
		padding: 20px;
    z-index: 100; //div를 최상위로 올린다.
  }
  .popup-white-bg{
    width: 90%;
    background: white;
    border-radius: 8px;
    padding: 20px;

    // position: absolute;
    position: fixed;
    // left: 50%;
    top: 55%;
    // top: 300px;
    transform: translate(-50%, -50%);
  }
</style>