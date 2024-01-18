<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import IconAlart from "components/modal/iconAlart.vue";

export default {
  name: "JOI_0100",
  components: {IconAlart, TitleTopBar},
  data() {
    return {
      userId: '',
      userPw: '',
      isPwd: true,
      idChecked: false,
      errorMessage: '',
      errorAlert: false,
    }
  },
  computed: {
    userType() {
      return this.$route.query.type;
    },
    ready() {
      return this.userId && this.userPw && this.idChecked && this.passwordLengthCheck && this.passwordStringCheck && this.idLengthCheck && this.idStringCheck;
    },
    idCheckedButtonText() {
      return this.idChecked ? "사용가능" : "중복확인";
    },
    passwordLengthCheck() {
      // 글자 길이 확인
      console.log(this.userPw.length >= 8)
      return this.userPw.length >= 8;
    },
    passwordStringCheck() {
      if (this.userPw) {
        // 정규식 확인
        const regexes = {
          letters: /[A-Za-z]/,     // 영문
          numbers: /[0-9]/,        // 숫자
          specialChars: /[^A-Za-z0-9]/ // 특수문자
        };

        let matchCount = 0;
        Object.values(regexes).forEach(regex => {
          if (regex.test(this.userPw)) {
            matchCount++;
          }
        });
        return matchCount >= 2; //"올바른 비밀번호 형식입니다" or "비밀번호 조건을 다시 확인해주세요"
      }
    },
    passwordHint() {
      if (this.userPw === '') {
        // 비밀번호가 빈 문자열인 경우
        return '영문, 숫자, 특수문자 중 2개 이상 포함, 8자 이상';
      } else if (this.passwordLengthCheck && this.passwordStringCheck) {
        // 비밀번호가 조건을 만족하는 경우
        return '올바른 비밀번호 형식입니다.';
      } else {
        // 비밀번호가 조건을 만족하지 않는 경우
        return '비밀번호 조건을 다시 확인해주세요.';
      }
    },
    idLengthCheck() {
      return this.userId.length >= 4 && this.userId.length <= 14;
    },
    idStringCheck() {
      // 영문 또는 숫자 조합 4~14자, 특수문자 없음을 확인하는 정규 표현식
      const regex = /^[A-Za-z0-9]{4,14}$/;
      return regex.test(this.userId)
    },
    idHint() {
      if (this.userId === '') {
        // 기본
        return '영문 또는 숫자 조합 4~14자. 특수 문자는 안돼요';
      } else if (this.idLengthCheck && this.idStringCheck && this.idChecked) {
        // 아이디 길이와 정규식이 정상이며, 중복 확인 성공시
        return '해당 아이디는 사용 가능합니다';
      } else if (this.idLengthCheck && this.idStringCheck && !this.idChecked) {
        // 아이디 길이와 정규식이 정상이지만, 중복 확인을 안하거나 실패했을 경우
        return '중복 확인을 해주세요';
      } else {
        // 아이디 길이와 정규식이 정상이 아닐 경우
        return '비밀번호 조건을 다시 확인해주세요';
      }
    },
  },
  methods: {
    async checkId() {
      if (this.idChecked) {
        return
      }
      // 아이디 중복 확인
      try {
        const config = {
          url: '/api/crud/lists/',
          body: {
            "alias": "mem",
            "prefix": "mem",
            "columns_opts": {
              "mem_id": this.userId
            },
            "scopes": "mem_key,mem_status,mem_id,mem_class,mem_title,mem_foreign_key,mem_regdate,mem_phone,mem_email,mem_regis_num,"
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        if (res.data.status) {
          // 중복된 닉네임
          this.errorAlert = true;
          this.idChecked = false;
        }
      } catch (e) {
        // 사용 가능한 닉네임
        this.idChecked = true;
      }
    },
    resetAlartStatus() {
      this.errorAlert = false;
    },
    saveUserIdPw() {
      // 로컬 스토리지에 임시 저장
      localStorage.setItem('draft_type', this.userType ? this.userType : 'nomal');
      localStorage.setItem('draft_id', this.userId);
      localStorage.setItem('draft_pw', this.userPw);

      this.navigateTo('/joi0110');
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  watch: {
    userId(newVal, oldVal) {
      this.idChecked = false;
    }
  }
}
</script>

<template>
  <div class="joi-0100-view">
    <title-top-bar :title-text="'아이디, 비밀번호 설정'"></title-top-bar>
    <section class="inner-layout l-column">
      <!-- 아이디 입력 -->
      <div class="id-input-wrap">
        <q-input
          v-model="userId"
          :hint="idHint"
          label="아이디"
          outlined>
        </q-input>
        <div class="btn-dd-check-wrap">
          <q-btn
            :disable="!idLengthCheck && !idStringCheck || this.idChecked"
            class="btn-dd-check"
            flat
            style="background: var(--only-g-red-red-10)"
            @click="checkId()">
            <!-- 사용가능 또는 중복확인 -->
            {{ idCheckedButtonText }}
          </q-btn>
        </div>
      </div>
      <!-- 비밀번호 입력 -->
      <q-input
        v-model="userPw"
        :hint="passwordHint"
        :type="isPwd? 'password' : 'text'"
        label="비밀번호"
        outlined>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </section>

    <!-- 다음 버튼 -->
    <q-btn
      :disable="!ready"
      :style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'"
      class="full-width bottom-button-fixed"
      flat
      size="lg"
      square
      @click="saveUserIdPw">
      <span style="color: #fff">다음</span>
    </q-btn>

    <!-- error dialog -->
    <icon-alart :alert-show="errorAlert"
                :button-inner-text="'확인'"
                :description="'해당 아이디는 사용중입니다'"
                @confirm="resetAlartStatus"
    >
    </icon-alart>
  </div>
</template>

<style lang="scss" scoped>

.joi-0100-view {
  .inner-layout {
    padding: 1.25rem 16px;
    gap: 30px;
  }
}

.id-input-wrap {
  position: relative;
}

.btn-dd-check-wrap {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: 0.6rem;
}

.bottom-button-fixed {
  position: fixed;
  bottom: 0;
}
</style>
