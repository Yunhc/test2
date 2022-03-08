<template>

  <div class="window-main">

    <!-- 박스바코드 스캔 화면으로 이동 -->
    <popupautolabeller v-if="popupautoisopen"
      :strPO="req_param.txtPO"
      :date_hdf="date_hdf.value"
      :date_fmfm="date_fmfm.value"
      :date_prod="date_prod.value"
      :strBox="req_param.txtBox"
      :strLotno="req_param.cboShift+req_param.txtLotno"
      @autocloseClick="autocloseClick">
    </popupautolabeller>

    <div class="window-search-3">
      <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px', 'z-index':'1'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">오더번호
        </span>
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="생산오더번호를 입력하세요." aria-label="Production Order" aria-describedby="basic-addon1"
          id="txtPO"
          ref="txtPO"
          @keyup.enter='displayClick'
          @click='POClick'
          @focus='fn_SelectAll'
          data-ref="InputContent" inputmode="numeric"
          v-model="req_param.txtPO"
          v-bind:disabled="lblMaktx === null ? false : true">
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'0px 10px 0px 5px', width:'70px'}"
          @click='displayClick'>조회</button>
      </div>

      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <label type="label" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Material Description"
            aria-label="Material Description" aria-describedby="basic-addon1"
            :style="{color:'grey', margin:'0px 10px 0px 0px', display:'inline-block', 'text-align':'left'}">Material Description
            {{lblMaktx}}
        </label>
      </div>
      <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'90px', display:'inline-block', 'text-align':'right'}">총생산수량
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Total Production Qty"
            aria-label="Tot Prod Qty" aria-describedby="basic-addon1"
            :style="{color: 'gray', margin:'0px 10px 0px 0px', 'text-align':'left'}">
            {{lblProcQty}}
        </label>
      </div>
    </div>

		<div class="window-box-2px-green"
      :style="{
        'height': `calc(${window_height - 109 - 98 - 95}px)`
      }"
    >
      <!-- HDF 생산일 -->
      <div class="input-group mb-1" :style="{ margin:'10px 5px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'100px', display:'inline-block', 'text-align':'right'}">HDF생산일
        </span>
        <v-date-picker
          mode="date"
          v-model="date_hdf"
          locale="en"
          title-position="center"
          color="green"
          :style="{width:'200px', margin:'0px 0px 0px -1px'}"
          :is-dark="isDark"
          :is-range="isRange"
          :masks="{ input: ['YYYY-MM-DD', 'L'] }"
        >
          <template #default="{ inputValue, inputEvents }">
            <template v-if="isRange">
              <div class="input-group mb-3" :style="{height:'15px'}">
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
              <input class="form-control btn-sm"
                :style="{'text-align':'center'}"
                data-ref="InputContent" inputmode="none"
                :value="inputValue"
                v-on="inputEvents"/>
            </template>
          </template>
        </v-date-picker>
      </div>

      <!-- F.MFM 생산일 -->
      <div class="input-group mb-1" :style="{ margin:'1px 5px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'100px', display:'inline-block', 'text-align':'right'}">F.MFM생산일
        </span>
        <v-date-picker
          mode="date"
          v-model="date_fmfm"
          locale="en"
          title-position="center"
          color="green"
          :style="{width:'200px', margin:'0px 0px 0px -1px'}"
          :is-dark="isDark"
          :is-range="isRange"
          :masks="{ input: ['YYYY-MM-DD', 'L'] }"
        >
          <template #default="{ inputValue, inputEvents }">
            <template v-if="isRange">
              <div class="input-group mb-1" :style="{height:'15px'}">
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
              <input class="form-control btn-sm"
                :style="{'text-align':'center'}"
                data-ref="InputContent" inputmode="none"
                :value="inputValue"
                v-on="inputEvents"/>
            </template>
          </template>
        </v-date-picker>
      </div>

      <!-- 제품 생산일 -->
      <div class="input-group mb-1" :style="{ margin:'1px 5px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'100px', display:'inline-block', 'text-align':'right'}">생산/입고일
        </span>
        <v-date-picker
          mode="date"
          v-model="date_prod"
          locale="en"
          title-position="center"
          color="green"
          :style="{width:'200px', margin:'0px 0px 0px -1px'}"
          :is-dark="isDark"
          :is-range="isRange"
          :masks="{ input: ['YYYY-MM-DD', 'L'] }"
        >
          <template #default="{ inputValue, inputEvents }">
            <template v-if="isRange">
              <div class="input-group mb-1" :style="{height:'15px'}">
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
              <input class="form-control btn-sm"
                :style="{'text-align':'center'}"
                data-ref="InputContent" inputmode="none"
                :value="inputValue"
                v-on="inputEvents"/>
            </template>
          </template>
        </v-date-picker>
      </div>

      <!-- 박스수량 입력 -->
      <div class="input-group mb-3" :style="{ margin:'0px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'100px', display:'inline-block', 'text-align':'right'}">박스수량
        </span>
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="박스수량을 입력하세요."
            aria-label="Box Count" aria-describedby="basic-addon1"
            id="txtBox"
            ref="txtBox"
            @keyup.enter='keyupenter'
            @focus='fn_SelectAll'
            data-ref="InputContent" inputmode="numeric"
            v-model="req_param.txtBox">
        <label type="text" autocomplete="off" class="input-group-text btn-sm" placeholder="Box"
            aria-label="Box" aria-describedby="basic-addon1"
            :style="{border: 'none', margin:'0px 20px 0px 0px', background:'white', width: '60px', 'text-align':'left'}">Box
        </label>
      </div>

      <!-- 생산조 및 롯트번호 입력 -->
      <div class="input-group mb-3" :style="{ margin:'-12px 0px 0px 10px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'100px', display:'inline-block', 'text-align':'right'}"
        >Lot No</span>
        <select class="form-select btn-sm" aria-label="Default select example"
          id="cboShift"
          ref="cboShift"
          @change ='keyupenter'
          v-model="req_param.cboShift">
          <option disabled value="">생산조를 선택하세요</option>
          <option v-for="(d, i) in options" :key="i" :value="d.id">{{ d.id }}</option>
        </select>
        <input type="text" autocomplete="off" class="form-control btn-sm" placeholder="Lot No를 입력하세요."
            aria-label="Lot No." aria-describedby="basic-addon1"
            :style="{margin:'0px 20px 0px 5px', width: '100px', 'text-align':'left'}"
            id="txtLotno"
            ref="txtLotno"
            @keyup.enter='keyupenter'
            @focus='fn_SelectAll'
            data-ref="InputContent" inputmode="numeric"
            v-model="req_param.txtLotno">
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
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='continueClick'>계속</button>
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
  // import { getdata, formatDate } from '@/helper/filter.js';
  import { formatDate } from '@/helper/filter.js';
  import { PlaySound } from '@/helper/util.js';
  import popupautolabeller from '@/views/Autolabeller_Production_Result_Scan.vue';

  export default {
    name:'autolabeller_production_result',
    components:{
      popupautolabeller,
    },

    setup(props,{emit}){
      let url = ref(process.env.VUE_APP_SERVER_URL);
      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);

      let popupautoisopen = ref(false);

      const store = useStore();	//스토어호출
      let options = reactive([]);

      let recvData = reactive([]);
      let lblMaktx = ref(null);
      let lblProcQty = ref(null);

			//달력
			let isDark = ref(false);
			let isRange = ref(false);
			// let date = ref({start:new Date(), end:new Date()});
			let date_hdf = ref({start:new Date(), end:new Date()});
      let date_fmfm = ref({start:new Date(), end:new Date()});
      let date_prod = ref({start:new Date(), end:new Date()});

      //focus 이동을 위한 변수
      let txtPO = ref(null);
      let txtBox = ref(null);
      let txtLotno = ref(null);
      let cboShift = ref(null);

      //데이터 바인딩
      let req_param = reactive({txtPO:"001000775432", txtBox:"", txtLotno:"", cboShift:""});
      let msg = ref(null);
      let msg_color = ref(null);

      onBeforeMount(()=>{
        console.log("[Autolabeller Production Result] = ", "onBeforeMount--");
        initSelectBox();   
      });

      onMounted(() => {
        console.log("[Autolabeller Production Result] = ", "onMounted--");
        window.addEventListener('resize', handleResize);
        txtPO.value.focus();
        // txtBox.value.focus();
        // txtLotno.value.focus();

				if (isRange.value == false){
					date_hdf.value = new Date();
          date_fmfm.value = new Date();
          date_prod.value = new Date();
				}
      });

      onUnmounted(() =>{
        console.log("[Autolabeller Production Result] = onUnmounted -- ");
        window.removeEventListener('resize', handleResize);
      });

      function handleResize() {
        window_width.value = window.innerWidth;
        window_height.value = window.innerHeight;
      }

      async function initSelectBox() {
        options.push({id:"A", name:"A조"});
        options.push({id:"B", name:"B조"});
        options.push({id:"C", name:"C조"});
        options.push({id:"D", name:"D조"});
      }

      function POClick(){
        // console.log(req_param.txtScan);
        var tmpPO = document.getElementById("txtPO");
        tmpPO.setAttribute('inputmode','numeric');
        console.log(tmpPO.inputMode);

        // scan.value.focus();
      }


      function displayClick(){
        // store.commit('loading/startLoading');
        console.log("Production Order : ", req_param.txtPO);

        if (req_param.txtPO) {  //PO가 입력된 경우만 조회를 한다.
          //PO 조회 API전송
          fn_POSearch();
        }
        else {
          // alert("Please input P/O number first.")
          msg_color.value = "red";
          msg.value = "Please input P/O number first.";
          // PlaySound("OK");            
          txtPO.value.focus();
        }
        // store.commit('loading/endLoading');
      }

      function fn_POSearch(){
        // store.commit('loading/startLoading');
        let urlPost = url.value + '/dw/autolabeller/pda/search';

        //전송 파라미터 : 프로시저 파라미터와 동일하게 구성
        $axios.post(urlPost, {
            i_lang: "KR",
            // i_werks: getdata(store.state.auth.user[0].plantcd),
            i_werks: "K143",
            i_userid: store.state.auth.user[0].userid,
            i_ord_no: req_param.txtPO,
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
              lblMaktx.value = res.data[0].maktx;
              lblProcQty.value = res.data[0].procqty.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");  //천단위 콤마
              txtBox.value.focus();
              PlaySound("OK");
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
        // store.commit('loading/endLoading');
      }

      function continueClick(){
        console.log("txtPO/lblMaktx/txtBox/txtLotno/cboShift", req_param.txtPO, lblMaktx.value, req_param.txtBox, req_param.txtLotno, req_param.cboShift, req_param.txtLotno.length);
        console.log("date_hdf/date_fmfm/date_prod", formatDate(date_hdf.value, 'YYYYMMDD'), formatDate(date_fmfm.value, 'YYYYMMDD'), formatDate(date_prod.value, 'YYYYMMDD'))
        if (lblMaktx.value == "" | lblMaktx.value == null){
          alert("Please input P/O number first.");
          txtPO.value.focus();
        // } else if (req_param.txtBox == "" | req_param.txtBox == null){
        } else if (req_param.txtBox == ""){
          alert("Please input Box count.");
          txtBox.value.focus();
        } else if (req_param.txtLotno == "" | req_param.txtLotno.length != 3){ // | req_param.txtLotno == null){
          alert("Please input 3 digit Lot No.");
          txtLotno.value.focus();
        } else if (req_param.cboShift == ""){ // | req_param.cboShift == null){
          alert("Please select shift.");
          cboShift.value.focus();
        } else{
          popupautoisopen.value = true;
        }
      }

      function autocloseClick(){
        popupautoisopen.value = false;

        //처리결과를 반영하기 위해 오더를 다시 조회.
        // fn_POSearch();
      }

      function clearClick(){
        req_param.txtPO = "";
        lblMaktx.value = null;  //null로 처리해야 txtPO 입력필드 disable이 enable로 변경된다.
        lblProcQty.value = "";
        req_param.txtBox = "";
        req_param.txtLotno = "";
        req_param.cboShift="";
        msg.value = "";

        date_hdf.value = new Date();
        date_fmfm.value = new Date();
        date_prod.value = new Date();
          
        // txtPO = ref(null);
        txtPO.value.focus();  //Question : focus가 작동하지 않는다.
      }

      function closeClick(){
        emit("component_close", "autolabeller_production_result");
      }

      function fn_SelectAll(e) {
        //<input @focus="$event.target.select()" value="select me" />
        e.target.select();
      }

      function keyupenter(e){
        if (e.target.id == "txtBox"){
          txtLotno.value.focus();
        } else if (e.target.id == "txtLotno"){
          cboShift.value.focus();
        }
      }


      return {
        window_width,
        window_height,
        lblMaktx,
        lblProcQty,
        cboShift,
				isDark,
				isRange,
				date_hdf,
        date_fmfm,
        date_prod,
        txtPO,
        txtBox,
        txtLotno,
        req_param,
        msg,
        msg_color,
        scrollPostion : 0,
        defaultColGroupDef: null,
        columnTypes: null,
        options,
        recvData,
        popupautoisopen,
        autocloseClick,
        displayClick,
        POClick,
        continueClick,
        clearClick,
        closeClick,
        fn_SelectAll,
        keyupenter,
      };
    },

  }
</script>
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>