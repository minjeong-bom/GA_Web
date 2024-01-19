<template>
  <div class="login-view">
    <div class="service-login-area">
      <!-- 헤드라인 -->
      <h1 class="login-headline">반갑습니다</h1>
      <!-- 아이디 & 비밀번호 입력 -->
      <div class="login-form">
        <q-input v-model="userId" label="아이디" outlined/>
        <q-input v-model="userPw" :type="isPwd? 'password' : 'text'" label="비밀번호"
                 outlined>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div v-show="loginFailMassage" class="error-msg">
          <q-icon color="red" name="error" size="16px"/>
          <p>{{ loginFailMassage ? loginFailMassage : loginErrorMessage }}</p>
        </div>
      </div>
      <!-- 로그인 버튼 -->
      <q-btn class="login-button" flat rounded size="lg" style="background: #000;" @click="login">
        <p style="color: #fff">로그인</p>
      </q-btn>
      <!-- 회원가입 버튼 -->
      <q-btn class="join-us-button" flat style="background: #F5F5F5;" @click="navigateTo('joi0000')">
        <img alt="icon_clab" src="../../assets/icon/icon-clab.svg">
        <p>1분만에 회원 가입 하기</p>
        <img alt="icon_clab" src="../../assets/icon/icon-clab.svg">
      </q-btn>
      <section class="help-btn-wrap flex-center">
        <q-btn flat rounded><u>아이디 찾기</u></q-btn>
        <span>|</span>
        <q-btn flat rounded><u>비밀번호 재설정</u></q-btn>
      </section>
    </div>
    <!-- 소셜 로그인 -->
    <div class="social-login-area">
      <p class="login-sub-title">SNS 계정으로 로그인하기</p>
      <div class="social-login-button-group flex-center">
        <!-- Apple -->
        <q-avatar size="3.8rem">
          <img alt="btn-sns-login" src="../../assets/graphic/btn-sns-login.png">
        </q-avatar>
        <!-- Google -->
        <q-avatar size="3.8rem">
          <img alt="btn-sns-login-1" src="../../assets/graphic/btn-sns-login-1.png">
        </q-avatar>
        <!-- Naver -->
        <q-avatar size="3.8rem">
          <img alt="btn-sns-login-2" src="../../assets/graphic/btn-sns-login-2.png">
        </q-avatar>
        <!-- Kakao -->
        <q-avatar size="3.8rem">
          <img alt="btn-sns-login-2" src="../../assets/graphic/btn-sns-login-3.png">
        </q-avatar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      userPw: "",
      isPwd: true,
      autoLogin: true,
      loginFailMassage: '',
    }
  },
  methods: {
    async login() {
      try {
        const config = {
          url: '/api/users/login',
          headers: {
            'SPRINT-API-KEY': 'sprintcombom'
          }
        };

        const formData = new FormData();
        formData.append('id', this.userId);
        formData.append('pw', this.userPw);

        const res = await this.$api.post(
          config.url,
          formData,
          {headers: config.headers}
        );

        localStorage.setItem('userKey', res.data.response.key);
        localStorage.setItem('userName', res.data.response.name);
        localStorage.setItem('userId', res.data.response.id);

        this.getDetailUserInfo(res.data.response.key);
        res.data.response
      } catch (error) {
        this.loginFailMassage = '아이디/비밀번호를 다시 확인해주세요'
        console.error(error);
      }
    },
    async getDetailUserInfo(userKey) {
      try {
        const config = {
          url: '/api/crud/lists/?order=desc_bc_regdate',
          body: {
            alias: 'bc',
            prefix: 'bc',
            scopes: 'bc_content,bc_key',
            columns_opts: {
              bc_foreign_key2: 'IYETRHFC',
              bc_title: userKey,
            },
            limit: 1
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        console.log(res)
        if (res) {
          const result = res.data.response.lists[0];
          const bc_content = result.bc_content;
          console.log(bc_content)
          console.log('user mode set')
          localStorage.setItem('user_mode', bc_content.user_info.type);
        }

        this.navigateTo('/');
      } catch (e) {
        localStorage.setItem('user_mode', 'nomal');
        this.navigateTo('/');
      }
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  computed: {
    loginErrorMessage() {
      if (this.userId === "" && this.userPw === "") {
        return "";
      }
      if (!this.userPw) {
        return "비밀번호를 입력해주세요"
      }
    }
  }
}
</script>

<style scoped>
.login-view {
  padding: 0 16px;
  padding-top: 20%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.login-headline {
  color: var(--labels-secondary);
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.03rem;
  margin-bottom: 2.25rem;
}

.login-sub-title {
  color: #666;
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.015rem;
  padding: 1rem 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.login-button {
  width: 100%;
  margin-top: 1.7rem;
}

.social-login-area {
  margin-top: 1.25rem;
}

.social-login-button-group {
  gap: 0.62rem;
}

.join-us-button {
  width: 100%;
  margin-top: 1.25rem;
  color: #4F4546;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem; /* 150% */
  letter-spacing: -0.03125rem;
}

.help-btn-wrap {
  padding: 0.62rem 0;
}

.help-btn-wrap * {
  color: #666;
}

.error-msg {
  display: flex;
  align-items: center;
  gap: 6px;

  font-weight: 500;
}
</style>
