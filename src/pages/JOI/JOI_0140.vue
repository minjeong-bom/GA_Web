<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
	name: "JOI_0140",
	components: {TitleTopBar},
	data() {
		return {
			allChecked: false,
			check1: false,
			check2: false,
		}
	},
	methods: {
		checkId() {

		},
		updateAllChecked() {
			// 모든 체크박스가 선택되었는지 확인
			this.allChecked = this.check1 && this.check2;
		},
		navigateTo(path) {
			this.$router.push(path);
		}
	},
	computed: {
		ready() {
			return this.allChecked;
		},
	},
	watch: {
		allChecked(newVal) {
			// 맨 위 체크박스의 상태가 바뀌면 나머지 체크박스들의 값을 업데이트
			this.check1 = newVal;
			this.check2 = newVal;
		},
		check1: 'updateAllChecked',
		check2: 'updateAllChecked'
	},
}
</script>

<template>
	<div class="joi-0100-view">
		<title-top-bar :title-text="'약관 동의'"></title-top-bar>
		<section class="inner-layout l-column" style="gap: 6px">
			<div class="all-check-box-wrap" :class="check1 && check2 ? 'all-checked checked' : ''">
				<q-checkbox v-model="allChecked" label="약관에 모두 동의" />
			</div>
			<div>
				<div class="check-box-wrap flex-sb" :class="check1? 'checked' : ''">
					<q-checkbox v-model="check1" label="서비스 이용 약관 동의" style="width: 100%"/>
					<q-btn flat round>
						<q-icon name="chevron_right"></q-icon>
					</q-btn>
				</div>
				<div class="check-box-wrap flex-sb" :class="check2? 'checked' : ''">
					<q-checkbox v-model="check2" label="개인정보 처리방침 동의" style="width: 100%"/>
					<q-btn flat round>
						<q-icon name="chevron_right"></q-icon>
					</q-btn>
				</div>
			</div>
		</section>
		<q-btn @click="navigateTo('/joi0150')" flat square size="lg" class="full-width bottom-button-fixed" :style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'">
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

.inner-layout {
	gap: 0px;
}

.bottom-button-fixed {
	position: fixed;
	bottom: 0;
}

.all-check-box-wrap {
	border-radius: 0.25rem;
	border: 1px solid #808080;
	padding: 0.6rem;
}

.check-box-wrap {
	border-radius: 0.25rem;
	padding: 0.6rem;
	padding-right: 0;
}

.all-checked {
	border: 1px solid var(--ga-red);
}

.checked *{
	color: var(--ga-red);
}
</style>
