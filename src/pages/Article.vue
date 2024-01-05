<template>
  <div class="article-layout">
    <text-button-top-bar :title-text="this.categoryName"></text-button-top-bar>
    <!-- 헤더 -->
    <article-header :articleKey="articleKey" :article="article" :user-key="storageUserKey"/>
    <!-- 댓글수 & 공감수, 북마크 & 공유 & 폰트크기 설정 -->
    <div class="flex-sb article-overview-wrap">
      <article-overview-info :likes-length="counts.likes" :comment-length="counts.comments" class="article-overview"/>
      <article-controller :article-key="articleKey" :user-key="storageUserKey" @setFontSize="setFontSize"/>
    </div>
    <!-- 썸네일 -->
    <skeleton-card v-if="isLoading" :lines="1"></skeleton-card>
    <img v-if="article.thumbnail" class="thumbnail-image-style" :src="'data:image/jpeg;base64,' + article.thumbnail">
    <!-- 본문 -->
    <section class="article-content">
      <skeleton-line v-if="isLoading" :lines="4"></skeleton-line>
      <p v-else v-html="article.content" :class="fontSizeClass"></p>
    </section>
    <!-- 구분선 -->
    <div class="end-line"/>
    <!-- 👍 댓글수 & 공감수, 좋아요 목록 -->
    <div class="article-likes">
      <article-overview-info :likes-length="counts.likes" :comment-length="counts.comments"/>
      <like-stamp :article-key="articleKey" :user-key="storageUserKey" @likesCount="likesCount"/>
    </div>
    <!-- 댓글 입력, 댓글 목록 -->
    <comment-u-i :storage-user-key="storageUserKey" :article-key="articleKey"
                 @commentsCount="commentsCount"></comment-u-i>
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


export default {
  components: {
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
      },
      counts: {
        comments: 0,
        likes: 0,
      },
      articleFontSize: '', // 사용자 지정 폰트 크기
      thumbnailImageSource: null, // 썸네일 이미지
    }
  },
  mounted() {
    this.getArticleContent();
    this.setFontSize();
  },
  methods: {
    likesCount(count) {
      this.counts.likes = count;
      console.log('like', this.counts.likes)
    },
    commentsCount(count) {
      this.counts.comments = count;
      console.log('comment', this.counts.comments)
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

        this.article.articleType = content.bc_foreign_key;
        if (content.bc_foreign_key === 'DPORHCPV') {
          this.article.articleType = '스토리'
        } else if (content.bc_foreign_key === 'KWUOXKGM') {
          this.article.articleType = '취업 스킬'
        } else if (content.bc_foreign_key === 'CEZTXGLJ') {
          this.article.articleType = '지애픽'
        }

        this.article.title = content.bc_title;
        this.article.viewCount = content.bc_count;
        this.article.content = content.bc_content.body.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        this.article.thumbnailKey = content.bc_content.thumbnailKey;
        this.article.createrKey = content.bc_writer_name;
        this.article.createdAt = content.bc_regdate;
        this.getCreaterInfo();
        this.getThumbnail();
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
              'SPRINT-API-KEY': 'sprinttest',
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
      try {
        const config = {
          url: '/api/crud/single/' + this.article.createrKey,
          body: {
            "prefix": "mem",
            "alias": "mem",
            "scopes": "mem_title,mem_job"
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        const response = res.data.response.view
        this.article.createrName = response.mem_title
        this.article.createrJob = response.mem_job

      } catch (e) {
        console.error('사용자 정보가 유효하지 않습니다.', e);
        this.isLoading = false
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

<style scoped>
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
</style>
