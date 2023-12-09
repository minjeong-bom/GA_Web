<script>
export default {
	name: "JOI_0000",
	methods: {
		navigate(path) {
			this.$router.push(path);
		}
	}
}
</script>

<template>
	<div class="joi-0000-view">
		<h1 class="headline-1">
			안녕하세요!<br>
			어떤 회원으로 가입하길<br>
			원하세요?<br>
		</h1>

		<div class="l-column button-group">
			<q-btn @click="navigate('joi5000')" flat rounded class="full-width join-type-button" style="background: var(--ga-red)" size="lg">
				<p>일반회원</p>
			</q-btn>
			<q-btn @click="navigate('joi5000')" flat rounded class="full-width join-type-button" style="background: #43B366;" size="lg">
				<div>
					<p>전문가 회원</p>
					<p class="caption-1">재취업 관련 강사, 컨설턴트, 헤드헌터, 심리상담사 등</p>
				</div>
			</q-btn>
			<q-btn @click="navigate('joi5000')" flat rounded class="full-width join-type-button" style="background: #1F1F1F" size="lg">
				<div>
					<p>기업 회원</p>
					<p class="caption-1">기업 인사 담당자</p>
				</div>
			</q-btn>
		</div>
	</div>
</template>

<style scoped>
.joi-0000-view {
	padding: 0 16px;
	padding-top: 84px;
}

.headline-1 {
	margin-bottom: 68px;
}

.join-type-button {
	color: #fff;
	text-align: center;
	font-size: 1.5rem;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: -0.03125rem;
}

.join-type-button p{
	color: #fff;
}

.button-group {
	gap: 40px;
}

</style>
