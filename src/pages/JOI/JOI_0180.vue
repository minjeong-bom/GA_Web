<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import { ref } from 'vue'

export default {
	name: "JOI_0180",
	components: {TitleTopBar},
	data() {
		return {
			q1: true,
			q2: true,
			q3: true,
			q1Options: [
				{
					label: '네',
					value: true,
				},
				{
					label: '아니오',
					value: false,
				},
			],
			q2Options: [
				{
					label: '네',
					value: true,
				},
				{
					label: '아니오',
					value: false,
				},
			],
			q3Options: [
				{
					label: '네',
					value: true,
				},
				{
					label: '아니오',
					value: false,
				},
			],
		}
	},
	computed: {
		ready() {
			return true;
		},
	},
	methods: {
		navigateTo(path) {
			this.$router.push(path);
		},
		async setUserInfo() {
			const storageUserKey = localStorage.getItem('userKey');
			try {
				const config = {
					url: '/api/crud/create',
					body: {
						data_key: storageUserKey,
						data_prefix: 'mem',
						data_current_biz: this.q1? 'Y': 'N', // 현업 종사 여부
						data_job_srch: this.q2? 'Y': 'N', // 구직 활동 여부
						data_job_srch_goal: this.q3? 'Y': 'N', // 구직 활동 목표
					},
					etc: {
						headers: {
							'SPRINT-API-KEY': 'sprintcombom'
						}
					}
				}
				const res = await this.$api.post(config.url, config.body, config.etc);
				if (res.data) {
					this.navigateTo('/');
				}
			} catch (e) {
				console.error(e);
			}
		},
	}
}
</script>

<template>
	<div class="joi-0170-view">
		<!-- 일반회 원용 프로필 설정 2단계 -->
		<title-top-bar :title-text="'프로필 설정'" :back-button="false" :sub-text="'3/3'"></title-top-bar>
		<div class="inner-layout l-column">
			<section class="l-column">
				<p class="input-lable-text-comment">현업에 종사중이신가요?</p>
				<div class="flex-end">
					<q-option-group
						v-model="q1"
						:options="q1Options"
						color="primary"
					/>
				</div>
			</section>
			<section class="l-column">
				<p class="input-lable-text-comment">구직 활동 중이신가요?</p>
				<div class="flex-end">
					<q-option-group
						v-model="q2"
						:options="q2Options"
						color="primary"
					/>
				</div>
			</section>
			<section class="l-column">
				<p class="input-lable-text-comment">구직 활동의 목표는 무엇인가요?</p>
				<p class="">이직= 유사 직종으로 옮기는 것, 전직= 직종을 바꾸는 것</p>
				<div class="flex-end">
					<q-option-group
						v-model="q3"
						:options="q3Options"
						color="primary"
					/>
				</div>
			</section>
		</div>
		<q-btn @click="setUserInfo" flat square size="lg" class="full-width bottom-button-fixed" :style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'">
			<span style="color: #fff">설정 완료</span>
		</q-btn>
	</div>
</template>

<style scoped>
section {
	gap: 10px;
}

.joi-0170-view .inner-layout {
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

.skip-button-wrap {
	width: 100%;
	position: fixed;
	bottom: 72px;

	opacity: 0.5;
}
</style>
