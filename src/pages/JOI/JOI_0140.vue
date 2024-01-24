<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "JOI_0140",
  components: {TitleTopBar},
  data() {
    return {
      allChecked: false,
      check1: false,
      check2: false,
    }
  },
  methods: {
    async joinus() {
      const draftType = localStorage.getItem('user_mode');
      const draftId = localStorage.getItem('draft_id');
      const draftPw = localStorage.getItem('draft_pw');
      const draftEmail = localStorage.getItem('draft_email');

      let config;

      if (draftType && draftId && draftPw && draftEmail) {
        config = {
          url: '/api/crud/create',
          body: {
            data_prefix: 'mem',
            data_foreign_key: 'DGAKKIFW', // 일반회원
            data_status: 'authorized',
            data_id: draftId,
            data_pw: draftPw,
            data_email: draftEmail,
            data_phone: '010-5695-9919',
            data_title: draftId,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          },
        }

        if (draftType === 'nomal') {
          config.body.data_foreign_key = 'DGAKKIFW';
        } else if (draftType === 'pro') {
          config.body.data_foreign_key = 'MWLYIGYC';
        } else if (draftType === 'enterprise') {
          config.body.data_foreign_key = 'XVETQFRK';
        } else {
          this.$q.notify('지금은 회원 가입을 할 수 없습니다. 관리자에게 문의해 주세요.');
          return
        }
      } else {
        this.$q.notify('가입 정보 입력 유효 시간이 지났습니다.');
        this.navigateTo('/joi0000');
      }

      // 회원 추가
      try {
        const res = await this.$api.post(config.url, config.body, config.etc);
        localStorage.setItem('userKey', res.data.response.result.data_key);

        this.login();

        this.navigateTo('/joi0150');
      } catch (e) {
        console.error(e);
      }
    },
    async login() {
      try {
        const draftId = localStorage.getItem('draft_id');
        const draftPw = localStorage.getItem('draft_pw');

        const config = {
          url: '/api/users/login',
          headers: {
            'SPRINT-API-KEY': 'sprintcombom'
          }
        };

        const formData = new FormData();
        formData.append('id', draftId);
        formData.append('pw', draftPw);

        const res = await this.$api.post(
          config.url,
          formData,
          {headers: config.headers}
        );

        localStorage.setItem('userKey', res.data.response.key);
        localStorage.setItem('userName', res.data.response.name);
        localStorage.setItem('userId', res.data.response.id);

        localStorage.removeItem('draft_id');
        localStorage.removeItem('draft_pw');
        localStorage.removeItem('draft_email');
      } catch (error) {
        this.loginFailMassage = '아이디/비밀번호를 다시 확인해주세요'
        console.error(error);
      }
    },
    updateAllChecked() {
      // 모든 체크박스가 선택되었는지 확인
      this.allChecked = this.check1 && this.check2;
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  computed: {
    ready() {
      return this.allChecked;
    },
  },
  watch: {
    allChecked(newVal) {
      // 맨 위 체크박스의 상태가 바뀌면 나머지 체크박스들의 값을 업데이트
      this.check1 = newVal;
      this.check2 = newVal;
    },
    check1: 'updateAllChecked',
    check2: 'updateAllChecked'
  },
}
</script>

<template>
  <div class="joi-0100-view">
    <title-top-bar :title-text="'약관 동의'"></title-top-bar>
    <section class="inner-layout l-column" style="gap: 6px">
      <div :class="check1 && check2 ? 'all-checked checked' : ''" class="all-check-box-wrap">
        <q-checkbox v-model="allChecked" label="약관에 모두 동의"/>
      </div>
      <div>
        <div :class="check1? 'checked' : ''" class="check-box-wrap flex-sb">
          <q-checkbox v-model="check1" label="서비스 이용 약관 동의" style="width: 100%"/>
          <q-btn flat round>
            <q-icon name="chevron_right"></q-icon>
          </q-btn>
        </div>
        <div :class="check2? 'checked' : ''" class="check-box-wrap flex-sb">
          <q-checkbox v-model="check2" label="개인정보 처리방침 동의" style="width: 100%"/>
          <q-btn flat round>
            <q-icon name="chevron_right"></q-icon>
          </q-btn>
        </div>
      </div>
    </section>
    <q-btn
      :disable="!ready"
      :style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'"
      class="full-width main-bottom-btn"
      flat
      label="다음"
      rounded
      size="lg"
      text-color="white"
      @click="joinus()"
    />
  </div>
</template>

<style scoped>
.joi-0100-view {
}

.joi-0100-view .inner-layout {
  padding: 1.25rem 16px;
}

.inner-layout {
  gap: 0;
}

.bottom-button-fixed {
  position: fixed;
  bottom: 0;
}

.all-check-box-wrap {
  border-radius: 0.25rem;
  border: 1px solid #808080;
  padding: 0.6rem;
}

.check-box-wrap {
  border-radius: 0.25rem;
  padding: 0.6rem;
  padding-right: 0;
}

.checked * {
  color: var(--ga-red);
}
</style>
