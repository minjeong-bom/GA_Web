<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "JOI_0170",
  components: {TitleTopBar},
  data() {
    return {
      userCarrer: '',
      userBackground: '',
      backgroundList: [
        "건설·건축",
        "공공·복지",
        "구매·자재·물류",
        "교육",
        "금융·보험",
        "기획·전략",
        "디자인",
        "마케팅·홍보·조사",
        "미디어·문화·스포츠",
        "바이오·제약·식품",
        "상품기획·MD",
        "서비스",
        "생산",
        "연구·R&D",
        "영업·판매·무역",
        "운전·운송·배송",
        "의료",
        "인사·노무·HRD",
        "IT개발·데이터",
        "총무·법무·사무",
        "회계·세무·재무",
        "고객상담·TM"
      ],
      userCarrerTitle: '',
      originInfo: '',
      profileKey: '',
    }
  },
  computed: {
    ready() {
      return this.userBackground && this.userCarrerTitle && this.userCarrer;
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
        if (!this.detailProfileKey) {
          this.$q.notify('프로필 정보를 입력하는 유효 시간이 지났습니다');
          this.navigateTo('/');
          return
        }

        let bodyContent = this.originInfo;
        bodyContent.job = {
          total_career: this.userCarrer,
          career_name: this.userBackground,
          job_title: this.userCarrerTitle,
        }

        let config = {
          url: '/api/crud/create',
          body: {
            data_key: this.detailProfileKey,
            data_prefix: 'bc',
            data_foreign_key: 'AYZXHRWS',
            data_title: storageUserKey,
            data_content: JSON.stringify(bodyContent),
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        }

        console.log('config', config)
        await this.$api.post(config.url, config.body, config.etc);
        this.navigateTo('/joi0180');
      } catch (e) {
        this.$q.notify('저장할 수 없습니다. 관리자에게 문의해 주세요.');
      }
    },
  }
}
</script>

<template>
  <div class="joi-0170-view">
    <!-- 일반회 원용 프로필 설정 2단계 -->
    <title-top-bar :back-button="false" :sub-text="'2/3'" title-text="프로필 설정"></title-top-bar>
    <section class="inner-layout l-column">
      <!-- 경력 -->
      <q-input
        v-model="userCarrer"
        label="총 경력이 몇 년인지 입력하세요"
        maxlength="3"
        outlined
        style="font-size: 1.125rem;"
        type="tel"
      />
      <!-- 분야 -->
      <q-select
        v-model="userBackground"
        :options="backgroundList"
        behavior="menu"
        label="가장 많이 해온 업무 분야를 선택하세요"
        outlined
        style="font-size: 1.125rem"
      />
      <!-- 분야 상세 -->
      <q-input
        v-model="userCarrerTitle"
        hint="예) 교사, 기획자, 회계사, 마케터, 디자이너, 개발자 등"
        label="선택한 분야 내 구체적인 직업을 입력하세요"
        maxlength="20"
        outlined
        style="font-size: 1.125rem"
      />
    </section>
    <q-btn
      :disable="!ready"
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
