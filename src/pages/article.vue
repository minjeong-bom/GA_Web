<template>
	<div class="article-layout">
		<text-button-top-bar :title-text="this.categoryName"></text-button-top-bar>
		<div class="user-profile-wrap">
			<!-- creater info -->
			<article-id style="width: 100%"
			            :user-profile="''"
			            :article-type="article.articleType"
			            :view-count="article.viewCount"
			            :writerName="article.createrName"
			            :job-title="article.createrJob"
			            :created-at="''"
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
					<q-btn flat round icon="bookmark" style="opacity: 0.3"/>
					<q-btn flat round icon="share" style="opacity: 0.3"/>
				</section>
			</div>
		</div>
		<!-- 본문 -->
		<section v-if="isLoading" class="article-content">
			<skeleton-line :lines="4"></skeleton-line>
		</section>
		<section v-else class="article-content" style="min-height: 200px" v-html="article.content">
		</section>
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
				<q-btn size="14px" flat round style="background: #FD384E">
					<q-icon name="add" color="white"/>
				</q-btn>
				<!-- Like List -->
				<section class="liker-slide">
					<q-avatar size="40px">
						<img src="https://cdn.quasar.dev/img/avatar.png">
						<img class="imoji" src="../assets/brand/imoji-smile.png">
					</q-avatar>
					<q-avatar size="40px">
						<img src="https://cdn.quasar.dev/img/avatar.png">
						<img class="imoji" src="../assets/brand/imoji-smile.png">
					</q-avatar>
					<q-avatar size="40px">
						<img src="https://cdn.quasar.dev/img/avatar.png">
						<img class="imoji" src="../assets/brand/imoji-smile.png">
					</q-avatar>
					<q-avatar size="40px">
						<img src="https://cdn.quasar.dev/img/avatar.png">
						<img class="imoji" src="../assets/brand/imoji-smile.png">
					</q-avatar>
					<q-avatar size="40px">
						<img src="https://cdn.quasar.dev/img/avatar.png">
						<img class="imoji" src="../assets/brand/imoji-smile.png">
					</q-avatar>
					<q-avatar size="40px">
						<img src="https://cdn.quasar.dev/img/avatar.png">
						<img class="imoji" src="../assets/brand/imoji-smile.png">
					</q-avatar>
				</section>
				<!-- PageNation -->
				<q-btn flat round>
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

export default {
	components: {TextButtonTopBar, SkeletonLine, CommentId, ArticleId},
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
			comments: [],
			addComment: '',
		}
	},
	mounted() {
		this.getArticleContent();
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
				const res = await this.$api.post(config.url, config.body, config.etc);
				this.isLoading = false;
				const content = res.data.response.view;

				this.article.articleType = content.bc_foreign_key;
				this.article.articleType2 = content.bc_foreign_key2;

				this.article.title = content.bc_title;
				this.article.viewCount = content.bc_count;
				this.article.content = content.bc_content.replace(/(?:\r\n|\r|\n)/g, '<br/>')
				this.article.createrKey = content.bc_writer_name;
				this.article.createdAt = content.bc_regdate;
				this.getCreaterInfo();
			} catch (e) {
				console.error(e);
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
				const response = res.data.response.view;
				this.article.createrName = response.mem_title;
				this.article.createrJob = response.mem_job;

				const categoryInfo = {
					DPORHCPV: "스토리",
					KWUOXKGM: "취업 스킬",
					CEZTXGLJ: "지애픽"
				};
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
					this.addComment = '';
					this.getCommentList();
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
				const res = await this.$api.get(config.url, config.etc);
				this.comments = res.data.response.lists;
				console.log(this.comments)
			} catch (e) {
				console.error(e);
			}
		}
	},
	computed: {
		categoryName() {
			if (this.article.articleType === 'KWUOXKGM') {
				return '취업스킬'
			} else if (this.article.articleType === 'DPORHCPV') {
				return '스토리'
			} else if (this.article.articleType === 'CEZTXGLJ') {
				return '지애픽'
			}
		},
		commentInputPlaceholder() {
			if (this.comments.length === 0) {
				return "첫 댓글을 남겨보세요"
			} else {
				return "댓글을 남겨보세요"
			}
		},
		storageUserKey() {
			return localStorage.getItem('userKey');
		},
		articleKey() {
			return this.$route.query.key
		}
	}
}
</script>

<style scoped>
.headline-wrap {
	display: flex;
	padding: 1rem;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.375rem;
}

.article-created-at-text {
	color: #999;
	font-family: Pretendard;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 600;
	line-height: 1.25rem; /* 166.667% */
}

.user-profile-wrap {
	display: flex;
	padding: 1rem 1rem 0rem 1rem;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.625rem;
}

.article-overview-wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.article-overview-wrap > div {
	padding: 0.6875rem 1rem;
}

.article-overview {
	display: flex;
	align-items: center;
	gap: 0.1875rem;
}

.article-overview .value {
	color: var(--ga-red);
	font-family: Spoqa Han Sans Neo, "sans-serif";
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 500;
}

.article-overview .lable {
	color: #999;
	font-family: Pretendard;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 500;
}

.article-content {
	display: flex;
	padding: 0rem 1rem 1.25rem 1rem;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.625rem;
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

.likes-list-area {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.imoji {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 24px !important;
	height: 24px !important;
}

.liker-slide {
	display: flex;
	align-items: center;
	gap: 5px;
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
</style>
