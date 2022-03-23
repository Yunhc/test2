// 팝업메뉴 생성시 창을 띄워 메뉴를 선택하도록 한다.
<template>
	<div class="menu">
		<div class="menu-main-btn">
			<vue-horizontal :button="false">
				<section v-for="(pro, i) in menus" :key="i">
					<button type="button" class="btn btn-outline-dark btn-sm"
						:style="{border:'transparent', 'font-weight':'bold'}"
						:title="menus[i].name"
						:button_id="menus[i].id"
						@click="clickMainButton(i)">
						<!-- @mouseover="clickMainButton(i)" -->
						{{ menus[i].name }}
					</button>
				</section>
				<!-- <button type="button" class="btn btn-outline-dark btn-sm"
					:style="{ pading:'0px 5px' }"
					v-for="(pro, i) in menus"
					:key="i"
					:title="menus[i].name"
					:button_id="menus[i].id"
					@click="clickMainButton(i)">
					{{ menus[i].name }}
				</button> -->
			</vue-horizontal>
		</div>
		<div class="selected-menu">
			<div align="left" class="selected-menu-btn">
				<vue-horizontal :button="false">
					<button
						v-for="(tab, i) in tabs"
						:key="i"
						:class="['tab-button', tab.id=='home2'?{home:true}:{active: currentTab===tab.id}]"
						@click="changeComponent(tab)"
					>
						{{ tab.name }}
						<button :class="['tab-in-button']"
							v-if="tab.id != 'home2'"
							@click="exitComponent(tab)"
						>
							x
						</button>
					</button>
				</vue-horizontal>
			</div>
			<div class="menu_body" align="center"
				:style="{
					'height': `calc(${window_height - 119}px)`
				}"
			>
				<keep-alive :include="selectedTabs">
					<component :is="comp" class="tab" @component_close="component_close"></component>
				</keep-alive>
			</div>
		</div>
	</div>
	<div class="menupopup" align="left">
		<transition name="fade" apear>
			<div class="menupopup-black-bg" v-if="isOpen"	>
				<div class="menupopup-white-bg"
					@mouseleave="popupleave"
				>
					<div class="div_button" v-for="(pro, i) in menus_sub" :key="i">
						<button type="button"
							class="btn btn-link"
							:style="{color:isOver&subIndex==i?'rgb(31, 156, 93)':'DimGray'}"
							@click="clickSubButton(i)"
							@mouseover="mouseOver(i)"
							@mouseleave="mouseLeave()"
							v-if="menus[index].id==menus_sub[i].pid">
							★&nbsp;{{menus_sub[i].name}}
						</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import VueHorizontal from 'vue-horizontal';
import { onMounted, onUnmounted, reactive, ref, shallowRef } from 'vue'
import {useRouter} from 'vue-router';
// import selectedBtn from '@/components/form/SelectedButton.vue';

import $axios from 'axios';
import { useStore } from 'vuex';
import language from '@/assets/language.js';
import home2 from '@/views/Home2.vue';
import about from '@/views/About.vue';
import qrcode from '@/views/QRCode.vue';
import print from '@/views/Print.vue';
import room from '@/views/OneRoom.vue';
import good_receipt from '@/views/Good_Receipt.vue';
import usermanagement from '@/views/UserManagement.vue';
import auth_management from '@/views/Auth_Management.vue';
import master_company from '@/views/Master_Company.vue';
import good_receipt_order from '@/views/Good_Receipt_Order.vue';
import autolabeller_change_lot from '@/views/Autolabeller_Change_Lot.vue';
import autolabeller_production_result from '@/views/Autolabeller_Production_Result.vue';
import autolabeller_barcode_info from '@/views/Autolabeller_Barcode_Info.vue';
import quality_scrap from '@/views/Quality_Scrap.vue';
import mdi from '@/views/Mdi.vue';
import label_print_hist from '@/views/Label_Print_Hist.vue';
import parents from '@/views/Parents.vue';
import fg_receipt from '@/views/FG_Receipt.vue';
import good_issue from '@/views/Good_Issue.vue';
import good_issue_cancel from '@/views/Good_Issue_Cancel.vue';
import stock_search from '@/views/Stock_Search.vue';
import stockcount_online from '@/views/Stockcount_Online.vue';
import stockcount_offline from '@/views/Stockcount_Offline.vue';

