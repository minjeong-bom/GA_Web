<script>
import ArticleId from "components/card/ArticleId.vue";

export default {
  name: "article-header",
  components: {ArticleId},
  props: {
    articleKey: String,
    article: Object,
    createrKey: String,
  }
}
</script>

<template>
  <div>
    <div class="user-profile-wrap">
      <article-id :article-key="articleKey"
                  :article-type="article.articleType"
                  :control-ui="true"
                  :created-at="article.createdAt"
                  :creater-key="userKey"
                  :creater-name="article.createrName"
                  :job-title="article.createrJob"
                  :user-profile="''"
                  :view-count="article.viewCount"
                  class="full-width"/>
    </div>
    <div class="headline-wrap">
      <!-- 헤드라인 -->
      <h1 class="article-card-headline">{{ article.title }}</h1>
      <!-- 작성 시각 -->
      <p class="article-created-at-text">{{ article.createdAt }}</p>
    </div>
  </div>
</template>

<style scoped>
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
}

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
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem; /* 166.667% */
}
</style>
