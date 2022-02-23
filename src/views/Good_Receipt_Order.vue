<template>

  <div class="window-main">

    <!-- 조회된 PO 선택시 구매입고 화면으로 이동 -->
    <popupgoodreceipt v-if="popupgrisopen"
      :strPO_GR="strPONo"
      :strItem_GR="strPOItem"
      @GRcloseClick="GRcloseClick">
    </popupgoodreceipt>

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
        'height': `calc(${window_height - 109 - 40 - 95}px)`
      }"
    >
			<div>
				<div v-for="(ord, i) in recvData" :key="i">
					<button class="order-gr" @click='selectPO(i)'>
						<div class="order-gr-content">
							<div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
								<span class="input-group-text btn-sm" id="basic-addon1"
									:style="{width:'70px', display:'inline-block', 'text-align':'right', 'font-weight':'bold'}">PO 번호
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
      <div class="input-group mb-3"
        :style="{height:'48px', margin:'3px 0px 0px 0px', background:'gainsboro'}">
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
        @click='closeClick'>닫기</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $axios from 'axios';
  import { reactive, ref, onMounted, onUnmounted } from 'vue'
  import { useStore } from 'vuex';
  import { getdata, formatDate } from '@/helper/filter.js';
  import { PlaySound } from '@/helper/util.js';
  import popupgoodreceipt from '@/views/Good_Receipt.vue';

  export default {
    name:'good_receipt_order',
    components:{
      popupgoodreceipt,
    },
    setup(props,{emit}){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      let popupgrisopen = ref(false);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let recvData = reactive([]);

			//달력
			let isDark = ref(false);
			let isRange = ref(false);
			// let date = ref({start:new Date(), end:new Date()});
			let date = ref({start:new Date(), end:new Date()});

      //focus 이동을 위한 변수

      let txtPO = ref(null);
      let txtPOitem = ref(null);
      let strPONo = ref(null);
      let strPOItem = ref(null);

      //데이터 바인딩
      let req_param = reactive({txtPO:"", txtPOitem:""});
      let msg = ref(null);
      let msg_color = ref(null);

      onMounted(() => {
        console.log("[Good Receipt] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
        txtPO.value.focus();

				if (isRange.value == false){
					date.value = new Date();
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

      function selectPO(i){
        console.log("Select PO 번호 : ", i, recvData[i], recvData[i].data, recvData[i].order[0].ebeln);
        strPONo.value = recvData[i].order[0].ebeln;
        console.log("strPONO : ", strPONo.value);
        // strPOItem = recvData[i].order[0].ebelp;
        strPOItem.value = "";
        popupgrisopen.value = true;
      }

      function displayClick(){
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

      function GRcloseClick(){
        popupgrisopen.value = false;

        //처리결과를 반영하기 위해 오더를 다시 조회.
        fn_POSearch();
      }

      function closeClick(){
        emit("component_close", "good_receipt");
      }

      return {
        window_width,
        window_height,
				isDark,
				isRange,
				date,
        txtPO,
        txtPOitem,
        req_param,
        msg,
        msg_color,
        scrollPostion : 0,
        defaultColGroupDef: null,
        columnTypes: null,
        options,
        recvData,
        popupgrisopen,
        strPONo,
        strPOItem,
        selectPO,
        GRcloseClick,
        displayClick,
        closeClick,
      };
    },
  }
</script>
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>