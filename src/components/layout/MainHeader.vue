<template>
  <popupyn v-if="popupisopen"
    title="알림"
    message="로그아웃 하시겠습니까?"
    @yesClick="yesClick"
    @noClick="popupisopen=false">
  </popupyn>

  <div class="mainheader">
    <div align="left" class="mainheader-left-box">
      <p :style="{ margin:'8px 0 0 10px'}">
        {{title}}
      </p>
    </div>
    <div align="right" class="mainheader-right-box">
      <label class="btn-sm">
        {{strPlant}}
      </label>
      <label class="btn-sm" style="color:blue; font-weight:bold;">
        {{strUser}}&nbsp;
      </label>
      <button type="button" class="btn btn-outline-dark btn-sm"
        style="margin:2px 5px 3px 3px; background:transparent; border:1px solid green; color:white; font-size:16px;}"
        @click=handleLogout>
        Logout
      </button>
    </div>
  </div>
</template>
<script>
  import {ref, onMounted } from 'vue'
  import {useStore} from 'vuex';
  import {useRouter} from 'vue-router';
  import popupyn from '@/views/PopupYN.vue';


  export default{
    // name:"header",  //경고메시지 때문에 주석처리함(사용하지 않는데 정의 되어 경고 발생)
    components:{
      popupyn
    },
    setup(){
      const store = useStore();	//스토어호출
      const router = useRouter();	//라우터호출

      let title = ref(process.env.VUE_APP_TITLE);
      let strPlant = ref(null);
      let strUser = ref(null);
      let popupisopen = ref(false);

      onMounted(() => {
        // console.log("user = ", store.state.auth.user);
        strPlant.value = store.state.auth.user[0].plantcd;
        strUser.value = store.state.auth.user[0].username;
      });

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

      return{
        handleLogout,
        title,
        strPlant,
        strUser,
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
    background:rgb(97, 170, 47);
    // border-bottom:1px solid #35495e;
    // background:white;
    float: left;
    width: 50%;
    height: 38px;
  }
  .mainheader-right-box {
    background:rgb(97, 170, 47);
    // border-bottom:1px solid #35495e;
    // background: white;
    float: right;
    width: 50%;
    height: 38px;
  }
</style>
