<template>
  <div class="main-top-bar-wrap">
    <img alt="GoodAfternoon 로고" class="home-top-bar-logo" src="../../assets/brand/ga-logo.svg">
    <q-btn color="black" flat icon="menu" round style="font-size: 1rem" @click="openMenu()"/>
  </div>
</template>

<script>
export default {
  methods: {
    openMenu() {
      this.$router.replace('/menu');
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
