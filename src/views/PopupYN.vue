<template>
	<div class="popup-black-bg">
		<div class="popup-white-bg">
			<h6>{{strTitle}}</h6>
			<h4>{{strMsg}}</h4>
			<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 10px 0px 0px', width:'70px'}"
				@click='yesClick'>Yes</button>
			<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'5px 5px 0px 0px', width:'70px'}"
				@click='noClick'>No</button>
		</div>
	</div>
</template>
<script>
import { ref } from 'vue'

export default {
  name:'popupyn',
  props:['title', 'message'],
  setup(props,{emit}){
    let strTitle = ref(props.title);
    let strMsg = ref(props.message);

    function yesClick(){
      emit("yesClick", "popupyn");
    }
    function noClick(){
      emit("noClick", "popupyn");
    }
    return{
      strTitle,
      strMsg,
      yesClick,
      noClick
    }
  },
}
</script>
<style lang="scss">
  .popup-black-bg{
    width: 100%;
		height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
		padding: 20px;
    z-index: 100; //div를 최상위로 올린다.
  }
  .popup-white-bg{
    width: 100%;
    background: white;
    border-radius: 8px;
    padding: 20px;
  }
</style>