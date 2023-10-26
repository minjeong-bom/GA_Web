<script>
import TopBarSub from "components/common/TopBarSub.vue";

export default {
  name: "MYP3100",
  components: {
    TopBarSub
  },
  data() {
    return {
      askId: '',
      contentTexts: {
        askText: '안녕하세요, 저는 회원으로 가입했으나 웹 사이트에 로그인이 되지 않는 문제를 겪고 있습니다. 제 계정 정보를 입력하면 로그인 버튼을 클릭했을 때 아무런 반응이 없습니다. 비밀번호를 재설정하려고 시도해봤지만 여전히 같은 문제가 발생합니다. 어떻게 해결할 수 있을까요? 저의 계정은 [계정 이메일 주소]에 연결되어 있습니다. 도와주시면 감사하겠습니다.',
        answerText: "<!DOCTYPE html><html><body><p>안녕하세요, '종세'님. 먼저 로그인 문제로 불편을 끼쳐드려 죄송합니다. 문제를 해결하려고 노력하겠습니다.</p><p>먼저 시도해 볼 수 있는 몇 가지 단계가 있습니다:</p><ol><li>먼저 브라우저 캐시와 쿠키를 지워보세요.</li><li>다른 브라우저를 사용하여 시도해보세요.</li><li>운영체제와 브라우저를 최신 버전으로 업데이트해주세요.</li><li>아이디와 비밀번호를 정확하게 입력하는지 확인해주세요. 대소문자를 구분해야 합니다.</li></ol><p>만약 이러한 단계가 문제를 해결하지 못하면, 010-5695-9919으로 전화주세요. 저희가 더 자세한 지원을 드릴 수 있을 것입니다. 혹시 다른 도움이 필요하시면 언제든지 연락해주십시오. 감사합니다.</p></body></html>"
      }
    }
  },
  mounted() {
    const askId = this.$route.query.askid;
    this.askId = askId;
  }
}
</script>

<template>
  <div>
    <top-bar-sub :back="true"></top-bar-sub>
    <section class="ask-article">
      <div class="title-area">
        <h1>{{ this.askId }}</h1>
        <p class="ask-created">2023.08.01 문의</p>
      </div>
      <div class="ask-text-area">
        <p class="nomal-text" v-html="this.contentTexts.askText"></p>
      </div>
    </section>
    <section>
      <div class="admin-answer-area">
        <div class="admin-profile-wrapper">
          <div class="profile-image-wrapper">
            <img class="profile-image" src="../../assets/testing-image/server-img-1.jpg"/>
          </div>
          <div>
            <p id="adminName">관리자 민정</p>
          </div>
        </div>
        <div class="answer-wrapper">
          <div class="nomal-text" v-html="this.contentTexts.answerText"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
p {
  margin-block-end: 0;
}
section {
  padding: 0 24px;
}

.title-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding-bottom: 10px;
}

.ask-text-area {
  display: flex;
  padding: 0px 0px 39px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.ask-article h1 {
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;

  margin-block-start: 0em;
  margin-block-end: 0em;
}

.ask-created {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.nomal-text,
.nomal-text * {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
}

.admin-profile-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 20px;
}

.profile-image-wrapper {
  display: flex;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
}

.profile-image-wrapper .profile-image {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 24px;
  border: 1px solid #DADADA;
}

.answer-wrapper {
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  row-gap: 24px;
  flex-wrap: wrap;

  border-radius: 20px;
  background: rgba(131, 131, 131, 0.10);
}

#adminName {
  width: 257px;
  font-size: 1rem;
  font-weight: bold;
}

.admin-answer-area {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
</style>
