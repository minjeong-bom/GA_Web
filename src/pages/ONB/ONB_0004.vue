<template>
	<div class="onboard">
		<section>
			<div class="onboard-content-wrap">
				<h1 class="headline">
					좋은 소식<br>
					곧 생기실거에요
				</h1>
				<p class="description">아름다운 삶을 응원합니다</p>
				<img class="center-img" src="src/assets/graphic/onboard_graphic_ga.png">
			</div>
			<q-btn @click="goNext()" rounded size="lg" flat class="onboard-fixed-button" style="background: var(--ga-red)">
				<p style="color: #fff">지애와 함께하기</p>
			</q-btn>
		</section>
	</div>
</template>

<script>
export default {
	methods: {
		navigateTo(path) {
			this.$router.push(path);
		},
		goNext() {
			localStorage.setItem('isOnboard', true);
			this.navigateTo('/login');
		}
	}
}
</script>
