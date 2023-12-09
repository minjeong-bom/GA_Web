<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import {ref} from 'vue'
import nickNameList from 'assets/data/nickname-list.json'

export default {
	name: "JOI_0160",
	components: {TitleTopBar},
	data() {
		return {
			userName: '',
			userInteresting: [],
			modelMultiple: ref(['관심사']),
			options: [
				'소통', '업무 관련 스킬 향상', '구인/구직 정보', '유용한 정보(세미나, 프로그램 등)'
			],
			nickNameList: nickNameList,
		}
	},
	methods: {
		navigateTo(path) {
			this.$router.push(path);
		},
		generateNickname() {
			const adjective = this.getRandomItem(this.nickNameList.firstName);
			const animalPlant = this.getRandomItem(this.nickNameList.secondName);

			this.userName = `${adjective} ${animalPlant}`;
		},
		getRandomItem(array) {
			return array[Math.floor(Math.random() * array.length)];
		},
		async setUserInfo() {
			const storageUserKey = localStorage.getItem('userKey');
			try {
				const config = {
					url: '/api/crud/create',
					body: {
						data_key: storageUserKey,
						data_prefix: 'mem',
						data_title: this.userName,
						data_category: this.userInteresting,
					},
					etc: {
						headers: {
							'SPRINT-API-KEY': 'sprintcombom'
						}
					}
				}
				await this.$api.post(config.url, config.body, config.etc);
				this.navigateTo('/joi0170');

			} catch (e) {
				console.error(e);
			}
		}
	},
	computed: {
		ready() {
			return this.userName && this.userInteresting
		},
	},
}
</script>

<template>
	<div class="joi-0100-view">
		<title-top-bar :title-text="'프로필 설정'" :back-button="false" :sub-text="'1/3'"></title-top-bar>
		<section class="inner-layout l-column">
			<!-- 닉네임 입력 -->
			<div class="id-input-wrap">
				<q-input
					outlined
					v-model="userName"
					label="닉네임"
					hint="최대 10글자"
					maxlength="10"
					style="font-size: 1.125rem"
				/>
				<div class="btn-dd-check-wrap">
					<!-- 닉네임 랜덤 생성 버튼 -->
					<q-btn @click="generateNickname"
					       flat
					       icon="refresh"
					       label="랜덤 생성"
					       class="btn-dd-check"
					       style="background: var(--only-g-red-red-10)"
					>
					</q-btn>
				</div>
			</div>
			<!-- 관심사 입력 -->
			<div>
				<q-select
					outlined
					v-model="userInteresting"
					multiple
					:options="options"
					stack-label
					label="관심사"
					behavior="menu"
					style="font-size: 1.125rem"
				/>
			</div>
		</section>
		<div class="skip-button-wrap flex-center">
			<q-btn @click="navigateTo('/')" flat>
				<span>건너뛰기</span>
				<q-icon name="navigate_next"/>
			</q-btn>
		</div>
		<q-btn
			@click="setUserInfo()"
			flat
			square
			:disable="!ready"
			size="lg"
			class="full-width bottom-button-fixed"
			:style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'">
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

.skip-button-wrap {
	width: 100%;
	position: fixed;
	bottom: 72px;

	opacity: 0.5;
}
</style>
