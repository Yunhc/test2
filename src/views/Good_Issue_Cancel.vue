<template>
  <div class="window-main">
    <!-- Send버튼 클릭시 처리여부 문의 팝업화면 -->
     <popupyn v-if="popupisopen"
      :title="popupTitle"
      :message="popupMsg"
      @yesClick="yesClick"
      @noClick="popupisopen=false">
    </popupyn>

    <!-- 바코드 출고이력이 2건 이상이면 DO조회 팝업화면 -->
    <popupdosearch v-if="popupdoisopen"
      :tmpBarno="tmpBarno"
      @DOselectClick="DOselectClick"
      @DOcloseClick="DOcloseClick">
    </popupdosearch>

    <div class="pda-panel-7">
			<div class="input-group mb-3">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'80px', display:'inline-block', 'text-align':'left'}">Order No
				</span>
				<label type="text" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
          >{{lblDONo}}
				</label>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'80px', display:'inline-block', 'text-align':'left'}">Plan Date
				</span>
				<label type="text" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
          >{{lblPlandate}}
				</label>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'160px', display:'inline-block', 'text-align':'left'}">Customer Description
				</span>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<label type="label" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="" aria-describedby="basic-addon1"
          :style="{'text-align':'center'}">
          {{lblCustomer}}
				</label>
			</div>

			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'160px', display:'inline-block', 'text-align':'left'}">Material Description
				</span>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<label type="label" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="" aria-describedby="basic-addon1"
          :style="{'text-align':'center'}">
          {{lblMaktx}}
				</label>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'110px', display:'inline-block', 'text-align':'left'}">Issue Quantity
				</span>
				<label type="label" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
          >{{lblProcQty}}
				</label>
			</div>
    </div>

    <!-- 하단 바코드 정보 -->
    <div class="pda-panel-4">
			<div class="input-group mb-3">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'80px', display:'inline-block', 'text-align':'left'}">Barcode
				</span>
				<label type="text" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
          >{{lblBarno}}
				</label>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'80px', display:'inline-block', 'text-align':'left'}">Material
				</span>
				<label type="label" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
          >{{lblMatnr}}
				</label>
			</div>

			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'80px', display:'inline-block', 'text-align':'left'}">Pack Type
				</span>
				<label type="label" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
          >{{lblPacktype}}
				</label>
			</div>

			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'80px', display:'inline-block', 'text-align':'left'}">Quantity
				</span>
				<label type="label" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
          :style="{width:'10px'}">{{lblQty}}
				</label>
				<label type="label" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
          :style="{width:'10px'}">{{lblMeins}}
				</label> 
			</div>
    </div>

    <!-- 하단부 스캔, 메시지, 버튼 -->
    <div class= "window-save-1">
      <div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px'}">
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan barcode" aria-label="Scan barcode" aria-describedby="basic-addon1"
          id="scan"
          ref="scan"
          @keyup.enter='scanEnter'
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
        @click='sendClick'>Send</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='scanClick'>Scan</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='clearClick'>Clear</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
        @click='closeClick'>Close</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $axios from 'axios';
  import { reactive, ref, onMounted, onUnmounted } from 'vue'
  // import 'ag-grid-community/dist/styles/ag-grid.css';
  // import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  // import {AgGridVue} from 'ag-grid-vue3'
  import { useStore } from 'vuex';
  import { getdata } from '@/helper/filter.js';
  import { PlaySound } from '@/helper/util.js';
  import popupyn from '@/views/PopupYN.vue';
  import popupdosearch from '@/views/Good_Issue_Cancel_DO_Search.vue';

