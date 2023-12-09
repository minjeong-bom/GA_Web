<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
	name: "JOI_0100",
	components: {TitleTopBar},
	data() {
		return {
			userId: "",
			userPw: "",
			isPwd: true,
			idCheck: false,
		}
	},
	computed: {
		ready() {
			return this.userId && this.userPw;
		},
		idCheckButtonText() {
			return this.idCheck ? "중복확인" : "확인완료"
		}
	},
	methods: {
		checkId() {

		},
		navigateTo(path) {
			this.$router.push(path);
		}
	}
}
</script>

<template>
	<div class="joi-0100-view">
		<title-top-bar :title-text="'아이디, 비밀번호 설정'"></title-top-bar>
		<section class="inner-layout l-column">
			<!-- 아이디 입력 -->
			<div class="id-input-wrap">
				<q-input outlined v-model="userId" label="아이디" hint="영문 또는 숫자 조합 4~14자. 특수 문자는 안돼요"></q-input>
				<div class="btn-dd-check-wrap">
					<q-btn class="btn-dd-check" flat style="background: var(--only-g-red-red-10)" @click="checkId()">{{ idCheckButtonText }}</q-btn>
				</div>
			</div>
			<!-- 비밀번호 입력 -->
			<q-input outlined v-model="userPw" label="비밀번호" :type="isPwd? 'password' : 'text'" hint="영문, 숫자, 특수문자 중 2개 이상 포함, 8자 이상">
				<template v-slot:append>
					<q-icon
						:name="isPwd ? 'visibility_off' : 'visibility'"
						class="cursor-pointer"
						@click="isPwd = !isPwd"
					/>
				</template>
			</q-input>
		</section>
		<q-btn @click="navigateTo('/joi0110')" flat square size="lg" class="full-width bottom-button-fixed" :style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'">
			<span style="color: #fff">다음</span>
		</q-btn>
	</div>
</template>

<style scoped>
.joi-0100-view {
}

.joi-0100-view .inner-layout {
	padding: 1.25rem 16px;
}

.id-input-wrap {
	position: relative;
}

.inner-layout {
	gap: 30px;
}

.btn-dd-check-wrap {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	padding: 0.6rem;
}

.bottom-button-fixed {
	position: fixed;
	bottom: 0;
}
</style>
