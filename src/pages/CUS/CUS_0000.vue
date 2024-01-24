<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  components: {TitleTopBar},
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<template>
  <div class="cus0000-view">
    <title-top-bar/>

    <section class="nomal-page-layout">
      <!-- 헤드라인 -->
      <h1 class="headline-1">고객센터</h1>

      <!-- 본문 -->
      <p class="input-lable-text-comment cus-text-1">
        무슨 문제가 생기셨나요?<br>
        문의하기로 알려주세요.<br>
        빠른 시간 내 답변 드리겠습니다.
      </p>

      <div class="center-graphic-layout">
        <!-- 이미지 -->
        <img alt="심플한 민트색 상담원 아이콘" src="../../assets/graphic/customer-service-img.svg">

        <!-- 캡션 -->
        <p class="cus-text-2">
          운영시간은 <br>
          <span class="high-light">
          10:00~19:00
          </span>
          입니다.
        </p>
      </div>

      <div class="cus-btn-group l-column">
        <!-- 문의 버튼 -->
        <q-btn class="full-width primary-btn input-lable-text-comment" flat rounded @click="navigateTo('/myp4110')">
          문의하기
        </q-btn>

        <!-- 만족도 조사 버튼 -->
        <q-btn class="full-width secondary-btn" flat>
          <div class="full-width flex-sb">
            고객센터가 도움이 되었나요?
            <q-icon name="arrow_forward_ios" size="14px"></q-icon>
          </div>
        </q-btn>
      </div>

    </section>
  </div>
</template>

<style scoped>
.secondary-btn {
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.cus-text-1 {
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 1.6875rem */

  margin-top: 2.5rem;
}

.cus-btn-group {
  gap: 1.25rem;
}
</style>
