<template>
	<!-- <div class="wrap" :style="{ height:'window_height'}"> -->
	<div class="login">
		<div align="left" class="left-box">
				<div class="login_img" align="center">
					<img class="img" alt="bg_wms" src="../assets/bg_wms.png">
				</div>
		</div>
		<div align="right" class="right-box">
			<div class="wrap">
				<div class="center_box">
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
							사용자ID 저장
						</label>
					</div>
					<button class="btn btn-outline-success btn-sm" type="button"
						:style="{ margin:'4px 10px 0px 0px', width:'70px'}"
						@click='handleLogin'>로그인</button>

					<div align="center" class="desc">
						<p>Copyright (C) DONGWHA CO,.LTD. reserved</p>
					</div>
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
		console.log("[login] = ", "setup--")
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
			console.log("[login] = ", "onMounted--");
			console.log("[login] = loggedUser --", store.state.auth.user);
			console.log("[login] = saveid --", store.state.saveid.id);

			if(store.state.saveid.id != null){
				console.log("[login] = saveid -- exist");
				if(store.state.saveid.id[0].chk == true){
					chkID.value = true;
					user.value.userid = store.state.saveid.id[0].id;
				}
				else{
					console.log("[login] = store.state.saveid.id.chk -- ", store.state.saveid.id[0].chk);
				}
			}
    });

		onUnmounted(() =>{
			console.log("[login] = onUnmounted -- ");
		});

		function handleLogin() {
			// evt.preventDefault();

			console.log("[handleLogin] = userid --", user.value.userid);
			console.log("[handleLogin] = password --", user.value.password);
			console.log("[handleLogin] = chkID", chkID.value);
			loading = true;

			if (user.value.userid && user.value.password) {
				console.log("[handleLogin] = loggedUser --", store.state.auth.user);
				console.log("[handleLogin] = loggedIn --", store.state.auth.status.loggedIn);

				store.dispatch("auth/login", user).then(
					() => {
						loading = false;
						console.log("[handleLogin] = loggedUser --", store.state.auth.user);
						console.log("[handleLogin] = loggedIn --", store.state.auth.status.loggedIn);

						if(chkID.value == true){
							saveid.push({chk:true, id:user.value.userid});
							store.dispatch("saveid/saveid", saveid);
						}
						else{
							store.dispatch("saveid/deleteid");
							console.log("[login] = deleteid store.state.saveid.id--", store.state.saveid.id);
						}

						// this.$router.push('/');
						router.push({ path: "/" });
					},
					error => {
						loading = false;
						message = (error.response && error.response.data) || error.message || error.toString();
						console.log("[handleLogin error] = ", message)
					}
				);
			}
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

		return {
			user,
			userid,
			password,
			chkID,
			loading,
			message,
			handleLogin,
			registerUser,
			keyupenter,
		};
	},
	computed: {
		loggedIn() {
			const store = useStore();	//스토어호출
			console.log("[login] = computed -- ", store.state.auth.status.loggedIn);
			return store.state.auth.loggedIn;
		}
	},
	created() {
		console.log("[login] = created -- ");
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
	.left-box {
    background:rgb(235, 235, 235);
    // border-bottom:1px solid #35495e;
    float: left;
    width: 50%;
    height: 100%;
		margin: 0% 0% 0% 0%;
  }
  .right-box {
    background:rgb(235, 235, 235);
    // border-bottom:1px solid #35495e;
    // background: white;
    float: right;
    width: 50%;
    height: 100%;
  }
	.login_img{
		width: 99%;
		height: 99%;
		position: relative;
		background: white;
		margin:1% 0% 0% 1%
	}
	.img{
		position: relative;
		background: white;
		margin:25% 0% 0% 0%
	}
	.wrap {
		width: 100%;
		height: 100%;
		// height: 600px;
		// margin-top: -80px;
		position: relative;
		background: rgb(235, 235, 235);
		z-index: 1; //div를 최상위로 올린다.
	}
	.center_box {
		width: 60%;
		height: 30%;
		position: absolute;
		// background: blue;
		top: 50%;
		left: 50%;
		margin-left: -30%;
		margin-top: -10%;
	}
	.desc{
		font-family: Avenir, Helvetica, Arial, sans-serif;
		font-size:16px;
		color:rgb(34, 33, 33);

		margin-top: 50px;
		// background:yellow;
	}


</style>
