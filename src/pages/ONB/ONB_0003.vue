<template>
	<div class="onboard">
		<section>
			<div class="onboard-content-wrap">
				<h1 class="headline">
					재취업에 필요한<br>
					스킬과 정보
				</h1>
				<p class="description">"취업스킬" 카테고리 만나보기</p>
				<img class="center-img" src="src/assets/graphic/onboard_graphic_gapick.png" style="margin-top: 0">
			</div>
			<q-btn @click="goNext()" rounded size="lg" flat class="onboard-fixed-button" style="background: #000">
				<p style="color: #fff">다음으로 (3/3)</p>
			</q-btn>
		</section>
	</div>
</template>

<script>
export default {
	methods: {
		goNext() {
			this.$router.push('/onb0004');
		}
	}
}
</script>
