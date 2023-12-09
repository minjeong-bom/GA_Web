<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
	name: "JOI_0150",
	components: {TitleTopBar},
	methods: {
		navigateTo(path) {
			this.$router.push(path);
		}
	},
}
</script>

<template>
	<div class="joi-0150-view">
		<title-top-bar :title-text="'가입 완료'" :back-button="false"></title-top-bar>
		<section>
			<h1 class="headline-1">
				{id}님<br>
				반가워요!<br>
			</h1>

			<p>
				{ID}님을 좀 더 알고 싶어요. <br>
				다른 사람과 소통하고, <br>
				더 알맞는 정보를 추천하는데 <br>
				도움이 될 거에요. <br>
			</p>
		</section>
		<q-btn @click="navigateTo('/joi0160')" flat square size="lg" class="full-width bottom-button-fixed" style="background: var(--ga-red);">
			<span style="color: #fff">다음</span>
		</q-btn>
	</div>
</template>

<style scoped>
.joi-0150-view section {
	padding: 1.25rem 2.25rem;
}
.bottom-button-fixed {
	position: fixed;
	bottom: 0;
}

.joi-0150-view p {
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 500;
	line-height: 1.75rem; /* 155.556% */
}

.joi-0150-view .headline-1 {
	margin-bottom: 2.5rem;
}
</style>
