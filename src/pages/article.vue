<template>
	<div class="article-layout">
		<!-- user profile -->
		<div class="user-profile-wrap">
			<article-id style="width: 100%" :article-type="article.articleType" :article-type2="article.articleType2" :view-count="article.viewCount"
			            :writerName="article.createrName"/>
		</div>
		<div class="headline-wrap">
			<!-- headline -->
			<h1 class="article-card-headline">가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자최대 42자</h1>
			<!-- created at -->
			<p class="article-created-at-text">2023년 8월 12일 00시 00분</p>
		</div>

		<!-- control area -->
		<div class="article-overview-wrap">
			<!-- likes & comment -->
			<div class="article-overview">
				<span class="lable">공감</span>
				<span class="value">10</span>
				<span>∙</span>
				<span class="lable">댓글</span>
				<span class="value">10</span>
			</div>
			<div>
				<section>
					<q-btn flat round icon="text_fields" style="opacity: 0.3"/>
					<q-btn flat round icon="bookmark" style="opacity: 0.3"/>
					<q-btn flat round icon="share" style="opacity: 0.3"/>
				</section>
			</div>
		</div>
		<!-- 본문 -->
		<section class="article-content">
			<skeleton-line :lines="4"></skeleton-line>
			<p>
				...
			</p>
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
				<span class="value">10</span>
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
		<!-- comment input -->
		<div class="comment-input-area">
			<!-- profile image -->
			<q-avatar size="56px">
				<img src="https://cdn.quasar.dev/img/avatar.png">
			</q-avatar>
			<!-- text input -->
			<q-input rounded outlined v-model="addComment" :placeholder="commentInputPlaceholder" style="width: 100%;"></q-input>
		</div>
		<!-- comment list -->
		<div class="comment">
			<comment-id :writer="'민정'" :user-position="'디자이너'" :created-at="'2023-00-00 10:00'" />
			<section class="comment-text">성별은 관계가 없게죠? 경기도는 지역을 어떻게 구분하나요? 가나다라마바사아자차카타파하가나다라마바사아자차카타파하</section>
		</div>
	</div>
</template>

<script>
import ArticleId from "components/card/ArticleId.vue";
import CommentId from "components/comment/commentId.vue";
import SkeletonLine from "components/loading/SkeletonLine.vue";

export default {
	components: {SkeletonLine, CommentId, ArticleId},
	data() {
		return {
			article: {
				articleType: '',
				articleType2: '',
				viewCount: '',
				createrName: '',
			},
			comments: [],
			addComment: '',
		}
	},
	mounted() {
	},
	methods: {
	},
	computed: {
		commentInputPlaceholder() {
			if (this.comments.length === 0) {
				return "첫 댓글을 남겨보세요"
			} else {
				return "댓글을 남겨보세요"
			}
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
	border-radius: 20px;
	background: var(--fills-quartternary);
	padding: 16px;

	color: #000;
	font-family: Pretendard;
	font-size: 1.0625rem;
	font-style: normal;
	font-weight: 400;
	line-height: 1.4375rem; /* 135.294% */
}
</style>
