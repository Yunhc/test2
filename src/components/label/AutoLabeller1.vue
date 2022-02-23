<template>
	<div id="print_obj"
		class="print-autolabeller1"
	>
		<div class="print-al-content">
			<!-- <div class="print-line"
				:style="{ height:'257px', margin:'0px 0px 0px 100px'}">
			</div>
			<div class="print-line"
				:style="{ height:'121px', margin:'53px 0px 0px 246px'}">
			</div>
			<div class="print-line"
				:style="{ height:'121px', margin:'53px 0px 0px 356px'}">
			</div> -->

			<div class="input-group mb-3 div-center " :style="{margin:'0px 0px 0px 0px', 'z-index': '21'}">
				<label class="form-label"
					:style="{width:'100px', padding:'15px 0px 0px 0px'}">
					패&nbsp;&nbsp;&nbsp;턴&nbsp;&nbsp;&nbsp;명
				</label>
				<div class='print-line-v-1'></div>
				<input type="text" class="form-control btn-sm ellipsis"
					:style="{height:'50px', fontSize:'40px'}"
					v-model="l_ptdesc"
				>
			</div>
			<div class="input-group mb-3 div-center" :style="{margin:'-16px 0px 0px 0px', 'z-index': '22'}">
				<label class="form-label"
					:style="{width:'100px', padding:'5px 0px 0px 0px'}">
					패 턴 코 드
				</label>
				<div class='print-line-v-2'></div>
				<input type="text" class="form-control btn-sm"
					:style="{height:'35px', fontSize:'24px'}"
					v-model="l_ptcode"
				>
				<div class='print-line-v-2'></div>
				<label class="form-label"
					:style="{width:'110px', padding:'5px 0px 0px 0px'}">
					LOT NO.
				</label>
				<div class='print-line-v-2'></div>
				<input type="text" class="form-control btn-sm"
					:style="{height:'35px', fontSize:'24px'}"
					v-model="l_lotno"
				>
			</div>
			<div class="input-group mb-3 div-center" :style="{margin:'-16px 0px 0px 0px', 'z-index': '23'}">
				<label class="form-label"
					:style="{width:'100px', padding:'5px 0px 0px 0px'}">
					HDF생산일
				</label>
				<div class='print-line-v-2'></div>
				<input type="text" class="form-control btn-sm"
				:style="{height:'35px', fontSize:'24px'}"
					v-model="l_date"
				>
				<div class='print-line-v-2'></div>
				<label class="form-label"
					:style="{width:'110px', padding:'5px 0px 0px 0px'}">
					F.MFM생산일
				</label>
				<div class='print-line-v-2'></div>
				<input type="text" class="form-control btn-sm"
				:style="{height:'35px', fontSize:'24px'}"
					v-model="l_date"
				>
			</div>
			<div class="input-group mb-3 div-center" :style="{margin:'-16px 0px 0px 0px', 'z-index': '24'}">
				<label class="form-label"
					:style="{width:'100px', padding:'5px 0px 0px 0px'}">
					가&nbsp;&nbsp;&nbsp;공&nbsp;&nbsp;&nbsp;일
				</label>
				<div class='print-line-v-2'></div>
				<input type="text" class="form-control btn-sm"
				:style="{height:'35px', fontSize:'24px'}"
					v-model="l_date"
				>
				<div class='print-line-v-2'></div>
				<label class="form-label"
					:style="{width:'110px', padding:'5px 0px 0px 0px'}">
					제 품 코 드
				</label>
				<div class='print-line-v-2'></div>
				<input type="text" class="form-control btn-sm"
				:style="{height:'35px', fontSize:'24px'}"
					v-model="l_matnr"
				>
			</div>
			<div class="input-group mb-3 div-center" :style="{margin:'-16px 0px 0px 0px', 'z-index': '25'}">
				<label class="form-label"
					:style="{width:'100px', margin:'5px 0px 0px 0px'}">
					제&nbsp;&nbsp;&nbsp;품&nbsp;&nbsp;&nbsp;명
				</label>
				<div class='print-line-v-2'></div>
				<input type="text" class="form-control btn-sm ellipsis"
				:style="{height:'35px', fontSize:'24px'}"
					v-model="l_maktx"
				>
			</div>
			<div class="input-group mb-3 div-center" :style="{margin:'-16px 0px 0px 0px', 'z-index': '26'}">
				<label class="form-label"
					:style="{width:'100px', padding:'10px 0px 0px 0px'}">
					수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;량
				</label>
				<div class='print-line-v-3'></div>
				<input type="text" class="form-control btn-sm"
				:style="{height:'42px', fontSize:'32px'}"
					v-model="l_qty"
				>
			</div>
			<div class="div-close" :style="{height:'90px', margin:'-16px 0px 0px 0px', 'z-index': '27'}">
				<div class="bardiv-normal al-left-box"
					align='center'
					:style="{height:'85px', margin:'0px 0px 0px 0px', border:'1px solid transparent'}"
				>
					<BarcodeGenerator
						:value="l_barno"
						:format="'CODE128'"
						:background="'transparent'"
						:lineColor="'#000'"
						:width="2.3"
						:height="55"
						:fontSize="12"
						:elementTag="'svg'"/>
				</div>
				<div id="bar1" class="al-right-box bardiv-dataMatrix"
					:style="{height:'85px', align:'center'}">
					<ejs-datamatrixgenerator
						id="barcode"
						ref="datamatrixControl"
						width="85"
						height="90"
						:displayText="displaytext"
						:value="l_barno"
						mode="SVG"
					></ejs-datamatrixgenerator>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { ref } from 'vue'
import BarcodeGenerator from "@/components/label/BarcodeGenerator.vue";
import { DataMatrixGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
	name:'labelformat',
	components:{
		BarcodeGenerator,
		'ejs-datamatrixgenerator': DataMatrixGeneratorComponent,
	},
	props: [
    'barno',
		'ptdesc',
		'ptcode',
		'lotno',
		'date',
		'matnr',
		'maktx',
		'qty',
		'meins'
	],
	setup(props) {
		let l_barno = ref(props.barno);
		let l_ptdesc = ref(props.ptdes);
		let l_ptcode = ref(props.ptcode);
		let l_lotno = ref(props.lotno);
		let l_date = ref(props.date);
		let l_matnr = ref(props.matnr);
		let l_maktx = ref(props.maktx);
		let l_qty = ref(parseInt(props.qty) + " " + props.meins);

		let displaytext = ref({ text:l_barno.value, visibility:false});

		return{
			l_barno,
			l_ptdesc,
			l_ptcode,
			l_lotno,
			l_date,
			l_matnr,
			l_maktx,
			l_qty,
			displaytext
		}
	},
}
</script>
