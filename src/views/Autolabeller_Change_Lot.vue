<template>

  <div class="window-main">

    <!-- 초기화 및 닫기 선택시 문의 팝업화면 -->
     <popupyn v-if="popupisopen"
      :title="popupTitle"
      :message="popupMsg"
      @yesClick="yesClick"
      @noClick="popupisopen=false">
    </popupyn>


		<div class="window-box-2px-green"
      :style="{
        //109:헤더(위 3줄 메뉴까지) - 34(바코드스캔) - 48(하단 메시지) - 40 (하단버튼) - 7 (행간여백)
        'height': `calc(${(window_height - 109 - 34 - 48 - 40 - 5)*2/3}px)`
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
            {{lblBarno}}
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
            {{lblLotno}}
        </label>
      </div>
    </div>



		<div class="window-box-2px-green"
      :style="{
        //109:헤더(위 3줄 메뉴까지) - 34(바코드스캔) - 48(하단 메시지) - 40 (하단버튼) - 5 (행간여백)
        'height': `calc(${(window_height - 109 - 34 - 48 - 40 - 5)/3}px)`
      }"
    >  
      <!-- 생산조 및 롯트번호 입력 -->
      <div class="input-group mb-3" :style="{ margin:'5px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}"
        >변경 Lot No</span>
        <select class="form-select btn-sm" aria-label="Default select example"
          id="cboShift"
          ref="cboShift"
          @change ='keyupenter'
          v-model="req_param.cboShift">
          <option disabled value="">생산조 선택</option>
          <option v-for="(d, i) in options" :key="i" :value="d.id">{{ d.id }}</option>
        </select>
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Lot No를 입력하세요."
            aria-label="Lot No" aria-describedby="basic-addon1"
            :style="{margin:'0px 20px 0px 5px', width: '20px', 'text-align':'left'}"
            id="txtLotno"
            ref="txtLotno"
            @keyup.enter='keyupenter'
            @focus='fn_SelectAll'
            data-ref="InputContent" inputmode="numeric"
            v-model="req_param.txtLotno">
      </div>

      <!-- 박스 수량 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">박스수량
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Box Qty"
            aria-label="Box Qty" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblBoxQty}}
        </label>
        <label type="text" autocomplete="off" class="input-group-text btn-sm" placeholder="Box"
            aria-label="Box" aria-describedby="basic-addon1"
            :style="{border: 'none', margin:'0px 20px 0px -15px', background:'white', width: '60px', 'text-align':'left'}">Box
        </label>
      </div>

      <!-- 박스당 수량 -->
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">박스당 수량
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Box PC Qty"
            aria-label="Box PC Qty" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 20px 0px 0px', 'text-align':'left'}">
            {{lblBoxQtyPC}}
        </label>
        <label type="text" autocomplete="off" class="input-group-text btn-sm" placeholder="PC"
            aria-label="PC" aria-describedby="basic-addon1"
            :style="{border: 'none', margin:'0px 20px 0px -15px', background:'white', width: '60px', 'text-align':'left'}">PC
        </label>
      </div>      
    </div>

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
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='sendClick'>변경</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='scanClick'>Scan</button>
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
  import popupyn from '@/views/PopupYN.vue';
  import { searchSelectBox } from '@/helper/sql.js';

  export default {
    name:'autolabeller_change_lot',
    components:{
      popupyn,
    },

    setup(props,{emit}){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      let popupTitle = ref(null);
      let popupMsg = ref(null);
      let popupisopen = ref(false);
      let strCalltype = ref(null);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let recvData = reactive([]);
      let lblBarno = ref(null);
      let lblPO = ref(null);
      let lblMatnr = ref(null);
      let lblMaktx = ref(null);
      let lblQty = ref(null);
      let lblLotno = ref(null);
      let lblBoxQty = ref(null);
      let lblBoxQtyPC = ref(null);

      //focus 이동을 위한 변수
      let scan = ref(null);
      let txtLotno = ref(null);
      let cboShift = ref(null);

      //데이터 바인딩
      let req_param = reactive({txtScan:"9220315100001", txtLotno:"", cboShift:""});
      let msg = ref(null);
      let msg_color = ref(null);

      onBeforeMount(()=>{
        console.log("[Autolabeller Change Lot] = ", "onBeforeMount--");
        initSelectBox();
        lblMaktx.value = "자재 상세내역을 표시합니다."
      });

      onMounted(() => {
        console.log("[Autolabeller Change Lot] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
        scan.value.focus();
      });

      onUnmounted(() =>{
        console.log("[Autolabeller Change Lot] = onUnmounted -- ");
        window.removeEventListener('resize', handleResize);
      });

      function handleResize() {
        window_width.value = window.innerWidth;
        window_height.value = window.innerHeight;
      }

      async function initSelectBox() {
        // options.push({id:"A", name:"A조"});
        // options.push({id:"B", name:"B조"});
        // options.push({id:"C", name:"C조"});
        // options.push({id:"D", name:"D조"});
        // options.push({id:"E", name:"E조"});

        let req_param = reactive(
          {	lang:"KR",
            userid:store.state.auth.user[0].userid,
            plantcd:getdata(store.state.auth.user[0].plantcd),
            type1:"SHIFT",
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
        console.log("[initSelectBox] = options data -- ", options);
      }

      function fn_Search(){
        // store.commit('loading/startLoading');
        let urlPost = url.value + '/dw/autolabeller/pda/change_lot';

        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        $axios.post(urlPost, {
            i_lang: "KR",
            // i_werks: getdata(store.state.auth.user[0].plantcd),
            i_werks: "K143",    //test를 위해 K143으로 임시고정.
            i_userid: store.state.auth.user[0].userid,
            i_barno: req_param.txtScan,
            i_lotno: req_param.txtLotno,
            i_calltype: "SEARCH",
        })
        .then((res) => {
          console.log("[response data]", res.data);
          if(res.data.length > 0) {
            if (res.data[0].code == "NG"){
              msg_color.value = "red";
              msg.value = res.data[0].message;
            } else{
              msg_color.value = "blue";
              msg.value = "OK";
              lblBarno.value = res.data[0].barno;
              lblPO.value = res.data[0].orderno;
              lblMatnr.value = res.data[0].matnr;
              lblMaktx.value = res.data[0].maktx;
              lblQty.value = res.data[0].qty;
              lblLotno.value = res.data[0].lotno;
              lblBoxQty.value = res.data[0].boxcnt;
              lblBoxQtyPC.value = res.data[0].boxtotcnt;
              msg_color.value = "blue";
              msg.value = "조회되었습니다.";              
              PlaySound("OK");
              txtLotno.value.focus();
            }
          }
          else {
            msg_color.value = "red";
            msg.value = "No Data";
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

      async function sendData() {
        var rtn = false;
        store.commit('loading/startLoading');
        let urlPost = url.value + '/dw/autolabeller/pda/change_lot';

        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        await $axios.post(urlPost, {
            i_lang: "KR",
            // i_werks: getdata(store.state.auth.user[0].plantcd),
            i_werks: "K143",    //test를 위해 K143으로 임시고정.
            i_userid: store.state.auth.user[0].userid,
            i_barno: lblBarno.value,
            i_lotno: req_param.cboShift+req_param.txtLotno,
            i_calltype: "SAVE",
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
        store.commit('loading/endLoading');
        return rtn;
      }

      function clearClick(){
        popupTitle.value ="Autolabeller Change Lot";
        popupMsg.value = "모든 데이터를 초기화하시겠습니까?";
        strCalltype.value = "clear";
        popupisopen.value = true;
      }

      function clearData(){
        req_param.txtScan = "9220315100001";
        lblBarno.value = "";
        lblPO.value = "";
        lblMatnr.value = "";
        lblMaktx.value = "자재 상세내역을 표시합니다.";
        lblQty.value = "";
        lblLotno.value = "";
        lblBoxQty.value = "";
        lblBoxQtyPC.value = "";
        req_param.txtLotno="";
        req_param.cboShift="";
        msg.value = "";
          
        scan.value.focus();
      }

      function closeClick(){
        popupTitle.value ="Autolabeller Change Lot";
        popupMsg.value = "종료하시겠습니까?";
        strCalltype.value = "close";
        popupisopen.value = true;
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
          emit("component_close", "autolabeller_change_lot");
        }
        else if (strCalltype.value == "clear"){
          clearData();
        }
      }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }

      function sendClick(){
        if (lblBarno.value == "" | lblBarno.value == null) {    //바코드를 스캔하지 않으면 전송하지 않는다.
          alert("Please scan barcode first");
          scan.value.focus();
          return;
        } else if (req_param.txtLotno == "" | req_param.txtLotno.length != 3){ // | req_param.txtLotno == null){
          alert("Please input 3 digit Lot No.");
          txtLotno.value.focus();
          return;
        } else if (req_param.cboShift == ""){ // | req_param.cboShift == null){
          alert("Please select shift.");
          cboShift.value.focus();
          return;
        }
        popupTitle.value ="Autolabeller Change Lot"; 
        popupMsg.value = "전송하시겠습니까?";
        strCalltype.value = "send";
        popupisopen.value = true;
      }

      function keyupenter(e){
        if (e.target.id == "scan"){
          console.log("scan: ",req_param.txtScan);
          var tmpscan = document.getElementById("scan");
          tmpscan.setAttribute('inputmode','none');
          console.log(tmpscan.inputMode);

          var strBar = req_param.txtScan;
          if (strBar.substr(0,1) != "9") {
            alert('밴들바코드를 스캔하세요')
            return;
          }
          fn_Search();
        } else if (e.target.id == "txtLotno"){
          cboShift.value.focus();
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
        req_param.txtScan = "9220315100001";
        scan.value.focus();
        // scan.value.select();
      }

      return {
        window_width,
        window_height,
        popupTitle,
        popupMsg,
        popupisopen,
        yesClick,
        noClick,
        lblBarno,
        lblPO,
        lblMatnr,
        lblMaktx,
        lblQty,
        lblLotno,
        lblBoxQty,
        lblBoxQtyPC,
        cboShift,
        txtLotno,
        scan,   //scan.value.focus() 처리
        req_param,
        msg,
        msg_color,
        options,
        recvData,
        sendClick,
        scanClick,
        clearClick,
        closeClick,
        fn_SelectAll,
        keyupenter,
      };
    },

  }
</script>
