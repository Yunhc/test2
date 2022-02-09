<template>
	<div id="print_obj"
		class="print-mdf-1"
	>
		<div class="input-group mb-3 textdiv" :style="{ margin:'0px 0px 0px 0px'}">
			<input type="text" class="form-control btn-sm" aria-label="UserID" aria-describedby="basic-addon1"
				:style="{
					'text-align':'center',
					border:'transparent'
				}"
				value="Dongwha Label Test"
			>
		</div>
		<div class="input-group mb-3 textdiv" :style="{ margin:'-17px 0px 0px 0px'}">
			<span class="input-group-text btn-sm" id="basic-addon1"
				:style="{width:'80px', margin:'0px 0px 0px 0px', border: '1px solid black'}">
				Barcode
			</span>
			<input type="text" class="form-control btn-sm" aria-label="UserID" aria-describedby="basic-addon1"
				:style="{border: '1px solid black'}"
				v-model="l_barno"
			>
		</div>
		<div class="input-group mb-3 textdiv" :style="{ margin:'-17px 0px 0px 0px'}">
			<span class="input-group-text btn-sm" id="basic-addon1"
				:style="{width:'80px', margin:'0px 0px 0px 0px', border: '1px solid black'}">
				수량
			</span>
			<input type="text" class="form-control btn-sm" aria-label="UserID" aria-describedby="basic-addon1"
			:style="{border: '1px solid black'}"
				v-model="l_qty"
			>
		</div>
		<div class="bardiv-normal"
			align='center'
			:style="{ margin:'-20px 0px 0px 100px'}"
		>
			<BarcodeGenerator
			:value="l_barno"
			:format="'CODE128'"
			:background="'transparent'"
			:lineColor="'#000'"
			:width="1.5"
			:height="30"
			:fontSize="12"
			:elementTag="'svg'"/>
		</div>
		<div class="bardiv-rotation-90"
			:style="{ margin:'75px 0px 0px -90px'}"
		>
			<BarcodeGenerator
			:value="l_barno"
			:format="'CODE128'"
			:background="'transparent'"
			:lineColor="'#000'"
			:width="1.5"
			:height="30"
			:fontSize="12"
			:elementTag="'svg'"/>
		</div>
	</div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'
import { ref } from 'vue'
import BarcodeGenerator from "@/components/BarcodeGenerator.vue";

export default {
	name:'labelformat',
	components:{
		BarcodeGenerator
	},
	// props:['title', 'message'],
	// props: {
  //   value: [String, Number],
  //   format: [String],
  //   width: [String, Number],
  //   height: [String, Number],
  //   displayValue: {
  //     type: [String, Boolean],
  //     default: true,
  //   },
	props: [
    'barno',
		'qty',
	],
	setup(props) {
		let l_barno = ref(props.barno);
		let l_qty = ref(props.qty);

		return{
			l_barno,
			l_qty,
		}
	},
}
</script>
