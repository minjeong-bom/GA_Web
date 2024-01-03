<template>
  <div>
    <div class="card">
      <!-- Card Id -->
      <article-id
        :article-key="articleKey"
        :job-title="badgeTitle"
        :article-type="articleType2"
        :article-type2="articleType2"
        :view-count="viewCount"
        :creater-name="writer"
        :created-at="createdAt"
        :control-ui="true"
        :user-key="storageUserKey"
        :creater-key="createrKey"
      />
      <!-- Thumbnail & Title -->
      <div class="article-card-thumbnail" @click="goToArticle(articleKey)">
        <div class="article-card-headline-wrap">
          <h4 class="article-card-headline">{{ titleText42 }}</h4>
        </div>
      </div>
      <!-- Likes & Comment -->
      <div class="like-read-wrap">
        <section>
          <q-icon name="sentiment_satisfied_alt" size="18px"></q-icon>
          <span>999</span>
        </section>
        <section>
          <span>조회</span>
          <span>{{ viewCount }}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleId from "components/card/ArticleId.vue";
import article from "../../pages/Article.vue";

export default {
  components: {ArticleId},
  props: {
    articleKey: String,
    title: String,
    articleType: String,
    articleType2: String,
    createrKey: String,
    writer: String,
    badgeTitle: String,
    createdAt: String,
    description: String,
    writerThumb: String,
    articleThumb: String,
    motivation: String,
    viewCount: String,
  },
  methods: {
    goToArticle(articleId) {
      this.$router.push({ path: '/article', query: { key: articleId } });
    },
  },
	computed: {
		article() {
			return article
		},
		titleText42 () {
			if (this.title.length > 42) {
				return this.title.substring(0, 42);
			} else {
				return this.title;
			}
		},
    storageUserKey() {
      return localStorage.getItem('userKey');
    }
	}
}
</script>

<style scoped>
.card {
  padding-bottom: 0.38rem;
}

.article-card-thumbnail {
  position: relative;
  width: 100%;
  height: 12.25rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #fff;
}

.article-card-thumbnail img {
  width: 100%;
}

.article-card-thumbnail {

}

.linear-gradient {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 115.35%);
}

.article-card-headline-wrap {
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 0.625rem;
}

.like-read-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.2rem;
  padding-left: 0.3rem;
}

.like-read-wrap section {
  display: flex;
  height: 1.5rem;
  align-items: center;
  gap: 0.0625rem;
}

.like-read-wrap section * {
  color: #999999;
}
</style>
