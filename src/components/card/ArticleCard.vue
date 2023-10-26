<template>
  <div>
    <div class="card-wrap" :class="{ 'white-card' : articleThumb === '' }">
      <!-- 글정보 -->
      <div class="flex article-info">
        <!-- 사진, 작성자, 글 구분, 뱃지, 업데이트 시간 -->
        <div class="article-info-inner-wrap">
          <div class="user-thumbnail-wrap">
            <img class="user-thumbnail" :src="writerThumb">
          </div>
          <div>
            <!-- 사용자 이름, 글 타입 -->
            <span class="writer writer-1">{{ writer }}님이 </span>
            <span class="writer writer-2">{{ articleType }}</span>
            <span class="writer writer-1">을 올렸어요</span><br>
            <!-- 사용자 뱃지 -->
            <span class="badge">
            <i class="fa-solid fa-user-check"></i>
            {{ badgeTitle }}
          </span>
            <span class="part"> | </span>
            <!-- 작성일 -->
            <span class="created-at">{{ createdAt }}</span>
          </div>
        </div>
        <!-- 더보기 버튼 -->
        <div class="article-controller">
          <button>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>
      <!-- 썸네일 & 제목 -->
      <div class="article-thumb-wrap" @click="linkToArticle">
        <div class="article-img-wrap">
          <img :src="articleThumb">
        </div>
        <div class="copy">
          <h2 class="headline-1 article-headline">{{ title }}</h2>
          <p class="nomal-text-1"><b>{{ description }}</b></p>
        </div>
      </div>
      <!-- 반응들 -->
      <div class="article-bottom-area flex">
        <div class="motivation-wrap flex">
          <i class="fa-regular fa-face-smile"></i>
          <span>{{ motivation }}</span>
        </div>
        <div class="motivation-wrap flex">
          <span>조회</span>
          <span>{{ viewCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    articleType: String,
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
    linkToArticle() {
      this.$router.push('article');
      // $route.query.name
    },
  }
}
</script>

<style scoped>
.card-wrap {
  margin-bottom: 20px;
}

.card-wrap .nomal-text-1 b {
  color: #fff;
}

.white-card .nomal-text-1 b {
  color: #000;
}

.user-thumbnail-wrap {
  margin-right: 4px;
  width: 42px;
  height: 42px;
  border-radius: 100px;
  overflow: hidden;
  border: 1px solid #dadada;
}

.user-thumbnail {
  display: flex;
  width: 100%;
  height: auto;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.writer {
  font-size: 1.02rem;
  font-style: normal;
  font-weight: 700;
}

.writer-2 {
  color: #FD384E;
}

.badge {
  color: #938F96;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 700;
}

.badge i {
  color: #9747FF;
  margin-right: 4px;
}

.part {
  color: #938F96;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 700;

  opacity: 0.5;
}

.created-at {
  color: #938F96;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 700;
}

.article-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.article-info-inner-wrap {
  display: flex;
}

.article-controller {
//width: 24px; color: #CAC5CD;
}

.article-controller button {
  border: none;
  background-color: transparent;
  font-size: 1.5px;
}

.article-thumb-wrap {
  position: relative;
}

.article-thumb-wrap img {
  filter: brightness(50%);
}

.article-thumb-wrap .copy {
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px;
}

.white-card .article-thumb-wrap h2,
.white-card .article-thumb-wrap p {
  color: #000;
}

.article-thumb-wrap h2,
.article-thumb-wrap p {
  margin-block-start: 0;
  margin-block-end: 10px;
  color: #fff;
}

.motivation-wrap {
  height: 24px;
  display: flex;
  margin-right: 12px;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  color: #938F96;
  font-size: 1rem;
}

.motivation-wrap span {
  font-weight: 500;
  margin-left: 4px;
}

.white-card .article-img-wrap {
  background: white;
}

.article-img-wrap {
  width: 100%;
  height: 196px;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}

.article-img-wrap img {
  width: 100%;
}

.article-bottom-area {
  margin-top: 9px;
}
</style>
