<template>
  <q-page class="home">
    <title-top-bar :title-text="pageTitle"/>
    <skeleton-card v-if="isLoading" :lines="10"/>
    <div v-if="articleList.length > 0">
      <section>
        <!-- Article Cards -->
        <div>
          <div v-for="item in articleList">
            <article-card :article-key="item.bc_key"
                          :article-type="item.category_name"
                          :article-type2="item.category_name"
                          :badge-title="item.badgeTitle"
                          :created-at="item.bc_regdate"
                          :creater-key="item.bc_writer_key"
                          :motivation="item.motivation"
                          :thumbnail-key="item.bc_content.thumbnailKey"
                          :title="item.bc_content.title ? item.bc_content.title : item.bc_title"
                          :view-count="item.bc_count"
                          :writer="item.bc_writer_name"
                          :writer-thumb="item.writerThumb"
            />
          </div>
        </div>
      </section>
      <!-- 아티클 더보기 -->
      <button v-if="articleList.length > 0" class="btn-learn-more" @click="addLoadArticle">더 보기</button>
    </div>
    <section v-else>
      <p v-if="!isLoading" class="text-align-center lable-2">😵 아직 등록된 글이 없습니다.</p>
    </section>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue';
import ArticleCard from 'components/card/ArticleCard.vue';
import TitleTopBar from 'components/app-bar/TitleTopBar.vue';
import SkeletonCard from "components/loading/SkeletonCard.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {
    SkeletonCard,
    TitleTopBar,
    'article-card': ArticleCard,
  },
  data() {
    return {
      articleList: [],
      articleListLength: 5,
      thumbnailList: [],
      isLoading: true,
    };
  },
  created() {
    const isPath = this.$route.path;
    if (isPath === '/articles/story') {
      this.getArticleList('story', 25);
    } else if (isPath === '/articles/skills') {
      this.getArticleList('skills', 25);
    } else if (isPath === '/articles/pick') {
      this.getArticleList('gapick', 25);
    }
  },
  methods: {
    addLoadArticle() {
      this.articleListLength += 10;
      this.getArticleList(this.tabCategoryType, this.articleListLength);
    },
    checkOnboard() {
      if (this.onboard) {
        this.checkLogin();
      } else {
        this.$router.push('/onb0000');
      }
    },
    checkLogin() {
      if (!this.userId) {
        this.$router.push('/login');
      }
    },
    async getArticleList(category, limit) {
      console.log(category, limit);
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

        // 카테고리 별 'bc_foreign_key' 설정
        if (category === 'story') {
          config.data.columns_opts.bc_foreign_key = 'DPORHCPV'; // 스토리
        } else if (category === 'skills') {
          config.data.columns_opts.bc_foreign_key = 'KWUOXKGM'; // 스킬
        } else if (category === 'gapick') {
          config.data.columns_opts.bc_foreign_key = 'CEZTXGLJ'; // 스킬
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
      } catch (e) {
        console.error('게시글이 존재하지 않습니다.', e);
        this.isLoading = false;
      }
    },
    async replaceWriterNames(array) {
      for (const item of array) {
        try {
          const res = await this.$api.post(
            `/api/crud/single/${item.bc_writer_name}`,
            {
              prefix: 'mem',
              alias: 'mem',
              scopes: 'mem_title,mem_job',
            },
            {
              headers: {
                'SPRINT-API-KEY': 'sprintcombom',
              },
            },
          );
          if (res.data.status === 'success') {
            item.bc_writer_key = item.bc_writer_name;
            item.bc_writer_name = res.data.response.view.mem_title;
            if (res.data.response.view.mem_job) {
              item.badgeTitle = res.data.response.view.mem_job;
            } else {
              item.badgeTitle = '일반 회원'; // job 정보가 등록되지 않은 회원은 일반 회원으로 표시
            }
          }
          this.isLoading = false;
        } catch (e) {
          item.badgeTitle = '비공개 회원'; // 삭제된 회원
          this.isLoading = false;
        }
      }
      this.articleList = array;
    },
  },
  computed: {
    userId() {
      return localStorage.getItem('userId');
    },
    onboard() {
      return localStorage.getItem('isOnboard');
    },
    pageTitle() {
      if (this.$route.path === '/articles/pick') {
        return '지애 Pick';
      }
      if (this.$route.path === '/articles/skills') {
        return '취업 스킬';
      }
      if (this.$route.path === '/articles/story') {
        return '스토리';
      }
    },
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

.feed-back-section p {
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;

  margin-block-start: 15px;
  margin-block-end: 15px;
}
</style>