export default {
	name:'menupopup',
	// Vue.component('my-button2', {
	// 	template: `<button @click="nice_fun()">개수확인</button>`
	// 	,methods:{
	// 		nice_fun:function(){
	// 			app2.nice = '버튼추가 개수:'+app2.buttons.length;
	// 		}
	// 	}
	// }),

	components: {
		VueHorizontal,
		home2,
		about,
		qrcode,
		print,
		room,
		master_company,
		usermanagement,
		auth_management,
		good_receipt,
		good_receipt_order,
		autolabeller_change_lot,
		autolabeller_production_result,
		autolabeller_barcode_info,
		quality_scrap,
		mdi,
		label_print_hist,
		parents,
		fg_receipt,
		good_issue,
		good_issue_cancel,
		stock_search,
		stockcount_online,
		stockcount_offline,
  },

  setup () {
		// let name = ref('menupopup');
		// props: ['title', 'button_id']; 	//속성값에 버튼이름과 버튼아이디를 넘겨 받도록 한다.
		let window_width = ref(window.innerWidth);
		let window_height = ref(window.innerHeight);

		const store = useStore();	//스토어호출
		const router = useRouter();	//라우터호출

		//화면 언어 설정
		let lang = ref(language.menupopup);

		let index = ref(-1); 						//누른 버튼의 인덱스
		let isOpen = ref(false); 				//버튼 클릭시 창을 보였다 안보였다 한다.
		let isOver = ref(false);
		let subIndex = ref(-1);
		let menus = reactive([]);
		let menus_sub = reactive([
			{pid: 'M000', id:'usermanagement', name:'사용자관리'},
			{pid: 'M000', id:'auth_management', name:'권한관리'},
			// {pid: 'M000', id:'print', name:'Print Test'},
			{pid: 'M000', id:'qrcode', name:'Barcode Test'},
			// {pid: 'M000', id:'mdi', name:'MDI Test'},
			// {pid: 'M100', id:'about', name:'About'},
			// {pid: 'M200', id:'room', name:'Room'},
			{pid: 'M100', id:'master_company', name:'회사코드 관리'},
			{pid: 'M200', id:'good_receipt', name:'구매입고'},
			{pid: 'M200', id:'good_receipt_order', name:'구매오더 조회'},
			{pid: 'M200', id:'autolabeller_change_lot', name:'Lot번호 일괄변경'},
			{pid: 'M200', id:'autolabeller_production_result', name:'오토라벨러 생산입고'},
			{pid: 'M200', id:'autolabeller_barcode_info', name:'바코드 정보'},
			{pid: 'M200', id:'quality_scrap', name:'폐기처리'},
			{pid: 'M250', id:'label_print_hist', name:'라벨 발행 이력'},
			// {pid: 'M250', id:'parents', name:'Slot 테스트'},
			{pid: 'M520', id:'fg_receipt', name:'Finished Goods Receipt'},
			{pid: 'M520', id:'good_issue', name:'Good Issue'},
			{pid: 'M520', id:'good_issue_cancel', name:'Issue Cancel'},
			{pid: 'M500', id:'stock_search', name:'재고 현황'},
			{pid: 'M520', id:'stockcount_online', name:'Stock Count(Online)'},
			{pid: 'M520', id:'stockcount_offline', name:'Stock Count(Offline)'},
		]);

		let comp = shallowRef(home2);
		let currentTab = ref("home2");
		let tabs =  ref([]);
		let selectedTabs = ref([]);

		let clickTabExit = ref(false); 	//Tab 종료 버튼을 클릭하면 컴포넌트 변환 버튼도 눌리게 된다.
		let ignoreClick = ref(false);		//이때 컴포넌트 변환 클릭 이벤트를 무시하도록한다.

		onMounted(() => {
			// console.log("[MenuPopup] = ", "onMounted--");
			tabs.value.push({id:'home2', name:'Home'});
			selectedTabs.value.push('home2');
			window.addEventListener('resize', handleResize);
			fn_Search_MainMenu();
    });

		onUnmounted(() =>{
			window.removeEventListener('resize', handleResize);
		});

		function handleResize() {
			window_width.value = window.innerWidth;
			window_height.value = window.innerHeight;
    }

		function clickMainButton(i){
			// alert(this.isOpen);
			if(index.value != i && isOpen.value == true)
				isOpen.value = true
			else
				isOpen.value = !isOpen.value;

			index.value = i;
    }

		function clickSubButton(i){
      // alert(this.button_id);
			// router.push({ path: menus_sub[i].id });

			let isIncluld = ref(false);
			for(var j=0; j<tabs.value.length; j++)
			{
				if(tabs.value[j].id == menus_sub[i].id) {
					isIncluld.value = true;
					break;
				}
			}
			if(isIncluld.value){
				changeComponent({id:menus_sub[i].id, name:menus_sub[i].name});
			}
			else{
				//탭순서를 앞쪽으로 넣기위해 변경
				if (tabs.value.length > 1){
					tabs.value.splice(0, 1);
					tabs.value.unshift({id:menus_sub[i].id, name:menus_sub[i].name});
					tabs.value.unshift({id:'home2', name:'Home'});

					selectedTabs.value.splice(0, 1);
					selectedTabs.value.unshift(menus_sub[i].id);
					selectedTabs.value.unshift("home2");
				}
				else{
					tabs.value.push({id:menus_sub[i].id, name:menus_sub[i].name});
					selectedTabs.value.push(menus_sub[i].id);
				}
				changeComponent({id:menus_sub[i].id, name:menus_sub[i].name});
			}

			isOpen.value = false;
			subIndex.value = -1;
    }

		function clickHomeButton(){
			// alert (this.menus[i]);
			router.push({ path: "home2" });
		}
		function mouseOver(i){
			isOver.value = true;
			subIndex.value = i;
		}

		function mouseLeave(){
			isOver.value = false;
			subIndex.value = -1;
		}

		function popupleave()
		{
			isOpen.value = !isOpen.value;
		}

		function changeComponent(selmenu) {
			// console.log("[MenuPopup] = changeComponent -- ", selmenu.id);

			if (clickTabExit.value){
				clickTabExit.value = false;
				ignoreClick.value = true;

				comp.value = selmenu.id;
				currentTab.value = selmenu.id;
				// console.log("[MenuPopup] = currentTab -- ", selmenu.id);
			}
			else{
				if (ignoreClick.value){
					ignoreClick.value = false;
				}
				else{
					comp.value = selmenu.id;
					currentTab.value = selmenu.id;
					// console.log("[MenuPopup] = currentTab -- ", selmenu.id);
				}
			}
    }

		function exitComponent(selmenu) {
      // console.log("[MenuPopup] = exitComponent -- ", selmenu.id);

			var nIndex = -1;
			var j=0;
			for(j=0; j<tabs.value.length; j++)
			{
				if(tabs.value[j].id == selmenu.id) {
					nIndex = j;
					break;
				}
			}
			if( nIndex>0 ){
				// console.log("[MenuPopup] = exitComponent - index -- ", nIndex);

				tabs.value.splice(nIndex, 1);
				selectedTabs.value.splice(nIndex,1);
			}

			clickTabExit.value = true; //Tab에서 종료 버튼을 누르면 changeComponent 함수를 두번 탄다. 이것을 방지하기 위해 변수 사용함
			if (tabs.value.length > 1){
				changeComponent(tabs.value[1]);
			}else{
				changeComponent(tabs.value[0]);
			}

      // comp.value = lastsel.value;
      // currentTab.value = lastsel.value;
    }

		// exitComponent와 동일한 함수이다. 파라미터 형식만 틀림
		function component_close(selmenu) {
      // console.log("[MenuPopup] = component_close -- ", selmenu);

			var nIndex = -1;
			var j=0;
			for(j=0; j<tabs.value.length; j++)
			{
				if(tabs.value[j].id == selmenu) {
					nIndex = j;
					break;
				}
			}
			if( nIndex>0 ){
				// console.log("[MenuPopup] = exitComponent - index -- ", nIndex);

				tabs.value.splice(nIndex, 1);
				selectedTabs.value.splice(nIndex,1);
			}

			clickTabExit.value = false;
			if (tabs.value.length > 1){
				changeComponent(tabs.value[1]);
			}else{
				changeComponent(tabs.value[0]);
			}

      // comp.value = lastsel.value;
      // currentTab.value = lastsel.value;
    }


		function fn_Search_MainMenu(){
			let urlPost = process.env.VUE_APP_SERVER_URL + '/api/dw/menu/searchList';

			$axios.post(urlPost, {
				lang : store.state.setup.language,
				userid: store.state.auth.user[0].userid,
				menuid:"",
				menuname: "",
				useflag: "Y"
			})
			.then((res) => {
				// console.log("[response data]", res.data);
				if(res.data.length > 0){
          menus.splice(0, menus.length);
          for(var i=0; i<res.data.length; i++){

              // menus.push({id:res.data[i].menuid, name:res.data[i].menuname});
							menus.push({id:res.data[i].menuid, name:lang.value[res.data[i].menuid][store.state.setup.language]});
          }
        }


			}) //인자로 넣어주는 함수니 콜백함수. 함수가 메서드가 아니므로 this는 method다. 콜백함수는 무조건 화살표쓴다
				//.then(res => this.photos = res.data ) //리턴 없고 인자도 하나니 이렇게 가능하다
			.catch(err => {
				alert(err);
				// console.error(err)
			})
		}

    return {
			index,
			isOpen,
			isOver,
			subIndex,
			menus,
			menus_sub,
			tabs,
			comp,
			currentTab,
			selectedTabs,
			clickMainButton,
			clickSubButton,
			clickHomeButton,
			mouseOver,
			mouseLeave,
			popupleave,
			changeComponent,
			exitComponent,
			component_close,
			window_width,
			window_height,
			handleResize,
    }
  },
}
</script>
<style lang="scss">
	section{
		height: 40px;
		padding: 4px 5px 0px 5px;
		// border: yellow;
		// border-top:1px solid blue;
		// border-left:1px solid blue;
		// border-right:1px solid blue;
    // border-bottom:1px solid blue;
	}
  .menu{
		width:100%px;
		height:100%;
		text-align:left;
		font-size:12px;
		// margin:0px 0px 0px 0px;
		background:white;

		// border-top:2px solid blue;
		// border-left:2px solid blue;
		// border-right:2px solid blue;
    // border-bottom:2px solid blue;
  }
	.menu-main-btn{
		font-size:20px;
		font-weight:bold;
		width: 100%;
		// width: 420px;
		height: 40px;
		padding: 0px 10px 0px 10px;
		margin: -2px 0px 0px 0px;
		background:white;
		position:fixed;
		top: 38px;

		// border-top:1px solid red;
		// border-left:1px solid red;
		// border-right:1px solid red;
    // border-bottom:1px solid red;
	}
	.selected-menu{
		width:100%;
		background:white;
	}
	.selected-menu-btn{
		width:100%;
		height: 36px;
		background:gainsboro;
		position:fixed;
		top: 75px;

		// border-top:1px solid green;
		// border-left:1px solid green;
		// border-right:1px solid green;
    // border-bottom:1px solid green;
	}
	.menupopup-black-bg{
		width: 100%;
		height: 300px;
		// background: rgba(0,0,0,255);
		background: white;
		position: fixed;
		top: 75px;
		padding: 1px 5px 1px 5px;
		margin: 0px 0px 0px 0px;
		z-index: 1; //div를 최상위로 올린다.
	}
	.menupopup-white-bg{
		border-top:1px solid #35495e;
		border-left:1px solid #35495e;
		border-right:1px solid #35495e;
		border-bottom:1px solid #35495e;

		width: 100%;
		height: 100%;
		background: white;
		// border-radius: 8px;
		// padding: 20px;
	}
	.menu_body{
		width:100%;
		margin: 2px 0px 0px 0px;

		position:fixed;
		top: 110px;
	}
	.tab-button {
		font-size:14px;
		height: 33px;
		padding: 3px 2px 6px 20px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		border: 1px solid #ccc;
		cursor: pointer;
		background: #f0f0f0;
		margin-top: 3px;
		margin-bottom: -1px;
		margin-right: -1px;
	}
	.tab-button:hover {
		// background: #e0e0e0;
		background:rgb(97, 170, 47);
	}
	.tab-button.active {
		// background: #e0e0e0;
		background:rgb(97, 170, 47);
		color: white;
	}
	.tab-button.home {
		padding: 6px 20px 6px 20px;
		// background: #e0e0e0;
		background:transparent;
		// background:Yellow;
		border: 1px solid transparent;
	}
	.tab-in-button {
		height: 26px;
		border: 1px solid transparent;
		// background:#f0f0f0;
		background: transparent;
		margin-left: 10px;
	}
</style>
