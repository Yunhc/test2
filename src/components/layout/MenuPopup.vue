// 팝업메뉴 생성시 창을 띄워 메뉴를 선택하도록 한다.
<template>
	<div>
		<div>
			<button type="button" class="btn btn-outline-dark btn-sm" :style="{ margin:'5px', border:'white'}"
				v-for="(pro, i) in menus"
				:key="i"
				:title="menus[i].name"
				:button_id="menus[i].id"
				@click="clickMainButton(i)">
				{{ menus[i].name }}
			</button>
		</div>
		<div align="left" class="selectedmenu">
			<!-- <button type="button" class="btn btn-outline-dark btn-sm" :style="{ margin:'2px 0 0 5px'}"
			@click=clickHomeButton>
				Home
			</button> -->

			<!-- <div id="app2">
				<button @click="add">버튼추가</button><br>
				<component v-for="(item, i) in buttons" v-bind:is="item" :key="i"></component>
					<button @click="nice_fun()">개수확인</button>
			</div> -->

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
					X
				</button>
			</button>
			<div align="center">
				<keep-alive :include="selectedTabs">
					<component :is="comp" class="tab"></component>
				</keep-alive>
			</div>
		</div>
	</div>
	<div>
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

						<!-- <button type="button" class="btn-outline-dark btn-sm" :style="{ margin:'5px', width: '150px'}"
							@click="clickSubButton(i)"
							v-if="menus[index].id==menus_sub[i].pid">
							{{menus_sub[i].name}}
						</button> -->
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import { onMounted, reactive, ref } from 'vue'
import {useRouter} from 'vue-router';
// import selectedBtn from '@/components/form/SelectedButton.vue';

import home2 from '@/views/Home2.vue'
import about from '@/views/About.vue'
import qrcode from '@/views/QRCode.vue'
import print from '@/views/Print.vue'
import room from '@/views/OneRoom.vue'
import usermanagement from '@/views/UserManagement.vue'
import mdi from '@/views/Mdi.vue'
import parents from '@/views/Parents.vue'

export default {

  setup () {
		// let name = ref('menupopup');
		// props: ['title', 'button_id']; 	//속성값에 버튼이름과 버튼아이디를 넘겨 받도록 한다.

		const router = useRouter();	//라우터호출

		let index = ref(-1); 						//누른 버튼의 인덱스
		let isOpen = ref(false); 				//버튼 클릭시 창을 보였다 안보였다 한다.
		let isOver = ref(false);
		let subIndex = ref(-1);
		let menus = reactive([
			{id:'system', name:'시스템관리'},
			{id:'basic', name:'기준정보관리'},
			{id:'order', name:'오더관리'},
			{id:'label', name:'라벨발행 이력'},
			]);
		let menus_sub = reactive([
			{pid: 'system', id:'usermanagement', name:'사용자관리'},
			{pid: 'system', id:'print', name:'Print Test'},
			{pid: 'system', id:'qrcode', name:'Barcode Test'},
			{pid: 'system', id:'mdi', name:'MDI Test'},
			{pid: 'basic', id:'about', name:'About'},
			{pid: 'order', id:'room', name:'Room'},
			{pid: 'label', id:'parents', name:'Slot 테스트'},
		]);

		let comp = ref(home2);
    let currentTab = ref("home2");
		let tabs =  reactive([]);
		let selectedTabs = ref([]);
		let clickTabExit = ref(false); 	//Tab 종료 버튼을 클릭하면 컴포넌트 변환 버튼도 눌리게 된다.
		let ignoreClick = ref(false);		//이때 컴포넌트 변환 클릭 이벤트를 무시하도록한다.

		onMounted(() => {
			console.log("[MenuPopup] = ", "onMounted--");
			// tabs.push('home2');
			tabs.push({id:'home2', name:'Home'});
			selectedTabs.value.push('home2');
			// console.log("[MenuPopup] = tabs --", tabs);
    });

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

			console.log("[MenuPopup] = clickSubButton  tabs-- ", tabs);
			let isIncluld = ref(false);
			for(var j=0; j<tabs.length; j++)
			{
				if(tabs[j].id == menus_sub[i].id) {
					isIncluld.value = true;
					break;
				}
			}
			if(isIncluld.value){
				changeComponent({id:menus_sub[i].id, name:menus_sub[i].name});

			}
			else{
				changeComponent({id:menus_sub[i].id, name:menus_sub[i].name});
				tabs.push({id:menus_sub[i].id, name:menus_sub[i].name});
				selectedTabs.value.push(menus_sub[i].id);
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
			console.log("[MenuPopup] = changeComponent -- ", selmenu.id);

			if (clickTabExit.value){
				clickTabExit.value = false;
				ignoreClick.value = true;

				comp.value = selmenu.id;
				currentTab.value = selmenu.id;
				console.log("[MenuPopup] = currentTab -- ", selmenu.id);
			}
			else{
				if (ignoreClick.value){
					ignoreClick.value = false;
				}
				else{
					comp.value = selmenu.id;
					currentTab.value = selmenu.id;
					console.log("[MenuPopup] = currentTab -- ", selmenu.id);
				}
			}
    }

		function exitComponent(selmenu) {
      console.log("[MenuPopup] = exitComponent -- ", selmenu.id);

			var nIndex = -1;
			for(var j=0; j<tabs.length; j++)
			{
				if(tabs[j].id == selmenu.id) {
					nIndex = j;
					break;
				}
			}
			if( nIndex>0 ){
				tabs.splice(nIndex, 1);
				selectedTabs.value.splice(nIndex,1);
			}



			// console.log("[MenuPopup] = tabs.length -- ", tabs.length);
			// console.log("[MenuPopup] = tabs -- ", tabs);
			// let lastsel = ref(tabs[tabs.length - 1].id);
			// console.log("[MenuPopup] = lastsel -- ", lastsel.value);

			clickTabExit.value = true;
			changeComponent(tabs[tabs.length - 1]);
      // comp.value = lastsel.value;
      // currentTab.value = lastsel.value;
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
    }
  },
}
</script>
<style lang="scss">
  .menu-item{
		border-top:1px solid #35495e;
		border-left:1px solid #35495e;
		border-right:1px solid #35495e;
    border-bottom:1px solid #35495e;
		width:800px;
    height:600px;
    text-align:center;
    font-size:16px;
    color:#41b883;
  }

	body{
		margin : 0
	}
	div{
		box-sizing: border-box;
	}
	.menupopup-black-bg{
		width: 70%; height: 30%;
		// background: rgba(0,0,0,255);
		background: white;
		position: fixed;
		padding: 1px;
		margin:-42px 0 0 5px;
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
	.tab-button {
		font-size:14px;
		height: 33px;
		padding: 6px 2px 6px 20px;
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
