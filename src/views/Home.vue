<template>
  <div id="home">
    <div id= "home_header">
      <MainHeader />
    </div>
    <div id="home_menutree">
      <MenuTree />
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/layout/MainHeader.vue'
import MenuTree from '@/components/layout/MenuTree.vue'
// import MainFooter from '@/components/layout/MainFooter.vue'
import global from "@/global";

export default {
  name: 'home',
  setup() {
    console.log("[Home] = setup -- ");
    return {
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
    // border-top:2px solid blue;
    // border-bottom:2px solid blue;
  }
  #home_header{
    width:100%;
    height:100%;
  }
  #home_menutree{
    width:100%;
    height:100%;
  }
</style>
