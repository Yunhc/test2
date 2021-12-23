<template>
  <div class="menutree">
    <!-- <button type="button" class="btn btn-outline-dark"
      :style="{ margin:'3px'}"
      v-for="(pro, i) in menus" :key="i"
      @click=btnClick(i)>
      {{menus[i].name}}
    </button> -->
    <div align="left" class="menu">
      <MenuPopup />
    </div>

    <!-- <nav id="vue" :style="{ margin:'3px'}" >
      <MenuPopup
        v-for="(pro, i) in menus"
        :key="i"
        :title="menus[i].name"
        :button_id="menus[i].id"/>
    </nav> -->
  </div>
</template>

<script>
  import MenuPopup from '@/components/layout/MenuPopup.vue'

  export default {
    name: 'room',
    data(){
      return {
      menus : [
        {id:'system', name:'시스템관리'},
        {id:'basic', name:'기준정보관리'},
        {id:'order', name:'오더관리'},
        {id:'label', name:'라벨발행 이력'},
        ],
      }
    },
    components: {
      MenuPopup
    },
    methods : {
      btnClick(i){
        // alert (this.menus[i]);
        this.$router.push({ path: this.menus[i].id });
      },
    },
  }
</script>
<style lang="scss">
  .menutree{
    width:100%;
    text-align:center;
    position:relative;
    // height:100px;
    height:79px;
    // border-bottom:1px solid #070707;
  }
  .menu{
    width:100%;
    // text-align:center;
    position:relative;
    height:42px;
    border-bottom:1px solid #d9dce0;
  }
  .selectedmenu{
    width:100%;
    background:rgb(240, 240, 240);
    // text-align:center;
    position:relative;
    height:37px;
    border-top:1px solid #d9dce0;
    border-bottom:1px solid #d9dce0;
    margin:0 0 0 0;
  }
</style>