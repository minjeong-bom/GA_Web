<template>
  <div class="article-layout">
    <text-button-top-bar :title-text="this.categoryName"></text-button-top-bar>
    <!-- 헤더 -->
    <div class="user-profile-wrap">
      <article-id
        v-if="article.createrKey"
        :article-key="articleKey"
        :article-type="article.articleType"
        :control-ui="true"
        :created-at="article.createdAt"
        :creater-key="article.createrKey"
        :creater-name="article.createrName"
        :job-title="article.createrJob"
        :user-key="storageUserKey"
        :userMode
          ="article.createrType"
        :view-count="article.viewCount"
        article-type2=""
        class="full-width"
      />
    </div>
    <div class="headline-wrap">
      <!-- 헤드라인 -->
      <h1 class="article-card-headline">{{ article.title }}</h1>
      <!-- 작성 시각 -->
      <p class="article-created-at-text">{{ article.createdAt }}</p>
    </div>
    <!-- 댓글수 & 공감수, 북마크 & 공유 & 폰트크기 설정 -->
    <div class="flex-sb article-overview-wrap">
      <article-overview-info :comment-length="counts.comments" :likes-length="counts.likes" class="article-overview"/>
      <article-controller :article-key="articleKey" :user-key="storageUserKey" @setFontSize="setFontSize"/>
    </div>
    <!-- 썸네일 -->
    <skeleton-card v-if="isLoading" lines="1"/>
    <img v-if="article.thumbnail" :src="'data:image/jpeg;base64,' + article.thumbnail" class="thumbnail-image-style">
    <!-- 본문 -->
    <section class="article-content">
      <skeleton-line v-if="isLoading" :lines="4"></skeleton-line>
      <p v-else :class="fontSizeClass" v-html="article.content"></p>
    </section>
    <!-- 구분선 -->
    <div class="end-line"/>
    <!-- 👍 댓글수 & 공감수, 좋아요 목록 -->
    <div class="article-likes">
      <article-overview-info :comment-length="counts.comments" :likes-length="counts.likes"/>
      <like-stamp :article-key="articleKey" :user-key="storageUserKey" @likesCount="likesCount"/>
    </div>
    <!-- 댓글 입력, 댓글 목록 -->
    <comment-u-i :article-key="articleKey" :storage-user-key="storageUserKey" @commentsCount="commentsCount"/>
  </div>
</template>

<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";
import ArticleController from "components/button-grop/article-controller.vue";
import ArticleHeader from "components/page-content/article-header.vue";
import ArticleOverviewInfo from "components/page-content/article-overview-info.vue";
import SkeletonLine from "components/loading/SkeletonLine.vue";
import SkeletonCard from "components/loading/SkeletonCard.vue";
import CommentUI from "components/comment/commentUI.vue";
import LikeStamp from "components/like-stamp/like-stamp.vue";
import {viewCountAdd} from "src/script/api/viewCountAddCall";
import ArticleId from "components/card/ArticleId.vue";


