<template>
  <div class="sevice-comment-page">
    <!-- STEP 2 -->
    <div class="modal-step-1">
      <div class="content-wrap">
        <section>
          <h1>
            굿애프터눈에 전하고 싶은 의견이 있다면?
          </h1>
          <p class="description">주신 의견은 꼼꼼히 읽어볼게요</p>
          <div class="input-wrap">
            <q-input
              v-model="comment"
              filled
              type="textarea"
            />
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
  methods : {
    next () {
      this.$router.push('/service-comment/step3');
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
