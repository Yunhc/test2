<template>
  <div id="home">
    <div id= "home_header">
      <MainHeader />
    </div>
    <div id="home_menutree">
      <MenuPopup />
    </div>
  </div>
</template>
<script>
import MainHeader from '@/components/layout/MainHeader.vue'
// import MenuTree from '@/components/layout/MenuTree.vue'
import MenuPopup from '@/components/layout/MenuPopup.vue'
// import MainFooter from '@/components/layout/MainFooter.vue'
import global from "@/global";

export default {
  name: 'home',
  setup() {
    // console.log("[Home] = setup -- ");
    return {
		};
  },
  components: {
    MainHeader,
    MenuPopup,
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

    // border-top:2px solid blue;
    // border-bottom:2px solid blue;
  }
  #home_header{
    width:100%;
    height:40px;

    z-index: 1; //div를 최상위로 올린다.
    position:fixed;
    top: 0px;
  }
  #home_menutree{
    width:100%;
    height:42px;
    border-bottom:1px solid #d9dce0;
  }
</style>
