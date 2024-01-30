<template>
  <q-page class="home">
    <section>
      <!-- Event Cards -->
      <event-card></event-card>
      <!-- Notice Cards -->
      <notice-card></notice-card>
      <!-- Article Cards -->
      <div>
        <!-- Article Card -->
        <tab :default-tab="defaultTab" :tabs="tabList" @changeTab="changeTab"></tab>
        <div v-for="item in articleList">
          <skeleton-card v-if="isLoading" :lines="10"/>
          <article-card v-if="item.nickname && item.category_name"
                        :article-key="item.bc_key"
                        :article-type="item.category_name"
                        :article-type2="item.category_name"
                        :badge-title="item.badgeTitle"
                        :created-at="item.bc_regdate"
                        :creater-key="item.bc_writer_name"
                        :is-loading="isLoading"
                        :motivation="item.motivation"
                        :thumbnail-key="item.bc_content.thumbnailKey"
                        :title="item.bc_content.title ? item.bc_content.title : item.bc_title"
                        :user-mode="item.user_mode"
                        :view-count="item.bc_count"
                        :writer="item.nickname"
                        :writer-thumb="item.writerThumb"
          />
        </div>
      </div>
    </section>

    <!-- 아티클 더보기 -->
    <button class="btn-learn-more" @click="addLoadArticle">더 보기</button>
    <!-- 피드백 -->
    <section class="feed-back-section">
      <img alt="작은 웃고있는 해 이미지" class="sun-animation" src="../assets/graphic/sun-animation.gif">
      <p>G@에 알려주고 싶은 이야기가 있나요?</p>
      <button class="btn-primary-small" @click="navigateToPath('/svc0000')">네, 있어요</button>
    </section>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue';
import ArticleCard from 'components/card/ArticleCard.vue';
import Tab from 'components/tab/Tab.vue';
import EventCard from 'components/card/EventCard.vue';
import NoticeCard from 'components/card/NoticeCard.vue';
import BottomAppBar from 'components/app-bar/BottomAppBar.vue';
import SkeletonCard from 'components/loading/SkeletonCard.vue';
import {navigateToPath} from "src/script/navigate/navigateToPath";

