<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";
import SkeletonCard from "components/loading/SkeletonCard.vue";
import ResumeCard from "components/card/ResumeCard.vue";
import Tab from "components/tab/Tab.vue";

export default {
  name: "MYR_0000",
  components: {ResumeCard, SkeletonCard, TextButtonTopBar, TitleTopBar, Tab},
  data() {
    return {
      list: [],
      isLoading: false,
      tabList: [
        {
          id: 'guide',
          title: '이력서 가이드'
        },
        {
          id: 'myr',
          title: '내가 작성한 이력서'
        },
      ],
      contentType: true,
    }
  },
  created() {
    this.getMyResume();
  },
  methods: {
    changeTab(tabId) {
      this.fixedArticles = [];

      if (tabId === 'guide') {
        this.contentType = true;
      } else if (tabId === 'myr') {
        this.contentType = false;
      }
    },
    navigateToNewMyr() {
      this.$router.push('/myr0000/create');
    },
    async getMyResume() {
      this.isLoading = true;
      try {
        const config = {
          url: '/api/crud/lists/?resm_mem_key=' + this.storageUserKey,
          data: {
            alias: 'resm',
            prefix: 'resm',
            scopes: 'resm_key,resm_title,resm_strategy,resm_regdate',
            limit: 25,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        };

        // API 호출
        const res = await this.$api.post(config.url, config.data, config.etc);
        const response = res.data.response.lists
        this.list = response;

        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        this.list = [];
      }
    }
  },
  computed: {
    storageUserKey() {
      return localStorage.getItem('userKey');
    },
    storageUserName() {
      return localStorage.getItem('userName');
    }
  }
}
</script>

<template>
  <div>
    <text-button-top-bar button-name="새 이력서 작성" title-text="내 이력서" @action="navigateToNewMyr()"/>
    <tab :tabs="tabList" default-tab="guide" style="padding: 0 1rem;" @changeTab="changeTab"/>
    <section v-show="contentType" class="nomal-page-layout">
      <div class="center-graphic-layout">
        <img src="../../assets/graphic/graphic-edit-imoji.png">
        <p>
          <span class="high-light">
            {{ storageUserName ? storageUserName : '회원' }}
          </span>님의 이력서를 만들어 보세요.
        </p>
        <p>
          작성하기 막막하신가요?<br>
          이력서 작성 꿀팁을 먼저 살펴보세요.
        </p>
        <q-btn dense flat label="이력서 작성 꿀팁 보기 >"/>
      </div>
      <ResumeCard
        v-for="item in list"
        :created="item.resm_regdate"
        :resume-key="item.resm_key"
        :title="item.resm_title"
      />
    </section>
    <section v-show="!contentType" class="nomal-page-layout">
      <div v-if="isLoading">
        <skeleton-card :lines="3"></skeleton-card>
      </div>
      <ResumeCard
        v-for="item in list"
        v-if="list.length > 0"
        :created="item.resm_regdate"
        :resume-key="item.resm_key"
        :title="item.resm_title"
      />
      <div v-else>
        <p class="text-align-center caption-2">작성한 이력서가 없어요 🥲</p>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.center-graphic-layout {
  gap: 1rem;

  p {
    text-align: center;
  }
}

.layout-center-1 {
  display: flex;
  height: 320px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}
</style>
