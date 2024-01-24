<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "JOI_0180",
  components: {TitleTopBar},
  data() {
    return {
      q1: true,
      q2: true,
      q3: '이직',
      q1Options: [
        {
          label: '네',
          value: true,
        },
        {
          label: '아니오',
          value: false,
        },
      ],
      q2Options: [
        {
          label: '네',
          value: true,
        },
        {
          label: '아니오',
          value: false,
        },
      ],
      q3Options: [
        {
          label: '네',
          value: true,
        },
        {
          label: '아니오',
          value: false,
        },
      ],
      detailProfileKey: '',
      originInfo: '',
    }
  },
  computed: {
    ready() {
      return true;
    },
  },
  created() {
    this.getDetailUserInfo();
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    async getDetailUserInfo() {
      const storageUserKey = localStorage.getItem('userKey');

      const config = {
        url: '/api/crud/lists/',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_key,bc_content',
          columns_opts: {
            bc_foreign_key: 'AYZXHRWS',
            bc_title: storageUserKey,
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
        this.originInfo = result.bc_content;
      }
    },
    async setUserInfo() {
      const storageUserKey = localStorage.getItem('userKey');
      try {
        let originBody = this.originInfo;
        originBody.job.working = this.q1 ? '네' : '아니오'; // 현업 종사 여부
        originBody.job.searching = this.q2 ? '네' : '아니오'; // 현업 종사 여부
        originBody.job.searching_type = this.q3; // 현업 종사 여부

        let config = {
          url: '/api/crud/create',
          body: {
            data_key: this.detailProfileKey,
            data_prefix: 'bc',
            data_foreign_key: 'AYZXHRWS',
            data_title: storageUserKey,
            data_content: JSON.stringify(originBody),
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        if (res.data) {
          this.navigateTo('/');
        }
      } catch (e) {
        console.error(e);
      }
    },
  }
}
</script>

<template>
  <div class="joi-0170-view">
    <!-- 일반회 원용 프로필 설정 2단계 -->
    <title-top-bar :back-button="false" :sub-text="'3/3'" :title-text="'프로필 설정'"></title-top-bar>
    <div class="inner-layout l-column">
      <section class="l-column">
        <p class="input-lable-text-comment">현업에 종사중이신가요?</p>
        <div class="flex-end">
          <q-option-group
            v-model="q1"
            :options="q1Options"
            color="primary"
          />
        </div>
      </section>
      <section class="l-column">
        <p class="input-lable-text-comment">구직 활동 중이신가요?</p>
        <div class="flex-end">
          <q-option-group
            v-model="q2"
            :options="q2Options"
            color="primary"
          />
        </div>
      </section>
      <section class="l-column">
        <p class="input-lable-text-comment">구직 활동의 목표는 무엇인가요?</p>
        <p class="">이직= 유사 직종으로 옮기는 것, 전직= 직종을 바꾸는 것</p>
        <div class="l-column">
          <q-radio v-model="q3" label="이직" val="이직"/>
          <q-radio v-model="q3" label="전직" val="전직"/>
        </div>
      </section>
    </div>

    <q-btn
      :style="ready? 'background: var(--ga-red);' : 'background: #C1C1C1;'"
      class="full-width main-bottom-btn"
      flat
      label="다음"
      rounded
      size="lg"
      style="background: var(--ga-red)"
      text-color="white"
      @click="setUserInfo()"
    />
  </div>
</template>

<style scoped>
section {
  gap: 10px;
}

.joi-0170-view .inner-layout {
  padding: 1.25rem 16px;
}

.id-input-wrap {
  position: relative;
}

.inner-layout {
  gap: 30px;
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
