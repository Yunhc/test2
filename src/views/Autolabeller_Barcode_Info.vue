<template>

  <div class="window-main">

    <!-- 박스바코드 정보 조회 화면 팝업 -->
     <popupBarcode v-if="popupisopen"
      :sBarno="lblBarNo"
      @closeClick="popupcloseClick">
    </popupBarcode>

		<div class="window-box-2px-green"
      :style="{
        //109:헤더(위 3줄 메뉴까지) - 34(바코드스캔) - 48(하단 메시지) - 40 (하단버튼) - 5 (행간여백)
        'height': `calc(${(window_height - 109 - 34 - 40 - 5)*9.8/13}px)`
      }"
    >
      <!-- 바코드 번호 -->
      <div class="input-group mb-3" :style="{ margin:'5px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">바코드번호
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Barcode"
            aria-label="Barcode" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblBarNo}}
        </label>
      </div>

      <!-- 재고상태 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">재고상태
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Status"
            aria-label="Status" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblStatus}}
        </label>
      </div>

      <!-- 생산오더 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">생산오더
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="PO"
            aria-label="PO" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblPO}}
        </label>
      </div>

      <!-- 자재코드 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">자재코드
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Material"
            aria-label="Material" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblMatnr}}
        </label>
      </div>

      <!-- 자재내역 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <label type="label" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Material Description"
            aria-label="Material Description" aria-describedby="basic-addon1"
            :style="{color:'grey', margin:'0px 20px 0px 0px', display:'inline-block', 'text-align':'left'}">
            {{lblMaktx}}
        </label>
      </div>

      <!-- 플랜트 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">플랜트
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Plant"
            aria-label="Plant" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblPlant}}
        </label>
      </div>

      <!-- 저장위치 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">저장위치
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Storage Location"
            aria-label="Storage Location" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblStorLoc}}
        </label>
      </div>

      <!-- 수량 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">수량
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Qty"
            aria-label="Tot Prod Qty" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblQty}}
        </label>
      </div>

      <!-- Lot No -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">Lot No
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Lot No"
            aria-label="Lot No" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblLotNo}}
        </label>
      </div>

      <!-- 생산일자 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">생산일자
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Production Date"
            aria-label="Production Date" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblProdDate}}
        </label>
      </div>
    </div>


		<div class="window-box-2px-green"
      :style="{
        //109:헤더(위 3줄 메뉴까지) - 34(바코드스캔) - 48(하단 메시지) - 40 (하단버튼) - 5 (행간여백)
        'height': `calc(${(window_height - 109 - 34 - 40 - 5)*3.2/13}px)`
      }"
    >  
      <!-- 박스 수량 -->
      <div class="input-group mb-3" :style="{ margin:'5px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">박스수량
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Box Qty"
            aria-label="Box Qty" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblBoxCnt}}
        </label>
        <label type="text" autocomplete="off" class="input-group-text btn-sm" placeholder="Box"
            aria-label="Box" aria-describedby="basic-addon1"
            :style="{border: 'none', margin:'0px 20px 0px -15px', background:'white', width: '60px', 'text-align':'left'}">Box
        </label>
      </div>

      <!-- 박스당 PC 수량 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">박스당 수량
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Box PC Qty"
            aria-label="Box PC Qty" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblBoxQty}}
        </label>
        <label type="text" autocomplete="off" class="input-group-text btn-sm" placeholder="PC"
            aria-label="PC" aria-describedby="basic-addon1"
            :style="{border: 'none', margin:'0px 20px 0px -15px', background:'white', width: '60px', 'text-align':'left'}">PC
        </label>
      </div>

      <!-- 그룹바코드 번호 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'120px', display:'inline-block', 'text-align':'right'}">그룹바코드 번호
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Group Barcode"
            aria-label="Group Barcode" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblGrpBarNo}}
        </label>
      </div>
    </div>

    <!-- 바코드 스캔 -->
    <div class= "window-save-1">
      <div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px'}">
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan barcode" aria-label="바코드 스캔" aria-describedby="basic-addon1"
          id="scan"
          ref="scan"
          @keyup.enter='keyupenter'
          @click='scanClick'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="none"
          v-model="req_param.txtScan">
      </div>

      <!-- 하단 버튼 -->
      <div align="right" :style="{height:'40px', margin:'-17px 0px 0px 0px'}">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'120px'}"
        @click='sendClick'
        v-bind:disabled="strSubFlag === 'Y' ? false : true">
        낱바코드 보기</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='clearClick'>초기화</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='closeClick'>닫기</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $axios from 'axios';
  import { reactive, ref, onBeforeMount, onMounted, onUnmounted } from 'vue'
  import { useStore } from 'vuex';
  import { getdata } from '@/helper/filter.js';
  import { PlaySound } from '@/helper/util.js';
  import popupBarcode from '@/views/Popup_BoxBarcode.vue';
  // import { searchSelectBox } from '@/helper/sql.js';

  export default {
    name:'autolabeller_barcode_info',
    components:{
      popupBarcode,
    },

    setup(props,{emit}){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      let popupisopen = ref(false);

      const store = useStore();	//스토어호출

      let recvData = reactive([]);
      let lblBarNo = ref(null);
      let lblStatus = ref(null);
      let lblPO = ref(null);
      let lblMatnr = ref(null);
      let lblMaktx = ref(null);
      let lblPlant = ref(null);
      let lblStorLoc = ref(null);
      let lblQty = ref(null);
      let lblLotNo = ref(null);
      let lblProdDate = ref(null);
      let lblBoxCnt = ref(null);
      let lblBoxQty = ref(null);
      let lblGrpBarNo = ref(null);

      let strSubFlag = ref(null);

      //focus 이동을 위한 변수
      let scan = ref(null);

      //데이터 바인딩
      let req_param = reactive({txtScan:"9210505100114"});

      onBeforeMount(()=>{
        console.log("[Autolabeller Barcode Info] = ", "onBeforeMount--");
        lblMaktx.value = "자재 상세내역을 표시합니다."
      });

      onMounted(() => {
        console.log("[Autolabeller Barcode Info] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
        scan.value.focus();
      });

      onUnmounted(() =>{
        console.log("[Autolabeller Barcode Info] = onUnmounted -- ");
        window.removeEventListener('resize', handleResize);
      });

      function handleResize() {
        window_width.value = window.innerWidth;
        window_height.value = window.innerHeight;
      }

      function fn_Search(){
        // store.commit('loading/startLoading');
        let urlPost = url.value + '/dw/autolabeller/pda/barcode_search';

        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        $axios.post(urlPost, {
            i_lang: "KR",
            i_werks: getdata(store.state.auth.user[0].plantcd),
            i_userid: store.state.auth.user[0].userid,
            i_barno: req_param.txtScan,
            i_calltype: "",
        })
        .then((res) => {
          console.log("[response data]", res.data);
          if(res.data.length > 0) {
            lblBarNo.value = res.data[0].barno;
            lblStatus.value = res.data[0].status;
            if (res.data[0].aufnr == "" | res.data[0].aufnr == null){
              lblPO.value = res.data[0].plnum;  //계획오더 번호
            } else{
              lblPO.value = res.data[0].aufnr;  //생산오더 번호
            }
            lblMatnr.value = res.data[0].matnr;
            lblMaktx.value = res.data[0].maktx;
            lblPlant.value = res.data[0].werks;
            lblStorLoc.value = res.data[0].lgort;
            lblQty.value = res.data[0].qty;
            lblLotNo.value = res.data[0].lotno;
            lblProdDate.value = res.data[0].prodcldate;
            lblBoxCnt.value = res.data[0].boxcnt;
            lblBoxQty.value = res.data[0].boxtotcnt;
            lblGrpBarNo.value = res.data[0].grpbarno;
            strSubFlag.value = res.data[0].subflag;
            PlaySound("OK");
            scan.value.focus();
          }
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
        // store.commit('loading/endLoading');
      }

      function clearClick(){
        clearData();
      }

      function clearData(){
        req_param.txtScan = "9210505100114";
        lblBarNo.value = "";
        lblStatus.value = "";
        lblPO.value = "";
        lblMatnr.value = "";
        lblMaktx.value = "자재 상세내역을 표시합니다.";
        lblPlant.value = "";
        lblStorLoc.value = "";
        lblQty.value = "";
        lblLotNo.value = "";
        lblProdDate.value = "";
        lblBoxCnt.value = "";
        lblBoxQty.value = "";
        lblGrpBarNo.value = "";
        strSubFlag.value = "";
          
        scan.value.focus();
      }

      function closeClick(){
        emit("component_close", "autolabeller_barcode_info");
      }

      function popupcloseClick(){
        popupisopen.value=false;
        scan.value.focus();
      }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }

      function sendClick(){
        console.log("lblBarNo: ", lblBarNo.value);
        if (lblBarNo.value == "" | lblBarNo.value == null) {    //바코드를 스캔하지 않으면 전송하지 않는다.
          alert("바코드를 먼저 스캔하세요");
          scan.value.focus();
          return;
        }
        popupisopen.value = true;
      }

      function keyupenter(e){
        if (e.target.id == "scan"){
          console.log("scan: ",req_param.txtScan);
          var tmpscan = document.getElementById("scan");
          tmpscan.setAttribute('inputmode','none');
          console.log(tmpscan.inputMode);

          var strBar = req_param.txtScan;
          if (strBar.length != 13) {
            alert('유효하지 않은 바코드번호입니다.')
            return;
          }
          fn_Search();
        }

        // if(e.which == 13){
        //   console.log(text)
        // }
      }

      function scanClick() {
        var tmpscan = document.getElementById("scan");
        tmpscan.setAttribute('inputmode','numeric');
        console.log(tmpscan.inputMode);

        // req_param.txtScan = "";
        req_param.txtScan = "9210505100114";
        scan.value.focus();
        // scan.value.select();
      }

      return {
        window_width,
        window_height,
        popupisopen,
        lblBarNo,
        lblStatus,
        lblPO,
        lblMatnr,
        lblMaktx,
        lblPlant,
        lblStorLoc,
        lblQty,
        lblLotNo,
        lblProdDate,
        lblBoxCnt,
        lblBoxQty,
        lblGrpBarNo,
        strSubFlag,
        scan,   //scan.value.focus() 처리
        req_param,
        recvData,
        sendClick,
        scanClick,        
        clearClick,
        closeClick,
        popupcloseClick,
        fn_SelectAll,
        keyupenter,
      };
    },

  }
</script>
