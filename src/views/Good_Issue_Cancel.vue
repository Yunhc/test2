<template>
  <div class="window-main">
    <div class="pda-panel-7">
			<div class="input-group mb-3">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'80px', display:'inline-block', 'text-align':'left'}">Order No
				</span>
				<input type="text" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
				value="ABC1234567890"
				>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'80px', display:'inline-block', 'text-align':'left'}">Plan Date
				</span>
				<input type="text" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
				value="ABC1234567890"
				>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'160px', display:'inline-block', 'text-align':'left'}">Customer Description
				</span>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<input type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="" aria-describedby="basic-addon1"
				value="ABC1234567890"
				>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'160px', display:'inline-block', 'text-align':'left'}">Material Description
				</span>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<input type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="" aria-describedby="basic-addon1"
				value="ABC1234567890"
				>
			</div>
			<div class="input-group mb-3 pda-panel-div">
				<span class="input-group-text btn-sm" id="basic-addon1"
					:style="{width:'110px', display:'inline-block', 'text-align':'left'}">Issue Quantity
				</span>
				<input type="text" autocomplete="off" class="form-control btn-sm" placeholder="" aria-describedby="basic-addon1"
				value="ABC1234567890"
				>
			</div>


      <!-- <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">Customer
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm ellipsis" placeholder="Customer"
            aria-label="Customer" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblCustomer}}
        </label>
      </div> -->
      <!-- <div class="input-group mb-3" :style="{ margin:'-15px 0px 0px 0px'}">
        <span class="input-group-text btn-sm" id="basic-addon1"
          :style="{width:'80px', display:'inline-block', 'text-align':'right'}">Ship No
        </span>
        <label type="text" autocomplete="off" class="form-control btn-sm" placeholder="Shipment No"
            aria-label="Shipment No" aria-describedby="basic-addon1"
            :style="{'text-align':'left'}">
            {{lblShipno}}
        </label>
      </div> -->
    </div>

    <!-- <div class= "window-save-1">
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
        @click='sendClick("N")'>Send</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='scanClick'>Scan</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
        @click='clearClick'>Clear</button>
        <button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
        @click='closeClick'>Close</button>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
	name:'good_issue_cancel',
	components:{
	},
	setup() {
		return {
		}

	},
}
</script>
