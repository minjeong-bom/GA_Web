<template>
  <div class="sevice-comment-page">
    <!-- STEP 3 -->
    <div class="modal-step-1">
      <div class="content-wrap">
        <section>
          <h1>
            앞서 적어주신 의견이 어떤 내용에 해당하나요?
          </h1>
          <p class="description">해당 보기를 모두 선택해 주세요</p>
          <div class="list-wrap">
            <q-checkbox v-model="commentTpye.option1" label="오류 및 속도 느림"/>
            <q-checkbox v-model="commentTpye.option2" label="제공 정보"/>
            <q-checkbox v-model="commentTpye.option3" label="검색 및 탐색 과정"/>
            <q-checkbox v-model="commentTpye.option4" label="커뮤니티 운영"/>
            <q-checkbox v-model="commentTpye.option5" label="서비스 제안"/>
            <q-checkbox v-model="commentTpye.option6" label="기타 의견"/>
          </div>
        </section>
      </div>
      <button class="btn-main" @click="next()">다음</button>
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
    next () {
      this.$router.push('/service-comment/step4');
    }
  }
}

</script>

<style scoped>
.content-wrap {
  display: grid;
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


</style>
