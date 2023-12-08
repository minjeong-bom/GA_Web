<template>
	<div class="onboard">
		<section>
			<div class="onboard-content-wrap">
				<h1 class="headline">
					혼자 고민하지 말고<br>
					함께 이야기해요!
				</h1>
				<p class="description">“스토리" 카테고리 만나보기</p>
				<img class="center-img" src="src/assets/graphic/onboard_graphic_story.png">
			</div>
			<q-btn @click="goNext()" rounded size="lg" flat class="onboard-fixed-button" style="background: #000">
				<p style="color: #fff">다음으로 (1/3)</p>
			</q-btn>
		</section>
	</div>
</template>

<script>
export default {
	methods: {
		goNext() {
			this.$router.push('/onb0002');
		}
	}
}
</script>
