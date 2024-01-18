<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "JOI_0170",
  components: {TitleTopBar},
  data() {
    return {
      detailProfileKey: '',
      originContent: '',
      edit: {
        user_info: {
          type: 'pro',
          nickname: '',
          interesting: [],
          about: ''
        },
        pro: {
          area: '',
          badge_name: '',
          pro_title: '',
          total_career: '',
        }
      }
    }
  },
  created() {
    this.getDetailUserInfo();
  },
  computed: {
    ready() {
      return this.edit.pro.area && this.edit.pro.total_career && this.detailProfileKey;
    },
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    async getDetailUserInfo() {
      const config = {
        url: '/api/crud/lists/',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_key,bc_content',
          columns_opts: {
            bc_foreign_key: 'XGYLPKDE',
            bc_title: this.localUserKey,
          },
          limit: 100
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom'
          }
        }
      }
      const res = await this.$api.post(config.url, config.body, config.etc);
      if (res) {
        const result = res.data.response.lists[0];
        this.detailProfileKey = result.bc_key;
        const bc_content = result.bc_content;
        console.log(bc_content)
        this.edit.user_info.nickname = bc_content.user_info.nickname;
        this.edit.user_info.interesting = bc_content.user_info.interesting;
      }
    },
    async setUserInfo() {
      try {
        if (!this.detailProfileKey) {
          this.$q.notify('프로필 정보를 입력하는 유효 시간이 지났습니다');
          this.navigateTo('/');
          return
        }

        let config = {
          url: '/api/crud/create',
          body: {
            data_key: this.detailProfileKey,
            data_prefix: 'bc',
            data_foreign_key: 'XGYLPKDE',
            data_title: this.userKey,
            data_content: JSON.stringify(this.edit),
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        }

        console.log('config', config)
        await this.$api.post(config.url, config.body, config.etc);
        this.navigateTo('/');
      } catch (e) {
        this.$q.notify('저장할 수 없습니다. 관리자에게 문의해 주세요.');
      }
    },
  }
}
</script>

<template>
  <div class="joi-0170-view">
    <!-- 전문가용 프로필 설정 2단계 -->
    <title-top-bar :back-button="false" :title-text="'프로필 설정'" sub-text="2/2"></title-top-bar>
    <section class="inner-layout l-column">
      <!-- 경력 -->
      <q-input
        v-model="edit.pro.area"
        class="input"
        hint=" 예) 재취업 컨설팅, 재취업 교육, 심리 상담 등"
        label="전문 활동 분야를 입력하세요"
        maxlength="20"
        outlined
        type="text"
      />
      <q-input
        v-model="edit.pro.total_career"
        class="input"
        hint="숫자만 입력하세요"
        label="전문가 활동 경력이 몇 년인지 입력하세요"
        maxlength="3"
        outlined
        type="tel"
      />
    </section>
    <q-btn :style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'" class="full-width bottom-button-fixed"
           flat size="lg" square
           @click="setUserInfo">
      <span style="color: #fff">다음</span>
    </q-btn>
  </div>
</template>

<style scoped>
.joi-0170-view {
  .input {
    font-size: 1.125rem;
  }

  .inner-layout {
    padding: 1.25rem 16px;
    gap: 30px;
  }

  .bottom-button-fixed {
    position: fixed;
    bottom: 0;
  }
}
</style>
