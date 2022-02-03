<template>
	<div class="window-main">
		<div class="window-search">
		</div>

		<div class="window-grid-1"
      :style="{
        'height': `calc(${window_height - 109 - 140 - 123}px)`
      }"
    >
      <ag-grid-vue
        class="ag-theme-alpine"
        headerHeight='35'
        style="width: 1910px; height:100%"
        :rowData="recvData.value"
        :gridOptions="gridOptions"
        allow_unsafe_jscode="True"
        >
      </ag-grid-vue>
		</div>

		<div class= "window-save-1">
		</div>
	</div>
</template>
<script>
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import {AgGridVue} from 'ag-grid-vue3'

export default {
	name:'z_temp_model',
	components:{
    AgGridVue,
	},
	setup() {
		// let url = ref(process.env.VUE_APP_SERVER_URL);
		let window_width = ref(window.innerWidth);
		let window_height = ref(window.innerHeight);

		// ag-grid 데이터 변수
		let recvData = reactive([]);
		let gridApi = ref(null);
    let columnApi = ref(null);
		let columnDefs= reactive([
			{headerName: 'Material', field: 'matnr', width: 20, cellStyle: {textAlign: "center"}, sortable: true, pinned: 'left'},
			{headerName: 'Order Qty(BDL)', field: 'orderqtybdl', width: 15, cellStyle: {textAlign: "right", color: 'red'}, pinned: 'left'},
			{headerName: 'Status', field: 'ztype', width: 8, cellStyle: {textAlign: "center"}},
		]);
		var gridOptions = {
			defaultColDef: {
				width: 150,
				editable: false,
				resizable: true,
				sortable: true,
				lockPosition: true, //컬럼 드래그로 이동 방지
				cellStyle: {textAlign: "left"},
			},
			columnDefs: columnDefs,
			rowData: null,
			rowSelection: 'multiple',   //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
			onGridReady: function(event) {
				setTimeout(function () {
					event.api.setRowData(recvData);
				}, 1000);
				gridApi.value = event.api;
				columnApi.value = event.columnApi;
				event.api.sizeColumnsToFit();
			},
			getRowHeight: function() {
				return 35;
			},
			onGridSizeChanged: function(event) {
				event.api.sizeColumnsToFit();
			},
		};

		onMounted(() => {
			console.log("[label_print_hist] = ", "onMounted--");
			window.addEventListener('resize', handleResize);
		});

		onUnmounted(() =>{
			console.log("[label_print_hist] = onUnmounted -- ");
			window.removeEventListener('resize', handleResize);
		});

		function handleResize() {
			window_width.value = window.innerWidth;
			window_height.value = window.innerHeight;
		}

		return {
			window_width,
			window_height,
			recvData,
			gridOptions,
		}
	},
}
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>