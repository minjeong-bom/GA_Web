<template>
  <div class="onboard">
    <section>
      <div class="onboard-content-wrap">
        <h1 class="headline">
          일과 삶의 경험담을<br>
          나눠보세요
        </h1>
        <p class="description">그동안의 경험들을 나누고, 공감해 보세요</p>
        <img class="center-img" src="../../assets/graphic/onboard_graphic_coffee.png">
      </div>
      <q-btn @click="goNext()" rounded size="lg" flat class="onboard-fixed-button" style="background: #000">
          <p style="color: #fff">시작하기</p>
      </q-btn>
    </section>
  </div>
</template>

<script>
export default {
    methods: {
        goNext() {
            this.$router.push('/onb0001');
        }
    }
}
</script>
