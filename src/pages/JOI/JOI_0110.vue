<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
	name: "JOI_0110",
	components: {TitleTopBar},
	data() {
		return {
			userEmail: ""
		}
	},
	methods: {
		navigateTo(path) {
			this.$router.push(path);
		}
	},
	computed: {
		ready() {
			if(this.userEmail) {
				return true;
			} else {
				return false;
			}
		}
	}
}
</script>

<template>
	<div class="joi-0100-view">
		<title-top-bar :title-text="'이메일 입력'"></title-top-bar>
		<section class="inner-layout l-column">
			<!-- 이메일 입력 -->
			<div class="id-input-wrap">
				<q-input outlined v-model="userEmail" type="email" label="이메일" placeholder="이메일을 입력하세요" hint="영문 또는 숫자 조합 4~14자. 특수 문자는 안돼요"></q-input>
			</div>
		</section>
		<q-btn @click="navigateTo('/joi0140')" flat square size="lg" class="full-width bottom-button-fixed" :style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'">
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
