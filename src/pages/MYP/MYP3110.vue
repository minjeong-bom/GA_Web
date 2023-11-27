<script>
import TopBarSub from "components/app-bar/TopBarSub.vue";

export default {
  name: "MYP3110",
  components: {
    TopBarSub
  },
  data() {
    return {
      askData: {
        askTitle: ' ',
        askText: ' ',
      }
    }
  }
}
</script>

<template>
  <div>
    <top-bar-sub :back="true" :title="'1:1 문의하기'"></top-bar-sub>
    <div class="create-ask-form">
      <!-- 제목 -->
      <p class="input-lable">제목</p>
      <q-input color="black" outlined v-model="askData.askTitle" :input-style="{ fontSize: '20px', }"/>
      <span v-show="!!!askData.askTitle" class="error-msg"><i class="fa-solid fa-circle-exclamation"></i> 제목을 입력해 주세요</span>

      <p class="input-lable">내용</p>
      <q-input color="black" outlined v-model="askData.askText" :input-style="{ fontSize: '20px', }"/>
      <span v-show="!!!askData.askText" class="error-msg"><i class="fa-solid fa-circle-exclamation"></i> 내용을 입력해 주세요</span>

      <q-btn color="primary" icon="mail" label="vkdlf cj" />
    </div>

  </div>
</template>

<style scoped>
.create-ask-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 24px;
}
</style>
