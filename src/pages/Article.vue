<template>
	<div class="article-layout">
		<text-button-top-bar :title-text="this.categoryName"></text-button-top-bar>
    <!-- 아티클 헤더 (작성자 프로필, 제목, 작성 시각) -->
    <article-header :article="article"/>
    <!-- 아티클 공감 & 댓글 수 + 아티클 컨트롤러 -->
		<div class="flex-sb article-overview-wrap">
			<!-- likes & comment -->
      <article-overview-info :likes-length="likes" :comment-length="comments"/>
      <article-controller :article-key="articleKey" :user-key="storageUserKey" @setFontSize="setFontSize"/>
		</div>
    <!-- 썸네일 이미지 -->
    <section v-if="isLoading" class="article-content">
      <skeleton-card :lines="1"></skeleton-card>
    </section>
    <img v-else class="thumbnail-image-style" :src="'data:image/jpeg;base64,' + article.thumbnail"/>
		<!-- 본문 -->
		<section v-if="isLoading" class="article-content">
			<skeleton-line :lines="4"></skeleton-line>
		</section>
		<section v-else v-html="article.content" class="article-content"></section>
		<!-- article controller -->
    <article-controller :article-key="articleKey" :user-key="storageUserKey"/>
    <!-- end line -->
		<div class="end-line"></div>
    <!-- control area -->
		<div class="article-likes">
      <article-overview-info :likes-length="likes" :comment-length="comments"/>
      <like-stamp :article-key="articleKey" :user-key="storageUserKey"></like-stamp>
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
						<img src="src/assets/icon/ico_arrow-up-cycle.svg" style="width: 20px">
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
import ArticleId from "components/card/ArticleId.vue";
import CommentId from "components/comment/commentId.vue";
import SkeletonLine from "components/loading/SkeletonLine.vue";
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";
import ArticleController from "components/button-grop/article-controller.vue";
import ArticleHeader from "components/page-content/article-header.vue";
import ArticleOverviewInfo from "components/page-content/article-overview-info.vue";
import SkeletonCard from "components/loading/SkeletonCard.vue";
import LikeStamp from "components/like-stamp/like-stamp.vue";

export default {
	components: {
    LikeStamp,
    SkeletonCard,
    ArticleOverviewInfo,
    ArticleHeader, ArticleController, TextButtonTopBar, SkeletonLine, CommentId, ArticleId},
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
        thumbnailKey: '',
        thumbnail: '',
			},
			comments: [],
			likes: [],
			addComment: '',
			showLikeButtons: false,
		}
	},
	mounted() {
		this.getArticleContent()
		this.getCommentList()
	},
	methods: {
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
				console.error(e);
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
        this.isLoading = false;
        console.log(this.mrpPhoto)
      } catch (e) {
        console.error(e)
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
				console.error(e);
			}
		},
		async createComment() {
			try {
				const config = {
					url: '/api/crud/setcomment',
					body: {
						data_key : this.articleKey,
						comment_content: this.addComment,
						comment_user_key: this.storageUserKey,
					},
					etc: {
						headers: {
							'SPRINT-API-KEY': 'sprintcombom'
						}
					}
				}
				const res = await this.$api.post(config.url, config.body, config.etc);
				if (res.status) {
					this.addComment = ''
					this.getCommentList()
				}
			} catch (e) {
				console.error(e);
			}
		},
		async getCommentList() {
			try {
				const config = {
					url: '/api/logs/commentlists?foreign_key=' + this.articleKey,
					etc: {
						headers: {
							'SPRINT-API-KEY': 'sprintcombom'
						}
					}
				}
				const res = await this.$api.get(config.url, config.etc)
				this.comments = res.data.response.lists
			} catch (e) {
				console.error(e)
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
		commentInputPlaceholder() {
			if (this.comments.length === 0) {
				return "첫 댓글을 남겨보세요";
			} else {
				return "댓글을 남겨보세요";
			}
		},
		storageUserKey() {
			return localStorage.getItem('userKey');
		},
		articleKey() {
			return this.$route.query.key;
		},
	}
}
</script>

<style scoped>
.article-content {
	padding: 0rem 1rem 1.25rem 1rem;
  min-height: 200px;
}



.gray-button {
	color: var(--grays-gray) !important;
}

.article-end-control-wrap {
	display: flex;
	padding: 0rem 0rem 0.625rem 1rem;
	align-items: center;
	gap: 1.125rem;
}

.article-likes {
	display: flex;
	padding: 0.625rem 1.5rem 1.25rem 1rem;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 0.625rem;
}

.comment-input-area {
	display: flex;
	padding: 10px 16px;
	align-items: center;
	gap: 10px;
}

.comment-input {
	display: flex;
	padding: 8px 12px;
	align-items: center;
	gap: 16px;
	flex: 1 0 0;
}

.comment {
	display: flex;
	padding: 10px 16px 0px 16px;
	flex-direction: column;
	align-items: flex-start;
}

.comment-text {
	width: 100%;
	border-radius: 20px;
	background: var(--fills-quartternary);
	padding: 16px;

	color: #000;
	font-family: Pretendard;
	font-size: 17px;
	font-style: normal;
	font-weight: 400;
	line-height: 1.4375rem; /* 135.294% */
}

.comment-list {
	gap: 10px;
	margin-bottom: 52px;
}





.thumbnail-image-style {
  width: 100%;
}
</style>
