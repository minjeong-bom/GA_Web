<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "MYP3000",
  components: {TitleTopBar},
  computed: {
    userName() {
      return localStorage.getItem('userName')
    }
  },
  methods: {
    navigateToHome(queryKey) {
      this.$router.push({
          path: '/',
          query: {
            tab: queryKey
          }
        });
    }
  }
}
</script>

<template>
  <div>
    <title-top-bar title-text="내 북마크"/>
    <section class="mb-64">
      <div class="center-graphic-layout">
        <!-- 이미지 -->
        <img src="../../assets/graphic/graphic-bookmark.png">

        <!-- 캡션 -->
        <p class="cus-text-2">
          {{ userName }}님<br>
          도움이 될만한 콘텐츠를 북마크 해보세요.<br>
          나의 보물창고가 될지도 몰라요.<br>
        </p>
      </div>

      <div class="flex-center l-column button-list">
        <div class="button-group l-column">
          <p class="lable-2">회원들의 경험담을 들을 수 있는</p>
          <q-btn
            rounded flat
            label="스토리로 보러가기"
            class="primary-btn"
            @click="navigateToHome(2)"
          />
        </div>
        <div class="button-group l-column">
          <p class="lable-2">일을 지속하는 데 도움되는</p>
          <q-btn
            rounded flat
            label="취업 스킬 보러가기"
            class="primary-btn"
            @click="navigateToHome(3)"
          />
        </div>
        <div class="button-group l-column">
          <p class="lable-2">굿앺터눈 서비스가 추천하는</p>
          <q-btn
            rounded flat
            class="primary-btn"
            label="지애픽 보러가기"
            @click="navigateToHome(4)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.center-graphic-layout {
  gap: 1rem;
}

.button-list {
  gap: 1.88rem;
}

.button-group {
  gap: 0.31rem;
}

.lable-2 {
  color: #8E8E93;
}

.mb-64 {
  margin-bottom: 64px;
}
</style>
