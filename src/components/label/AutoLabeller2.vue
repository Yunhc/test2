<template>
	<div id="print_obj"
		class="print-autolabeller2"
	>
		<div class="print-al-content">
			<!-- <div class="print-line"
				:style="{ height:'258px', margin:'0px 0px 0px 122px'}">
			</div>
			<div class="print-line"
				:style="{ height:'75px', margin:'183px 0px 0px 262px'}">
			</div>
			<div class="print-line"
				:style="{ height:'75px', margin:'183px 0px 0px 360px'}">
			</div> -->

			<div class="input-group mb-3 div-center " :style="{margin:'0px 0px 0px 0px', 'z-index': '31'}">
				<label class="form-label"
					:style="{width:'120px', fontSize:'36px', padding:'30px 0px 0px 0px'}">
					품&nbsp;&nbsp;명
				</label>
				<div class='print-line-v-4'></div>
				<input type="text" class="form-control btn-sm"
					:style="{height:'105px', fontSize:'110px', padding:'0px 0px 10px 0px', 'text-align':'center'}"
					v-model="l_ptcode"
				>
			</div>

			<div class="input-group mb-3 div-center " :style="{margin:'-16px 0px 0px 0px', 'z-index': '32'}">
				<label class="form-label"
					:style="{width:'120px', fontSize:'36px', padding:'10px 0px 0px 0px'}">
					생산일
				</label>
				<div class='print-line-v-5'></div>
				<input type="text" class="form-control btn-sm"
					:style="{height:'71px', fontSize:'60px', padding:'0px 10px 0px 0px', 'text-align':'center'}"
					v-model="l_date"
				>
			</div>
			<div class="input-group mb-3 div-center" :style="{margin:'-16px 0px 0px 0px', 'z-index': '33'}">
				<label class="form-label"
					:style="{width:'120px', fontSize:'36px', padding:'10px 0px 0px 0px'}">
					순&nbsp;&nbsp;번
				</label>
				<div class='print-line-v-5'></div>
				<input type="text" class="form-control btn-sm"
				:style="{height:'71px', fontSize:'60px', padding:'0px 10px 0px 0px', 'text-align':'center'}"
					v-model="l_lotno"
				>
				<div class='print-line-v-5'></div>
				<label class="form-label"
					:style="{width:'100px', fontSize:'36px', padding:'10px 0px 0px 0px'}">
					수&nbsp;량
				</label>
				<div class='print-line-v-5'></div>
				<input type="text" class="form-control btn-sm"
				:style="{height:'71px', fontSize:'60px', padding:'0px 10px 0px 0px', 'text-align':'center'}"
					v-model="l_qty"
				>
			</div>
			<div class="div-close" :style="{height:'90px', margin:'-15.5px 0px 0px 0px', 'z-index': '34'}">
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
import { formatDate } from '@/helper/filter.js';

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
		// let l_ptcode = ref(props.ptcode);
		// let l_lotno = ref(props.lotno);

		let l_ptcode = "ROBM";
		let l_lotno = "29"

		let l_date = formatDate(ref(props.date), "YYYY.MM.DD");
		let l_matnr = ref(props.matnr);
		let l_maktx = ref(props.maktx);
		let l_qty = ref(parseInt(props.qty));

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
