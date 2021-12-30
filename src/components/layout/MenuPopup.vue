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
			<button type="button" class="btn btn-outline-dark btn-sm" :style="{ margin:'2px 0 0 5px'}"
			@click=clickHomeButton>
				Home
			</button>
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
export default {
  name: 'menupopup',
  props: ['title', 'button_id'], //속성값에 버튼이름과 버튼아이디를 넘겨 받도록 한다.
  data () {
    return {
			index : -1, 			//누른 버튼의 인덱스
      isOpen: false, 	//버튼 클릭시 창을 보였다 안보였다 한다.
			isOver:false,
			subIndex:-1,
			menus : [
        {id:'system', name:'시스템관리'},
        {id:'basic', name:'기준정보관리'},
        {id:'order', name:'오더관리'},
        {id:'label', name:'라벨발행 이력'},
        ],
			menus_sub : [
				{pid: 'system', id:'usermanagement', name:'사용자관리'},
				{pid: 'system', id:'print', name:'Print Test'},
				{pid: 'system', id:'qrcode', name:'Barcode Test'},
        {pid: 'basic', id:'about', name:'About'},
        {pid: 'order', id:'room', name:'Room'},
        {pid: 'label', id:'parents', name:'Slot 테스트'},
      ],
    }
  },
	methods : {
    clickMainButton(i){
			// alert(this.isOpen);
			if(this.index != i && this.isOpen == true)
				this.isOpen = true
			else
				this.isOpen = !this.isOpen;

			this.index = i;
    },
		clickSubButton(i){
      // alert(this.button_id);
			this.$router.push({ path: this.menus_sub[i].id });
			this.isOpen = false;
			this.subIndex = -1;
    },
		clickHomeButton(){
			// alert (this.menus[i]);
			this.$router.push({ path: "home" });
		},
		mouseOver(i){
			this.isOver = true;
			this.subIndex = i;
		},
		mouseLeave(){
			this.isOver = false;
			this.subIndex = -1;
		},
		popupleave()
		{
			this.isOpen = !this.isOpen;
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
</style>
