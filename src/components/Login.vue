<template>
	<!-- <div class="wrap" :style="{ height:'window_height'}"> -->
	<div class="wrap">
		<div class="center_box">
			<div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
				<span class="input-group-text btn-sm" id="basic-addon1">사용자ID</span>
				<input type="text" class="form-control btn-sm" placeholder="UserID" aria-label="UserID" aria-describedby="basic-addon1" v-model="user.userid">
			</div>
			<div class="input-group mb-3" :style="{ margin:'0px 0px 0px 0px'}">
				<span class="input-group-text btn-sm" id="basic-addon1">비밀번호</span>
				<input type="password" class="form-control btn-sm" placeholder="Password" aria-label="UserID" aria-describedby="basic-addon1" v-model="user.password">
			</div>

			<button class="btn btn-outline-success btn-sm" type="button" :style="{ margin:'4px 10px 0px 0px', width:'70px'}"
				@click='handleLogin'>로그인</button>
		</div>
	</div>
</template>

<script>
import {onMounted, onUnmounted, ref} from 'vue'
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
	setup(){
		console.log("[login] = ", "setup--")
		// let name = ref("Login");
		let user = ref({userid:"", password:""});
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
    });

		onUnmounted(() =>{
			console.log("[login] = onUnmounted -- ");
		});

		function handleLogin() {
			// evt.preventDefault();

			console.log("[handleLogin] = userid --", user.value.userid);
			console.log("[handleLogin] = password --", user.value.password);
			loading = true;

			if (user.value.userid && user.value.password) {
				console.log("[handleLogin] = loggedUser --", store.state.auth.user);
				console.log("[handleLogin] = loggedIn --", store.state.auth.status.loggedIn);

				store.dispatch("auth/login", user).then(
					() => {
						loading = false;
						console.log("[handleLogin] = loggedUser --", store.state.auth.user);
						console.log("[handleLogin] = loggedIn --", store.state.auth.status.loggedIn);

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

		return {
			user,
			loading,
			message,
			handleLogin,
			registerUser,
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
	.wrap {
		width: 100%;
		height: 100%;
		min-height: 150px;
		// height: 600px;
		margin-top: -80px;
		position: relative;
		background: white;
		z-index: 1; //div를 최상위로 올린다.
	}
	.center_box {
		width: 60%;
		height: 20%;
		position: absolute;
		// background: blue;
		top: 50%;
		left: 50%;
		margin-left: -30%;
		margin-top: -10%;
	}

</style>
