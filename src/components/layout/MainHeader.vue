<template>
  <div class="header">
    <div align="left" class="left-box">
      <p :style="{ margin:'8px 0 0 10px'}">
        {{title}}
      </p>
    </div>
    <div align="right" class="right-box">
      <button type="button" class="btn btn-outline-dark btn-sm"
        :style="{ margin:'3px', background:'rgb(31, 156, 93)', border:'rgb(31, 156, 93)', color:'white'}"
        @click=handleLogout>
        Logout
      </button>
    </div>
  </div>
</template>
<script>
  import {ref} from 'vue'
  import {useStore} from 'vuex';
  import {useRouter} from 'vue-router';

  export default{
    name:"header",
    setup(){
      const store = useStore();	//스토어호출
      const router = useRouter();	//라우터호출

      let title = ref(process.env.VUE_APP_TITLE);

      function handleLogout() {
        store.dispatch("auth/logout");

        console.log("[handleLogout] = loggedUser --", store.state.auth.user);
				console.log("[handleLogout] = loggedIn --", store.state.auth.status.loggedIn);
        router.push({ path: "/login" });
      }

      return{
        handleLogout,
        title,
      }
    }
  };
</script>

<style lang="scss">
  .header{
    // background:rgb(31, 156, 93);
    height:40px;
    text-align:center;
    font-size:16px;
    // color:#41b883;
    color:white;
    // border-bottom:1px solid #070707;
  }
  .left-box {
    background:rgb(31, 156, 93);
    border-bottom:1px solid #35495e;
    // background:white;
    float: left;
    width: 50%;
    height: 38px;
  }
  .right-box {
    background:rgb(31, 156, 93);
    // background: white;
    float: right;
    width: 50%;
    height: 38px;
  }
</style>
