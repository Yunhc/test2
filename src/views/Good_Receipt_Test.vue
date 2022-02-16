<template>

  <div class="window-main">
    <!-- Send버튼 클릭후 오더수량보다 스캔수량이 적을 경우 처리 여부 문의 팝업화면 -->
     <popupyn v-if="popupisopen"
      :title="popupTitle"
      :message="popupMsg"
      @yesClick="yesClick"
      @noClick="popupisopen=false">
    </popupyn>

    <!-- Detail버튼 클릭시 스캔한 바코드 리스트 조회(삭제) 팝업화면 -->
    <popupbarsearch v-if="popupbarisopen"
      :strPO="req_param.txtPO"
      @BarcloseClick="BarcloseClick">
    </popupbarsearch>

    <!-- DO버튼 클릭시 일자별 DO조회 팝업화면 -->
    <popupposearch v-if="popuppoisopen"
      @POselectClick="POselectClick"
      @POcloseClick="POcloseClick">
    </popupposearch>


    <div class="window-search-1">
      <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px', 'z-index':'1', height:'40px', border:'1px solid transparent'}">
				<v-date-picker
					mode="date"
					v-model="date"
					locale="en"
					title-position="center"
					color="green"
					:style="{margin:'0px 0px 0px 0px'}"
					:is-dark="isDark"
					:is-range="isRange"
					:masks="{ input: ['YYYY-MM-DD', 'L'] }"
				>
					<template #default="{ inputValue, inputEvents }">
						<template v-if="isRange">
							<div class="input-group mb-3" :style="{height:'36px'}">
								<span class="input-group-text btn-sm" id="basic-addon1"
									:style="{width:'80px', margin:'0px 0px 0px 0px'}">
									PO Date
								</span>
								<input class="form-control btn-sm"
									:style="{'text-align':'center'}"
									data-ref="InputContent" inputmode="none"
									:value="inputValue.start"
									v-on="inputEvents.start"/>
								<span class="input-group-text btn-sm" :style="{background:'transparent', border:'transparent'}">~</span>
								<input class="form-control btn-sm"
									:style="{'text-align':'center'}"
									data-ref="InputContent" inputmode="none"
									:value="inputValue.end"
									v-on="inputEvents.end"/>
							</div>
						</template>
						<template v-else>
							<div class="input-group mb-3" :style="{height:'36px', border:'1px solid transparent'}">
								<span class="input-group-text btn-sm" id="basic-addon1"
									:style="{width:'80px', height:'36px', margin:'-1px 0px 0px 0px'}">
									PO Date
								</span>
								<input class="form-control btn-sm"
									:style="{'text-align':'center', height:'36px',  margin:'-1px 0px 0px 0px'}"
									data-ref="InputContent" inputmode="none"
									:value="inputValue"
									v-on="inputEvents"/>
							</div>
						</template>
					</template>
				</v-date-picker>
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', height:'36px',  margin:'0px 0px 0px 5px'}">PO
        </span>
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Purchase Order"
					aria-label="Purchase Order" aria-describedby="basic-addon1"
          :style="{height:'36px'}"
					id="txtPO"
          ref="txtPO"
          @keyup.enter='displayClick'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="numeric"
          v-model="req_param.txtPO">
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Item No"
          :style="{height:'36px'}"
					id="txtPOitem"
          ref="txtPOitem"
          @keyup.enter='displayClick'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="numeric"
          v-model="req_param.txtPOitem">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 0px 0px 5px', width:'70px', height:'36px'}"
        @click='displayClick'>조회</button>
      </div>
    </div>

		<div class="window-order"
      :style="{
        'height': `calc(${window_height - 109 - 40 - 123}px)`
      }"
    >
			<div>
				<div v-for="(ord, i) in recvData" :key="i">
					<button class="order-gr">
						<div class="order-gr-content">
							<div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
								<span class="input-group-text btn-sm" id="basic-addon1"
									:style="{width:'70px', display:'inline-block', 'text-align':'right', 'font-weight':'bold'}">Po번호
								</span>
								<label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Customer"
										aria-label="Customer" aria-describedby="basic-addon1"
										:style="{'text-align':'left', 'font-weight':'bold'}">
										{{ord.order[0].ebeln}}
								</label>
							</div>
              <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
                <span class="input-group-text btn-sm" id="basic-addon1"
                  :style="{width:'70px', display:'inline-block', 'text-align':'right', 'font-weight':'bold'}">Vendor
                </span>
                <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Customer"
                    aria-label="Customer" aria-describedby="basic-addon1"
                    :style="{'text-align':'left', 'font-weight':'bold'}">
                    [{{ord.order[0].lifnr}}] {{ord.order[0].name1}}
                </label>
              </div>
              <!-- 아이템 정보 -->
              <div class='order-gr-item'>
                <div class='order-gr-item-1'
                  v-for="(item, index) in ord.data" :key="index">
                  <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
                    <span class="input-group-text btn-sm" id="basic-addon1"
                      :style="{width:'70px', display:'inline-block', 'text-align':'right'}">자재코드
                    </span>
                    <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Customer"
                        aria-label="Customer" aria-describedby="basic-addon1"
                        :style="{'text-align':'left'}">
                        {{item.ematn}}
                    </label>
                  </div>
                  <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
                    <span class="input-group-text btn-sm" id="basic-addon1"
                      :style="{width:'70px', display:'inline-block', 'text-align':'right'}">자재내역
                    </span>
                    <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Customer"
                        aria-label="Customer" aria-describedby="basic-addon1"
                        :style="{'text-align':'left'}">
                        {{item.txz01}}
                    </label>
                  </div>
                  <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
                    <span class="input-group-text btn-sm" id="basic-addon1"
                      :style="{width:'70px', display:'inline-block', 'text-align':'right'}">PO 수량
                    </span>
                    <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Customer"
                        aria-label="Customer" aria-describedby="basic-addon1"
                        :style="{'text-align':'left'}">
                        {{item.menge}}({{item.meins}})
                    </label>
                    <span class="input-group-text btn-sm" id="basic-addon1"
                      :style="{width:'70px', display:'inline-block', 'text-align':'right'}">저장위치
                    </span>
                    <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Customer"
                        aria-label="Customer" aria-describedby="basic-addon1"
                        :style="{'text-align':'left'}">
                        {{item.lgort}}
                    </label>
                  </div>
                </div>
              </div>
            </div>
					</button>
				</div>
			</div>
    </div>
    <div class= "window-save-1">
      <div class="input-group mb-3" :style="{height:'30px', margin:'2px 0px 0px 0px'}">
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Scan barcode" aria-label="바코드 스캔" aria-describedby="basic-addon1"
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
        @click='sendClick("N")'>입고</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='scanClick'>Scan</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='clearClick'>초기화</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
        @click='closeClick'>닫기</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $axios from 'axios';
  import { reactive, ref, onMounted, onUnmounted } from 'vue'
  // import {AgGridVue} from 'ag-grid-vue3'
  import { useStore } from 'vuex';
  import { getdata, formatDate } from '@/helper/filter.js';
  import { PlaySound } from '@/helper/util.js';
  import popupyn from '@/views/PopupYN.vue';
  import popupposearch from '@/views/Good_Receipt_PO_Search.vue';
  import popupbarsearch from '@/views/Good_Receipt_Bar_Search.vue';

  export default {
    name:'good_receipt_test',
    components:{
      // AgGridVue,
      popupyn,
      popupposearch,
      popupbarsearch,
    },
    setup(props,{emit}){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      let popupTitle = ref(null);
      let popupMsg = ref(null);
      let popupisopen = ref(false);

      let popupbarisopen = ref(false);
      let popuppoisopen = ref(false);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let recvData = reactive([]);
      let strPONo = ref(null);

			//달력
			let isDark = ref(false);
			let isRange = ref(false);
			// let date = ref({start:new Date(), end:new Date()});
			let date = ref({start:new Date(), end:new Date()});

      //focus 이동을 위한 변수

      let txtPO = ref(null);
      let txtPOitem = ref(null);
      let lblPOdate = ref(null);
      let lblVendor = ref(null);
      let lblSL = ref(null);
      let scan = ref(null);
      //데이터 바인딩
      let req_param = reactive({txtPO:"", txtPOitem:"", txtScan:""});
      let msg = ref(null);
      let msg_color = ref(null);

      onMounted(() => {
        console.log("[Good Receipt] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
        txtPO.value.focus();

				if (isRange.value == false){
					date.value = new Date();
					// console.log("[label_print_hist] = onMounted -- date --", date.value);
				}
      });

      onUnmounted(() =>{
        console.log("[Good Receipt] = onUnmounted -- ");
        window.removeEventListener('resize', handleResize);
      });

      function handleResize() {
        window_width.value = window.innerWidth;
        window_height.value = window.innerHeight;
      }

      function displayClick(){
        var tmpscan = document.getElementById("scan");
        tmpscan.setAttribute('inputmode','none');
        // console.log(tmpscan.inputMode);

        //PO 조회 API전송
        fn_POSearch();
      }

      function fn_POSearch(){
        let urlPost = url.value + '/dw/good_receipt/search';
        // console.log("[req_param]", req_param);
				// clear data
				recvData.splice(0, recvData.length);

        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        $axios.post(urlPost, {
            i_lang: "KR",
            i_werks: getdata(store.state.auth.user[0].plantcd),
            i_userid: store.state.auth.user[0].userid,
            i_ord_no: req_param.txtPO,
            i_ord_item_no: req_param.txtPOitem,
            i_date_from: formatDate(date.value, "YYYYMMDD"),
            i_date_to: formatDate(new Date(), "YYYYMMDD"),
        })
        .then((res) => {
          // console.log("[response data]", res.data);
          if(res.data.length > 0) {
            if (res.data[0].code == "NG"){
              msg_color.value = "red";
              msg.value = res.data[0].message;
            } else{
              msg_color.value = "blue";
              msg.value = "OK";
              PlaySound("OK");

							let tmpNo = "";
							for(var i=0; i<res.data.length; i++){
								if(tmpNo == res.data[i].ebeln){
                  recvData[recvData.length - 1].data.push({
                    ebeln:res.data[i].ebeln,
                    ebelp:res.data[i].ebelp,
                    burks:res.data[i].burks,
                    ekgrp:res.data[i].ekgrp,
                    bstyp:res.data[i].bstyp,
                    ematn:res.data[i].ematn,
                    txz01:res.data[i].txz01,
                    werks:res.data[i].werks,
                    lgort:res.data[i].lgort,
                    menge:res.data[i].menge,
                    meins:res.data[i].meins,
                  });
								}
								else{
                  recvData.push({
                    order:
                    [{
                      ebeln:res.data[i].ebeln,
                      bsart:res.data[i].bsart,
                      bedat:res.data[i].bedat,
                      lifnr:res.data[i].lifnr,
                      name1:res.data[i].name1,
                      procqty:res.data[i].procqty,
                      procflag:res.data[i].procflag
                    }],
                    data:
                    [{
                      ebeln:res.data[i].ebeln,
                      ebelp:res.data[i].ebelp,
                      burks:res.data[i].burks,
                      ekgrp:res.data[i].ekgrp,
                      bstyp:res.data[i].bstyp,
                      ematn:res.data[i].ematn,
                      txz01:res.data[i].txz01,
                      werks:res.data[i].werks,
                      lgort:res.data[i].lgort,
                      menge:res.data[i].menge,
                      meins:res.data[i].meins,
                    }]
                  });
								}
								tmpNo = res.data[i].ebeln;
							}
							// console.log("[recvData data]", recvData);
            }
          }
          else {
            msg_color.value = "red";
            msg.value = "No Data";
          }
        }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
          //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
        .catch(err => {
          alert(err);
          console.error(err)
        })
      }


      function scanEnter(e) {
        if (e.target.id == "scan"){
          console.log(req_param.txtScan);
        }

        if (lblVendor.value) {  //DO가 입력된 경우만 스캔을 허용 한다.
                                //DO입력없이 바코드 스캔시 스캔이력이 있으면 해당 DO정보 불러오는 기능 추가 검토.
          let urlPost = url.value + '/dw/good_receipt/scan';

          console.log("[req_param]", req_param);
          // console.log(getdata(req_param.txtScan));

          //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
          $axios.post(urlPost, {
              i_lang: "EN",
              i_userid: store.state.auth.user[0].userid,
              i_werks: getdata(store.state.auth.user[0].plantcd),
              i_vbeln: req_param.txtPO,
              i_barno: req_param.txtScan,
              i_qty: "0",
              i_delflag: "N",   //신규 스캔시 N, 삭제시 Y (이미 스캔한 바코드를 다시 스캔할 경우 삭제여부 문의하고 삭제 선택시)
              i_calltype: "S"   //스캔화면 호출시 S, 바코드 삭제화면 호출시 D
          })
          .then((res) => {
            console.log("[response data]", res.data);
            console.log("[response data] = res.data[0].barno -- ", res.data[0].matnr);
            console.log("[response data] = req_param.txtScan -- ", req_param.txtScan);

            if (res.data[0].code == "NG"){
              msg_color.value = "red";
              msg.value = res.data[0].message;
            } else{
              msg_color.value = "blue";
              msg.value = "OK";
              recvData.value = res.data;
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
        else {
            msg_color.value = "red";
            msg.value = "Please search P/O information first.";
            // PlaySound("OK");
            txtPO.value.focus();
        }
      }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }

      function DetailClick(){
        popupbarisopen.value = true;
        console.log("txtPO => ", req_param.txtPO);
      }

      function DOClick(){
        popuppoisopen.value = true;
      }

      function POselectClick(strPONo){
        console.log(strPONo);
        popuppoisopen.value = false;
        req_param.txtPO = strPONo;

        fn_POSearch();
      }

      function POcloseClick(){
        popuppoisopen.value = false;
        console.log("[Customer] : ", lblVendor.value);
        if (lblVendor.value) {
          scan.value.focus();
          // scan.value.select();
        }
        else {
          txtPO.value.focus();
          // txtPO.value.select();
        }
      }

      function BarcloseClick(){
        popupbarisopen.value = false;
        console.log("BarcloseClick -- ", req_param.txtPO);
        fn_POSearch();
      }

      function sendClick(procflag) {
        console.log("[ProcFlag] : ", procflag);
        console.log("[P/O No] : ", req_param.txtPO);
        if ((!req_param.txtPO) || (!lblVendor.value)) {    //DO가 조회된 경우만 처리.
          alert("Please search P/O information first");
        }
        else {
          let urlPost = url.value + '/dw/good_receipt/save';

          //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
          $axios.post(urlPost, {
              i_lang: "EN",
              i_userid: store.state.auth.user[0].userid,
              i_werks: getdata(store.state.auth.user[0].plantcd),
              i_vbeln: req_param.txtPO,
              i_procflag: procflag
          })
          .then((res) => {
            console.log("[response data]", res.data);

            if(res.data.length > 0) {
              if (res.data[0].code == "NG") {
                if (res.data[0].subcode == "Confirm") {
                  popupTitle.value ="Good Receipt";
                  popupMsg.value = res.data[0].message + "\n" + "Do you want to process? ";
                  popupisopen.value = true;
                } else {
                  msg_color.value = "red";
                  msg.value = res.data[0].message;
                }
              } else if (res.data[0].code == "OK") {
                clearClick();
                msg_color.value = "blue";
                msg.value = res.data[0].message;
                PlaySound("OK");
              }
            }
            txtPO.value.focus();
          }) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
            //.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
          .catch(err => {
            alert(err);
            console.error(err)
          })
        }
      }

      function noClick(){
        popupisopen.value = false;
      }

      function yesClick() {
        popupisopen.value = false;
        sendClick("Y");
      }

      function scanClick() {
        console.log(req_param.txtScan);
        var txtscan = document.getElementById("scan");
        txtscan.setAttribute('inputmode','numeric');
        console.log(txtscan.inputMode);

        scan.value.focus();
      }

      function clearClick(){
        // txtPO.value = "";
        req_param.txtPO = "";
        lblVendor.value = "";
        lblSL.value = "";
        // scan.value = "";
        req_param.txtScan = "";
        msg.value = "";

        txtPO.value.focus();
      }

      function closeClick(){
        emit("component_close", "good_receipt");
      }

      // function autoSizeAll(skipHeader) {
      //   const allColumnIds = [];
      //   columnApi.value.getAllColumns().forEach((column) => {
      //     allColumnIds.push(column.colId);
      //   });

      //   columnApi.value.autoSizeColumns(allColumnIds, skipHeader);
      // }


      return {
        window_width,
        window_height,
        popupTitle,
        popupMsg,
        popupisopen,
        yesClick,
        noClick,
				isDark,
				isRange,
				date,
        txtPO,
        txtPOitem,
        lblPOdate,
        lblVendor,
        lblSL,
        scan,
        req_param,
        msg,
        msg_color,
        scrollPostion : 0,
        defaultColGroupDef: null,
        columnTypes: null,
        options,
        recvData,
        popupbarisopen,
        popuppoisopen,
        strPONo,
        POselectClick,
        POcloseClick,
        BarcloseClick,
        DetailClick,
        DOClick,
        displayClick,
        scanEnter,
        sendClick,
        scanClick,
        clearClick,
        closeClick,
        fn_SelectAll,
      };
    },
  }
</script>
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>