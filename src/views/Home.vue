<template>
  <div id="home">
    <div id= "home_header">
      <MainHeader />
    </div>
    <div id="home_menutree">
      <MenuTree />
    </div>
    <div id="home_body"
      :style="{
        'height': `calc(${window_height - 119}px)`
      }"
    >
    </div>
  </div>
</template>

<script>
// import { provide } from "vue";
import {onMounted, onUnmounted, ref} from 'vue'
import MainHeader from '@/components/layout/MainHeader.vue'
import MenuTree from '@/components/layout/MenuTree.vue'
// import MainFooter from '@/components/layout/MainFooter.vue'
import global from "@/global";

export default {
  name: 'home',
  setup() {
    console.log("[Home] = setup -- ");

    let window_width = ref(window.innerWidth);
		let window_height = ref(window.innerHeight);

		onMounted(() => {
			console.log("[Home] = ", "onMounted--");
			window.addEventListener('resize', handleResize);
    });

		onUnmounted(() =>{
			console.log("[App] = onUnmounted -- ");
		});

		function handleResize() {
			window_width.value = window.innerWidth;
			window_height.value = window.innerHeight;
    }
    return {
			window_width,
			window_height,
		};
  },
  components: {
    MainHeader,
    MenuTree,
  },
  provide(){
    return{
      injectProps:'test',
      global: global,
    }
  }
}
</script>

<style lang="scss">
  /* 반응형 최대크기 */
  #home {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    // border-top:2px solid Yellow;
    // border-bottom:2px solid Yellow;
  }
  #home_header{
    width:100%;
    height:100%;
  }
  #home_menutree{
    width:100%;
    height:100%;
  }
  #home_body{
    width:100%;
  }
</style>
