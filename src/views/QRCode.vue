<template>
	<div class="window-main">
		<div :style="{padding:'10px 0px 0px 0px'}">
			<p>QR code 생성</p>
		</div>
		<div class="input-group">
			<span class="input-group-text" id="inputGroup-sizing-default">QR Barcode Data 입력</span>
			<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
				v-model="qr_values">
			<button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" @click="QRCreate">바코드 생성</button>
		</div>
		<div :style="{width:'100%', height:'250px', background:'transparent', border:'1px solid transparent'}">
			<div class="left-box-50" :style="{margin:'20px 0px 20px 0px'}">
				<qr-code
					align="center"
					v-bind:text="qrcode_1_text"
					size=200
					error-level="H"
					@qrCode="getLink($event)"
				></qr-code>
			</div>
			<div class="right-box-50" :style="{margin:'20px 0px 20px 0px', border:'1px solid transparent'}">
				<div id="bar1" class="barcodeStyle">
					<ejs-datamatrixgenerator
						id="barcode"
						ref="datamatrixControl"
						width='100px'
						height='150px'
						:displayText="displaytext"
						:value="dataMatrixvalue"
						mode="SVG"
					></ejs-datamatrixgenerator>
				</div>
			</div>
		</div>
		<div :style="{margin:'10px 0px 0px 0px', border:'1px solid transparent'}">
			<p>1차원 barcode 생성</p>
		</div>
		<div>
			<div class="input-group">
				<span class="input-group-text" id="inputGroup-sizing-default">Barcode Data 입력</span>
				<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
					v-model="barcodeValue">
				<button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" @click="BarCreate">바코드 생성</button>
			</div>
			<svg id="barcode1"></svg>
			<!-- <div class="bardiv-normal"
				align='center'
				:style="{height:'85px', margin:'0px 0px 0px 0px', border:'1px solid transparent'}"
			>
				<BarcodeGenerator
					:value="barno1"
					:format="'CODE128'"
					:background="'transparent'"
					:lineColor="'#000'"
					:width="2.3"
					:height="55"
					:fontSize="12"
					:elementTag="'svg'"/>
			</div> -->
		</div>
	</div>
</template>
<script>
import { ref } from 'vue';
import VueQRCodeComponent from 'vue-qrcode-component';
import JsBarcode from 'jsbarcode';
import { DataMatrixGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';
// import { DataMatrixGenerator } from '@syncfusion/ej2-vue-barcode-generator';
// import { BarcodeGeneratorComponent, QRCodeGeneratorComponent, DataMatrixGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';
// import BarcodeGenerator from "@/components/label/BarcodeGenerator.vue";

export default {
	name: 'qrcode',
	components:{
    'qr-code': VueQRCodeComponent,
		'ejs-datamatrixgenerator': DataMatrixGeneratorComponent,
		// BarcodeGenerator
  },
	setup(){
		let dataMatrixvalue = ref('https://www.naver.com');
		let displaytext = ref({text:dataMatrixvalue.value, visibility:false});

		let qr_values = ref('https://www.naver.com');
		let qrcode_1_text = ref('https://www.naver.com');

		let barcodeValue = ref('012345678912');
		// let barno1 = ref('012345678912');

		function QRCreate(){
			qrcode_1_text.value = qr_values.value;
			dataMatrixvalue.value = qr_values.value;
		}

		function BarCreate(){
			// barno1.value = barcodeValue.value;
			// console.log(barno1.value);

			JsBarcode("#barcode1")
			.options({font: "OCR-B"}) // Will affect all barcodes
			.CODE128(this.barcodeValue, {height: 85, textPosition: "bottom", fontSize: 16, marginTop: 20})
			.render();
		}

		return{
			qr_values,
			qrcode_1_text,
			dataMatrixvalue,
			displaytext,
			barcodeValue,
			// barno1,
			QRCreate,
			BarCreate
		}
	},
	// data(){
	// 	return{
	// 		qr_values : 'https://www.naver.com',
	// 		qrcode_1_text : 'https://www.naver.com',
	// 		barcodeValue: '1234567890128',

	// 		width: "100px",
	// 		height: "150px",
	// 		type: "DataMatrix",
	// 		dataMatrixvalue: "https://www.naver.com",
	// 		mode: "SVG",
	// 		displaytext: { text: 'DataMatrix', visibility:false}
	// 	};
	// },
	// methods : {
	// 	QRCreate(){
	// 		this.qrcode_1_text = this.qr_values;
	// 		this.dataMatrixvalue = this.qr_values;
	// 	},
	// 	BarCreate(){
	// 		JsBarcode("#barcode")
	// 		.options({font: "OCR-B"}) // Will affect all barcodes
	// 		.CODE128(this.barcodeValue, {height: 85, textPosition: "bottom", fontSize: 16, marginTop: 20})
	// 		.render();
	// 	},

	// 	DataMatrixCreate(){
	// 		let barcode = new DataMatrixGenerator({
	// 			width: '100px',
	// 			height: '200px',
	// 			type: "DataMatrix",
	// 			value: "wavelink-123456789",
	// 			mode: "SVG",
	// 			displaytext: { text: 'DataMatrix', visibility:false}
	// 		});
	// 		barcode.appendTo('#bar1');

	// 		// this.barcode.width = '100px';
	// 		// this.barcode.height= '150px';
	// 		// this.barcode.type= "DataMatrix";
	// 		// this.barcode.value= "wavelink-123456789";
	// 		// this.barcode.mode= "SVG";
	// 		// this.barcode.displaytext= { text: 'DataMatrix', visiblilit:false};
	// 	}
	// },
	// Mounted(){
	// },
	// created(){
	// 	// console.log("[QRCode] = create -- ")
	// }
}
</script>
<style>
.barcodeStyle {
	height: 200px;
	width: 250px;
	/* padding-left: 1%;
	padding-top: 1%; */

	/* border:1px solid red; */
}
</style>
