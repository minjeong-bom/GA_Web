<script>
import TimeAgo from "src/timeData/timeAgo";
export default {
	name: "noticeItemCard",
	props: {
		titleText: {
			type: String,
			default: '',
		},
		categoryText: {
			type: String,
			default: '',
		},
		createrName: {
			type: String,
			default: '',
		},
		createdDate: {
			type: String,
			default: '',
		},
	},
	computed: {
		createdAt() {
			return TimeAgo.timeAgo(this.createdDate);
		},
		categoryName() {
			if (this.categoryText === 'COHDMIOB') {
				return '일반 공지';
			}
			if (this.categoryText === 'NCNZKKMC') {
				return '이벤트';
			}
		}
	},
}
</script>

<template>
	<div class="notice-item-card flex-sb">
		<div class="card-text-info-wrap">
			<p class="category-text-wrap">{{ categoryName }}</p>
			<p class="notice-item-card-title">{{ titleText }}</p>
			<div class="cartegory2-lable">
				<span>{{ createrName }}</span>
				<span> | </span>
				<span>{{ createdAt }}</span>
			</div>
		</div>
		<img class="notice-item-thumbnail" style="background-image: url('src/assets/graphic/article-thumbnail-sample.png')">
	</div>
</template>

<style scoped>
.notice-item-card {
	padding: 1.25rem 0;
	border-bottom: 1px solid #E6E6E6;
}

.notice-item-card-title {
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 700;
	line-height: 1.5625rem; /* 138.889% */
}

.notice-item-thumbnail {
	width: 5.125rem;
	height: 5.125rem;
	border-radius: 0.5rem;
}

.card-text-info-wrap {
	width: 14.375rem;
	padding-right: 10px;
	margin-bottom: 1.7rem;
}
</style>
