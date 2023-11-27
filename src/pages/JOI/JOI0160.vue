<template>
  <div>
    <topbar :back="false" :title="'프로필 설정'"></topbar>
    <section>
      <!-- 닉네임 설정 -->
      <div class="input-name-wrapper">
        <q-input color="black" outlined v-model="nickname" :input-style="{ fontSize: '20px', }"/>
        <div class="btn-dice-wrapper">
          <button class="btn-dice" @click="setNickname">
            <i class="fa-solid fa-dice-two"></i>
            랜덤 생성
          </button>
        </div>
      </div>

      <q-input color="black" outlined v-model="userId" :input-style="{ fontSize: '20px', }"/>
    </section>
    <button>건너뛰기</button>
    <button class="btn-bottom-one">다음</button>
  </div>
</template>

<script>
import TopBarSub from "components/app-bar/TopBarSub.vue";
export default {
  components: {
    'topbar': TopBarSub,
  },
  data() {
    return {
      nickname: "",
    }
  },
  mounted() {
    this.nickname = this.userId;
  },
  methods: {
    setNickname() {
      // 형용사 배열
      const firsts = ["귀여운", "용감한", "신비로운", "바람난", "행복한", "똑똑한", "무서운", "예쁜", "큰", "작은"];

      // 동물 이름 배열 (12간지 동물 이름)
      const lasts = ["쥐", "소", "범", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];

      // 랜덤한 형용사와 동물 이름 선택
      const first = firsts[Math.floor(Math.random() * firsts.length)];
      const last = lasts[Math.floor(Math.random() * lasts.length)];

      // 닉네임 생성
      const recommend = first + " " + last;

      this.nickname = recommend;
    }
  },
  computed: {
    userId() {
      return localStorage.getItem('user_id');
    }
  }
}
</script>

<style scoped>
.input-name-wrapper {
  position: relative;
}

section {
  padding: 20px 24px;
}

.btn-dice-wrapper {
  position: absolute;
  top: 0;
  right: 16px;

  height: 100%;

  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>
