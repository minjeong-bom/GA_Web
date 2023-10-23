<template>
  <div class="login-page">
    <top-bar :title="'로그인'"></top-bar>
    <section class="login-form">
      <div>
        <!-- 아이디 -->
        <p class="lable">아이디</p>
        <q-input color="black" outlined v-model="userId" :input-style="{ fontSize: '20px', }"/>
        <span v-show="idError !== null" class="error-msg">
          <i class="fa-solid fa-circle-exclamation"></i>
          {{ idError }}
        </span>
        <!-- 비밀번호 -->
        <p class="lable">비밀번호</p>
        <q-input v-model="userPW" outlined :type="userPW ? 'password' : 'text'" :input-style="{ fontSize: '20px', }">
          <template v-slot:append>
            <q-icon
              :name="userPW ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="userPW = !userPW"
            />
          </template>
        </q-input>
        <span v-show="pwError !== null" class="error-msg">
          <i class="fa-solid fa-circle-exclamation"></i>
          {{ pwError }}
        </span>
      </div>
      <div class="button-group">
        <span><u>아이디 찾기</u></span>
        <span>|</span>
        <span><u>비밀번호 찾기</u></span>
      </div>
      <button class="btn-login" @click="login()">로그인</button>
    </section>
  </div>
</template>
<script>
import TopBarSub from "components/common/TopBarSub.vue";

export default {
  components: {
    'top-bar': TopBarSub
  },
  data() {
    return {
      userId: null,
      userPW: null,
      idError: null,
      pwError: null,
    }
  },
  methods: {
    login() {
      // 벨리데이션 체크
      if (this.userId !== null && this.userPW !== null) {
        debugger
        this.$router.push('/');
        localStorage.setItem("user_id", this.userId);
      } else {
        if (this.userId === null || this.userId === '') {
          this.idError = "아이디를 입력해 주세요"
        }

        if (this.userPW === null || this.userPW === '') {
          this.pwError = "비밀번호를 입력해 주세요"
        }
      }
    },
  }
}
</script>

<style scoped>
.login-page {
  position: relative;
  height: 100%;
}

.login-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 36px;
  padding: 0 24px;
}

.error-msg {
  color: #FD384E;
  line-height: 2;
  font-size: 16px;
  margin-block-end: 0;
  font-weight: bold;
}

.lable {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-bottom: 16px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  text-align: center;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 178.571% */
}

.btn-login {
  width: 100%;
  background: #FD384E;
  padding: 15px;
  font-size: 20px;
  border: 0;
  color: #fff;
  font-weight: bold;
  border-radius: 12px;
}
</style>
