<template>
	<div class="onboard">
		<section>
			<div class="onboard-content-wrap">
				<h1 class="headline">
					필요한 일자리를<br>
					같이 찾아봐요
				</h1>
				<p class="description">확인하고 선별한 정보를 공유해 드려요</p>
				<img class="center-img" src="src/assets/graphic/onboard_graphic_job.png">
			</div>
			<q-btn @click="goNext()" rounded size="lg" flat class="onboard-fixed-button" style="background: #000">
				<p style="color: #fff">다음으로 (2/3)</p>
			</q-btn>
		</section>
	</div>
</template>

<script>
export default {
	methods: {
		goNext() {
			this.$router.push('/onb0003');
		}
	}
}
</script>
