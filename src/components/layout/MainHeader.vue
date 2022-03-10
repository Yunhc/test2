<template>
  <popupyn v-if="popupisopen"
    :title="lblNotice"
    :message="lblLogoutMsg"
    @yesClick="yesClick"
    @noClick="popupisopen=false">
  </popupyn>

  <div class="mainheader">
    <div align="left" class="mainheader-left-box">
      <p :style="{ margin:'8px 0 0 10px'}">
        {{lblTitle}}
      </p>
    </div>
    <div align="right" class="mainheader-right-box">
      <label class="btn-sm" v-if="bCheckWindowWidth">
        {{lblPlant}}
      </label>
      <label class="btn-sm" style="color:blue; font-weight:bold;">
        {{lblUser}}&nbsp;
      </label>
      <button type="button" class="btn btn-outline-dark btn-sm"
        style="margin:2px 5px 3px 3px; background:transparent; border:1px solid green; color:white; font-size:16px;}"
        @click=handleLogout>
        {{lblLogout}}
      </button>
    </div>
  </div>
</template>
<script>
  import {ref, onMounted, onUnmounted } from 'vue'
  import {useStore} from 'vuex';
  import {useRouter} from 'vue-router';
  import popupyn from '@/views/PopupYN.vue';
  import language from '@/assets/language.js';


  export default{
    // name:"header",  //경고메시지 때문에 주석처리함(사용하지 않는데 정의 되어 경고 발생)
    components:{
      popupyn
    },
    setup(){
      const store = useStore();	//스토어호출
      const router = useRouter();	//라우터호출

      //화면 언어 설정==============================================================================//
      let lang = ref(language.mainheader);
      let msg = ref(language.message);

      let lblTitle = ref(process.env.VUE_APP_TITLE);
      let lblPlant = ref(null);
      let lblUser = ref(null);
      let lblLogout = ref("Logout");

      let lblNotice = ref("알림");
      let lblLogoutMsg = ref("로그아웃 하시겠습니까?");
      //============================================================================================//

      let window_width = ref(window.innerWidth);
      let window_height = ref(window.innerHeight);
      let bCheckWindowWidth = ref(true);

      let popupisopen = ref(false);

      onMounted(() => {
        window.addEventListener('resize', handleResize);
        // console.log("user = ", store.state.auth.user);
        lblPlant.value = store.state.auth.user[0].plantcd;
        lblUser.value = store.state.auth.user[0].username;

        setLanguage();
      });

      onUnmounted(() =>{
        // console.log("onUnmounted -- ");
        window.removeEventListener('resize', handleResize);
      });

      function handleResize() {
        window_width.value = window.innerWidth;
        window_height.value = window.innerHeight;

        if (window_width.value > 800) bCheckWindowWidth.value = true;
        else bCheckWindowWidth.value = false;
      }

      function handleLogout() {
        popupisopen.value = true;
      }
      function fnLogout() {
        store.dispatch("auth/logout");

        // console.log("[handleLogout] = loggedUser --", store.state.auth.user);
				// console.log("[handleLogout] = loggedIn --", store.state.auth.status.loggedIn);
        router.push({ path: "/login" });
      }

      function yesClick() {
        popupisopen.value = false;
        fnLogout();
      }

      function setLanguage(){
        lblNotice.value = msg.value['lblNotice'][store.state.setup.language];
        lblLogoutMsg.value = msg.value['lblLogoutMsg'][store.state.setup.language];

        lblLogout.value = lang.value['lblLogout'][store.state.setup.language];
      }

      return{
        handleLogout,
        bCheckWindowWidth,
        lblNotice,
        lblLogoutMsg,
        lblTitle,
        lblPlant,
        lblUser,
        lblLogout,
        yesClick,
        popupisopen
      }
    }
  };
</script>

<style lang="scss">
  .mainheader{
    // background:rgb(31, 156, 93);
    width: 100%;
    height:40px;
    text-align:center;
    font-size:16px;
    // color:#41b883;
    color:white;
    // border-bottom:1px solid #070707;
  }
  .mainheader-left-box {
    background:$color-dw-green;
    // border-bottom:1px solid #35495e;
    // background:white;
    float: left;
    width: 50%;
    height: 38px;
  }
  .mainheader-right-box {
    background:$color-dw-green;
    // border-bottom:1px solid #35495e;
    // background: white;
    float: right;
    width: 50%;
    height: 38px;
  }
</style>
