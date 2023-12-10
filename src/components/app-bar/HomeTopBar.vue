<template>
  <div class="main-top-bar-wrap">
    <img class="home-top-bar-logo" src="../../assets/brand/ga-logo.svg">
    <q-btn flat round color="black" style="font-size: 1rem" icon="menu" @click="openMenu()"/>
  </div>
</template>

<script>
export default {
	methods: {
		openMenu() {
			this.$router.push('/menu');
		}
	}
}
</script>

<style>
.main-top-bar-wrap {
  display: flex;
  height: 4rem;
  padding: 0.5rem 0.5625rem 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
}

.home-top-bar-logo {
  width: 3.875rem;
  height: 2rem;
  flex-shrink: 0;
}
</style>
