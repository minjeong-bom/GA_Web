<template>
	<div class="login-view">
		<div class="service-login-area">
			<!-- 헤드라인 -->
			<h1 class="login-headline">반갑습니다</h1>
			<!-- 아이디 & 비밀번호 입력 -->
			<div class="login-form">
				<q-input outlined v-model="userId" label="아이디"/>
				<q-input outlined v-model="userPw" label="비밀번호" :type="isPwd? 'password' : 'text'" :hint="loginFailMassage? loginFailMassage : loginErrorMessage">
					<template v-slot:append>
						<q-icon
							:name="isPwd ? 'visibility_off' : 'visibility'"
							class="cursor-pointer"
							@click="isPwd = !isPwd"
						/>
					</template>
				</q-input>
			</div>
			<!-- 자동로그인 체크박스 -->
<!--			<q-checkbox v-model="autoLogin" label="자동 로그인" />-->
			<!-- -->
			<div>

			</div>
			<!-- 로그인 버튼 -->
			<q-btn @click="login" rounded size="lg" flat class="login-button" style="background: #000;">
				<p style="color: #fff">로그인</p>
			</q-btn>
			<!-- 회원가입 버튼 -->
			<q-btn class="join-us-button" flat style="background: #F5F5F5;" @click="navigateTo('joi0000')">
				<img src="../../assets/icon/icon-clab.svg">
				<p>1분만에 회원 가입 하기</p>
				<img src="../../assets/icon/icon-clab.svg">
			</q-btn>
			<section class="help-btn-wrap flex-center">
				<q-btn flat rounded><u>아이디 찾기</u></q-btn>
				<span>|</span>
				<q-btn flat rounded><u>비밀번호 재설정</u></q-btn>
			</section>
		</div>
		<!-- 소셜 로그인 -->
		<div class="social-login-area">
			<p class="login-sub-title">SNS 계정으로 로그인하기</p>
			<div class="social-login-button-group flex-center">
				<!-- Apple -->
				<q-avatar size="3.8rem">
					<img src="../../assets/graphic/btn-sns-login.png">
				</q-avatar>
				<!-- Google -->
				<q-avatar size="3.8rem">
					<img src="../../assets/graphic/btn-sns-login-1.png">
				</q-avatar>
				<!-- Naver -->
				<q-avatar size="3.8rem">
					<img src="../../assets/graphic/btn-sns-login-2.png">
				</q-avatar>
				<!-- Kakao -->
				<q-avatar size="3.8rem">
					<img src="../../assets/graphic/btn-sns-login-3.png">
				</q-avatar>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userId: "",
			userPw: "",
			isPwd: true,
			autoLogin: true,
			loginFailMassage: '',
		}
	},
	methods: {
		async login() {
			try {
				const config = {
					url: '/api/users/login',
					headers: {
						'SPRINT-API-KEY': 'sprintcombom'
					}
				};

				const formData = new FormData();
				formData.append('id', this.userId);
				formData.append('pw', this.userPw);

				const res = await this.$api.post(
					config.url,
					formData,
					{headers: config.headers}
				);

				localStorage.setItem('userKey', res.data.response.key);
				localStorage.setItem('userName', res.data.response.name);
				localStorage.setItem('userId', res.data.response.id);

				this.navigateTo('/');
				res.data.response
			} catch (error) {
				this.loginFailMassage = '아이디/비밀번호를 다시 확인해주세요'
				console.error(error);
			}
		},
		navigateTo(path) {
			this.$router.push(path);
		}
	},
	computed: {
		loginErrorMessage() {
			if (this.userId === "" && this.userPw === "") {
				return "";
			}
			if (!this.userPw) {
				return "비밀번호를 입력해주세요"
			}
		}
	}
}
</script>

<style scoped>
.login-view {
	padding: 0 16px;
	padding-top: 20%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
}

.login-headline {
	color: var(--labels-secondary);
	text-align: center;
	font-size: 2rem;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: -0.03rem;
	margin-bottom: 2.25rem;
}

.login-sub-title {
	color: #666;
	text-align: center;
	font-size: 1rem;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: -0.015rem;
	padding: 1rem 0rem;
}

.login-form {
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
}

.login-button {
	width: 100%;
	margin-top: 1.7rem;
}

.social-login-area {
	margin-top: 1.25rem;
}

.social-login-button-group {
	gap: 0.62rem;
}

.join-us-button {
	width: 100%;
	margin-top: 1.25rem;
	color: #4F4546;
	font-size: 1rem;
	font-style: normal;
	font-weight: 700;
	line-height: 1.5rem; /* 150% */
	letter-spacing: -0.03125rem;
}

.help-btn-wrap {
	padding: 0.62rem 0;
}

.help-btn-wrap * {
	color: #666;
}
</style>
