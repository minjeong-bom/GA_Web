<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "MYP4130",
  components: {TitleTopBar},
  methods: {
    navigateToHome() {
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <div>
    <title-top-bar/>
    <section class="nomal-page-layout">
      <h1 class="article-card-headline">
        문의하신 내용은<br>
        꼼꼼히 읽어보고 답변드릴게요.<br>
      </h1>

      <div class="column center-graphic">
        <img alt="웃고 있는 사람 이모지" src="../../assets/graphic/face-smail-svg.svg">
      </div>

      <!-- 다음 버튼 -->
      <div class="bottom-fixed-btn">
        <q-btn
          class="primary-btn full-width" flat
          label="닫기"
          rounded
          @click="navigateToHome"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.bottom-fixed-btn {
  position: fixed;
  width: 100%;
  padding: 1rem;
  bottom: 0;
  left: 0;
}

.center-graphic {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>
