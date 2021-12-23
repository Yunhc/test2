<template>
	<div :style="{ height:'630px'}">
		<p>QR code 생성</p>
			<div class="input-group">
				<span class="input-group-text" id="inputGroup-sizing-default">QR Barcode Data 입력</span>
				<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
					v-model="qr_values">
				<button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" @click="QRCreate">바코드 생성</button>
			</div>
		<div :style="{margin:'20px 0px 50px 0px'}">
			<qr-code
				align="center"
				v-bind:text="qrcode_1_text"
				size="200"
				error-level="H"
				@qrCode="getLink($event)"
			></qr-code>
		</div>
		<p>1차원 barcode 생성</p>
		<div>
			<div class="input-group">
				<span class="input-group-text" id="inputGroup-sizing-default">Barcode Data 입력</span>
				<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
					v-model="barcodeValue">
				<button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" @click="BarCreate">바코드 생성</button>
			</div>
			<svg id="barcode"></svg>
		</div>
	</div>
</template>
<script>
import VueQRCodeComponent from 'vue-qrcode-component';
import JsBarcode from 'jsbarcode';

export default {
	components:{
    'qr-code': VueQRCodeComponent,
  },
	data(){
		return{
			qr_values : 'https://www.naver.com',
			qrcode_1_text : 'https://www.naver.com',
			barcodeValue: '1234567890128',
		};
	},
	methods : {
		QRCreate(){
			this.qrcode_1_text = this.qr_values;
		},
		BarCreate(){
			JsBarcode("#barcode")
			.options({font: "OCR-B"}) // Will affect all barcodes
			.CODE128(this.barcodeValue, {height: 85, textPosition: "bottom", fontSize: 16, marginTop: 20})
			.render();
		}
	}
}
</script>
