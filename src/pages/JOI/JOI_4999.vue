<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "JOI_5000",
  components: {TitleTopBar},
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<template>
  <div class="joi-5000-view">
    <title-top-bar :title-text="'본인 확인'"></title-top-bar>
    <!-- headline -->
    <section class="user-auth-headline flex-center l-column">
      <h3 class="headline-3">
        재취업 관련 맞춤형 서비스와 혜택 제공을 위해 본인 확인이 필요해요.
      </h3>

      <br>
      <br>
      <br>

      <img alt="체크와 사람 아이콘" src="../../assets/icon/ico_check-person-info.svg">
    </section>
    <section class="bottom-fixed-section">
      <h4 class="sub-title-1 text-align-center">
        간편인증 또는 휴대전화인증 중<br>
        편리한 것을 선택하여 인증해주세요.
      </h4>
      <p class="caption-1">
        *인증 시 제공되는 정보는 해당 인증기관에서 직접 수집하며, 인증 이외의 용도로 이용 또는 저장되지 않아요.
      </p>
      <!-- Buttons -->
      <div class="button-group flex-sb">
        <!-- 간편 인증 -->
        <q-btn class="auth-button" rounded size="lg" style="background: var(--k-85); width: 100%"
               @click="navigateTo('/joi5000')">
          <div class="auth-button-inner">
            <q-icon name="fingerprint" size="1.125rem"></q-icon>
            <p>간편인증</p>
          </div>
        </q-btn>
        <!-- 간편 인증 -->
        <q-btn class="auth-button" rounded size="lg" style="background: var(--k-85); width: 100%">
          <div class="auth-button-inner">
            <q-icon name="phonelink_lock" size="1.125rem"></q-icon>
            <p>휴대전화 인증</p>
          </div>
        </q-btn>
      </div>
    </section>
  </div>
</template>

<style scoped>
.joi-5000-view {
}

.user-auth-headline {
  padding: 30px 16px;
}

.bottom-fixed-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;

  width: 100%;
  padding: 1.25rem 0.6875rem;

  border-radius: 0.3125rem;
  background: var(--k-5);

  position: fixed;
  bottom: 0;
}

.bottom-fixed-section .caption-1 {
  padding: 0 11px;
}

.auth-button * {
  color: #fff;
}

.auth-button p {
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.button-group {
  width: 100%;
  gap: 0.31rem;
}

.auth-button-inner {
  display: flex;
  gap: 10px;
}
</style>
