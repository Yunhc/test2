<template>
  <div id="main">
    <div id= "header">
      <MainHeader />
    </div>
    <div id="menutree">
      <MenuTree />
    </div>
    <div id="body"
      :style="{
        'height': `calc(${window_height - 119}px)`
      }"
    >
        <router-view/>
    </div>
    <!-- <div>
      {{ window_width }}, {{ window_height }}
    </div> -->
    <!-- <div id="footer">
      <MainFooter />
    </div> -->
  </div>
</template>

<script>
// import { provide } from "vue";
import {onMounted, onUnmounted, ref} from 'vue'
import MainHeader from './components/layout/MainHeader.vue'
import MenuTree from './components/layout/MenuTree.vue'
// import MainFooter from './components/layout/MainFooter.vue'
import global from "@/global";

export default {
  name: 'App',
  setup() {
    console.log("[App] = setup -- ");

    let window_width = ref(window.innerWidth);
		let window_height = ref(window.innerHeight);

		onMounted(() => {
			console.log("[App] = ", "onMounted--");
			window.addEventListener('resize', handleResize);

      //화면을 처음 띄울 때 로그인 정보를 초기화 한다.
      // localStorage.removeItem('user');
    });

		onUnmounted(() =>{
			console.log("[App] = onUnmounted -- ");
			// window.addEventListener('resize', handleResize);
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
  created () {
    console.log("[App] = process.env -- ", process.env);
  },
  components: {
    MainHeader,
    MenuTree,
    // MainFooter,
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
  #main {
    margin:0 auto;
    width:100%;
    height:100%;
    // border-bottom:1px solid #070707;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #header{
    width:100%;
    height:100%;
  }
  #menutree{
    width:100%;
    height:100%;
  }
  #body{
    width:100%;
    // height:100%;
    // height:929px;
    // height : 100%;
    // background-color:yellow;
    // border-top:1px solid #070707;
    // border-bottom:1px solid #070707;
  }
  // #footer{
  //   width:100%;
  // }
  // #footer{
  //   transition:all .3s linear;
  //   width:750px;
  //   height:60px;
  //   position:fixed;
  //   border-top:1px #D8D8D8 solid;
  //   margin:0 auto;
  //   z-index:50;
  //   text-align:center;
  //   background-color:#BDBDBD;
  // }
  // .nav-show{ bottom:0; transition:all .3s linear; }
  // .nav-hide{ bottom:-70px; transition:all .3s linear; }
  // .nav-box{ width:25%; float:left; }
  // .nav-box div{ width:40px; height:40px; margin:10px; display: inline-block; line-height:40px; border-radius:50%; cursor:pointer; }
  // .nav-box div a{ text-decoration:none; }
  // .nav-box-default{ transition:all .1s linear; background-color:black; }
  // .nav-box-selected{ transition:all .1s linear; background-color:blue; }
  // .nav-box-circle{ color:white; font-weight:bold; }
  // @media(max-width: 750px){
  //   #nav{ width:100%; }
  // }


</style>
