<template>
  <div class="sevice-comment-page">
    <!-- STEP 4 -->
    <div class="modal-step-1">
      <div class="content-wrap">
        <section>
          <h1>
            의견 남겨 주셔서 고마워요.<br>
            꼼꼼히 읽어볼게요
          </h1>
          <div class="smill">
            <img src="../../assets/graphic/smill_imoji.png" />
          </div>
        </section>
      </div>
      <button class="btn-main" @click="goHome()">다음</button>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  data() {
    return {
      serviceScore: "",
      comment: "",
      commentTpye: {
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
        option6: false,
      }
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}

</script>

<style scoped>
.sevice-comment-page {
  height: 74vh;
}

.modal-step-1 {
  height: 100%;
}

.content-wrap {
  display: grid;
  height: 100%;
  padding: 30px 24px;
}

h1 {
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */

  margin-block-start: 16px;
  margin-block-end: 10px;
}

.description {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.btn-main {

  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  gap: 8px;

  width: calc(100% - 40px);
  height: 52px;
  padding: 10px 24px;
  border: none;

  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;

  border-radius: 20px;
  background-color: #FD384E;
}

.list-wrap {
  display: flex;
  flex-direction: column;
}

.smill {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}

section {
  display: flex;
  flex-direction: column;
}

.smill img {
  height: 130px;
}

@keyframes moveUpDown {
  0%, 100% {
    transform: translateY(0); /* 시작 및 끝 지점: 움직이지 않음 */
  }
  50% {
    transform: translateY(-10px); /* 중간 지점: 위로 3px 이동 */
  }
}

.smill img {
  animation: moveUpDown 2s linear infinite; /* 애니메이션 이름, 지속 시간, 타이밍 함수, 무한 반복 설정 */
}
</style>
