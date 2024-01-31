<template>
  <div class="search-page">
    <!-- 검색창 -->
    <div class="search-input-area flex-sb">
      <q-input v-model="searchText" class="search-input" dense filled placeholder="검색어를 입력해 주세요." round
               @keyup.enter="getArticleList">
        <template v-slot:prepend>
          <q-btn dense flat icon="search"/>
        </template>
        <template v-slot:append>
          <q-btn dense flat icon="cancel" @click="searchText = ''"/>
        </template>
      </q-input>
      <!-- 검색 버튼 -->
      <q-btn class="btn-search" color="primary" dense flat label="검색"></q-btn>
    </div>
    <!-- 키워드 목록 -->
    <section class="nomal-page-layout">
      <h2 class="headline-2">많이 찾고 있는 키워드</h2>
      <div class="tag-list">
        <q-btn v-for="item in keywords" class="tag-item" flat @click="searchKeyword(item)">{{ item }}</q-btn>
      </div>
    </section>
    <!-- 검색 결과 -->
    <section v-if="articleList.length > 0">
      <h2 class="headline-2">검색</h2>
      <skeleton-card v-if="isLoading" :lines="5"/>
      <div v-for="item in articleList" v-else>
        <article-card
          v-if="item.nickname"
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
          :writer-thumb="item.writerThumb"/>
      </div>
      <q-btn v-if="!lastContentLoad" class="caption-1" flat label="검색 결과 더보기" @click="moreCards"/>
      <div v-else class="caption-1 text-align-center">마지막 검색 결과 입니다.</div>
    </section>
    <section v-if="noSearch">
      <h2 class="headline-2">검색</h2>
      <div class="text-align-center">검색 결과가 없어요...🥲</div>
    </section>
    <!-- 카테고리별 인기 콘텐츠 -->
    <section>
      <h2 class="headline-2">카테고리별 인기 콘텐츠</h2>
      <div v-for="item in fixedArticles">
        <article-card
          v-if="item.nickname && item.category_name"
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
    </section>
    <bottom-app-bar/>
  </div>
</template>

<script>
import TitleTopBar from 'components/app-bar/TitleTopBar.vue';
import ArticleCard from 'components/card/ArticleCard.vue';
import SkeletonCard from "components/loading/SkeletonCard.vue";
import BottomAppBar from "components/app-bar/BottomAppBar.vue";

export default {
  components: {
    BottomAppBar,
    TitleTopBar,
    'article-card': ArticleCard,
    SkeletonCard,
  },
  data() {
    return {
      fixedArticles: [],
      articleList: [],
      categoryTab: 'Story',
      search: '',
      keywords: [
        '재취업',
        '이직',
        '고민',
        '이력서 작성',
        '은퇴 준비',
        '명퇴',
        '일거리',
        '보람',
      ],
      searchText: '',
      isLoading: false,
      noSearch: false,
      articleListShow: false,
      limit: 20,
      lastContentLoad: false,
    };
  },
  created() {
    this.getFixedArticleList();
  },
  methods: {
    async moreCards() {
      this.limit += 20;
      const oldListLength = this.articleList.length
      await this.getArticleList();
      if (oldListLength === this.articleList.length) {
        this.lastContentLoad = true;
      }
    },
    searchKeyword(keyword) {
      this.searchText = keyword;
      this.getArticleList();
    },
    setTabUI(tab) {
      this.categoryTab = tab;
    },
    async getFixedArticleList() {
      this.articleList = [];
      try {
        this.isLoading = true;
        const config = {
          url: '/api/crud/lists/?order=desc_bc_regdate',
          data: {
            alias: 'bc',
            prefix: 'bc',
            scopes: 'bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content',
            columns_opts: {
              bc_foreign_key2: 'SNXKQEZS',
            },
            limit: 3,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        };

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
        await this.replaceWriterNames(response, 'fixedArticle');
      } catch (e) {
        console.error('게시글이 존재하지 않습니다.', e);
        this.isLoading = false;
        this.noSearch = true;
      }
    },
    async getArticleList(limit) {
      this.articleList = [];
      this.noSearch = false;
      this.articleListShow = false;
      try {
        this.isLoading = true;
        const config = {
          url: '/api/crud/lists/?bc_content=' + this.searchText,
          data: {
            alias: 'bc',
            prefix: 'bc',
            scopes: 'bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content',
            columns_opts: {
              bc_foreign_key2: 'SNXKQEZS',
            },
            limit: this.limit,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        };

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
        this.noSearch = true;
        this.isLoading = false;
      }
    },
    async replaceWriterNames(array, target) {
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
          if (content.user_info.nickname !== undefined && content.user_info.nickname !== null) {
            item.nickname = content.user_info.nickname;
          }

          if (userType === 'nomal') {
            item.badgeTitle = content.job.job_title ? content.job.job_title : '';
          } else if (userType === 'pro') {
            item.badgeTitle = content.pro.area ? content.pro.area : '';
          }
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
        }
      }
      if (target === 'fixedArticle') {
        this.fixedArticles = array;
        this.articleListShow = true;
      } else {
        this.articleList = array;
        this.articleListShow = true;
      }
    },
  },
  watch: {
    searchText() {
      this.limit = 20;
    }
  }
};
</script>

<style scoped>
.search-page {
  background: #F2F2F7;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  section {
    display: flex;
    flex-direction: column;
    padding: 30px 16px 82px 16px;
    gap: 20px;
    background: #fff;
  }
}

.search-input-area {
  padding: 1rem;
  background: #fff;

  .search-input {
    width: calc(100% - 56px);
    height: 36px;
    font-size: 17px;
  }

  .btn-search {
    width: 40px;
    height: 100%;
  }
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.62rem;

  .tag-item {
    padding: 5px 10px;
    border-radius: 20px;
    border: 1px solid rgba(120, 120, 128, 0.20);
  }
}
</style>
