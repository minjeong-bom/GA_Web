<template>
	<div class="article-layout">
		<text-button-top-bar :title-text="this.categoryName"></text-button-top-bar>
		<div class="user-profile-wrap">
			<!-- creater info -->
			<article-id style="width: 100%"
			            :user-profile="''"
			            :article-type="article.articleType"
			            :view-count="article.viewCount"
			            :creater-name="article.createrName"
			            :job-title="article.createrJob"
			            :created-at="article.createdAt"
			            :control-ui="false"/>
		</div>
		<div class="headline-wrap">
			<!-- headline -->
			<h1 class="article-card-headline">{{ article.title }}</h1>
			<!-- created at -->
			<p class="article-created-at-text">{{ article.createdAt }}</p>
		</div>

		<div class="article-overview-wrap">
			<!-- likes & comment -->
			<div class="article-overview">
				<span class="lable">공감</span>
				<span class="value">10</span>
				<span>∙</span>
				<span class="lable">댓글</span>
				<span class="value">{{ comments.length }}</span>
			</div>
			<div>
				<!-- 상단 컨트롤 -->
				<section>
					<q-btn flat round icon="text_fields" style="opacity: 0.3"/>
					<q-btn flat round icon="bookmark" @click="addBookmark()" style="opacity: 0.3"/>
					<q-btn flat round icon="share" style="opacity: 0.3"/>
				</section>
			</div>
		</div>
		<!-- 본문 -->
		<section v-if="isLoading" class="article-content">
			<skeleton-line :lines="4"></skeleton-line>
		</section>
		<section v-else class="article-content" style="min-height: 200px" v-html="article.content"></section>
		<!-- article controller -->
		<section class="article-end-control-wrap">
			<q-btn flat icon="text_fields" style="opacity: 0.3"/>
			<q-btn flat icon="bookmark" style="opacity: 0.3"/>
			<q-btn flat icon="share" style="opacity: 0.3"/>
		</section>
    <!-- end line -->
		<div class="end-line">
			<div></div>
		</div>
    <!-- control area -->
		<div class="article-likes">
			<div class="article-overview">
				<span class="lable">공감</span>
				<span class="value">10</span>
				<span>∙</span>
				<span class="lable">댓글</span>
				<span class="value">{{ comments.length }}</span>
			</div>
			<div class="likes-list-area">
				<!-- Add Like -->
        <div class="add-likes-wrap">
          <q-btn size="14px" flat round style="background: #FD384E" @click="showLikeButtons = !showLikeButtons">
            <q-icon name="add" color="white"/>
          </q-btn>
	        <div v-show="showLikeButtons" class="likes-button-group">
		        <img class="like-button" src="../assets/graphic/face-like.png" @click="createLike('like')"/>
		        <img class="like-button" src="../assets/graphic/face-sad.png" @click="createLike('sad')"/>
		        <img class="like-button" src="../assets/graphic/face-gido.png" @click="createLike('gido')"/>
		        <img class="like-button" src="../assets/graphic/face-angry.png" @click="createLike('angry')"/>
		        <img class="like-button" src="../assets/graphic/face-good.png" @click="createLike('good')"/>
	        </div>
        </div>
				<!-- Like List -->
				<section class="liker-slide">
					<q-avatar v-for="item in likes" size="40px">
						<div class="user-profile-wrap"></div>
						<img class="imoji" :src="`src/assets/graphic/face-${item.empathy_log_title}.png`">
					</q-avatar>
				</section>
				<!-- PageNation -->
				<q-btn flat round @click="openLikeList()">
					<q-icon name="navigate_next" style="opacity: 0.4;"/>
				</q-btn>
			</div>
		</div>
		<!-- create comments -->
		<div class="comment-input-area">
			<!-- profile image -->
			<q-avatar size="40px">
				<img src="https://cdn.quasar.dev/img/avatar.png">
			</q-avatar>
			<!-- comment input -->
			<q-input dense rounded outlined v-model="addComment" :placeholder="commentInputPlaceholder" style="width: 100%;">
				<template v-slot:append>
					<q-btn flat round @click="createComment" style="right: -10px">
						<img src="../assets/icon/ico_arrow-up-cycle.svg" style="width: 20px">
					</q-btn>
				</template>
			</q-input>
		</div>
		<!-- comment list -->
		<section class="l-column comment-list">
			<div class="comment" v-for="item in comments">
				<comment-id :writer="item.user_title" :user-position="item.user_data.job" :created-at="item.comment_regdate" />
				<section class="comment-text">{{ item.comment_content }}</section>
			</div>
		</section>
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
        this.isLoading = false
        const content = res.data.response.view

        this.article.articleType = content.bc_foreign_key;
        if (content.bc_foreign_key === 'DPORHCPV') {
          this.article.articleType = '스토리'
        } else if (content.bc_foreign_key === 'KWUOXKGM') {
          this.article.articleType = '취업 스킬'
        } else if (content.bc_foreign_key === 'CEZTXGLJ') {
          this.article.articleType = '지애픽'
        }

        this.article.title = content.bc_title
        this.article.viewCount = content.bc_count
        this.article.content = content.bc_content.body.replace(/(?:\r\n|\r|\n)/g, '<br/>')
        this.article.thumbnailKey = content.bc_content.thumbnailKey
        this.article.createrKey = content.bc_writer_name
        this.article.createdAt = content.bc_regdate;
        this.getCreaterInfo();
        this.getThumbnail();
      } catch (e) {
        console.error('게시글이 유효하지 않습니다.', e);
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
        const result = await this.$api.post(config.url, config.body, config.etc)
        this.article.thumbnail = result.data.response.view.bc_content
        this.thumbnailImageSource = `data:image/jpeg;base64,${this.article.thumbnail}`;
        this.isLoading = false;
      } catch (e) {
        console.error('썸네일이 없는 게시글입니다.', e);

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
.article-content {
  padding: 0rem 1rem 1.25rem 1rem;
  min-height: 200px;
}

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
