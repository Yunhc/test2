<template>
	<!-- <div class="wrap" :style="{ height:'window_height'}"> -->
	<div class="login">
		<div align="left"
			:class="['login-left-box', window_width>800 ? {horizontal:true}:{vertical:true}]">
				<div class="login-img" align="center">
					<img class="login-img-content" alt="bg_wms" src="../assets/bg_wms.png">
				</div>
		</div>
		<div :class="['login-right-box', window_width>800 ? {horizontal:true}:{vertical:true}]">
			<div align="right" style="margin:5px 0px 0px 10px; color:black;">
				<div class="form-check form-check-inline">
					<input type="radio" name="languageRadios" value="EN"
						v-model="rdoLang"
						@change="radioChangeLang">
					<label class="form-check-label">
						English
					</label>
				</div>
				<div class="form-check form-check-inline">
					<input type="radio" name="languageRadios" value="KR"
						v-model="rdoLang"
						@change="radioChangeLang">
					<label class="form-check-label">
						Korean
					</label>
				</div>
			</div>
			<div class="login-wrap">
				<div class="login-center-box" align="right">
					<div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1">사용자ID</span>
						<input type="text" class="form-control btn-sm" placeholder="UserID" aria-label="UserID" aria-describedby="basic-addon1"
							autocomplete="off"
							id="userid"
							ref="userid"
							@keyup.enter ='keyupenter'
							v-model="user.userid">
					</div>
					<div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
						<span class="input-group-text btn-sm" id="basic-addon1">비밀번호</span>
						<input type="password" class="form-control btn-sm" placeholder="Password" aria-label="UserID" aria-describedby="basic-addon1"
							autocomplete="off"
							id="password"
							ref="password"
							@keyup.enter ='keyupenter'
							v-model="user.password">
					</div>
					<div align="left">
						<input class="form-check-input" type="checkbox" id="defaultCheck1"
							v-model="chkID">
						<label class="form-check-label" for="defaultCheck1"
							:style="{ margin:'0px 0px 0px 0px', color:'rgb(34, 33, 33)', 'font-size':'14px'}"
						>
							&nbsp;&nbsp;사용자ID 저장
						</label>
					</div>
					<button class="btn btn-outline-success btn-sm" type="button"
						:style="{ margin:'4px 10px 0px 0px', width:'70px'}"
						@click='handleLogin'>로그인</button>

					<div align="center" class="login-desc">
						<p>Copyright (C) DONGWHA CO,.LTD. reserved</p>
					</div>
					<button class="btn btn-outline-success btn-sm" type="button"
						:style="{ margin:'4px 10px 0px 0px', width:'70px'}"
						@click='startClick'>Start</button>
						<button class="btn btn-outline-success btn-sm" type="button"
						:style="{ margin:'4px 10px 0px 0px', width:'70px'}"
						@click='endClick'>End</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {onMounted, onUnmounted, ref,reactive} from 'vue'
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
	setup(){
		// console.log("[login] = ", "setup--")

		let window_width = ref(window.innerWidth);
		let window_height = ref(window.innerHeight);

		//라디오버튼
		let rdoLang = ref(null);

		// let name = ref("Login");
		let user = ref({userid:"", password:""});
		let chkID = ref(false);
		let saveid = reactive([]);

		let userid = ref(null);
		let password = ref(null);

		// let userid = ref(null);
		// let password = ref(null)
		let message = ref(null);
		let loading = ref(null);

		const store = useStore();	//스토어호출
		const router = useRouter();	//라우터호출

		// user.value.userid = "ADMIN";
		// user.value.password = "wavelink";

		onMounted(() => {
			// console.log("[login] = ", "onMounted--");
			// console.log("[login] = loggedUser --", store.state.auth.user);
			// console.log("[login] = saveid --", store.state.saveid.id);

			window.addEventListener('resize', handleResize);
			//언어 초기값 설정
			if(store.state.setup.language)
				rdoLang.value = store.state.setup.language;
			else
				rdoLang.value ="KR";

			if(store.state.saveid.id){
				// console.log("[login] = saveid -- exist");
				if(store.state.saveid.id[0].chk == true){
					chkID.value = true;
					user.value.userid = store.state.saveid.id[0].id;
				}
				else{
					// console.log("[login] = store.state.saveid.id.chk -- ", store.state.saveid.id[0].chk);
				}
			}
    });

		onUnmounted(() =>{
			// console.log("[login] = onUnmounted -- ");
			window.removeEventListener('resize', handleResize);
		});

		function radioChangeLang()
		{
			store.dispatch("setup/setLanguage", rdoLang.value);
			// console.log("Language = ", rdoLang.value);
			// console.log("storage Language = ", store.state.setup.language);
		}

		function handleLogin() {
			if (user.value.userid && user.value.password) {
				store.commit('loading/startLoading'); //진행표시 시작
				setTimeout(function(){
					handleLogin_S();
				}, 1000)
			}
		}
		function handleLogin_S() {
			// evt.preventDefault();
			// console.log("[handleLogin] = userid --", user.value.userid);
			// console.log("[handleLogin] = password --", user.value.password);
			// console.log("[handleLogin] = chkID", chkID.value);
			loading = true;

			// console.log("[handleLogin] = loggedUser --", store.state.auth.user);
			// console.log("[handleLogin] = loggedIn --", store.state.auth.status.loggedIn);
			store.dispatch("auth/login", user).then(
				() => {
					loading = false;
					// console.log("[handleLogin] = loggedUser --", store.state.auth.user);
					// console.log("[handleLogin] = loggedIn --", store.state.auth.status.loggedIn);

					if(chkID.value == true){
						saveid.push({chk:true, id:user.value.userid});
						store.dispatch("saveid/saveid", saveid);
					}
					else{
						store.dispatch("saveid/deleteid");
						// console.log("[login] = deleteid store.state.saveid.id--", store.state.saveid.id);
					}
					// this.$router.push('/');
					router.push({ path: "/" });
					store.commit('loading/endLoading'); //진행표시 중지
				},
				error => {
					loading = false;
					message = (error.response && error.response.data) || error.message || error.toString();
					// console.log("[handleLogin error] = ", message)
					store.commit('loading/endLoading'); //진행표시 중지
				}
			);
		}

		function registerUser() {
      router.push({name: 'Register'});
    }

		function keyupenter(e){
        if (e.target.id == "userid"){
          password.value.focus();
        }
        else if (e.target.id == "password"){
          handleLogin();
        }
      }

		function handleResize() {
			window_width.value = window.innerWidth;
			window_height.value = window.innerHeight;
    }

		function startClick() {
			// console.log("start");
			store.commit('loading/startLoading');
			console.log(store.state.loading.LoadingStatus);
    }

		function endClick() {
			// console.log("end");
			store.commit('loading/endLoading');
			console.log(store.state.loading.LoadingStatus);
    }

		return {
			window_width,
			window_height,
			rdoLang,
			radioChangeLang,
			user,
			userid,
			password,
			chkID,
			loading,
			message,
			handleLogin,
			registerUser,
			keyupenter,
			startClick,
			endClick
		};
	},
	computed: {
		loggedIn() {
			const store = useStore();	//스토어호출
			// console.log("[login] = computed -- ", store.state.auth.status.loggedIn);
			return store.state.auth.loggedIn;
		}
	},
	created() {
		// console.log("[login] = created -- ");
		if (this.loggedIn) {
			this.$router.push('/');
		}
	},
};
</script>
<style lang="scss">
	.login{
		width: 100%;
		height: 100%;
		min-height: 150px;
		position: fixed;
		top:0px;
		background: rgb(235, 235, 235);
	}
	.login-left-box {
		background:rgb(235, 235, 235);
    // border-bottom:1px solid #35495e;
		float: left;
    width: 50%;
    height: 100%;
  }
	.login-left-box.horizontal {
    width: 50%;
    height: 100%;
  }
	.login-left-box.vertical {
    width: 100%;
    height: 50%;
  }
  .login-right-box {
    background:rgb(235, 235, 235);
    // border-bottom:1px solid #35495e;
    // background: white;
    float: right;
    width: 50%;
    height: 100%;
  }
	.login-right-box.horizontal {
    width: 50%;
    height: 100%;
  }
  .login-right-box.vertical {
    width: 100%;
    height: 50%;
  }
	.login-img{
		width: 99%;
		height: 99%;
		position: relative;
		background: white;
		margin:1% 0% 0% 1%;
	}
	.login-img-content{
		position: absolute;
		background: white;
		width:435px;
		height:350px;
		top: 50%;
		left: 50%;
		margin-left: -212px;
		margin-top: -175px;
		// margin:25% 0% 0% 0%;
	}
	.login-wrap {
		width: 100%;
		height: 100%;
		position: relative;
		background: rgb(235, 235, 235);
	}
	.login-center-box {
		position: absolute;
		width: 60%;
		height: 260px;
		background: rgb(235, 235, 235);
		top: 50%;
		left: 50%;
		margin-left: -30%;
		margin-top: -130px;
	}
	.login-desc{
		font-family: Avenir, Helvetica, Arial, sans-serif;
		font-size:16px;
		color:rgb(34, 33, 33);

		margin-top: 50px;
		// background:yellow;
	}


</style>
