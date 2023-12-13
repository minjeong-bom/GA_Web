<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import {ref} from 'vue'

export default {
	name: "JOI_0170",
	components: {TitleTopBar},
	data() {
		return {
			userCureer: '',
			userBackground: '',
			backgroundList: [
				"건설·건축",
				"공공·복지",
				"구매·자재·물류",
				"교육",
				"금융·보험",
				"기획·전략",
				"디자인",
				"마케팅·홍보·조사",
				"미디어·문화·스포츠",
				"바이오·제약·식품",
				"상품기획·MD",
				"서비스",
				"생산",
				"연구·R&D",
				"영업·판매·무역",
				"운전·운송·배송",
				"의료",
				"인사·노무·HRD",
				"IT개발·데이터",
				"총무·법무·사무",
				"회계·세무·재무",
				"고객상담·TM"
			],
			userCureerTitle: '',
		}
	},
	computed: {
		ready() {
			return this.userBackground && this.userCureerTitle && this.userCureer;
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
						data_career: this.userCureer, // 총 경력
						data_field: this.userBackground, // 업무 분야
						data_job: this.userCureerTitle, // 직업
					},
					etc: {
						headers: {
							'SPRINT-API-KEY': 'sprintcombom'
						}
					}
				}
				await this.$api.post(config.url, config.body, config.etc);
				this.navigateTo('/joi0180');
			} catch (e) {
				console.error(e);
			}
		}
	}
}
</script>

<template>
	<div class="joi-0170-view">
		<!-- 일반회 원용 프로필 설정 2단계 -->
		<title-top-bar :title-text="'프로필 설정'" :back-button="false" :sub-text="'2/3'"></title-top-bar>
		<section class="inner-layout l-column">
			<!-- 경력 -->
			<q-input
				outlined
				v-model="userCureer"
				label="총 경력이 몇 년인지 입력하세요"
				maxlength="3"
				type="tel"
				style="font-size: 1.125rem;"
			/>
			<!-- 분야 -->
			<q-select
				outlined
				v-model="userBackground"
				:options="backgroundList"
				label="가장 많이 해온 업무 분야를 선택하세요"
				behavior="menu"
				style="font-size: 1.125rem"
			/>
			<!-- 분야 상세 -->
			<q-input
				outlined
				v-model="userCureerTitle"
				label="선택한 분야 내 구체적인 직업을 입력하세요"
				hint="예) 교사, 기획자, 회계사, 마케터, 디자이너, 개발자 등"
				maxlength="20"
				style="font-size: 1.125rem"
			/>
		</section>
		<q-btn @click="setUserInfo" flat square size="lg" class="full-width bottom-button-fixed"
		       :style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'">
			<span style="color: #fff">다음</span>
		</q-btn>
	</div>
</template>

<style scoped>
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