export default defineComponent({
  name: 'IndexPage',
  components: {
    SkeletonCard,
    BottomAppBar,
    'article-card': ArticleCard,
    tab: Tab,
    'event-card': EventCard,
    'notice-card': NoticeCard,
  },
  data() {
    return {
      tabList: [
        {
          id: 1,
          title: '전체',
        },
        {
          id: 2,
          title: '스토리',
        },
        {
          id: 3,
          title: '취업스킬',
        },
        {
          id: 4,
          title: '지애픽',
        },
      ],
      tabCategoryType: '',
      defaultTab: '0',
      articleList: [],
      articleListLength: 5,
      thumbnailList: [],
      isLoading: true,
    };
  },
  created() {
    const routeTab = this.$route.query.tab;
    this.defaultTab = routeTab ? Number(routeTab) : 1;
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    navigateToPath,
    addLoadArticle() {
      this.articleListLength += 10;
      this.getArticleList(this.tabCategoryType, this.articleListLength);
    },
    checkLogin() {
      if (!this.userId) {
        this.$router.push('/login');
      }
    },
    changeTab(tabId) {
      this.isLoading = true;

      this.articleList = [];
      this.articleListLength = 5;

      if (tabId === '1' || tabId === 1) {
        this.getArticleList('');
        this.tabCategoryType = '';
      } else if (tabId === '2' || tabId === 2) {
        this.getArticleList('story');
        this.tabCategoryType = 'story';
      } else if (tabId === '3' || tabId === 3) {
        this.getArticleList('skills');
        this.tabCategoryType = 'skills';
      } else if (tabId === '4' || tabId === 4) {
        this.getArticleList('gapick');
        this.tabCategoryType = 'gapick';
      }
    },
    async getArticleList(category, limit) {
      try {
        const commonConfig = {
          url: '/api/crud/lists/?order=desc_bc_regdate',
          data: {
            alias: 'bc',
            prefix: 'bc',
            scopes: 'bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content',
            columns_opts: {
              bc_foreign_key2: 'SNXKQEZS',
            },
            limit: limit || 0,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        };
        const config = {...commonConfig};

        console.log('category', category);
        // 카테고리 별 'bc_foreign_key' 설정
        if (category === 'story') {
          config.data.columns_opts.bc_foreign_key = 'DPORHCPV'; // 스토리
        } else if (category === 'skills') {
          config.data.columns_opts.bc_foreign_key = 'KWUOXKGM'; // 취업스킬
        } else if (category === 'gapick') {
          config.data.columns_opts.bc_foreign_key = 'CEZTXGLJ'; // 지애픽
        }

        // API 호출
        const res = await this.$api.post(config.url, config.data, config.etc);
        const response = res.data.response.lists;

        // 카테고리 이름 삽입
        const categoryInfo = {
          DPORHCPV: '스토리',
          KWUOXKGM: '취업 스킬',
          CEZTXGLJ: '지애픽',
        };

        response.forEach((item) => {
          item.category_name = categoryInfo[item.bc_foreign_key] || null;
        });

        // 작성자명 가공 함수 호출
        await this.replaceWriterNames(response);
        await this.getThumbnail();
      } catch (e) {
        console.error('게시글이 존재하지 않습니다.', e);
      }
    },
    async replaceWriterNames(array) {
      for (let item of array) {
        try {
          let config = {
            url: '/api/crud/lists/',
            body: {
              alias: 'bc',
              prefix: 'bc',
              scopes: 'bc_key,bc_content',
              columns_opts: {
                bc_foreign_key2: 'IYETRHFC',
                bc_title: item.bc_writer_name,
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

          const content = res.data.response.lists[0].bc_content;
          const userType = content.user_info.type ? content.user_info.type : 'nomal';

          item.user_mode = userType;
          if (content.user_info.nickname) {
            item.nickname = content.user_info.nickname;
          }

          if (userType === 'nomal') {
            item.badgeTitle = content.job.job_title ? content.job.job_title : '';
          } else if (userType === 'pro') {
            item.badgeTitle = content.pro.area ? content.pro.area : '';
          }

          this.isLoading = false;
        } catch (e) {
          // item.nickname = '비공개 회원';
          // item.badgeTitle = ''; // 삭제된 회원
          this.isLoading = false;
        }
      }
      this.articleList = array;
      console.log(this.articleList)
    },
    async getThumbnail() {
      const config = {
        url: '/api/crud/lists/',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content',
          columns_opts: {
            bc_foreign_key: 'FHGBWGLF',
            bc_foreign_key2: 'UZPWQOWR',
          },
          limit: 100,
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom',
          },
        },
      };

      const res = await this.$api.post(config.url, config.body, config.etc);
      this.thumbnailList = res.data.response.lists;

      this.addThumbnailsToArticles();
    },
    addThumbnailsToArticles() {
      this.articleList.forEach((article) => {
        const thumbnailKey = article.bc_content?.thumbnailKey;
        const thumbnail = this.thumbnailList.find((t) => t.bc_key === thumbnailKey);
        if (thumbnail) {
          article.bc_thumb = thumbnail.bc_content;
        }
      });

      this.isLoading = false;
    },
  },
  computed: {
    userId() {
      return localStorage.getItem('userId');
    },
    onboard() {
      return localStorage.getItem('isOnboard');
    },
    userType() {
      return localStorage.getItem('user_mode');
    }
  },
});
</script>

<style scoped>
.home {
  background: linear-gradient(180deg, #FFF 14.1%, #F4F4F4 73.82%);
}

.home section {
  padding: 20px;
}

.btn-learn-more {
  display: flex;
  width: 100%;
  height: 63px;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  color: #FD7F38;
  background-color: #fff;
  border: none;
}

.feed-back-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  padding: 30px;
  background-color: #fff;
}

.feed-back-section p {
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;

  margin-block-start: 15px;
  margin-block-end: 15px;
}

.feed-back-section .sun-animation {
  width: 56px;
  height: 56px;
}
</style>
