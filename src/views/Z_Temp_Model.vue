<template>
	<div class="window-main">
		<div class="window-search-3">
			<div class="window-div-left">
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{width:'80px'}">
							플랜트
						</span>
						<select class="form-select btn-sm" aria-label="Default select example"
							id="stor_loc"
							ref="stor_loc"
							@change ='keyupenter'
							v-model="req_param.stor_loc">
							<!-- <option disabled value="">Select location</option>
							<option v-for="(d, i) in options" :key="i" :value="d.id">{{ d.id }}</option> -->
						</select>
					</div>
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{width:'80px'}">
							발행일자
						</span>
						<v-date-picker
							mode="date"
							v-model="date"
							locale="en"
							title-position="center"
							color="green"
							:style="{width:'78.5%', margin:'0px 0px 0px 0px'}"
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
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{width:'80px', margin:'0px 0px 0px 0px'}">
							자재코드
						</span>
						<input type="text" class="form-control btn-sm" placeholder="UserName" aria-label="UserID" aria-describedby="basic-addon1"
						>
					</div>
				</form>
			</div>
			<div class="window-div-left">
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{width:'80px', margin:'0px 0px 0px 5px'}">
							저장위치
						</span>
						<select class="form-select btn-sm" aria-label="Default select example"
							id="stor_loc"
							ref="stor_loc"
							@change ='keyupenter'
							v-model="req_param.stor_loc">
							<!-- <option disabled value="">Select location</option>
							<option v-for="(d, i) in options" :key="i" :value="d.id">{{ d.id }}</option> -->
						</select>
					</div>
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{ margin:'0px 0px 0px 5px'}">
							바코드NO
						</span>
						<input type="text" class="form-control btn-sm" placeholder="UserName" aria-label="UserID" aria-describedby="basic-addon1"
						>
					</div>
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{width:'80px', margin:'0px 0px 0px 5px'}">
							자재내역
						</span>
						<input type="text" class="form-control btn-sm" placeholder="UserName" aria-label="UserID" aria-describedby="basic-addon1"
						>
					</div>
				</form>
			</div>
			<div class="window-div-left">
				<form class="d-flex" :style="{height:'37px'}" >
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
				</form>
				<form class="d-flex" :style="{height:'37px'}" >
					<div class="input-group mb-3" :style="{ margin:'5px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1"
							:style="{width:'80px', margin:'0px 0px 0px 5px'}">
							오더번호
						</span>
						<input type="text" class="form-control btn-sm" placeholder="UserName" aria-label="UserID" aria-describedby="basic-addon1"
						>
					</div>
				</form>
			</div>
			<div class="window-div-right">
				<div :style="{ margin:'5px 0px 0px 0px'}"
					div align="right">
					<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 10px', height:'32px'}"
						@click='searchClick_post' >Search</button>
				</div>
			</div>
		</div>

		<div class="window-grid-1"
      :style="{
        'height': `calc(${window_height - 109 - 98 - 123}px)`
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
import { AgGridVue } from 'ag-grid-vue3'
// import { useStore } from 'vuex';
// import { addDate } from '@/helper/filter.js';

export default {
	name:'z_temp_model',
	components:{
    AgGridVue,
	},
	setup() {
		// let url = ref(process.env.VUE_APP_SERVER_URL);
		let window_width = ref(window.innerWidth);
		let window_height = ref(window.innerHeight);
		// const store = useStore();	//스토어호출

		//달력
    let isDark = ref(false);
    let isRange = ref(true);
    let date = ref({start:new Date(), end:new Date()});


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
		};

		onMounted(() => {
			console.log("[z] = ", "onMounted--");
			window.addEventListener('resize', handleResize);

			if (isRange.value == true){
        console.log("[z_temp_model] = onMounted -- start --", date.value.start);
        console.log("[z_temp_model] = onMounted -- end --", date.value.end);
      }
      else{
        date.value = new Date();
        console.log("[z_temp_model] = onMounted -- date --", date.value);
      }
		});

		onUnmounted(() =>{
			console.log("[z_temp_model] = onUnmounted -- ");
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
			isDark,
			isRange,
			date,
		}
	},
}
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>