export default {
  components: {
    ArticleId,
    CommentUI,
    LikeStamp,
    SkeletonCard,
    ArticleOverviewInfo,
    ArticleHeader,
    ArticleController,
    TextButtonTopBar,
    SkeletonLine,
  },
  data() {
    return {
      isLoading: true,
      article: {
        articleType: '',
        articleType2: '',
        viewCount: '',
        createrKey: '',
        createrName: '',
        title: '',
        content: '',
        createdAt: '',
        createrJob: '',
        createrType: '',
      },
      counts: {
        comments: 0,
        likes: 0,
      },
      articleFontSize: '', // 사용자 지정 폰트 크기
      thumbnailImageSource: null, // 썸네일 이미지
    }
  },
  created() {
    this.getArticleContent();
    this.setFontSize();
  },
  methods: {
    likesCount(count) {
      this.counts.likes = Number(count);
    },
    commentsCount(count) {
      this.counts.comments = Number(count);
    },
    setFontSize() {
      this.articleFontSize = parseInt(localStorage.getItem('articleFontSize')) || 2;
    },
    async getArticleContent() {
      try {
        const config = {
          url: '/api/crud/single/' + this.articleKey,
          body: {
            "prefix": "bc",
            "alias": "bc",
            "scopes": "bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content"
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc)
        this.isLoading = false;
        const content = res.data.response.view

        this.article.title = content.bc_content.title;
        this.article.viewCount = content.bc_count;
        this.article.content = content.bc_content.body.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        this.article.thumbnailKey = content.bc_content.thumbnailKey;
        this.article.createrKey = content.bc_writer_name;
        this.article.createdAt = content.bc_regdate;
        this.article.articleType = content.bc_foreign_key;

        if (content.bc_foreign_key === 'DPORHCPV') {
          this.article.articleType = '스토리'
        } else if (content.bc_foreign_key === 'KWUOXKGM') {
          this.article.articleType = '취업 스킬'
        } else if (content.bc_foreign_key === 'CEZTXGLJ') {
          this.article.articleType = '지애픽'
        }

        // 조회수 증가
        if (this.storageUserKey !== this.article.createrKey) {
          this.article.viewCount = content.bc_count + 1;
          await viewCountAdd(this.articleKey);
        }

        this.getThumbnail();
        this.getCreaterInfo();
      } catch (e) {
        console.error('게시글이 유효하지 않습니다.', e);
        this.isLoading = false;
      }
    },
    async getThumbnail() {
      this.isLoading = true;
      try {
        const config = {
          url: '/api/crud/single/' + this.article.thumbnailKey,
          body: {
            "prefix": "bc",
            "alias": "bc",
            "scopes": "bc_content"
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            }
          }
        }
        const result = await this.$api.post(config.url, config.body, config.etc);
        this.isLoading = false;
        this.article.thumbnail = result.data.response.view.bc_content;
        this.thumbnailImageSource = `data:image/jpeg;base64,${this.article.thumbnail}`;
      } catch (e) {
        console.error('썸네일이 없는 게시글입니다.', e);
        this.isLoading = false;
      }
    },
    async getCreaterInfo() {
      const config = {
        url: '/api/crud/lists/?order=desc_bc_regdate',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_key,bc_content',
          columns_opts: {
            bc_foreign_key2: 'IYETRHFC',
            bc_title: this.article.createrKey,
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
      if (res) {
        const result = res.data.response.lists[0].bc_content;
        this.article.createrType = result.user_info.type;
        if (result.user_info.type === 'nomal') {
          this.article.createrName = result.user_info.nickname;
          this.article.createrJob = result.job.job_title;
        } else if (result.user_info.type === 'pro') {
          this.article.createrName = result.user_info.nickname;
          this.article.createrJob = result.pro.area ? result.pro.area + ' 전문가' : '전문가';
        }

      } else {
        this.nickname = '비공개 회원';
      }
    },
  },
  computed: {
    categoryName() {
      if (this.article.articleType === 'KWUOXKGM') {
        return '취업스킬';
      } else if (this.article.articleType === 'DPORHCPV') {
        return '스토리';
      } else if (this.article.articleType === 'CEZTXGLJ') {
        return '지애픽';
      }
    },
    storageUserKey() {
      return localStorage.getItem('userKey');
    },
    articleKey() {
      return this.$route.query.key;
    },
    fontSizeClass() {
      switch (this.articleFontSize) {
        case 1:
          return 'font-size-1';
        case 2:
          return 'font-size-2';
        case 3:
          return 'font-size-3';
        case 4:
          return 'font-size-4';
        case 5:
          return 'font-size-5';
        default:
          return '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-overview {
  display: flex;
  align-items: center;
  padding: 11px 16px;
  gap: 3px;
}

.article-likes {
  display: flex;
  padding: 0.625rem 1.5rem 1.25rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
}

.thumbnail-image-style {
  width: 100%;
}

.user-profile-wrap {
  display: flex;
  padding: 1rem 1rem 0 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
}

.headline-wrap {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;

  .article-card-headline {
    margin-block-end: 0;
    margin-block-start: 0;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .article-created-at-text {
    color: #999;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.25rem; /* 166.667% */
  }
}
</style>