export default {
	name:'good_issue_cancel',
	components:{
    popupyn,
    popupdosearch,
	},
  setup(props,{emit}){
    let url = ref(process.env.VUE_APP_SERVER_URL);
    let window_width = ref(window.innerWidth);
    let window_height = ref(window.innerHeight);

    let popupTitle = ref(null);
    let popupMsg = ref(null);
    let popupisopen = ref(false);
    
    let popupdoisopen = ref(false);

    const store = useStore();	//스토어호출
    // let options = reactive([]);

    // let recvData = reactive([]);

    let strDONo = ref(null);
    let tmpBarno = ref(null);

    let lblDONo = ref(null);
    let lblPlandate = ref(null);
    let lblCustomer = ref(null);
    let lblMaktx = ref(null);
    let lblProcQty = ref(null);

    let lblBarno = ref(null);
    let lblMatnr = ref(null);
    let lblPacktype = ref(null);
    let lblQty = ref(null);
    let lblMeins = ref(null);

    let scan = ref(null);
    //데이터 바인딩
    let req_param = reactive({txtScan:""});
    let msg = ref(null);
    let msg_color = ref(null);

    onMounted(() => {
      console.log("[Cancel Good Issue] = ", "onMounted--");
      window.addEventListener('resize', handleResize);
      scan.value.focus();
    });

    onUnmounted(() =>{
      console.log("[Cancel Good Issue] = onUnmounted -- ");
      window.removeEventListener('resize', handleResize);
    });

    function handleResize() {
      window_width.value = window.innerWidth;
      window_height.value = window.innerHeight;
    }

    function DOselectClick(strDONo){
      console.log(strDONo);
      popupdoisopen.value = false;

      fn_Search(req_param.txtScan, strDONo, "", "S", "S");
    }

    function DOcloseClick(){
      popupdoisopen.value = false;
      console.log("[Customer] : ", lblCustomer.value);
      scan.value.focus();
    }

    function scanEnter(e) {
      if (e.target.id == "scan"){
        console.log(req_param.txtScan);
        fn_Search(req_param.txtScan, "", "", "S", "S");
      }
    }

    function fn_Search(strBarno, strVbeln, strMatnr, strProctype, strCalltype) {
      let urlPost = url.value + '/dwt/good_issue_cancel/scan';

      console.log("[parameters]", strBarno, "/", strVbeln, "/",  strMatnr, "/",  strProctype, "/",  strCalltype);

      //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
      $axios.post(urlPost, {
          i_lang: "EN",
          i_userid: store.state.auth.user[0].userid,
          i_werks: getdata(store.state.auth.user[0].plantcd),
          i_barno: strBarno,
          i_vbeln: getdata(strVbeln),
          i_matnr: getdata(strMatnr),
          i_proctype: strProctype,  //S:바코드출고이력 조회, D:바코드 출고 DO조회
          i_calltype: strCalltype   //S:스캔시, D:DO선택시
      })
      .then((res) => {
        console.log("[response data]", res.data);
        console.log("[response data] = req_param.txtScan -- ", req_param.txtScan);

        if (res.data[0].code == "NG"){
          if (res.data[0].subcode == "Confirm") {
            tmpBarno.value = strBarno;
            popupdoisopen.value = true;
          }
          else {
            clearClick();
            msg_color.value = "red";
            msg.value = res.data[0].message;
          }
        } else{
          msg_color.value = "blue";
          msg.value = "OK";
          // msg.value = res.data[0].message;
          // recvData.value = res.data;
          lblDONo.value = res.data[0].vbeln;
          lblPlandate.value = res.data[0].wadat;
          lblCustomer.value = res.data[0].zkunnrnm;
          lblMaktx.value = res.data[0].maktx;
          lblProcQty.value = res.data[0].procqty;

          lblBarno.value = res.data[0].barno;
          lblMatnr.value = res.data[0].matnr;
          lblPacktype.value = res.data[0].packtype1;
          lblQty.value = res.data[0].qty;
          lblMeins.value = res.data[0].meins;

          PlaySound("OK");
        }
        req_param.txtScan = "";
        scan.value.focus();
        // scan.value.select();
      }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
        //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
      .catch(err => {
        alert(err);
        console.error(err)
      })
    }

    function fn_SelectAll(e) {
      //<input @focus="$event.target.select()" value="select me" />
      e.target.select();
    }

    function noClick(){
      popupisopen.value = false;
    }

    function yesClick() {
      popupisopen.value = false;
      Cancel_GI();
    }

    function sendClick() {
      console.log("[Barcode No] : ", req_param.txtScan);
      if (!lblDONo.value) {    //DO가 조회된 경우만 처리. 
        alert("Please search D/O information first");
      }
      else {
          popupTitle.value ="Cancel Good Issue";
          popupMsg.value = "Do you want to save it?";
          popupisopen.value = true;
      }
    }

    function Cancel_GI() {
      let urlPost = url.value + '/dwt/good_issue_cancel/save';

      //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
      $axios.post(urlPost, {
          i_lang: "EN",
          i_userid: store.state.auth.user[0].userid,
          i_werks: getdata(store.state.auth.user[0].plantcd),
          i_barno: lblBarno.value,
          i_vbeln: lblDONo.value,
          i_matnr: lblMatnr.value
      })
      .then((res) => {
        console.log("[response data]", res.data);

        if (res.data[0].code == "NG") {
            msg_color.value = "red";
            msg.value = res.data[0].message;
        } else if (res.data[0].code == "OK") {
          clearClick();
          msg_color.value = "blue";
          msg.value = res.data[0].message;
          PlaySound("OK");
        }
        scan.value.focus();
      }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
        //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
      .catch(err => {
        alert(err);
        console.error(err)
      })
    }

    function scanClick() {
      console.log(req_param.txtScan);
      var txtscan = document.getElementById("scan");
      txtscan.setAttribute('inputmode','numeric');
      console.log(txtscan.inputMode);

      scan.value.focus();
    }

    function clearClick(){
      lblDONo.value = "";
      lblPlandate.value = "";
      lblCustomer.value = "";
      lblMaktx.value = "";
      lblProcQty.value = "";

      lblBarno.value = "";
      lblMatnr.value = "";
      lblPacktype.value = "";
      lblQty.value = "";
      lblMeins.value = "";      

      req_param.txtScan = "";
      msg.value = "";

      scan.value.focus();
    }

    function closeClick(){
      emit("component_close", "good_issue_cancel");
    }

		return {
      window_width,
      window_height,      
      popupTitle,
      popupMsg,
      popupisopen,
      popupdoisopen,
      strDONo,
      tmpBarno,
      DOselectClick,
      DOcloseClick,      
      yesClick,
      noClick,          
      lblDONo,
      lblPlandate,
      lblCustomer,
      lblMaktx,
      lblProcQty,
      lblBarno,
      lblMatnr,
      lblPacktype,
      lblQty,
      lblMeins,
      scan,
      req_param,
      msg,
      msg_color,
      // options,
      // recvData,      
      scanEnter,
      sendClick,
      scanClick,
      clearClick,
      closeClick,
      fn_SelectAll,
		}

	},
}
</script>
