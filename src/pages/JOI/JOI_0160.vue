<script>
import TitleTopBar from 'components/app-bar/TitleTopBar.vue';
import nickNameList from 'assets/data/nickname-list.json';

export default {
  name: 'JOI_0160',
  components: {TitleTopBar},
  data() {
    return {
      userName: '',
      interestings: [],
      options: [
        {
          label: '소통',
          value: '소통',
        },
        {
          label: '업무 관련 스킬 향상',
          value: '업무 관련 스킬 향상',
        },
        {
          label: '구인/구직 정보',
          value: '구인/구직 정보',
        },
        {
          label: '유용한 정보(세미나, 프로그램 등)',
          value: '유용한 정보(세미나, 프로그램 등)',
        },
      ],
      nickNameList,
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    generateNickname() {
      const adjective = this.getRandomItem(this.nickNameList.firstName);
      const animalPlant = this.getRandomItem(this.nickNameList.secondName);

      this.userName = `${adjective} ${animalPlant}`;
    },
    getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    async save() {
      const content_data = {
        user_info: {
          type: this.userType ? this.userType : 'nomal',
          nickname: this.userName,
          interesting: this.interestings,
        },
      }
      try {
        let config = {
          url: '/api/crud/create',
          body: {
            data_prefix: 'bc',
            data_foreign_key2: 'IYETRHFC',
            data_foreign_key: this.userType === 'pro' ? 'XGYLPKDE' : 'AYZXHRWS',
            data_title: this.userKey,
            data_content: JSON.stringify(content_data),
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        }

        console.log(config)
        await this.$api.post(config.url, config.body, config.etc);
        if (this.userType === 'pro') {
          this.navigateTo('/joi0200');
        } else {
          this.navigateTo('/joi_0170');
        }
      } catch (e) {
        this.$q.notify('저장할 수 없습니다. 관리자에게 문의해 주세요.');
      }
    },
  },
  computed: {
    ready() {
      return this.userName && this.interestings;
    },
    userType() {
      return localStorage.getItem('user_mode');
    },
    userKey() {
      return localStorage.getItem('userKey');
    }
  },
};
</script>

<template>
  <div class="joi-0100-view">
    <title-top-bar :back-button="false" :sub-text="userType === 'pro' ? '1/2' : '1/3'"
                   :title-text="'프로필 설정'"></title-top-bar>
    <section class="inner-layout l-column">
      <!-- 닉네임 입력 -->
      <div class="id-input-wrap">
        <q-input
          v-model="userName"
          hint="최대 10글자"
          label="닉네임"
          maxlength="10"
          outlined
          style="font-size: 1.125rem"
        />
        <div class="btn-dd-check-wrap">
          <!-- 닉네임 랜덤 생성 버튼 -->
          <q-btn class="btn-dd-check"
                 flat
                 label="랜덤 생성"
                 style="background: var(--only-g-red-red-10)"
                 @click="generateNickname"
          >
          </q-btn>
        </div>
      </div>
      <!-- 관심사 입력 -->
      <div>
        <p class="sub-title-1">관심사</p>
        <q-option-group v-model="interestings" :options="options" type="checkbox"/>
      </div>
    </section>
    <div class="skip-button-wrap flex-center">
      <q-btn flat @click="navigateTo('/')">
        <span>건너뛰기</span>
        <q-icon name="navigate_next"/>
      </q-btn>
    </div>
    <q-btn
      :disable="!ready"
      :style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'"
      class="full-width bottom-button-fixed"
      flat
      size="lg"
      square
      @click="save()">
      <span style="color: #fff">다음</span>
    </q-btn>
  </div>
</template>

<style lang="scss" scoped>
.sub-title-1 {
  color: #999;
}

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

.skip-button-wrap {
  width: 100%;
  position: fixed;
  bottom: 72px;

  opacity: 0.5;
}
</style>
