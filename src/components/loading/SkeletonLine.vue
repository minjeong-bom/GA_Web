<script>
export default {
	name: "SkeletonLine",
	props: {
		lines: Number,
	}
}
</script>

<template>
	<div style="width: 100%">
		<q-skeleton v-for="n in lines" :key="n" square style="margin-bottom: 12px" />
	</div>
</template>

<style scoped>

</style>
